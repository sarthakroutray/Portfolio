"""
config.py — Single source of truth for all RAG system constants.
Tune these values to adjust retrieval quality, cost, and behavior.
"""

# ─── Modal Infrastructure ────────────────────────────────────────────────────
APP_NAME = "portfolio-rag"
VOLUME_NAME = "portfolio-chroma-db"
RATE_LIMIT_DICT_NAME = "rag-rate-limits"
MODAL_SECRET_NAME = "portfolio-secrets"
CHROMA_MOUNT_PATH = "/data/chroma"

# ─── Embedding Model ─────────────────────────────────────────────────────────
# all-MiniLM-L6-v2: 90MB, 384-dim, CPU-fast, no API key needed
EMBEDDING_MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
EMBEDDING_DIMENSION = 384

# ─── ChromaDB ────────────────────────────────────────────────────────────────
CHROMA_COLLECTION_NAME = "resume"
# Cosine distance threshold: 0 = identical, 2 = opposite.
# Reject chunks with distance > this (< ~65% similarity)
RETRIEVAL_DISTANCE_THRESHOLD = 0.35
# How many chunks to retrieve per query
RETRIEVAL_TOP_K = 5

# ─── Chunking Strategy ───────────────────────────────────────────────────────
# Max characters per chunk (roughly 150-300 tokens)
MAX_CHUNK_CHARS = 1200
# Context string fed to LLM (max ~2000 tokens)
MAX_CONTEXT_CHARS = 4000

# ─── Groq LLM ────────────────────────────────────────────────────────────────
# llama-3.1-8b-instant: fast, free, good for factual Q&A
GROQ_MODEL = "llama-3.1-8b-instant"
# Low temperature for factual, consistent resume answers
LLM_TEMPERATURE = 0.3
# ~400 words — enough for 2-4 paragraph responses
LLM_MAX_TOKENS = 512

# ─── Rate Limiting ───────────────────────────────────────────────────────────
RATE_LIMIT_REQUESTS_PER_MINUTE = 10
RATE_LIMIT_REQUESTS_PER_DAY = 100

# ─── API ─────────────────────────────────────────────────────────────────────
MAX_QUERY_LENGTH = 500
# Allowed origins for CORS (add your Vercel domain)
CORS_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://*.vercel.app",
]

# ─── System Prompt ───────────────────────────────────────────────────────────
# Customize with your name and email
PORTFOLIO_OWNER_NAME = "Sarthak"
PORTFOLIO_OWNER_EMAIL = "contact@sarthak.dev"

SYSTEM_PROMPT = f"""You are a professional portfolio assistant for {PORTFOLIO_OWNER_NAME}, a software engineer.
Your job is to answer questions about their background, skills, experience, and projects.

CRITICAL RULES:
1. Answer based ONLY on the provided context. Never invent experience, skills, or dates.
2. Speak in first person as {PORTFOLIO_OWNER_NAME} (say "I" not "they").
3. If the context doesn't contain a clear answer, say: "I don't have that specific detail here — feel free to reach out at {PORTFOLIO_OWNER_EMAIL}"
4. Keep responses concise: 2-4 sentences unless the user explicitly asks for detail.
5. Be professional but warm and conversational — this is a portfolio, not a job application form.
6. For contact or collaboration requests, direct to {PORTFOLIO_OWNER_EMAIL}."""

QUERY_PROMPT_TEMPLATE = """Context from resume:
{context}

Question: {query}

Answer based only on the context above (in first person as {name}):"""

# ─── Suggested Questions ─────────────────────────────────────────────────────
SUGGESTED_QUESTIONS = [
    "What technologies and frameworks do you specialize in?",
    "Tell me about your most impactful project.",
    "What kind of roles are you looking for?",
    "What's your experience with backend systems?",
    "Do you have experience with AI or machine learning?",
    "How can I get in touch with you?",
]
