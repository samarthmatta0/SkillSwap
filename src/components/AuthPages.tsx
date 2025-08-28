import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle, Loader2, Upload } from 'lucide-react';
import { createClient } from '@supabase/supabase-js'
import { skillSwapAPI, handleAPIError } from '../utils/api'
import { projectId, publicAnonKey } from '../utils/supabase/info'
import { LogoLink } from './ui/logo';

// Initialize Supabase client for auth
const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey,
  {
    auth: {
      persistSession: true,
      storageKey: 'skillswap-auth',
      storage: window.localStorage
    }
  }
)

interface AuthPagesProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogin: (userData: any) => void;
}

export default function AuthPages({ currentPage, onNavigate, onLogin }: AuthPagesProps) {
  // Sign up form state
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // Forgot password form state
  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: ''
  });

  // Onboarding state
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState({
    id: false,
    selfie: false
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle sign up
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Validation
      if (!signupForm.name || !signupForm.email || !signupForm.password || !signupForm.dateOfBirth) {
        throw new Error('Please fill in all required fields');
      }

      if (signupForm.password !== signupForm.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (signupForm.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      if (!signupForm.agreeToTerms || !signupForm.agreeToPrivacy) {
        throw new Error('Please agree to the Terms of Service and Privacy Policy');
      }

      // Age verification
      const birthDate = new Date(signupForm.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 18) {
        throw new Error('You must be 18 or older to join SkillSwap');
      }

      // First, test server connectivity
      console.log('Testing server connectivity...');
      try {
        const healthCheck = await skillSwapAPI.healthCheck();
        console.log('Server health check passed:', healthCheck);
      } catch (healthError) {
        console.error('Server health check failed:', healthError);
        throw new Error('Unable to connect to SkillSwap servers. Please try again in a moment.');
      }

      // Call backend signup
      console.log('Attempting signup...');
      const result = await skillSwapAPI.signup({
        email: signupForm.email,
        password: signupForm.password,
        name: signupForm.name,
        dateOfBirth: signupForm.dateOfBirth
      });

      console.log('Signup result:', result);

      if (result.success) {
        setSuccess('Account created successfully! You can now sign in.');
        // Switch to login tab after successful signup
        setTimeout(() => {
          if (currentPage === 'signup') {
            onNavigate('login');
          }
        }, 2000);
      }

    } catch (error) {
      console.error('Signup error details:', error);
      setError(handleAPIError(error, 'Failed to create account. Please check your connection and try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sign in
  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (!loginForm.email || !loginForm.password) {
        throw new Error('Please enter both email and password');
      }

      console.log('Attempting to sign in with:', loginForm.email);

      // Sign in with Supabase
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });

      if (error) {
        console.error('Supabase auth error:', error);
        throw new Error(error.message);
      }

      if (session?.access_token) {
        console.log('Successfully authenticated with Supabase');
        
        // Set the token for API calls
        skillSwapAPI.setAccessToken(session.access_token);
        
        // Get user profile from backend
        try {
          console.log('Fetching user profile from backend...');
          const profileData = await skillSwapAPI.getProfile();
          console.log('Profile data received:', profileData);
          
          // Call onLogin with user data
          onLogin({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata.name,
            accessToken: session.access_token,
            profile: profileData.profile
          });

          setSuccess('Successfully signed in!');
        } catch (profileError) {
          console.error('Profile fetch error:', profileError);
          // Still log in even if profile fetch fails
          onLogin({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata.name,
            accessToken: session.access_token
          });
          setSuccess('Successfully signed in!');
        }
      } else {
        throw new Error('No session token received');
      }

    } catch (error) {
      console.error('Sign in error:', error);
      setError(handleAPIError(error, 'Failed to sign in'));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle forgot password
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (!forgotPasswordForm.email) {
        throw new Error('Please enter your email address');
      }

      const { error } = await supabase.auth.resetPasswordForEmail(forgotPasswordForm.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw new Error(error.message);
      }

      setSuccess('Password reset email sent! Check your inbox.');
      
    } catch (error) {
      setError(handleAPIError(error, 'Failed to send password reset email'));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle social login placeholder
  const handleSocialLogin = (provider: string) => {
    alert(`${provider} login would be implemented here. For demo, create an account or use the demo below.`);
  };

  // Mock file upload for demo
  const handleFileUpload = (type: 'id' | 'selfie') => {
    setUploadedFiles(prev => ({ ...prev, [type]: true }));
  };

  if (currentPage === 'login') {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-2 text-center">
            <div className="flex items-center justify-center mb-4 relative">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('landing')} 
                className="absolute left-0 top-0"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-3">
                <LogoLink onNavigate={onNavigate} size="sm" />
                <span className="text-2xl font-bold text-skillswap-primary">SkillSwap</span>
              </div>
            </div>
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <p className="text-muted-foreground">Sign in to your account</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Demo Account Info */}
            <Alert className="bg-skillswap-primary/10 border-skillswap-primary/30">
              <AlertCircle className="h-4 w-4 text-skillswap-primary" />
              <AlertDescription className="text-skillswap-primary">
                <div className="space-y-2">
                  <div><strong>Demo:</strong> Create an account to test the full backend integration</div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      setIsLoading(true);
                      setError('');
                      try {
                        // Create demo account
                        const demoEmail = `demo_${Date.now()}@skillswap.demo`;
                        const demoPassword = 'demo123456';
                        const demoName = 'Demo User';
                        const demoDOB = '1990-01-01';

                        console.log('Creating demo account:', demoEmail);
                        const result = await skillSwapAPI.signup({
                          email: demoEmail,
                          password: demoPassword,
                          name: demoName,
                          dateOfBirth: demoDOB
                        });

                        if (result.success) {
                          // Auto-fill login form
                          setLoginForm({
                            email: demoEmail,
                            password: demoPassword,
                            rememberMe: false
                          });
                          setSuccess('Demo account created! Click Sign In to continue.');
                        }
                      } catch (error) {
                        console.error('Demo account creation failed:', error);
                        setError('Demo mode temporarily unavailable. Please create a real account.');
                      } finally {
                        setIsLoading(false);
                      }
                    }}
                    className="text-xs"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Demo...' : 'Create Demo Account'}
                  </Button>
                </div>
              </AlertDescription>
            </Alert>

            {/* Error/Success Messages */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error}
                  {error.includes('Unable to connect') && (
                    <div className="mt-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setError('');
                          // Demo mode - simulate successful signup
                          setSuccess('Demo account created! You can now explore the platform.');
                          setTimeout(() => onNavigate('login'), 2000);
                        }}
                      >
                        Continue in Demo Mode
                      </Button>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-skillswap-success/10 border-skillswap-success/20">
                <CheckCircle className="h-4 w-4 text-skillswap-success" />
                <AlertDescription className="text-skillswap-success">{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSignin} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 pr-10"
                    disabled={isLoading}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={loginForm.rememberMe}
                    onCheckedChange={(checked) => setLoginForm(prev => ({ ...prev, rememberMe: !!checked }))}
                    disabled={isLoading}
                  />
                  <Label htmlFor="remember-me" className="text-sm">Remember me</Label>
                </div>
                <Button 
                  type="button"
                  variant="link" 
                  className="p-0 text-sm" 
                  onClick={() => onNavigate('forgot-password')}
                  disabled={isLoading}
                >
                  Forgot password?
                </Button>
              </div>

              {/* Sign In Button */}
              <Button 
                type="submit"
                className="w-full skillswap-gradient text-white" 
                disabled={isLoading || !loginForm.email || !loginForm.password}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => handleSocialLogin('Google')}
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin('LinkedIn')}
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-2" fill="#0A66C2" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Button 
                type="button"
                variant="link" 
                className="p-0" 
                onClick={() => onNavigate('signup')}
                disabled={isLoading}
              >
                Sign up
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentPage === 'signup') {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-2 text-center">
            <div className="flex items-center justify-center mb-4 relative">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('landing')} 
                className="absolute left-0 top-0"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-3">
                <LogoLink onNavigate={onNavigate} size="sm" />
                <span className="text-2xl font-bold text-skillswap-primary">SkillSwap</span>
              </div>
            </div>
            <CardTitle className="text-xl">Create your account</CardTitle>
            <p className="text-muted-foreground">Start your free trial today</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Error/Success Messages */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-skillswap-success/10 border-skillswap-success/20">
                <CheckCircle className="h-4 w-4 text-skillswap-success" />
                <AlertDescription className="text-skillswap-success">{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={signupForm.name}
                  onChange={(e) => setSignupForm(prev => ({ ...prev, name: e.target.value }))}
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <Label htmlFor="signup-dob">Date of Birth</Label>
                <Input
                  id="signup-dob"
                  type="date"
                  value={signupForm.dateOfBirth}
                  onChange={(e) => setSignupForm(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  disabled={isLoading}
                  required
                />
                <p className="text-xs text-muted-foreground">You must be 18 or older to join SkillSwap</p>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 pr-10"
                    disabled={isLoading}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="signup-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={signupForm.confirmPassword}
                    onChange={(e) => setSignupForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="pl-10 pr-10"
                    disabled={isLoading}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Terms and Privacy Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={signupForm.agreeToTerms}
                    onCheckedChange={(checked) => setSignupForm(prev => ({ ...prev, agreeToTerms: !!checked }))}
                    disabled={isLoading}
                    className="mt-0.5"
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the{' '}
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto text-skillswap-primary underline"
                      onClick={() => onNavigate('terms')}
                    >
                      Terms of Service
                    </Button>
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="privacy"
                    checked={signupForm.agreeToPrivacy}
                    onCheckedChange={(checked) => setSignupForm(prev => ({ ...prev, agreeToPrivacy: !!checked }))}
                    disabled={isLoading}
                    className="mt-0.5"
                  />
                  <Label htmlFor="privacy" className="text-sm leading-relaxed">
                    I agree to the{' '}
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto text-skillswap-primary underline"
                      onClick={() => onNavigate('privacy')}
                    >
                      Privacy Policy
                    </Button>
                  </Label>
                </div>
              </div>

              {/* Sign Up Button */}
              <Button 
                type="submit"
                className="w-full skillswap-gradient text-white" 
                disabled={isLoading || !signupForm.agreeToTerms || !signupForm.agreeToPrivacy}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Start Free Trial'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin('Google')}
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin('LinkedIn')}
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-2" fill="#0A66C2" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </Button>
            </div>

            {/* Sign In Link */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Button 
                type="button"
                variant="link" 
                className="p-0" 
                onClick={() => onNavigate('login')}
                disabled={isLoading}
              >
                Sign in
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentPage === 'forgot-password') {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-2 text-center">
            <div className="flex items-center justify-center mb-4 relative">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('login')} 
                className="absolute left-0 top-0"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-3">
                <LogoLink onNavigate={onNavigate} size="sm" />
                <span className="text-2xl font-bold text-skillswap-primary">SkillSwap</span>
              </div>
            </div>
            <CardTitle className="text-xl">Reset your password</CardTitle>
            <p className="text-muted-foreground">Enter your email to receive a reset link</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Error/Success Messages */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-skillswap-success/10 border-skillswap-success/20">
                <CheckCircle className="h-4 w-4 text-skillswap-success" />
                <AlertDescription className="text-skillswap-success">{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleForgotPassword} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="forgot-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder="Enter your email address"
                    value={forgotPasswordForm.email}
                    onChange={(e) => setForgotPasswordForm(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              {/* Send Reset Link Button */}
              <Button 
                type="submit"
                className="w-full skillswap-gradient text-white" 
                disabled={isLoading || !forgotPasswordForm.email}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </form>

            {/* Back to Sign In */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Remember your password? </span>
              <Button 
                type="button"
                variant="link" 
                className="p-0" 
                onClick={() => onNavigate('login')}
                disabled={isLoading}
              >
                Sign in
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentPage === 'onboarding') {
    return (
      <div className="min-h-screen bg-background">
        {/* Progress Header */}
        <div className="bg-white border-b px-4 py-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-lg font-semibold">Account Setup</h1>
              <Badge variant="secondary">Step {onboardingStep} of 3</Badge>
            </div>
            <Progress value={(onboardingStep / 3) * 100} className="h-2" />
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-8">
          {onboardingStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Identity Verification</CardTitle>
                <p className="text-muted-foreground">
                  Upload your ID and take a selfie to verify your identity. This helps keep our community safe.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* ID Upload */}
                <div className="space-y-3">
                  <Label>Government ID</Label>
                  <div 
                    className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={() => handleFileUpload('id')}
                  >
                    {uploadedFiles.id ? (
                      <div className="flex items-center justify-center space-x-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span>ID uploaded successfully</span>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Driver's license, passport, or national ID
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Selfie Upload */}
                <div className="space-y-3">
                  <Label>Verification Selfie</Label>
                  <div 
                    className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={() => handleFileUpload('selfie')}
                  >
                    {uploadedFiles.selfie ? (
                      <div className="flex items-center justify-center space-x-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span>Selfie uploaded successfully</span>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          Take a clear selfie
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Make sure your face is clearly visible
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Your information is encrypted and secure. We use this only for verification purposes.
                  </AlertDescription>
                </Alert>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => onNavigate('signup')}>
                    Back
                  </Button>
                  <Button 
                    onClick={() => setOnboardingStep(2)}
                    className="skillswap-gradient text-white"
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {onboardingStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Verification in Progress</CardTitle>
                <p className="text-muted-foreground">
                  We're reviewing your documents. This usually takes 1-2 business days.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Verification Pending</h3>
                  <p className="text-muted-foreground mb-4">
                    We'll notify you by email once your account is verified.
                  </p>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Pending Review
                  </Badge>
                </div>

                <Alert>
                  <AlertDescription>
                    You can continue setting up your profile, but you'll need verification to book sessions.
                  </AlertDescription>
                </Alert>

                <Button 
                  onClick={() => setOnboardingStep(3)}
                  className="w-full skillswap-gradient text-white"
                >
                  Continue Profile Setup
                </Button>
              </CardContent>
            </Card>
          )}

          {onboardingStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Welcome to SkillSwap!</CardTitle>
                <p className="text-muted-foreground">
                  Your account is set up. You can now browse skills and start connecting with others.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Setup Complete!</h3>
                  <p className="text-muted-foreground mb-4">
                    You're ready to start exchanging skills.
                  </p>
                </div>

                <div className="grid gap-4">
                  <Button 
                    onClick={() => onNavigate('skill-setup')}
                    className="skillswap-gradient text-white"
                  >
                    Add Your Skills
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => onNavigate('dashboard')}
                  >
                    Explore Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return null;
}