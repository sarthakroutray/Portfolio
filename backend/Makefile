# Portfolio RAG Backend — Makefile
# Shortcuts for common Modal operations.
# Run: make <target>

.DEFAULT_GOAL := help
MODAL_FILE := api.py
INGEST_FILE := ingest.py

.PHONY: help deploy serve ingest ingest-clear logs test health

help: ## Show this help message
	@echo "Portfolio RAG Backend Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'
	@echo ""

deploy: ## Deploy to Modal (production) — builds image and bakes embedding model
	modal deploy $(MODAL_FILE)
	@echo ""
	@echo "✓ Deployed! Your endpoint URL is shown above."
	@echo "  Next step: run 'make ingest' to populate ChromaDB"

serve: ## Local dev server — hot reloads on file changes (not production)
	modal serve $(MODAL_FILE)

ingest: ## Run ingestion pipeline (upsert mode — safe to re-run)
	modal run $(INGEST_FILE)

ingest-clear: ## Clear ChromaDB collection and re-ingest from scratch
	modal run $(INGEST_FILE) -- --clear

logs: ## Tail live logs from deployed app
	modal app logs portfolio-rag

health: ## Check health endpoint (replace URL with your Modal URL)
	@read -p "Enter your Modal app URL: " URL; \
	curl -s "$$URL/api/health" | python3 -m json.tool

test-chat: ## Quick chat test (replace URL before running)
	@read -p "Enter your Modal app URL: " URL; \
	curl -N -X POST "$$URL/api/chat" \
		-H "Content-Type: application/json" \
		-d '{"message": "What technologies do you specialize in?", "session_id": "test-001"}' \
		--no-buffer

test-questions: ## Test suggested questions endpoint
	@read -p "Enter your Modal app URL: " URL; \
	curl -s "$$URL/api/suggested-questions" | python3 -m json.tool

volume-ls: ## List files in ChromaDB volume
	modal volume ls portfolio-chroma-db

volume-backup: ## Download ChromaDB volume to local backup
	mkdir -p ./backups
	modal volume get portfolio-chroma-db /data/chroma ./backups/chroma-$(shell date +%Y%m%d)
	@echo "✓ Backup saved to ./backups/"

test: ## Run unit tests
	cd .. && python -m pytest backend/tests/ -v

setup: ## First-time setup — install modal and authenticate
	pip install modal
	modal token new
	@echo ""
	@echo "Next steps:"
	@echo "  1. Go to https://modal.com/secrets → Create Secret named 'portfolio-secrets'"
	@echo "  2. Add key: GROQ_API_KEY=gsk_..."
	@echo "  3. Run: make deploy"
	@echo "  4. Run: make ingest"
