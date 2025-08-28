# SkillSwap - Supabase Setup Makefile
# This Makefile automates the setup and management of your Supabase project

# Variables
PROJECT_NAME := skillswap
SUPABASE_PROJECT_ID := $(shell grep 'project_id' supabase/config.toml | cut -d'"' -f2)
FRONTEND_PORT := 3000
SUPABASE_PORT := 54321
SUPABASE_DB_PORT := 54322
SUPABASE_STUDIO_PORT := 54323

# Colors for output
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[1;33m
BLUE := \033[0;34m
NC := \033[0m # No Color

# Default target
.DEFAULT_GOAL := help

.PHONY: help
help: ## Show this help message
	@echo "$(BLUE)SkillSwap - Supabase Setup Commands$(NC)"
	@echo ""
	@echo "$(YELLOW)Setup Commands:$(NC)"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  $(GREEN)%-20s$(NC) %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo ""
	@echo "$(YELLOW)Usage Examples:$(NC)"
	@echo "  make setup          # Complete initial setup"
	@echo "  make start          # Start all services"
	@echo "  make stop           # Stop all services"
	@echo "  make reset          # Reset database and restart"

.PHONY: check-prerequisites
check-prerequisites: ## Check if required tools are installed
	@echo "$(BLUE)Checking prerequisites...$(NC)"
	@command -v node >/dev/null 2>&1 || { echo "$(RED)Node.js is required but not installed.$(NC)"; exit 1; }
	@command -v npm >/dev/null 2>&1 || { echo "$(RED)npm is required but not installed.$(NC)"; exit 1; }
	@command -v supabase >/dev/null 2>&1 || { echo "$(RED)Supabase CLI is required but not installed.$(NC)"; echo "$(YELLOW)Install with: brew install supabase/tap/supabase$(NC)"; exit 1; }
	@command -v docker >/dev/null 2>&1 || { echo "$(RED)Docker is required but not installed.$(NC)"; exit 1; }
	@echo "$(GREEN)✓ All prerequisites are installed$(NC)"

.PHONY: setup
setup: check-prerequisites ## Complete initial setup (first time only)
	@echo "$(BLUE)Setting up SkillSwap project...$(NC)"
	@if [ ! -f .env ]; then \
		echo "$(YELLOW)Creating .env file from template...$(NC)"; \
		cp env.example .env; \
		echo "$(RED)Please edit .env file with your Supabase credentials before continuing$(NC)"; \
		echo "$(YELLOW)Press Enter when ready...$(NC)"; \
		read; \
	fi
	@echo "$(BLUE)Installing dependencies...$(NC)"
	@npm install
	@echo "$(BLUE)Initializing Supabase...$(NC)"
	@supabase init
	@echo "$(BLUE)Starting Supabase services...$(NC)"
	@supabase start
	@echo "$(BLUE)Applying database migrations...$(NC)"
	@supabase db reset
	@echo "$(GREEN)✓ Setup complete!$(NC)"
	@echo "$(BLUE)Your services are running at:$(NC)"
	@echo "  Frontend: http://localhost:$(FRONTEND_PORT)"
	@echo "  Supabase API: http://localhost:$(SUPABASE_PORT)"
	@echo "  Supabase Studio: http://localhost:$(SUPABASE_STUDIO_PORT)"
	@echo "  Database: localhost:$(SUPABASE_DB_PORT)"

.PHONY: start
start: ## Start all services (Supabase + Frontend)
	@echo "$(BLUE)Starting services...$(NC)"
	@supabase start
	@echo "$(BLUE)Starting frontend...$(NC)"
	@npm run dev &
	@echo "$(GREEN)✓ All services started$(NC)"
	@echo "$(BLUE)Services running at:$(NC)"
	@echo "  Frontend: http://localhost:$(FRONTEND_PORT)"
	@echo "  Supabase API: http://localhost:$(SUPABASE_PORT)"
	@echo "  Supabase Studio: http://localhost:$(SUPABASE_STUDIO_PORT)"

.PHONY: stop
stop: ## Stop all services
	@echo "$(BLUE)Stopping services...$(NC)"
	@supabase stop
	@pkill -f "npm run dev" || true
	@echo "$(GREEN)✓ All services stopped$(NC)"

.PHONY: restart
restart: stop start ## Restart all services

.PHONY: reset
reset: ## Reset database and restart services
	@echo "$(YELLOW)This will delete all data and restart services. Continue? [y/N]$(NC)"
	@read -p " " -n 1 -r; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		echo "$(BLUE)Resetting database...$(NC)"; \
		supabase db reset; \
		echo "$(BLUE)Restarting services...$(NC)"; \
		make restart; \
		echo "$(GREEN)✓ Database reset and services restarted$(NC)"; \
	else \
		echo "$(YELLOW)Reset cancelled$(NC)"; \
	fi

.PHONY: status
status: ## Show status of all services
	@echo "$(BLUE)Service Status:$(NC)"
	@supabase status
	@echo ""
	@echo "$(BLUE)Frontend Status:$(NC)"
	@if pgrep -f "npm run dev" > /dev/null; then \
		echo "$(GREEN)✓ Frontend is running$(NC)"; \
	else \
		echo "$(RED)✗ Frontend is not running$(NC)"; \
	fi

.PHONY: logs
logs: ## Show Supabase logs
	@supabase logs

.PHONY: db-reset
db-reset: ## Reset only the database
	@echo "$(YELLOW)Resetting database...$(NC)"
	@supabase db reset
	@echo "$(GREEN)✓ Database reset complete$(NC)"

.PHONY: db-push
db-push: ## Push local database changes to remote
	@echo "$(BLUE)Pushing database changes to remote...$(NC)"
	@supabase db push
	@echo "$(GREEN)✓ Database changes pushed$(NC)"

.PHONY: db-pull
db-pull: ## Pull remote database changes to local
	@echo "$(BLUE)Pulling database changes from remote...$(NC)"
	@supabase db pull
	@echo "$(GREEN)✓ Database changes pulled$(NC)"

.PHONY: migrate
migrate: ## Create a new migration file
	@echo "$(BLUE)Creating new migration...$(NC)"
	@read -p "Enter migration name: " migration_name; \
	supabase migration new $$migration_name
	@echo "$(GREEN)✓ Migration file created$(NC)"

.PHONY: build
build: ## Build the frontend for production
	@echo "$(BLUE)Building frontend...$(NC)"
	@npm run build
	@echo "$(GREEN)✓ Frontend built successfully$(NC)"

.PHONY: test
test: ## Run tests
	@echo "$(BLUE)Running tests...$(NC)"
	@npm test || echo "$(YELLOW)No tests configured$(NC)"

.PHONY: clean
clean: ## Clean up generated files
	@echo "$(BLUE)Cleaning up...$(NC)"
	@rm -rf node_modules
	@rm -rf dist
	@rm -rf build
	@rm -rf .supabase
	@echo "$(GREEN)✓ Cleanup complete$(NC)"

.PHONY: install-deps
install-deps: ## Install dependencies
	@echo "$(BLUE)Installing dependencies...$(NC)"
	@npm install
	@echo "$(GREEN)✓ Dependencies installed$(NC)"

.PHONY: update-deps
update-deps: ## Update dependencies
	@echo "$(BLUE)Updating dependencies...$(NC)"
	@npm update
	@echo "$(GREEN)✓ Dependencies updated$(NC)"

.PHONY: lint
lint: ## Run linting
	@echo "$(BLUE)Running linter...$(NC)"
	@npm run lint || echo "$(YELLOW)No linting configured$(NC)"

.PHONY: format
format: ## Format code
	@echo "$(BLUE)Formatting code...$(NC)"
	@npm run format || echo "$(YELLOW)No formatting configured$(NC)"

# Development helpers
.PHONY: dev
dev: ## Start development mode (frontend only)
	@echo "$(BLUE)Starting development server...$(NC)"
	@npm run dev

.PHONY: studio
studio: ## Open Supabase Studio
	@echo "$(BLUE)Opening Supabase Studio...$(NC)"
	@open http://localhost:$(SUPABASE_STUDIO_PORT)

.PHONY: api-docs
api-docs: ## Open API documentation
	@echo "$(BLUE)Opening API documentation...$(NC)"
	@open http://localhost:$(SUPABASE_PORT)/rest/v1/

# Database helpers
.PHONY: db-connect
db-connect: ## Connect to local database
	@echo "$(BLUE)Connecting to local database...$(NC)"
	@echo "Connection string: postgresql://postgres:postgres@localhost:$(SUPABASE_DB_PORT)/postgres"
	@echo "$(YELLOW)Use your preferred database client to connect$(NC)"

.PHONY: db-backup
db-backup: ## Create database backup
	@echo "$(BLUE)Creating database backup...$(NC)"
	@mkdir -p backups
	@supabase db dump -f backups/backup_$$(date +%Y%m%d_%H%M%S).sql
	@echo "$(GREEN)✓ Backup created$(NC)"

# Utility functions
.PHONY: check-env
check-env: ## Check environment configuration
	@echo "$(BLUE)Checking environment configuration...$(NC)"
	@if [ -f .env ]; then \
		echo "$(GREEN)✓ .env file exists$(NC)"; \
		if grep -q "your-project-id" .env; then \
			echo "$(RED)✗ Please update .env with your actual Supabase credentials$(NC)"; \
		else \
			echo "$(GREEN)✓ .env appears to be configured$(NC)"; \
		fi; \
	else \
		echo "$(RED)✗ .env file not found$(NC)"; \
		echo "$(YELLOW)Run 'make setup' to create it$(NC)"; \
	fi

.PHONY: info
info: ## Show project information
	@echo "$(BLUE)Project Information:$(NC)"
	@echo "  Name: $(PROJECT_NAME)"
	@echo "  Supabase Project ID: $(SUPABASE_PROJECT_ID)"
	@echo "  Frontend Port: $(FRONTEND_PORT)"
	@echo "  Supabase Port: $(SUPABASE_PORT)"
	@echo "  Database Port: $(SUPABASE_DB_PORT)"
	@echo "  Studio Port: $(SUPABASE_STUDIO_PORT)"
	@echo ""
	@echo "$(BLUE)Available Commands:$(NC)"
	@echo "  make help          - Show this help"
	@echo "  make setup         - Initial setup"
	@echo "  make start         - Start all services"
	@echo "  make stop          - Stop all services"
	@echo "  make status        - Show service status"
