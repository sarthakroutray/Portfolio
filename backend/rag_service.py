"""
rag_service.py — Core RAG logic as a Modal class.

This class handles the full retrieval-augmented generation pipeline:
  1. embed_query()       — encode user query into a vector
  2. retrieve_context()  — cosine similarity search in ChromaDB
  3. build_context_string() — format chunks for the LLM prompt
  4. generate_response() — stream Groq LLM tokens

The class uses @modal.build() to bake the embedding model into the image,
and @modal.enter() to initialize ChromaDB once per container start.
"""
from __future__ import annotations

import logging
import os
from typing import AsyncIterator

import modal

from config import (
    CHROMA_COLLECTION_NAME,
    CHROMA_MOUNT_PATH,
    EMBEDDING_MODEL_NAME,
    GROQ_MODEL,
    LLM_MAX_TOKENS,
    LLM_TEMPERATURE,
    MAX_CONTEXT_CHARS,
    PORTFOLIO_OWNER_NAME,
    QUERY_PROMPT_TEMPLATE,
    RETRIEVAL_DISTANCE_THRESHOLD,
    RETRIEVAL_TOP_K,
    SYSTEM_PROMPT,
)
from models import RetrievedChunk
from modal_app import app, chroma_volume, image, portfolio_secrets

logger = logging.getLogger(__name__)


@app.cls(
    image=image,
    secrets=[portfolio_secrets],
    volumes={CHROMA_MOUNT_PATH: chroma_volume},
    # CPU is sufficient — embedding is fast on CPU for 384-dim model
    cpu=1,
    memory=1024,
    # Keep 1 container warm to eliminate cold starts for queries
    keep_warm=1,
    # Allow 10 concurrent requests per container
    allow_concurrent_inputs=10,
    timeout=60,
)
class RAGService:

    # ── Build Step (runs once at `modal deploy`, baked into image) ────────────
    @modal.build()
    def download_model(self) -> None:
        """Download and cache embedding model in the container image."""
        from sentence_transformers import SentenceTransformer
        SentenceTransformer(EMBEDDING_MODEL_NAME)
        logger.info("Embedding model cached in image: %s", EMBEDDING_MODEL_NAME)

    # ── Container Startup (runs once per container, not per request) ──────────
    @modal.enter()
    def setup(self) -> None:
        """Initialize model and ChromaDB connection once per container."""
        import chromadb
        from groq import Groq
        from sentence_transformers import SentenceTransformer

        # Load from image cache — no download, ~1s
        self.model = SentenceTransformer(EMBEDDING_MODEL_NAME)

        # Connect to persistent ChromaDB on Modal Volume
        self.chroma_client = chromadb.PersistentClient(path=CHROMA_MOUNT_PATH)
        self.collection = self._get_or_create_collection()

        # Groq client — key injected via Modal Secret
        self.groq_client = Groq(api_key=os.environ["GROQ_API_KEY"])

        logger.info(
            "RAGService ready | collection=%s | doc_count=%d",
            CHROMA_COLLECTION_NAME,
            self.collection.count(),
        )

    # ── Public Methods ────────────────────────────────────────────────────────

    @modal.method()
    def embed_query(self, query: str) -> list[float]:
        """Encode query string into a 384-dim embedding vector."""
        return self.model.encode(query, normalize_embeddings=True).tolist()

    @modal.method()
    def retrieve_context(self, embedding: list[float]) -> list[RetrievedChunk]:
        """
        Cosine similarity search in ChromaDB.
        Returns up to RETRIEVAL_TOP_K chunks above the similarity threshold.
        """
        if self.collection.count() == 0:
            logger.warning("ChromaDB collection is empty — run ingest.py first")
            return []

        results = self.collection.query(
            query_embeddings=[embedding],
            n_results=min(RETRIEVAL_TOP_K, self.collection.count()),
            include=["documents", "metadatas", "distances"],
        )

        chunks = []
        for doc, meta, dist in zip(
            results["documents"][0],
            results["metadatas"][0],
            results["distances"][0],
        ):
            if dist > RETRIEVAL_DISTANCE_THRESHOLD:
                continue  # Reject low-similarity chunks
            chunks.append(RetrievedChunk(text=doc, metadata=meta, distance=dist))

        return self._deduplicate_chunks(chunks)

    @modal.method()
    def build_context_string(self, chunks: list[RetrievedChunk]) -> str:
        """Format retrieved chunks into a structured context string for the LLM."""
        if not chunks:
            return "No relevant context found in resume."

        parts: list[str] = []
        total_chars = 0

        for chunk in sorted(chunks, key=lambda c: c.distance):
            section = chunk.metadata.get("section_type", "general").title()
            header = f"[{section}]"
            if company := chunk.metadata.get("company"):
                header += f" @ {company}"
            if date_range := chunk.metadata.get("date_range"):
                header += f" ({date_range})"

            entry = f"{header}\n{chunk.text}"

            if total_chars + len(entry) > MAX_CONTEXT_CHARS:
                break
            parts.append(entry)
            total_chars += len(entry)

        return "\n\n---\n\n".join(parts)

    @modal.method()
    async def generate_response(
        self, query: str, context: str
    ) -> AsyncIterator[str]:
        """
        Stream Groq LLM tokens for the given query and context.
        Yields raw text tokens — caller wraps in SSE format.
        """
        prompt = QUERY_PROMPT_TEMPLATE.format(
            context=context,
            query=query,
            name=PORTFOLIO_OWNER_NAME,
        )

        stream = self.groq_client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt},
            ],
            temperature=LLM_TEMPERATURE,
            max_tokens=LLM_MAX_TOKENS,
            stream=True,
        )

        for chunk in stream:
            token = chunk.choices[0].delta.content
            if token:
                yield token

    @modal.method()
    def health_check(self) -> dict:
        """Return service health status (called by /api/health endpoint)."""
        import httpx

        chroma_ok = False
        doc_count = 0
        try:
            doc_count = self.collection.count()
            chroma_ok = True
        except Exception as e:
            logger.error("ChromaDB health check failed: %s", e)

        groq_ok = False
        try:
            # Lightweight check — just verify DNS resolves
            httpx.head("https://api.groq.com", timeout=3)
            groq_ok = True
        except Exception:
            pass

        return {
            "chroma_connected": chroma_ok,
            "document_count": doc_count,
            "groq_reachable": groq_ok,
        }

    # ── Private Helpers ───────────────────────────────────────────────────────

    def _get_or_create_collection(self):
        """Get or create the ChromaDB collection with cosine distance."""
        import chromadb
        return self.chroma_client.get_or_create_collection(
            name=CHROMA_COLLECTION_NAME,
            metadata={"hnsw:space": "cosine"},
        )

    def _deduplicate_chunks(self, chunks: list[RetrievedChunk]) -> list[RetrievedChunk]:
        """
        Remove duplicate chunks from the same section+company combination.
        Keeps the chunk with the lowest distance (most similar) per group.
        """
        seen: dict[str, RetrievedChunk] = {}
        for chunk in chunks:
            key = (
                f"{chunk.metadata.get('section_type', '')}:"
                f"{chunk.metadata.get('company', '')}:"
                f"{chunk.metadata.get('chunk_id', chunk.text[:30])}"
            )
            if key not in seen or chunk.distance < seen[key].distance:
                seen[key] = chunk
        return list(seen.values())
