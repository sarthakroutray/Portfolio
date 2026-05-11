"""
ingest.py — Resume ingestion pipeline.

This Modal function:
1. Loads resume_data.json from the local filesystem
2. Chunks each section using section-aware strategy
3. Batch-embeds all chunks using sentence-transformers
4. Upserts into ChromaDB on Modal Volume
5. Calls volume.commit() to persist changes

Run with:
  modal run ingest.py            # Upsert (add/update)
  modal run ingest.py --clear    # Clear collection then re-ingest (clean slate)

Expected output:
  ✓ Loaded resume v1.0.0
  ✓ Generated 47 chunks
  ✓ Embedded 47 chunks (batch_size=32)
  ✓ Upserted 47 documents into ChromaDB
  ✓ Volume committed — done!
"""
from __future__ import annotations

import json
import logging
from pathlib import Path
from typing import Any

import modal

from config import (
    CHROMA_COLLECTION_NAME,
    CHROMA_MOUNT_PATH,
    EMBEDDING_MODEL_NAME,
    MAX_CHUNK_CHARS,
    VOLUME_NAME,
)
from modal_app import app, chroma_volume, image

logger = logging.getLogger(__name__)

# Path inside the container where resume JSON is mounted
RESUME_JSON_PATH = "/resume/resume_data.json"


# ─── Chunking Logic ───────────────────────────────────────────────────────────

def chunk_personal(data: dict) -> list[dict]:
    """Chunk the personal/summary section."""
    text = (
        f"Name: {data['name']}\n"
        f"Title: {data['title']}\n"
        f"Location: {data.get('location', '')}\n"
        f"Email: {data.get('email', '')}\n"
        f"LinkedIn: {data.get('linkedin', '')}\n"
        f"GitHub: {data.get('github', '')}\n\n"
        f"Summary: {data['summary']}"
    )
    return [{
        "chunk_id": "personal_0",
        "text": text[:MAX_CHUNK_CHARS],
        "metadata": {
            "section_type": "personal",
            "importance_weight": 1.0,
        },
    }]


def chunk_skills(skills: dict) -> list[dict]:
    """One chunk per skill category — keeps related skills together."""
    chunks = []
    for idx, (category, items) in enumerate(skills.items()):
        label = category.replace("_", " ").title()
        text = f"Skills — {label}: {', '.join(items)}"
        chunks.append({
            "chunk_id": f"skills_{idx}",
            "text": text[:MAX_CHUNK_CHARS],
            "metadata": {
                "section_type": "skills",
                "skill_category": category,
                "importance_weight": 0.9,
            },
        })
    return chunks


def chunk_experience(experiences: list[dict]) -> list[dict]:
    """One chunk per job — preserves company/role/achievement context."""
    chunks = []
    for idx, job in enumerate(experiences):
        achievements = "\n".join(f"• {a}" for a in job.get("achievements", []))
        text = (
            f"Company: {job['company']}\n"
            f"Role: {job['role']}\n"
            f"Period: {job['start_date']} – {job.get('end_date', 'Present')}\n"
            f"Location: {job.get('location', '')}\n\n"
            f"Key Achievements:\n{achievements}"
        )
        chunks.append({
            "chunk_id": f"exp_{idx}_{job['company'].replace(' ', '_').lower()}",
            "text": text[:MAX_CHUNK_CHARS],
            "metadata": {
                "section_type": "experience",
                "company": job["company"],
                "role": job["role"],
                "date_range": f"{job['start_date']} – {job.get('end_date', 'Present')}",
                "importance_weight": 0.95,
            },
        })
    return chunks


def chunk_projects(projects: list[dict]) -> list[dict]:
    """One chunk per project — keeps tech stack and highlights together."""
    chunks = []
    for idx, proj in enumerate(projects):
        tech = ", ".join(proj.get("tech_stack", []))
        highlights = "\n".join(f"• {h}" for h in proj.get("highlights", []))
        text = (
            f"Project: {proj['name']}\n"
            f"Description: {proj['description']}\n"
            f"Tech Stack: {tech}\n"
            f"URL: {proj.get('url', 'N/A')}\n\n"
            f"Highlights:\n{highlights}"
        )
        chunks.append({
            "chunk_id": f"proj_{idx}_{proj['name'].replace(' ', '_').lower()}",
            "text": text[:MAX_CHUNK_CHARS],
            "metadata": {
                "section_type": "projects",
                "project_name": proj["name"],
                "tech_stack": tech,
                "importance_weight": 0.85,
            },
        })
    return chunks


def chunk_education(education: list[dict]) -> list[dict]:
    """One chunk per degree."""
    chunks = []
    for idx, edu in enumerate(education):
        extras = "\n".join(f"• {a}" for a in edu.get("achievements", []))
        text = (
            f"Education: {edu['degree']} in {edu['field']}\n"
            f"Institution: {edu['institution']}\n"
            f"Graduated: {edu['graduation_year']}\n"
            f"GPA: {edu.get('gpa', 'N/A')}\n"
        )
        if extras:
            text += f"\nNotable: {extras}"
        chunks.append({
            "chunk_id": f"edu_{idx}",
            "text": text[:MAX_CHUNK_CHARS],
            "metadata": {
                "section_type": "education",
                "institution": edu["institution"],
                "importance_weight": 0.7,
            },
        })
    return chunks


def chunk_certifications(certs: list[dict]) -> list[dict]:
    """All certs in a single chunk — they're typically short."""
    text_lines = [f"• {c['name']} by {c['issuer']} ({c['year']})" for c in certs]
    text = "Certifications:\n" + "\n".join(text_lines)
    return [{
        "chunk_id": "certifications_0",
        "text": text[:MAX_CHUNK_CHARS],
        "metadata": {
            "section_type": "certifications",
            "importance_weight": 0.6,
        },
    }]


def chunk_open_source(contributions: list[dict]) -> list[dict]:
    """One chunk per open source contribution."""
    chunks = []
    for idx, contrib in enumerate(contributions):
        text = (
            f"Open Source: {contrib['project']}\n"
            f"URL: {contrib.get('url', 'N/A')}\n"
            f"Contributions: {contrib['contributions']}"
        )
        chunks.append({
            "chunk_id": f"oss_{idx}",
            "text": text[:MAX_CHUNK_CHARS],
            "metadata": {
                "section_type": "open_source",
                "project": contrib["project"],
                "importance_weight": 0.75,
            },
        })
    return chunks


def build_all_chunks(resume: dict) -> list[dict]:
    """Dispatch each section to its dedicated chunker."""
    chunks: list[dict] = []
    chunks.extend(chunk_personal(resume["personal"]))
    chunks.extend(chunk_skills(resume.get("skills", {})))
    chunks.extend(chunk_experience(resume.get("experience", [])))
    chunks.extend(chunk_projects(resume.get("projects", [])))
    chunks.extend(chunk_education(resume.get("education", [])))
    if resume.get("certifications"):
        chunks.extend(chunk_certifications(resume["certifications"]))
    if resume.get("open_source"):
        chunks.extend(chunk_open_source(resume["open_source"]))
    return chunks


# ─── Modal Ingestion Function ─────────────────────────────────────────────────

@app.function(
    image=image,
    volumes={CHROMA_MOUNT_PATH: chroma_volume},
    # Mount local resume_data.json into the container
    mounts=[
        modal.Mount.from_local_file(
            Path(__file__).parent / "resume_data.json",
            remote_path=RESUME_JSON_PATH,
        )
    ],
    timeout=300,
    # No keep_warm — runs manually, cost-sensitive
)
def ingest_resume(clear: bool = False) -> None:
    """
    Full ingestion pipeline: load → chunk → embed → upsert → commit.

    Args:
        clear: If True, clears the ChromaDB collection before ingesting.
               Use after major resume restructuring.
    """
    import chromadb
    from sentence_transformers import SentenceTransformer

    logging.basicConfig(level=logging.INFO)

    # ── Load resume ──────────────────────────────────────────────────────────
    with open(RESUME_JSON_PATH) as f:
        resume = json.load(f)
    version = resume.get("version", "unknown")
    print(f"✓ Loaded resume v{version}")

    # ── Chunk ────────────────────────────────────────────────────────────────
    chunks = build_all_chunks(resume)
    print(f"✓ Generated {len(chunks)} chunks")

    # ── Embed (batch for efficiency) ─────────────────────────────────────────
    model = SentenceTransformer(EMBEDDING_MODEL_NAME)
    texts = [c["text"] for c in chunks]
    embeddings = model.encode(texts, batch_size=32, normalize_embeddings=True, show_progress_bar=True)
    print(f"✓ Embedded {len(embeddings)} chunks")

    # ── ChromaDB upsert ──────────────────────────────────────────────────────
    client = chromadb.PersistentClient(path=CHROMA_MOUNT_PATH)

    if clear:
        try:
            client.delete_collection(CHROMA_COLLECTION_NAME)
            print("✓ Cleared existing collection")
        except Exception:
            pass

    collection = client.get_or_create_collection(
        name=CHROMA_COLLECTION_NAME,
        metadata={"hnsw:space": "cosine"},
    )

    # Upsert in batches of 100 (ChromaDB batch limit)
    batch_size = 100
    for i in range(0, len(chunks), batch_size):
        batch = chunks[i : i + batch_size]
        collection.upsert(
            ids=[c["chunk_id"] for c in batch],
            documents=[c["text"] for c in batch],
            embeddings=[embeddings[i + j].tolist() for j in range(len(batch))],
            metadatas=[c["metadata"] for c in batch],
        )

    print(f"✓ Upserted {len(chunks)} documents | Total in collection: {collection.count()}")

    # ── Commit Volume (required after writes!) ───────────────────────────────
    chroma_volume.commit()
    print("✓ Volume committed — ingestion complete!")


# ─── CLI Entrypoint ───────────────────────────────────────────────────────────

@app.local_entrypoint()
def main(clear: bool = False):
    """
    Usage:
      modal run ingest.py           # Upsert mode
      modal run ingest.py --clear   # Clear and re-ingest
    """
    ingest_resume.remote(clear=clear)
