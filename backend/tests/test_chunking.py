"""
tests/test_chunking.py — Unit tests for the resume chunking logic.

These tests run locally (no Modal needed) — they import ingest.py directly.
Run: python -m pytest backend/tests/ -v
"""
import sys
from pathlib import Path

# Allow imports from parent directory
sys.path.insert(0, str(Path(__file__).parent.parent))

import json
import pytest
from ingest import (
    build_all_chunks,
    chunk_experience,
    chunk_personal,
    chunk_projects,
    chunk_skills,
)


@pytest.fixture
def sample_resume():
    resume_path = Path(__file__).parent.parent / "resume_data.json"
    with open(resume_path) as f:
        return json.load(f)


class TestChunkPersonal:
    def test_produces_single_chunk(self, sample_resume):
        chunks = chunk_personal(sample_resume["personal"])
        assert len(chunks) == 1

    def test_chunk_contains_name(self, sample_resume):
        chunks = chunk_personal(sample_resume["personal"])
        assert sample_resume["personal"]["name"] in chunks[0]["text"]

    def test_chunk_has_required_metadata(self, sample_resume):
        chunks = chunk_personal(sample_resume["personal"])
        meta = chunks[0]["metadata"]
        assert meta["section_type"] == "personal"
        assert "importance_weight" in meta

    def test_chunk_respects_max_size(self, sample_resume):
        from config import MAX_CHUNK_CHARS
        chunks = chunk_personal(sample_resume["personal"])
        for chunk in chunks:
            assert len(chunk["text"]) <= MAX_CHUNK_CHARS


class TestChunkExperience:
    def test_one_chunk_per_job(self, sample_resume):
        jobs = sample_resume["experience"]
        chunks = chunk_experience(jobs)
        assert len(chunks) == len(jobs)

    def test_chunk_contains_company(self, sample_resume):
        jobs = sample_resume["experience"]
        chunks = chunk_experience(jobs)
        for i, chunk in enumerate(chunks):
            assert jobs[i]["company"] in chunk["text"]

    def test_metadata_has_company(self, sample_resume):
        chunks = chunk_experience(sample_resume["experience"])
        for chunk in chunks:
            assert "company" in chunk["metadata"]
            assert "date_range" in chunk["metadata"]

    def test_chunk_ids_are_unique(self, sample_resume):
        chunks = chunk_experience(sample_resume["experience"])
        ids = [c["chunk_id"] for c in chunks]
        assert len(ids) == len(set(ids))


class TestChunkSkills:
    def test_one_chunk_per_category(self, sample_resume):
        skills = sample_resume["skills"]
        chunks = chunk_skills(skills)
        assert len(chunks) == len(skills)

    def test_skill_in_chunk_text(self, sample_resume):
        chunks = chunk_skills(sample_resume["skills"])
        # At least one chunk should mention Python
        skill_texts = " ".join(c["text"] for c in chunks)
        assert "Python" in skill_texts


class TestBuildAllChunks:
    def test_produces_chunks(self, sample_resume):
        chunks = build_all_chunks(sample_resume)
        assert len(chunks) > 0

    def test_all_chunks_have_required_fields(self, sample_resume):
        chunks = build_all_chunks(sample_resume)
        for chunk in chunks:
            assert "chunk_id" in chunk
            assert "text" in chunk
            assert "metadata" in chunk
            assert len(chunk["text"]) > 0

    def test_chunk_ids_are_globally_unique(self, sample_resume):
        chunks = build_all_chunks(sample_resume)
        ids = [c["chunk_id"] for c in chunks]
        assert len(ids) == len(set(ids)), "Duplicate chunk IDs found!"

    def test_no_empty_text(self, sample_resume):
        chunks = build_all_chunks(sample_resume)
        for chunk in chunks:
            assert chunk["text"].strip(), f"Empty text in chunk {chunk['chunk_id']}"
