"""
models.py — All Pydantic request/response models for the RAG API.
"""
from __future__ import annotations

from enum import Enum
from typing import Any

from pydantic import BaseModel, Field, field_validator


# ─── Request Models ───────────────────────────────────────────────────────────

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=500, description="User question")
    session_id: str = Field(..., min_length=1, max_length=64, description="Client-generated UUID for conversation tracking")

    @field_validator("message")
    @classmethod
    def sanitize_message(cls, v: str) -> str:
        # Trim whitespace, collapse internal newlines (prompt injection vector)
        v = v.strip().replace("\n", " ").replace("\r", " ")
        # Block obvious prompt injection patterns
        injection_patterns = [
            "ignore previous instructions",
            "ignore all instructions",
            "disregard your system prompt",
            "you are now",
            "act as a",
        ]
        lower = v.lower()
        for pattern in injection_patterns:
            if pattern in lower:
                raise ValueError("Invalid query content.")
        return v


class FeedbackSentiment(str, Enum):
    POSITIVE = "positive"
    NEGATIVE = "negative"


class FeedbackRequest(BaseModel):
    session_id: str = Field(..., min_length=1, max_length=64)
    message: str = Field(..., max_length=500)
    response_preview: str = Field(..., max_length=200, description="First 200 chars of the AI response")
    sentiment: FeedbackSentiment


# ─── Response Models ──────────────────────────────────────────────────────────

class HealthStatus(str, Enum):
    OK = "ok"
    DEGRADED = "degraded"
    ERROR = "error"


class HealthResponse(BaseModel):
    status: HealthStatus
    chroma_connected: bool
    document_count: int
    groq_reachable: bool
    version: str = "1.0.0"


class SuggestedQuestionsResponse(BaseModel):
    questions: list[str]


class FeedbackResponse(BaseModel):
    received: bool
    message: str


class ErrorResponse(BaseModel):
    error: str
    detail: str | None = None


# ─── SSE Token Model (serialized as JSON per SSE event) ──────────────────────

class StreamToken(BaseModel):
    """Each SSE event carries one of these as JSON."""
    token: str | None = None       # Text chunk from LLM
    done: bool = False             # True on final event
    error: str | None = None       # Set only on failure


# ─── Internal Types ───────────────────────────────────────────────────────────

class RetrievedChunk(BaseModel):
    text: str
    metadata: dict[str, Any]
    distance: float  # Cosine distance (0=identical, 2=opposite)

    @property
    def similarity(self) -> float:
        """Convert cosine distance to 0-1 similarity score."""
        return 1 - (self.distance / 2)
