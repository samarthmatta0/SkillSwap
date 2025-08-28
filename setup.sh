#!/bin/bash

# SkillSwap - Quick Setup Script
# This script automates the initial setup process

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 SkillSwap - Quick Setup Script${NC}"
echo "=================================="
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo -e "${BLUE}Checking prerequisites...${NC}"

if ! command_exists node; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo -e "${YELLOW}Install with: brew install node${NC}"
    exit 1
fi

if ! command_exists npm; then
    echo -e "${RED}❌ npm is not installed${NC}"
    echo -e "${YELLOW}Install with: brew install node${NC}"
    exit 1
fi

if ! command_exists supabase; then
    echo -e "${RED}❌ Supabase CLI is not installed${NC}"
    echo -e "${YELLOW}Install with: brew install supabase/tap/supabase${NC}"
    exit 1
fi

if ! command_exists docker; then
    echo -e "${RED}❌ Docker is not installed${NC}"
    echo -e "${YELLOW}Install with: brew install --cask docker${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All prerequisites are installed${NC}"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file from template...${NC}"
    cp env.example .env
    echo -e "${RED}⚠️  Please edit .env file with your Supabase credentials before continuing${NC}"
    echo -e "${YELLOW}Press Enter when ready...${NC}"
    read -r
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

# Install dependencies
echo -e "${BLUE}Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Initialize Supabase
echo -e "${BLUE}Initializing Supabase...${NC}"
supabase init
echo -e "${GREEN}✅ Supabase initialized${NC}"

# Start Supabase services
echo -e "${BLUE}Starting Supabase services...${NC}"
supabase start
echo -e "${GREEN}✅ Supabase services started${NC}"

# Apply database migrations
echo -e "${BLUE}Applying database migrations...${NC}"
supabase db reset
echo -e "${GREEN}✅ Database migrations applied${NC}"

echo ""
echo -e "${GREEN}🎉 Setup complete!${NC}"
echo ""
echo -e "${BLUE}Your services are running at:${NC}"
echo "  Frontend: http://localhost:3000"
echo "  Supabase API: http://localhost:54321"
echo "  Supabase Studio: http://localhost:54323"
echo "  Database: localhost:54322"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Start the frontend: make start"
echo "2. Open http://localhost:3000 in your browser"
echo "3. Test the signup/signin flow"
echo ""
echo -e "${BLUE}Available commands:${NC}"
echo "  make start     - Start all services"
echo "  make stop      - Stop all services"
echo "  make status    - Show service status"
echo "  make help      - Show all available commands"
