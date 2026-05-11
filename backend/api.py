"""
api.py — FastAPI application mounted on Modal.

This module defines:
- The FastAPI app with all middleware (CORS, logging, error handlers)
- All HTTP endpoints (/api/chat, /api/health, /api/suggested-questions, /api/feedback)
- Rate limiting via Modal Dict
- SSE streaming for /api/chat

The web() function is the Modal entry point — it returns the FastAPI app
and is decorated with @modal.asgi_app() so Modal can serve it.
"""
from __future__ import annotations

import json
import logging
import time
from datetime import datetime, timezone

import modal
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from config import (
    CORS_ORIGINS,
    RATE_LIMIT_REQUESTS_PER_DAY,
    RATE_LIMIT_REQUESTS_PER_MINUTE,
    SUGGESTED_QUESTIONS,
)
from models import (
    ChatRequest,
    ErrorResponse,
    FeedbackRequest,
    FeedbackResponse,
    FeedbackSentiment,
    HealthResponse,
    HealthStatus,
    SuggestedQuestionsResponse,
    StreamToken,
)
from modal_app import app, image, portfolio_secrets, rate_limit_dict
from rag_service import RAGService

logger = logging.getLogger(__name__)


# ─── FastAPI App Factory ──────────────────────────────────────────────────────

def create_app() -> FastAPI:
    fastapi_app = FastAPI(
        title="Portfolio RAG API",
        description="Conversational resume assistant powered by Modal + Groq",
        version="1.0.0",
    )

    # ── CORS ─────────────────────────────────────────────────────────────────
    fastapi_app.add_middleware(
        CORSMiddleware,
        allow_origins=CORS_ORIGINS,
        allow_origin_regex=r"https://.*\.vercel\.app",
        allow_credentials=False,
        allow_methods=["GET", "POST"],
        allow_headers=["Content-Type", "X-Request-ID"],
        expose_headers=["X-Request-ID"],
    )

    # ── Request logging middleware ────────────────────────────────────────────
    @fastapi_app.middleware("http")
    async def log_requests(request: Request, call_next):
        start = time.perf_counter()
        response = await call_next(request)
        duration_ms = (time.perf_counter() - start) * 1000
        logger.info(
            "%s %s → %d (%.1fms)",
            request.method,
            request.url.path,
            response.status_code,
            duration_ms,
        )
        return response

    # ── Routes ───────────────────────────────────────────────────────────────
    _register_routes(fastapi_app)

    return fastapi_app


def _register_routes(fastapi_app: FastAPI) -> None:

    @fastapi_app.get("/api/health", response_model=HealthResponse)
    async def health():
        """System health check — used by frontend to show 'AI Online' indicator."""
        rag = RAGService()
        status_data = rag.health_check.remote()

        overall = (
            HealthStatus.OK
            if status_data["chroma_connected"] and status_data["groq_reachable"]
            else HealthStatus.DEGRADED
        )
        return HealthResponse(
            status=overall,
            chroma_connected=status_data["chroma_connected"],
            document_count=status_data["document_count"],
            groq_reachable=status_data["groq_reachable"],
        )

    @fastapi_app.get("/api/suggested-questions", response_model=SuggestedQuestionsResponse)
    async def suggested_questions():
        """Return curated starter questions for the chat UI."""
        return SuggestedQuestionsResponse(questions=SUGGESTED_QUESTIONS)

    @fastapi_app.post("/api/chat")
    async def chat(request: ChatRequest, http_request: Request):
        """
        Main RAG endpoint. Returns a Server-Sent Events stream.

        SSE format:
          data: {"token": "Hello"}\n\n
          data: {"token": " world"}\n\n
          data: {"done": true}\n\n
        """
        client_ip = _get_client_ip(http_request)

        _check_rate_limit(client_ip)

        async def event_stream():
            try:
                rag = RAGService()

                # 1. Embed query
                embedding = rag.embed_query.remote(request.message)

                # 2. Retrieve context
                chunks = rag.retrieve_context.remote(embedding)

                # 3. Build context string
                context = rag.build_context_string.remote(chunks)

                # 4. Stream LLM response
                async for token in rag.generate_response.remote_gen(
                    request.message, context
                ):
                    payload = StreamToken(token=token).model_dump_json()
                    yield f"data: {payload}\n\n"

                # Signal completion
                yield f"data: {StreamToken(done=True).model_dump_json()}\n\n"

            except Exception as e:
                logger.error("Stream error for session %s: %s", request.session_id, e)
                error_payload = StreamToken(error=str(e), done=True).model_dump_json()
                yield f"data: {error_payload}\n\n"

        return StreamingResponse(
            event_stream(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "X-Accel-Buffering": "no",  # Disable Nginx buffering
                "Connection": "keep-alive",
            },
        )

    @fastapi_app.post("/api/feedback", response_model=FeedbackResponse)
    async def feedback(request: FeedbackRequest):
        """
        Collect thumbs up/down feedback on responses.
        Logs to Modal's built-in logging — viewable in the dashboard.
        For production, replace with a database write.
        """
        icon = "👍" if request.sentiment == FeedbackSentiment.POSITIVE else "👎"
        logger.info(
            "FEEDBACK %s | session=%s | query='%s...' | response='%s...'",
            icon,
            request.session_id,
            request.message[:50],
            request.response_preview[:50],
        )
        return FeedbackResponse(received=True, message="Thank you for your feedback!")

    @fastapi_app.get("/")
    async def root():
        return {"service": "Portfolio RAG API", "status": "running", "docs": "/docs"}


# ─── Rate Limiting ────────────────────────────────────────────────────────────

def _check_rate_limit(ip: str) -> None:
    """
    In-memory rate limiting via Modal Dict.
    Checks per-minute and per-day limits.
    Raises HTTPException 429 if exceeded.
    """
    now = int(time.time())
    minute_bucket = now // 60
    day_bucket = now // 86400

    minute_key = f"rl:min:{ip}:{minute_bucket}"
    day_key = f"rl:day:{ip}:{day_bucket}"

    try:
        minute_count = rate_limit_dict.get(minute_key, 0) + 1
        day_count = rate_limit_dict.get(day_key, 0) + 1

        if minute_count > RATE_LIMIT_REQUESTS_PER_MINUTE:
            raise HTTPException(
                status_code=429,
                detail=f"Rate limit exceeded: {RATE_LIMIT_REQUESTS_PER_MINUTE} requests per minute.",
                headers={"Retry-After": "60"},
            )

        if day_count > RATE_LIMIT_REQUESTS_PER_DAY:
            raise HTTPException(
                status_code=429,
                detail=f"Daily limit exceeded: {RATE_LIMIT_REQUESTS_PER_DAY} requests per day.",
                headers={"Retry-After": "86400"},
            )

        rate_limit_dict[minute_key] = minute_count
        rate_limit_dict[day_key] = day_count
    except HTTPException:
        raise
    except Exception as e:
        # Rate limit store failure is non-fatal — log and continue
        logger.warning("Rate limit check failed (non-fatal): %s", e)


def _get_client_ip(request: Request) -> str:
    """Extract real client IP, handling proxies (Vercel, Cloudflare)."""
    forwarded_for = request.headers.get("X-Forwarded-For")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


# ─── Modal Web Endpoint ───────────────────────────────────────────────────────

@app.function(
    image=image,
    secrets=[portfolio_secrets],
    keep_warm=1,       # Keep 1 container alive — eliminates cold starts for visitors
    allow_concurrent_inputs=20,
    timeout=120,
)
@modal.asgi_app()
def web() -> FastAPI:
    """Modal entry point: returns the FastAPI app as an ASGI application."""
    logging.basicConfig(level=logging.INFO)
    return create_app()
