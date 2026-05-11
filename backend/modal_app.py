"""
modal_app.py — Central Modal app definition.

Defines the shared app, container image, volume, and secrets.
All other files import `app`, `image`, and `chroma_volume` from here.

Deploy:  modal deploy modal_app.py
Serve:   modal serve modal_app.py  (hot-reload for dev)
"""
import modal

from config import (
    APP_NAME,
    CHROMA_MOUNT_PATH,
    EMBEDDING_MODEL_NAME,
    MODAL_SECRET_NAME,
    RATE_LIMIT_DICT_NAME,
    VOLUME_NAME,
)

# ─── Modal App ────────────────────────────────────────────────────────────────
app = modal.App(name=APP_NAME)

# ─── Container Image ─────────────────────────────────────────────────────────
# All dependencies baked in at deploy time.
# sentence-transformers model is downloaded here (NOT at cold start).
image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install(
        "fastapi[standard]==0.115.5",
        "chromadb==0.5.20",
        "sentence-transformers==3.3.1",
        "groq==0.13.1",
        "pydantic==2.10.3",
        "python-multipart==0.0.20",
        "httpx==0.28.1",
        "torch==2.5.1",         # CPU-only torch (smaller than default)
        "--extra-index-url", "https://download.pytorch.org/whl/cpu",
    )
    .run_function(
        # This lambda runs during `modal deploy` and bakes the model into the image.
        # Cold starts will load from the local image cache — no network download.
        lambda: __import__("sentence_transformers").SentenceTransformer(
            EMBEDDING_MODEL_NAME
        ),
        # Installs sentence-transformers first so this lambda can run
    )
)

# ─── Persistent Volume (ChromaDB storage) ────────────────────────────────────
# Modal NFS volume — persists across container restarts and redeployments.
# Mounted at CHROMA_MOUNT_PATH inside every function that needs it.
chroma_volume = modal.Volume.from_name(VOLUME_NAME, create_if_missing=True)

# ─── Secrets ─────────────────────────────────────────────────────────────────
# Create this in the Modal dashboard: https://modal.com/secrets
# Required keys: GROQ_API_KEY
portfolio_secrets = modal.Secret.from_name(MODAL_SECRET_NAME)

# ─── Rate Limit Store ─────────────────────────────────────────────────────────
# Modal Dict is an in-memory distributed dict shared across warm containers.
# No Redis needed — perfect for lightweight rate limiting.
rate_limit_dict = modal.Dict.from_name(RATE_LIMIT_DICT_NAME, create_if_missing=True)

# ─── Re-export for other modules ─────────────────────────────────────────────
__all__ = ["app", "image", "chroma_volume", "portfolio_secrets", "rate_limit_dict"]


# ─── Note on deployment ──────────────────────────────────────────────────────
# Deploy with: modal deploy modal_app.py
# Modal discovers all @app.function / @app.cls decorators in the same package
# automatically. api.py and rag_service.py register themselves when imported.
# The CLI entry point is modal_app.py, which triggers the full module graph.
