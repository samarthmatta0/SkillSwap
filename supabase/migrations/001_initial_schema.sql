-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_verification_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE skill_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
CREATE TYPE session_status AS ENUM ('pending', 'active', 'completed', 'cancelled');
CREATE TYPE subscription_tier AS ENUM ('trial', 'basic', 'standard', 'pro');

-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    phone_number TEXT,
    avatar_url TEXT,
    bio TEXT,
    timezone TEXT DEFAULT 'UTC',
    verification_status user_verification_status DEFAULT 'pending',
    verification_submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    verification_verified_at TIMESTAMP WITH TIME ZONE,
    verification_rejected_reason TEXT,
    subscription_tier subscription_tier DEFAULT 'trial',
    subscription_start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    subscription_end_date TIMESTAMP WITH TIME ZONE,
    daily_requests_used INTEGER DEFAULT 0,
    daily_connections_used INTEGER DEFAULT 0,
    daily_speaking_time_used INTEGER DEFAULT 0,
    total_minutes_used INTEGER DEFAULT 0,
    boosters_available INTEGER DEFAULT 5,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create verification_documents table
CREATE TABLE public.verification_documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    document_type TEXT NOT NULL, -- 'id_card', 'passport', 'drivers_license'
    document_url TEXT NOT NULL,
    selfie_url TEXT,
    verification_status user_verification_status DEFAULT 'pending',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    verified_at TIMESTAMP WITH TIME ZONE,
    rejected_reason TEXT,
    metadata JSONB -- Store additional document metadata
);

-- Create skills table
CREATE TABLE public.skills (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    level skill_level NOT NULL,
    description TEXT,
    tags TEXT[],
    proof_url TEXT, -- URL to proof of skill (certificate, portfolio, etc.)
    is_verified BOOLEAN DEFAULT false,
    verified_at TIMESTAMP WITH TIME ZONE,
    verified_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create interests table
CREATE TABLE public.interests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    level skill_level NOT NULL,
    description TEXT,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sessions table
CREATE TABLE public.sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    skill_id UUID REFERENCES public.skills(id) ON DELETE SET NULL,
    status session_status DEFAULT 'pending',
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE,
    ended_at TIMESTAMP WITH TIME ZONE,
    duration_minutes INTEGER,
    student_speaking_time INTEGER DEFAULT 0,
    teacher_speaking_time INTEGER DEFAULT 0,
    notes TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create session_requests table
CREATE TABLE public.session_requests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    skill_id UUID REFERENCES public.skills(id) ON DELETE SET NULL,
    message TEXT,
    preferred_time TIMESTAMP WITH TIME ZONE,
    status session_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE public.subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    tier subscription_tier NOT NULL,
    status TEXT DEFAULT 'active', -- 'active', 'cancelled', 'expired'
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_date TIMESTAMP WITH TIME ZONE,
    payment_provider TEXT,
    payment_provider_id TEXT,
    amount DECIMAL(10,2),
    currency TEXT DEFAULT 'USD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_limits table for tracking daily usage
CREATE TABLE public.user_limits (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    daily_requests_used INTEGER DEFAULT 0,
    daily_connections_used INTEGER DEFAULT 0,
    daily_speaking_time_used INTEGER DEFAULT 0,
    total_minutes_used INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- Create RLS policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_limits ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Verification documents RLS policies
CREATE POLICY "Users can view their own verification documents" ON public.verification_documents
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own verification documents" ON public.verification_documents
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own verification documents" ON public.verification_documents
    FOR UPDATE USING (auth.uid() = user_id);

-- Skills RLS policies
CREATE POLICY "Users can view all skills" ON public.skills
    FOR SELECT USING (true);

CREATE POLICY "Users can manage their own skills" ON public.skills
    FOR ALL USING (auth.uid() = user_id);

-- Interests RLS policies
CREATE POLICY "Users can view all interests" ON public.interests
    FOR SELECT USING (true);

CREATE POLICY "Users can manage their own interests" ON public.interests
    FOR ALL USING (auth.uid() = user_id);

-- Sessions RLS policies
CREATE POLICY "Users can view sessions they're involved in" ON public.sessions
    FOR SELECT USING (auth.uid() = student_id OR auth.uid() = teacher_id);

CREATE POLICY "Users can create session requests" ON public.sessions
    FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Users can update sessions they're involved in" ON public.sessions
    FOR UPDATE USING (auth.uid() = student_id OR auth.uid() = teacher_id);

-- Session requests RLS policies
CREATE POLICY "Users can view session requests they're involved in" ON public.session_requests
    FOR SELECT USING (auth.uid() = student_id OR auth.uid() = teacher_id);

CREATE POLICY "Users can create session requests" ON public.session_requests
    FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Users can update session requests they're involved in" ON public.session_requests
    FOR UPDATE USING (auth.uid() = student_id OR auth.uid() = teacher_id);

-- Subscriptions RLS policies
CREATE POLICY "Users can view their own subscriptions" ON public.subscriptions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own subscriptions" ON public.subscriptions
    FOR ALL USING (auth.uid() = user_id);

-- User limits RLS policies
CREATE POLICY "Users can view their own limits" ON public.user_limits
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own limits" ON public.user_limits
    FOR ALL USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_verification_status ON public.profiles(verification_status);
CREATE INDEX idx_skills_user_id ON public.skills(user_id);
CREATE INDEX idx_skills_category ON public.skills(category);
CREATE INDEX idx_interests_user_id ON public.interests(user_id);
CREATE INDEX idx_sessions_student_id ON public.sessions(student_id);
CREATE INDEX idx_sessions_teacher_id ON public.sessions(teacher_id);
CREATE INDEX idx_sessions_status ON public.sessions(status);
CREATE INDEX idx_session_requests_student_id ON public.session_requests(student_id);
CREATE INDEX idx_session_requests_teacher_id ON public.session_requests(teacher_id);
CREATE INDEX idx_user_limits_user_date ON public.user_limits(user_id, date);

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON public.skills
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_interests_updated_at BEFORE UPDATE ON public.interests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON public.sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_session_requests_updated_at BEFORE UPDATE ON public.session_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_limits_updated_at BEFORE UPDATE ON public.user_limits
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, date_of_birth)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'date_of_birth', '1990-01-01')::DATE
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to reset daily limits
CREATE OR REPLACE FUNCTION public.reset_daily_limits()
RETURNS void AS $$
BEGIN
    -- Reset daily usage for all users
    UPDATE public.profiles 
    SET 
        daily_requests_used = 0,
        daily_connections_used = 0,
        daily_speaking_time_used = 0
    WHERE updated_at < CURRENT_DATE;
    
    -- Insert new daily limit records
    INSERT INTO public.user_limits (user_id, date)
    SELECT id, CURRENT_DATE
    FROM public.profiles
    WHERE id NOT IN (
        SELECT user_id FROM public.user_limits WHERE date = CURRENT_DATE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;
