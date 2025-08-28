@echo off
REM SkillSwap - Quick Setup Script (Windows)
REM This script automates the initial setup process on Windows

setlocal enabledelayedexpansion

REM Colors for output (PowerShell compatible)
set "RED=Red"
set "GREEN=Green"
set "YELLOW=Yellow"
set "BLUE=Blue"
set "NC=White"

echo %BLUE%🚀 SkillSwap - Quick Setup Script (Windows)%NC%
echo ================================================
echo.

REM Check prerequisites
echo %BLUE%Checking prerequisites...%NC%

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo %RED%❌ Node.js is not installed%NC%
    echo %YELLOW%Install with: winget install OpenJS.NodeJS%NC%
    pause
    exit /b 1
)

where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo %RED%❌ npm is not installed%NC%
    echo %YELLOW%Install with: winget install OpenJS.NodeJS%NC%
    pause
    exit /b 1
)

where supabase >nul 2>&1
if %errorlevel% neq 0 (
    echo %RED%❌ Supabase CLI is not installed%NC%
    echo %YELLOW%Install with: winget install Supabase.CLI%NC%
    pause
    exit /b 1
)

where docker >nul 2>&1
if %errorlevel% neq 0 (
    echo %RED%❌ Docker Desktop is not installed%NC%
    echo %YELLOW%Install with: winget install Docker.DockerDesktop%NC%
    pause
    exit /b 1
)

echo %GREEN%✅ All prerequisites are installed%NC%
echo.

REM Check if .env exists
if not exist .env (
    echo %YELLOW%Creating .env file from template...%NC%
    copy env.example .env
    echo %RED%⚠️  Please edit .env file with your Supabase credentials before continuing%NC%
    echo %YELLOW%Press Enter when ready...%NC%
    pause
) else (
    echo %GREEN%✅ .env file already exists%NC%
)

REM Install dependencies
echo %BLUE%Installing dependencies...%NC%
npm install
if %errorlevel% neq 0 (
    echo %RED%❌ Failed to install dependencies%NC%
    pause
    exit /b 1
)
echo %GREEN%✅ Dependencies installed%NC%

REM Initialize Supabase
echo %BLUE%Initializing Supabase...%NC%
supabase init
if %errorlevel% neq 0 (
    echo %RED%❌ Failed to initialize Supabase%NC%
    pause
    exit /b 1
)
echo %GREEN%✅ Supabase initialized%NC%

REM Start Supabase services
echo %BLUE%Starting Supabase services...%NC%
supabase start
if %errorlevel% neq 0 (
    echo %RED%❌ Failed to start Supabase services%NC%
    pause
    exit /b 1
)
echo %GREEN%✅ Supabase services started%NC%

REM Apply database migrations
echo %BLUE%Applying database migrations...%NC%
supabase db reset
if %errorlevel% neq 0 (
    echo %RED%❌ Failed to apply database migrations%NC%
    pause
    exit /b 1
)
echo %GREEN%✅ Database migrations applied%NC%

echo.
echo %GREEN%🎉 Setup complete!%NC%
echo.
echo %BLUE%Your services are running at:%NC%
echo   Frontend: http://localhost:3000
echo   Supabase API: http://localhost:54321
echo   Supabase Studio: http://localhost:54323
echo   Database: localhost:54322
echo.
echo %YELLOW%Next steps:%NC%
echo 1. Start the frontend: make -f Makefile.windows start
echo 2. Open http://localhost:3000 in your browser
echo 3. Test the signup/signin flow
echo.
echo %BLUE%Available commands:%NC%
echo   make -f Makefile.windows start     - Start all services
echo   make -f Makefile.windows stop      - Stop all services
echo   make -f Makefile.windows status    - Show service status
echo   make -f Makefile.windows help      - Show all available commands
echo.
pause
