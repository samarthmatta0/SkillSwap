import React, { useState, useEffect, useCallback, useMemo } from 'react';
import LoadingScreen from './components/ui/loading-screen';
import { ScrollToTop } from './components/ui/scroll-to-top';
import { smoothScrollToTop } from './utils/scrollUtils';
import { createClient } from '@supabase/supabase-js';
import { skillSwapAPI } from './utils/api';
import { projectId, publicAnonKey, supabaseUrl } from './utils/supabase/info';

// Lazy load components to improve initial load time
const LandingPage = React.lazy(() => import('./components/LandingPage'));
const AboutPage = React.lazy(() => import('./components/AboutPage'));
const AuthPages = React.lazy(() => import('./components/AuthPages'));
const SkillSetup = React.lazy(() => import('./components/SkillSetup'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const BookingFlow = React.lazy(() => import('./components/BookingFlow'));
const SessionInterface = React.lazy(() => import('./components/SessionInterface'));
const SubscriptionManagement = React.lazy(() => import('./components/SubscriptionManagement'));
const HelpCenter = React.lazy(() => import('./components/HelpCenter'));
const Community = React.lazy(() => import('./components/Community'));
const Safety = React.lazy(() => import('./components/Safety'));
const ContactUs = React.lazy(() => import('./components/ContactUs'));
const NotFoundPage = React.lazy(() => import('./components/NotFoundPage'));

// New pages
const SettingsPage = React.lazy(() => import('./components/SettingsPage'));
const TermsPage = React.lazy(() => import('./components/TermsPage'));
const PrivacyPage = React.lazy(() => import('./components/PrivacyPage'));
const ExplorePage = React.lazy(() => import('./components/ExplorePage'));
const ProfilePage = React.lazy(() => import('./components/ProfilePage'));
const WalletPage = React.lazy(() => import('./components/WalletPage'));
const GetStartedPage = React.lazy(() => import('./components/GetStartedPage'));
const PricingPage = React.lazy(() => import('./components/PricingPage'));

// Dashboard Layout
const DashboardLayout = React.lazy(() => import('./components/DashboardLayout'));

// URL to page mapping
const urlToPageMap: { [key: string]: string } = {
  '/': 'landing',
  '/about': 'about',
  '/get-started': 'get-started',
  '/login': 'login',
  '/signup': 'signup',
  '/onboarding': 'onboarding',
  '/forgot-password': 'forgot-password',
  '/skill-setup': 'skill-setup',
  '/dashboard': 'dashboard',
  '/explore': 'explore',
  '/profile': 'profile',
  '/settings': 'settings',
  '/wallet': 'wallet',
  '/booking': 'booking',
  '/booking-confirmation': 'booking-confirmation',
  '/session': 'session',
  '/session-end': 'session-end',
  '/purchase-booster': 'purchase-booster',
  '/subscription': 'subscription',
  '/pricing': 'pricing', // Add pricing as a special page
  '/help': 'help',
  '/community': 'community',
  '/safety': 'safety',
  '/contact': 'contact',
  '/terms': 'terms',
  '/privacy': 'privacy'
};

// Page to URL mapping (reverse)
const pageToUrlMap: { [key: string]: string } = {
  'landing': '/',
  'about': '/about',
  'get-started': '/get-started',
  'login': '/login',
  'signup': '/signup',
  'onboarding': '/onboarding',
  'forgot-password': '/forgot-password',
  'skill-setup': '/skill-setup',
  'dashboard': '/dashboard',
  'explore': '/explore',
  'profile': '/profile',
  'settings': '/settings',
  'wallet': '/wallet',
  'booking': '/booking',
  'booking-confirmation': '/booking-confirmation',
  'session': '/session',
  'session-end': '/session-end',
  'purchase-booster': '/purchase-booster',
  'subscription': '/subscription',
  'pricing': '/pricing',
  'help': '/help',
  'community': '/community',
  'safety': '/safety',
  'contact': '/contact',
  'terms': '/terms',
  'privacy': '/privacy'
};

// Get current page from URL
const getCurrentPageFromUrl = (): string => {
  const path = window.location.pathname;
  return urlToPageMap[path] || '404';
};

// Initialize Supabase client for session management
const supabase = createClient(
  supabaseUrl,
  publicAnonKey,
  {
    auth: {
      persistSession: true,
      storageKey: 'skillswap-auth',
      storage: window.localStorage,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => getCurrentPageFromUrl());
  const [navigationHistory, setNavigationHistory] = useState<string[]>([getCurrentPageFromUrl()]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [sessionChecked, setSessionChecked] = useState(false);

  // Update URL when page changes
  const updateUrl = useCallback((page: string, replace: boolean = false) => {
    const url = pageToUrlMap[page] || '/404';
    if (replace) {
      window.history.replaceState(null, '', url);
    } else {
      window.history.pushState(null, '', url);
    }
    
    // Update page title based on current page
    const pageTitles: { [key: string]: string } = {
      'landing': 'SkillSwap - Learn, Teach, Connect',
      'about': 'About Us - SkillSwap',
      'get-started': 'Get Started - SkillSwap',
      'login': 'Login - SkillSwap',
      'signup': 'Sign Up - SkillSwap',
      'onboarding': 'Welcome - SkillSwap',
      'forgot-password': 'Reset Password - SkillSwap',
      'skill-setup': 'Setup Your Skills - SkillSwap',
      'dashboard': 'Dashboard - SkillSwap',
      'explore': 'Explore Skills - SkillSwap',
      'profile': 'Your Profile - SkillSwap',
      'settings': 'Settings - SkillSwap',
      'wallet': 'Wallet - SkillSwap',
      'booking': 'Book Session - SkillSwap',
      'booking-confirmation': 'Booking Confirmed - SkillSwap',
      'session': 'Live Session - SkillSwap',
      'session-end': 'Session Complete - SkillSwap',
      'purchase-booster': 'Purchase Booster - SkillSwap',
      'subscription': 'Subscription - SkillSwap',
      'pricing': 'Pricing - SkillSwap',
      'help': 'Help Center - SkillSwap',
      'community': 'Community - SkillSwap',
      'safety': 'Safety Guidelines - SkillSwap',
      'contact': 'Contact Us - SkillSwap',
      'terms': 'Terms of Service - SkillSwap',
      'privacy': 'Privacy Policy - SkillSwap',
      '404': 'Page Not Found - SkillSwap'
    };
    
    document.title = pageTitles[page] || 'SkillSwap';
  }, []);

  // Authentication handlers
  const handleLogin = useCallback((userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    const newPage = 'dashboard';
    setCurrentPage(newPage);
    updateUrl(newPage);
    setNavigationHistory(prev => [...prev, newPage]);
  }, [updateUrl]);

  const handleLogout = useCallback(async () => {
    try {
      console.log('Logging out user...');
      
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Clear API token
      skillSwapAPI.setAccessToken(null);
      
      // Clear local state
      setUser(null);
      setIsAuthenticated(false);
      
      const newPage = 'landing';
      setCurrentPage(newPage);
      updateUrl(newPage);
      setNavigationHistory([newPage]);
      
      console.log('User successfully logged out');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear local state
      setUser(null);
      setIsAuthenticated(false);
      const newPage = 'landing';
      setCurrentPage(newPage);
      updateUrl(newPage);
      setNavigationHistory([newPage]);
    }
  }, [updateUrl]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const newPage = getCurrentPageFromUrl();
      setCurrentPage(newPage);
      smoothScrollToTop();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation history management
  const handleBack = useCallback(() => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop(); // Remove current page
      const previousPage = newHistory[newHistory.length - 1];
      
      setNavigationHistory(newHistory);
      setCurrentPage(previousPage);
      updateUrl(previousPage);
      smoothScrollToTop();
    } else {
      // If no history, go to landing page
      const newPage = 'landing';
      setCurrentPage(newPage);
      updateUrl(newPage);
      setNavigationHistory([newPage]);
      smoothScrollToTop();
    }
  }, [navigationHistory, updateUrl]);

  // Check for existing session on app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log('Checking for existing session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session check error:', error);
        } else if (session?.access_token) {
          console.log('Found existing session:', session.user.email);
          
          // Set the token for API calls
          skillSwapAPI.setAccessToken(session.access_token);
          
          // Get user profile from backend
          try {
            const profileData = await skillSwapAPI.getProfile();
            
            setUser({
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata.name,
              accessToken: session.access_token,
              profile: profileData.profile
            });
            setIsAuthenticated(true);
            console.log('User restored from session');
          } catch (profileError) {
            console.error('Profile fetch error during session restore:', profileError);
            // Still set user even if profile fetch fails
            setUser({
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata.name,
              accessToken: session.access_token
            });
            setIsAuthenticated(true);
          }
        } else {
          console.log('No existing session found');
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setSessionChecked(true);
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      
      if (event === 'SIGNED_OUT' || !session) {
        setUser(null);
        setIsAuthenticated(false);
        skillSwapAPI.setAccessToken(null);
      } else if (event === 'SIGNED_IN' && session?.access_token) {
        skillSwapAPI.setAccessToken(session.access_token);
        
        // Only update if we don't already have this user
        if (!user || user.id !== session.user.id) {
          try {
            const profileData = await skillSwapAPI.getProfile();
            setUser({
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata.name,
              accessToken: session.access_token,
              profile: profileData.profile
            });
          } catch (profileError) {
            console.error('Profile fetch error in auth state change:', profileError);
            setUser({
              id: session.user.id,
              email: session.user.email,
              name: session.user.user_metadata.name,
              accessToken: session.access_token
            });
          }
          setIsAuthenticated(true);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Initial loading effect
  useEffect(() => {
    const initialLoadTimer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1800);

    return () => clearTimeout(initialLoadTimer);
  }, []);

  // Scroll reveal effect setup
  useEffect(() => {
    if (isInitialLoading) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('reveal-on-scroll')) {
            entry.target.classList.add('revealed');
          } else {
            entry.target.classList.add('reveal-visible');
            entry.target.classList.remove('reveal-hidden');
          }
        }
      });
    }, observerOptions);

    const addRevealClasses = () => {
      const elements = document.querySelectorAll(
        'section, .reveal-on-scroll, h1, h2, h3, .card, .feature-card, .stats-card, .timeline-item, .pricing-card'
      );
      
      elements.forEach((el, index) => {
        if (!el.classList.contains('reveal-setup')) {
          el.classList.add('reveal-setup');
          el.style.setProperty('--reveal-delay', `${index * 50}ms`);
          
          const elementTop = el.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (elementTop > windowHeight * 0.3) {
            if (el.classList.contains('reveal-on-scroll')) {
              // Don't add reveal-hidden, keep the reveal-on-scroll initial state
            } else {
              el.classList.add('reveal-hidden');
            }
          } else {
            if (el.classList.contains('reveal-on-scroll')) {
              el.classList.add('revealed');
            } else {
              el.classList.add('reveal-visible');
            }
          }
          
          observer.observe(el);
        }
      });
    };

    const setupTimer = setTimeout(addRevealClasses, 200);

    return () => {
      clearTimeout(setupTimer);
      observer.disconnect();
    };
  }, [isInitialLoading, currentPage]);

  // Navigation logic
  const handleNavigate = useCallback((page: string) => {
    const noScrollPages = ['purchase-booster', 'session-end'];
    const noLoadingPages = [...noScrollPages];
    
    if (page === currentPage) return;

    // Check if page requires authentication
    const protectedPages = ['dashboard', 'profile', 'settings', 'wallet', 'explore'];
    if (protectedPages.includes(page) && !isAuthenticated) {
      const loginPage = 'login';
      setCurrentPage(loginPage);
      updateUrl(loginPage);
      setNavigationHistory(prev => [...prev, loginPage]);
      return;
    }

    // Update URL
    updateUrl(page);

    // Update navigation history
    setNavigationHistory(prev => {
      const newHistory = [...prev];
      // Avoid duplicate consecutive entries
      if (newHistory[newHistory.length - 1] !== page) {
        newHistory.push(page);
        // Keep history reasonable size (max 10 entries)
        if (newHistory.length > 10) {
          newHistory.shift();
        }
      }
      return newHistory;
    });

    if (!noScrollPages.includes(page)) {
      smoothScrollToTop();
    }

    if (!noLoadingPages.includes(page)) {
      setIsLoading(true);
      
      const loadingDelay = performance.now() < 1000 ? 150 : 300;
      
      setTimeout(() => {
        setCurrentPage(page);
        setIsLoading(false);
      }, loadingDelay);
    } else {
      setCurrentPage(page);
    }
  }, [currentPage, isAuthenticated, updateUrl]);

  // Initialize page title on app load
  useEffect(() => {
    updateUrl(currentPage, true); // Use replace for initial load
    smoothScrollToTop();
  }, [currentPage, updateUrl]);

  // Component resolver
  const PageComponent = useMemo(() => {
    const components = {
      'landing': LandingPage,
      'about': AboutPage,
      'get-started': GetStartedPage,
      'login': AuthPages,
      'signup': AuthPages,
      'onboarding': AuthPages,
      'forgot-password': AuthPages,
      'skill-setup': SkillSetup,
      'dashboard': Dashboard,
      'explore': ExplorePage,
      'profile': ProfilePage,
      'settings': SettingsPage,
      'wallet': WalletPage,
      'booking': BookingFlow,
      'booking-confirmation': BookingFlow,
      'session': SessionInterface,
      'session-end': SessionInterface,
      'purchase-booster': SessionInterface,
      'subscription': SubscriptionManagement,
      'pricing': PricingPage, // Dedicated pricing page
      'help': HelpCenter,
      'community': Community,
      'safety': Safety,
      'contact': ContactUs,
      'terms': TermsPage,
      'privacy': PrivacyPage,
      '404': NotFoundPage,
    };

    const Component = components[currentPage] || NotFoundPage;
    
    // Auth pages
    if (['login', 'signup', 'onboarding', 'forgot-password'].includes(currentPage)) {
      return (
        <Component 
          currentPage={currentPage} 
          onNavigate={handleNavigate}
          onLogin={handleLogin}
          onBack={handleBack}
          canGoBack={navigationHistory.length > 1}
        />
      );
    }
    
    // Dashboard and protected pages
    if (['dashboard', 'explore', 'profile', 'settings', 'wallet'].includes(currentPage)) {
      return (
        <DashboardLayout
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          user={user}
        >
          <Component 
            onNavigate={handleNavigate}
            user={user}
            onLogout={handleLogout}
            onBack={handleBack}
            canGoBack={navigationHistory.length > 1}
          />
        </DashboardLayout>
      );
    }
    
    // Pricing page (dedicated pricing page)
    if (currentPage === 'pricing') {
      return (
        <Component 
          onNavigate={handleNavigate}
          onBack={handleBack}
          canGoBack={navigationHistory.length > 1}
        />
      );
    }
    
    // Public pages
    return (
      <Component 
        onNavigate={handleNavigate}
        onBack={handleBack}
        canGoBack={navigationHistory.length > 1}
      />
    );
  }, [currentPage, handleNavigate, handleLogin, handleLogout, handleBack, user, navigationHistory.length]);

  return (
    <div className="size-full">
      {/* Initial Loading Screen */}
      <LoadingScreen isVisible={isInitialLoading || !sessionChecked} isInitial={true} />
      
      {/* Page Transition Loading Screen */}
      <LoadingScreen isVisible={isLoading && !isInitialLoading && sessionChecked} isInitial={false} />

      
      {!isInitialLoading && sessionChecked && (
        <main id="main-content" className="page-content">
          <React.Suspense fallback={<LoadingScreen isVisible={true} isInitial={false} />}>
            {PageComponent}
          </React.Suspense>
          
          {/* Global Scroll to Top Button */}
          <ScrollToTop showAfter={400} />
        </main>
      )}
    </div>
  );
}