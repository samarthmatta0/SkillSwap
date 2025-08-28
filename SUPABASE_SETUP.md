# SkillSwap - Supabase Authentication Setup Guide

This guide will walk you through setting up Supabase authentication for your SkillSwap project using the provided Makefiles and configuration files.

## 🚀 **Quick Start (Recommended)**

### 1. **Prerequisites Installation**

Before you begin, ensure you have the following tools installed:

#### **On macOS/Linux:**
```bash
# Install Node.js and npm
brew install node

# Install Supabase CLI
brew install supabase/tap/supabase

# Install Docker Desktop
brew install --cask docker
```

#### **On Windows:**
```powershell
# Install Node.js and npm
winget install OpenJS.NodeJS

# Install Supabase CLI
winget install Supabase.CLI

# Install Docker Desktop
winget install Docker.DockerDesktop
```

### 2. **One-Command Setup**

```bash
# On macOS/Linux
make setup

# On Windows
make -f Makefile.windows setup
```

This will:
- ✅ Check prerequisites
- ✅ Create `.env` file from template
- ✅ Install dependencies
- ✅ Initialize Supabase
- ✅ Start all services
- ✅ Apply database schema

## 📋 **Manual Setup (Alternative)**

If you prefer to set up manually or encounter issues with the automated setup:

### 1. **Create Environment File**

Copy the example environment file and fill in your Supabase credentials:

```bash
cp env.example .env
```

Edit `.env` with your actual values:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
VITE_FRONTEND_URL=http://localhost:3000
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Initialize Supabase**

```bash
supabase init
```

### 4. **Start Supabase Services**

```bash
supabase start
```

### 5. **Apply Database Schema**

```bash
supabase db reset
```

## 🔧 **Supabase Project Setup**

### 1. **Create Supabase Project**

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `skillswap` (or your preferred name)
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
6. Click "Create new project"

### 2. **Get Project Credentials**

Once your project is created:

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** → `VITE_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

### 3. **Configure Authentication**

1. Go to **Authentication** → **Settings**
2. Set **Site URL** to: `http://localhost:3000`
3. Add **Redirect URLs**:
   - `http://localhost:3000`
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/login`
   - `http://localhost:3000/signup`

### 4. **Enable Email Auth**

1. Go to **Authentication** → **Providers**
2. Ensure **Email** is enabled
3. Configure email templates if desired

## 🗄️ **Database Schema**

The setup includes a comprehensive database schema with the following tables:

### **Core Tables:**
- `profiles` - User profiles and subscription info
- `verification_documents` - ID verification and selfies
- `skills` - Skills users can teach
- `interests` - Skills users want to learn
- `sessions` - Skill exchange sessions
- `session_requests` - Session booking requests
- `subscriptions` - User subscription management
- `user_limits` - Daily usage tracking

### **Key Features:**
- ✅ Row Level Security (RLS) policies
- ✅ Automatic timestamp updates
- ✅ User verification workflow
- ✅ Subscription tier management
- ✅ Daily usage limits
- ✅ Session tracking

## 🚀 **Available Make Commands**

### **Basic Operations:**
```bash
make start          # Start all services
make stop           # Stop all services
make restart        # Restart all services
make status         # Show service status
```

### **Database Operations:**
```bash
make db-reset       # Reset database
make db-push        # Push local changes to remote
make db-pull        # Pull remote changes to local
make migrate        # Create new migration
```

### **Development Helpers:**
```bash
make dev            # Start frontend only
make studio         # Open Supabase Studio
make api-docs       # Open API documentation
make build          # Build for production
```

### **Utility Commands:**
```bash
make check-env      # Check environment configuration
make info           # Show project information
make logs           # Show Supabase logs
make backup         # Create database backup
```

## 🔐 **Authentication Flow**

### **Sign Up Process:**
1. User fills out signup form (name, email, password, DOB)
2. Supabase creates auth user
3. Trigger creates profile record
4. User completes verification (ID + selfie)
5. Admin approves verification
6. User can book sessions

### **Sign In Process:**
1. User enters email/password
2. Supabase authenticates user
3. Frontend receives session token
4. User profile loaded from database
5. Redirect to dashboard

### **Password Reset:**
1. User requests password reset
2. Supabase sends reset email
3. User clicks reset link
4. User sets new password
5. User can sign in

## 🛡️ **Security Features**

### **Row Level Security (RLS):**
- Users can only access their own data
- Public read access for skills and interests
- Protected access for sessions and requests

### **User Verification:**
- Government ID upload required
- Selfie verification
- Admin approval workflow
- Verification status tracking

### **Session Safety:**
- Panic button for instant session termination
- Session recording (with consent)
- Behavior monitoring
- 24/7 support access

## 🧪 **Testing the Setup**

### 1. **Start Services**
```bash
make start
```

### 2. **Open Frontend**
Navigate to: http://localhost:3000

### 3. **Test Sign Up**
1. Click "Sign Up"
2. Fill out the form
3. Submit and check database

### 4. **Test Sign In**
1. Use created credentials
2. Verify redirect to dashboard
3. Check session persistence

### 5. **Verify Database**
1. Open Supabase Studio: http://localhost:54323
2. Check `profiles` table
3. Verify RLS policies

## 🚨 **Troubleshooting**

### **Common Issues:**

#### **Supabase Won't Start:**
```bash
# Check Docker status
docker ps

# Restart Docker Desktop
# Then try again
make start
```

#### **Database Connection Issues:**
```bash
# Check Supabase status
make status

# Reset database
make db-reset
```

#### **Frontend Won't Connect:**
1. Verify `.env` file exists
2. Check Supabase credentials
3. Ensure services are running
4. Check browser console for errors

#### **Port Conflicts:**
If ports are already in use:
1. Stop conflicting services
2. Or modify `supabase/config.toml`
3. Update port numbers

### **Reset Everything:**
```bash
make clean          # Remove all generated files
make setup          # Start fresh setup
```

## 📚 **Additional Resources**

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Authentication Best Practices](https://supabase.com/docs/guides/auth/auth-best-practices)

## 🆘 **Getting Help**

If you encounter issues:

1. Check the troubleshooting section above
2. Review Supabase logs: `make logs`
3. Check service status: `make status`
4. Verify environment configuration: `make check-env`
5. Check the [Supabase Community](https://github.com/supabase/supabase/discussions)

---

**Happy coding! 🚀**

Your SkillSwap project is now set up with enterprise-grade authentication, comprehensive user management, and a robust database schema ready for production use.
