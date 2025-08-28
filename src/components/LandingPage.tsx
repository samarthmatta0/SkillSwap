import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { LogoLink } from "./ui/logo";
import { Card3D, Card3DHero, Card3DSubtle } from "./ui/card-3d";
import {
  Clock,
  Shield,
  Users,
  Globe,
  Star,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Heart,
  MessageCircle,
  Menu,
  X,
  BookOpen,
} from "lucide-react";
import { ScrollToTop } from "./ui/scroll-to-top";
import { TypewriterText } from "./ui/typewriter-text";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({
  onNavigate,
}: LandingPageProps) {
  const [billingCycle, setBillingCycle] = useState<
    "monthly" | "yearly"
  >("monthly");
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const getHeaderClass = () => {
    if (scrollY === 0)
      return "bg-white/80 backdrop-blur-sm transition-all duration-200 ease-out";
    if (scrollY < 20)
      return "bg-white/85 backdrop-blur-md shadow-sm transition-all duration-200 ease-out";
    if (scrollY < 100)
      return "bg-white/92 backdrop-blur-md shadow-md transition-all duration-200 ease-out";
    return "bg-white/96 backdrop-blur-lg shadow-lg transition-all duration-200 ease-out";
  };

  const pricingPlans = [
    {
      name: "Free Trial",
      description: "Try SkillSwap risk-free",
      price: { monthly: 0, yearly: 0 },
      period: "7 days",
      features: [
        "3 skill requests per day",
        "2 connections per day",
        "15 min speaking time per session",
        "30 total minutes per day",
        "Basic session tools",
        "Community support",
      ],
      cta: "Start Free Trial",
      popular: false,
      limits: {
        requests: 3,
        connections: 2,
        speakingTime: 15,
        totalTime: 30,
      },
    },
    {
      name: "Basic",
      description: "Perfect for casual learners",
      price: { monthly: 10, yearly: 100 },
      period: "month",
      features: [
        "5 skill requests per day",
        "4 connections per day",
        "30 min speaking time per session",
        "60 total minutes per day",
        "Session recording",
        "Priority matching",
        "Email support",
      ],
      cta: "Choose Basic",
      popular: false,
      limits: {
        requests: 5,
        connections: 4,
        speakingTime: 30,
        totalTime: 60,
      },
    },
    {
      name: "Standard",
      description: "Great for regular skill exchange",
      price: { monthly: 25, yearly: 250 },
      period: "month",
      features: [
        "10 skill requests per day",
        "8 connections per day",
        "45 min speaking time per session",
        "120 total minutes per day",
        "Advanced session tools",
        "Calendar integration",
        "Progress tracking",
        "Priority support",
      ],
      cta: "Choose Standard",
      popular: true,
      limits: {
        requests: 10,
        connections: 8,
        speakingTime: 45,
        totalTime: 120,
      },
    },
    {
      name: "Pro",
      description: "For power users and professionals",
      price: { monthly: 50, yearly: 500 },
      period: "month",
      features: [
        "Unlimited skill requests",
        "Unlimited connections",
        "60 min speaking time per session",
        "240 total minutes per day",
        "Premium session features",
        "Advanced analytics",
        "Custom scheduling",
        "Dedicated support",
        "Early access to features",
      ],
      cta: "Choose Pro",
      popular: false,
      limits: {
        requests: "Unlimited",
        connections: "Unlimited",
        speakingTime: 60,
        totalTime: 240,
      },
    },
  ];

  const calculateYearlyDiscount = (monthlyPrice: number) => {
    if (monthlyPrice === 0) return 0;
    const yearlyPrice = monthlyPrice * 10; // 2 months free
    const savings = monthlyPrice * 12 - yearlyPrice;
    return Math.round((savings / (monthlyPrice * 12)) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full border-b ${getHeaderClass()}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            {/* Left side - Logo */}
            <div className="flex items-center header-logo flex-1">
              <LogoLink onNavigate={onNavigate} size="md" />
            </div>

            {/* Center - Navigation */}
            <nav className="hidden md:flex items-center space-x-8 header-nav flex-1">
              <button
                onClick={() => onNavigate("landing")}
                className="text-skillswap-primary font-medium"
              >
                Home
              </button>
              <button
                onClick={() => onNavigate("about")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </button>
              <a
                href="#pricing"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </a>
              <button
                onClick={() => onNavigate("help")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Help
              </button>
            </nav>

            {/* Right side - Actions */}
            <div className="flex items-center justify-end space-x-4 header-actions flex-1">
              <Button
                variant="ghost"
                onClick={() => onNavigate("login")}
                className="hidden sm:inline-flex header-button btn-stable"
              >
                Sign In
              </Button>
              <Button
                onClick={() => onNavigate("signup")}
                className="bg-skillswap-primary hover:bg-skillswap-primary-dark text-white header-button btn-stable font-normal font-bold"
              >
                Get Started
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setIsMobileMenuOpen(!isMobileMenuOpen)
                }
                className="md:hidden mobile-menu-btn"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <div className="mobile-menu-ripple absolute inset-0 rounded-full bg-skillswap-primary opacity-0"></div>
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-skillswap-primary" />
                ) : (
                  <Menu className="w-6 h-6 text-skillswap-primary" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Sidebar */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed top-16 left-0 right-0 bg-white z-[60]"
          style={{
            minHeight: "200px",
          }}
        >
          <div className="container mx-auto px-4 py-6">
            {/* Mobile Navigation Links */}
            <nav className="space-y-4 mb-6">
              <button
                onClick={() => {
                  onNavigate("landing");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-skillswap-primary font-semibold bg-skillswap-primary/10 transition-all duration-200 hover:bg-skillswap-primary/20"
              >
                <div className="flex items-center justify-between">
                  <span>Home</span>
                  <ArrowRight className="w-4 h-4 opacity-60" />
                </div>
              </button>

              <button
                onClick={() => {
                  onNavigate("about");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-muted-foreground hover:text-skillswap-primary transition-all duration-200 hover:bg-skillswap-primary/10"
              >
                <div className="flex items-center justify-between">
                  <span>About</span>
                  <ArrowRight className="w-4 h-4 opacity-60" />
                </div>
              </button>

              <button
                onClick={() => {
                  document
                    .getElementById("pricing")
                    ?.scrollIntoView({ behavior: "smooth" });
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-muted-foreground hover:text-skillswap-primary transition-all duration-200 hover:bg-skillswap-primary/10"
              >
                <div className="flex items-center justify-between">
                  <span>Pricing</span>
                  <ArrowRight className="w-4 h-4 opacity-60" />
                </div>
              </button>

              <button
                onClick={() => {
                  onNavigate("help");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-muted-foreground hover:text-skillswap-primary transition-all duration-200 hover:bg-skillswap-primary/10"
              >
                <div className="flex items-center justify-between">
                  <span>Help</span>
                  <ArrowRight className="w-4 h-4 opacity-60" />
                </div>
              </button>
            </nav>

            {/* Mobile Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <Button
                variant="outline"
                onClick={() => {
                  onNavigate("login");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full border-skillswap-primary/20 text-skillswap-primary hover:bg-skillswap-primary hover:text-white"
              >
                Sign In
              </Button>
              <Button
                onClick={() => {
                  onNavigate("signup");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-skillswap-primary hover:bg-skillswap-primary-dark text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-mobile-menu-enter"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-amber-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-amber-100 rounded-full blur-2xl opacity-50"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-blue-200 rounded-full blur-xl opacity-30"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[600px]">
            {/* Left Content - Takes 7 columns */}
            <div className="lg:col-span-7 text-center lg:text-left relative z-10">
              <h1 className="text-6xl md:text-7xl font-black mb-6 text-gray-900 leading-[0.9] tracking-tight">
                Learn Any Skill,
                <br />
                <TypewriterText
                  phrases={[
                    "Teach What You Know. ",
                    "Share Your Expertise. ",
                    "Connect Globally.",
                    "Build Together. ",
                    "Grow Together. ",
                  ]}
                  typeSpeed={100}
                  deleteSpeed={50}
                  delayBetweenPhrases={2000}
                  initialWaitTime={2000}
                  cursorStyle="line"
                  cursorBlinkSpeed={1000}
                  showCursorDuringDelete={false}
                  pauseAfterTyping={1200}
                  className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-700 bg-clip-text text-transparent"
                />
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-2xl lg:max-w-none">
                Connect with real people for meaningful 1:1 learning sessions. 
                Share what you know, learn what you love, and build 
                genuine connections through fair exchanges.
              </p>

              {/* Enhanced Secondary CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center sm:items-start">
                {/* Primary CTA - Start Free Trial */}
                <Button
                  size="lg"
                  onClick={() => onNavigate("signup")}
                  className="group relative bg-skillswap-primary hover:bg-skillswap-primary-dark text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl btn-stable btn-glow overflow-hidden border-0 min-w-[200px] sm:min-w-[220px]"
                  aria-label="Start your free 7-day trial with SkillSwap"
                >
                  {/* Gradient overlay for extra visual interest */}
                  <div className="absolute inset-0 bg-gradient-to-r from-skillswap-primary via-skillswap-primary-light to-skillswap-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Button content */}
                  <div className="relative flex items-center justify-center space-x-2 z-10">
                    <span className="font-semibold">
                      Start Free Trial
                    </span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>

                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                </Button>

                {/* Secondary CTA - Learn More */}
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate("about")}
                  className="group relative border-2 border-skillswap-primary text-skillswap-primary hover:bg-skillswap-primary hover:text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-md hover:shadow-xl btn-stable glass-card backdrop-blur-sm bg-white/80 hover:bg-skillswap-primary transition-all duration-300 min-w-[200px] sm:min-w-[220px]"
                  aria-label="Learn more about SkillSwap platform and features"
                >
                  {/* Gradient border effect on hover */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-skillswap-primary via-skillswap-primary-light to-skillswap-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>

                  {/* Button content */}
                  <div className="relative flex items-center justify-center space-x-2 z-10">
                    <span className="font-semibold transition-colors duration-200">
                      Learn More
                    </span>
                    <ArrowRight className="w-5 h-5 transition-all duration-200 group-hover:translate-x-1 group-hover:scale-110" />
                  </div>

                  {/* Subtle background pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br from-skillswap-primary/10 via-transparent to-skillswap-accent/10"></div>
                </Button>
              </div>

              {/* Trust indicators below buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-6 text-sm opacity-80">
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm">
                  <div className="w-2 h-2 bg-skillswap-success rounded-full animate-pulse"></div>
                  <span className="text-gray-700 font-medium">
                    No credit card required
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm">
                  <CheckCircle className="w-4 h-4 text-skillswap-success" />
                  <span className="text-gray-700 font-medium">
                    Cancel anytime
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm">
                  <Star className="w-4 h-4 text-skillswap-accent fill-current" />
                  <span className="text-gray-700 font-medium">
                    Join our community
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content - Takes 5 columns */}
            <div className="lg:col-span-5 relative">
              {/* Image Showcase Gallery */}
              <div className="relative h-[500px] overflow-hidden">
                {/* Background with subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-skillswap-primary/5 to-skillswap-accent/5 rounded-3xl"></div>

                {/* Main Featured Image - Center */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="relative w-48 h-48 rounded-3xl overflow-hidden shadow-2xl group hover:scale-105 transition-all duration-500">
                    <img
                      src="https://images.unsplash.com/photo-1634464660153-468d44306ac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50b3IlMjB0ZWFjaGluZyUyMHN0dWRlbnQlMjBjb21wdXRlcnxlbnwxfHx8fDE3NTYzMjEwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Mentor teaching student"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-skillswap-primary/20 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-skillswap-success rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-gray-800">Live Teaching Session</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating skill badges around main image */}
                  <div className="absolute inset-0">
                    <div
                      className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-skillswap-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-float"
                      style={{ animationDelay: "0s" }}
                    >
                      Coding
                    </div>
                    <div
                      className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-skillswap-accent text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-float"
                      style={{ animationDelay: "2s" }}
                    >
                      Design
                    </div>
                    <div
                      className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-skillswap-success text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-float"
                      style={{ animationDelay: "4s" }}
                    >
                      Languages
                    </div>
                    <div
                      className="absolute top-1/2 -left-8 transform -translate-y-1/2 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-float"
                      style={{ animationDelay: "6s" }}
                    >
                      Music
                    </div>
                  </div>
                </div>

                {/* Smaller Image Cards - Floating Around */}
                <div className="absolute top-8 right-8 w-32 h-32 rounded-2xl overflow-hidden shadow-xl opacity-80 hover:opacity-100 transition-all duration-300 animate-float group" style={{ animationDelay: "1s" }}>
                  <img
                    src="https://images.unsplash.com/photo-1673515335586-f9f662c01482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwbGVhcm5pbmclMjBvbmxpbmUlMjBza2lsbHN8ZW58MXx8fHwxNzU2MzIxMDE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="People learning online"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-skillswap-primary/10 group-hover:bg-skillswap-primary/5 transition-colors duration-300"></div>
                </div>

                <div className="absolute bottom-8 left-8 w-28 h-28 rounded-2xl overflow-hidden shadow-xl opacity-75 hover:opacity-100 transition-all duration-300 animate-float group" style={{ animationDelay: "3s" }}>
                  <img
                    src="https://images.unsplash.com/photo-1646579886741-12b59840c63f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsYWJvcmF0aXZlJTIwd29ya3NwYWNlJTIwcmVtb3RlJTIwdGVhbXxlbnwxfHx8fDE3NTYzMjEwMjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Collaborative workspace"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-skillswap-accent/10 group-hover:bg-skillswap-accent/5 transition-colors duration-300"></div>
                </div>

                <div className="absolute top-16 left-12 w-24 h-24 rounded-2xl overflow-hidden shadow-xl opacity-70 hover:opacity-100 transition-all duration-300 animate-float group" style={{ animationDelay: "5s" }}>
                  <img
                    src="https://images.unsplash.com/photo-1650064175560-369b5b45b649?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBoYXBweSUyMGxlYXJuaW5nJTIwc3VjY2Vzc3xlbnwxfHx8fDE3NTYzMjEwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Happy learning success"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-skillswap-success/10 group-hover:bg-skillswap-success/5 transition-colors duration-300"></div>
                </div>

                {/* Connecting Lines with Animation */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(30, 58, 138)" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="rgb(245, 158, 11)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="rgb(30, 58, 138)" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  
                  {/* Connecting lines between images */}
                  <path
                    d="M 200 120 Q 300 200 240 280"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                    style={{ animationDuration: "3s" }}
                  />
                  <path
                    d="M 160 200 Q 100 300 140 380"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                    style={{ animationDuration: "4s", animationDelay: "1s" }}
                  />
                </svg>

                {/* Global Connection Indicator */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-skillswap-primary" />
                    <span className="font-medium text-gray-800">Global Network</span>
                  </div>
                </div>

                {/* Enhanced Testimonial Card 1 - Top Right */}
                <div
                  className="absolute top-2 md:top-4 right-1 md:right-4 bg-white/98 backdrop-blur-md rounded-3xl p-4 md:p-6 shadow-2xl border border-gray-200/60 max-w-[280px] md:max-w-[320px] animate-float hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:scale-[1.03] transition-all duration-500 cursor-default z-30 group"
                  style={{ animationDelay: "0s" }}
                >
                  {/* Connection line to globe */}
                  <svg className="absolute -bottom-6 -left-6 w-12 h-12 text-blue-300/50 pointer-events-none z-10">
                    <path
                      d="M2 2 Q6 8 10 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                      className="animate-pulse"
                    />
                  </svg>

                  <div className="flex items-start space-x-3 md:space-x-4">
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-xl transform group-hover:rotate-6 transition-transform duration-300">
                        <span className="text-white font-bold text-base md:text-lg">
                          S
                        </span>
                      </div>

                      {/* Verified badge with glow */}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                        <CheckCircle className="w-3 h-3 text-white fill-current" />
                      </div>

                      {/* Status indicator */}
                      <div className="absolute -top-1 -left-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-900 text-sm">
                          Sarah Chen
                        </h4>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 md:w-3.5 md:h-3.5 text-amber-400 fill-current transform hover:scale-125 transition-transform duration-200"
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs text-gray-500 font-medium">
                          Software Engineer
                        </span>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <span className="text-xs text-blue-600 font-medium flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          Tokyo, Japan
                        </span>
                      </div>

                      <p className="text-sm text-gray-700 leading-relaxed mb-3 line-clamp-3">
                        "Learned React hooks from a senior dev
                        in Silicon Valley. The fair-time system
                        made our exchange perfect!"
                      </p>

                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                          <Clock className="w-3 h-3 mr-1" />
                          45min session
                        </span>
                        <span className="font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          ✓ Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Testimonial Card 2 - Bottom Left */}
                <div
                  className="absolute bottom-2 md:bottom-4 left-1 md:left-4 bg-white/98 backdrop-blur-md rounded-3xl p-4 md:p-6 shadow-2xl border border-gray-200/60 max-w-[280px] md:max-w-[320px] animate-float hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:scale-[1.03] transition-all duration-500 cursor-default z-30 group"
                  style={{ animationDelay: "1s" }}
                >
                  {/* Connection line to globe */}
                  <svg className="absolute -top-6 -right-6 w-12 h-12 text-amber-300/50 pointer-events-none z-10">
                    <path
                      d="M10 2 Q6 8 2 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                      className="animate-pulse"
                    />
                  </svg>

                  <div className="flex items-start space-x-3 md:space-x-4">
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shadow-xl transform group-hover:rotate-6 transition-transform duration-300 ring-2 ring-amber-200 ring-offset-2">
                        <ImageWithFallback
                          src="https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHdvbWFuJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzU2MjUzMzA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                          alt="Maria Rodriguez"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>

                      {/* Verified badge with glow */}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                        <CheckCircle className="w-3 h-3 text-white fill-current" />
                      </div>

                      {/* Status indicator */}
                      <div className="absolute -top-1 -left-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-gray-900 text-sm">
                          Miguel Rodriguez
                        </h4>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 md:w-3.5 md:h-3.5 text-amber-400 fill-current transform hover:scale-125 transition-transform duration-200"
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs text-gray-500 font-medium">
                          UX Designer
                        </span>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <span className="text-xs text-amber600 font-medium flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          Barcelona, Spain
                        </span>
                      </div>

                      <p className="text-sm text-gray-700 leading-relaxed mb-3 line-clamp-3">
                        "Taught Figma design systems, learned
                        Python automation. Both skills enhanced
                        my workflow immensely!"
                      </p>

                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                          <Clock className="w-3 h-3 mr-1" />
                          60min session
                        </span>
                        <span className="font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          ✓ Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Creative Skill Constellation - Top Left */}
                <div className="absolute top-8 md:top-12 left-2 md:left-8 z-40">
                  <button
                    className="group relative bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-full text-sm font-semibold shadow-lg animate-float hover:shadow-xl hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    style={{ animationDelay: "0.5s" }}
                    onClick={() => onNavigate("explore")}
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>

                    <div className="relative flex items-center space-x-2">
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                        <BookOpen className="w-3 h-3" />
                      </div>
                      <span className="hidden sm:inline">
                        Programming
                      </span>
                      <span className="sm:hidden">Code</span>
                      <ArrowRight className="w-3 h-3 opacity-75 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </div>

                    {/* Floating connection dots */}
                    <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-blue-300 rounded-full animate-ping"></div>
                  </button>
                </div>

                {/* Creative Skill Constellation - Middle Right */}
                <div className="absolute top-24 md:top-28 right-4 md:right-12 z-40">
                  <button
                    className="group relative bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-600 hover:via-orange-600 hover:to-orange-700 text-white px-4 py-3 rounded-full text-sm font-semibold shadow-lg animate-float hover:shadow-xl hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
                    style={{ animationDelay: "1.5s" }}
                    onClick={() => onNavigate("explore")}
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>

                    <div className="relative flex items-center space-x-2">
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-3 h-3" />
                      </div>
                      <span className="hidden sm:inline">
                        Languages
                      </span>
                      <span className="sm:hidden">Lang</span>
                      <ArrowRight className="w-3 h-3 opacity-75 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </div>

                    {/* Floating connection dots */}
                    <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-amber-300 rounded-full animate-ping"></div>
                  </button>
                </div>

                {/* Creative Skill Constellation - Bottom Right */}
                <div className="absolute bottom-12 md:bottom-16 right-2 md:right-8 z-40">
                  <button
                    className="group relative bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 hover:from-green-600 hover:via-emerald-700 hover:to-teal-700 text-white px-4 py-3 rounded-full text-sm font-semibold shadow-lg animate-float hover:shadow-xl hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                    style={{ animationDelay: "2s" }}
                    onClick={() => onNavigate("explore")}
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>

                    <div className="relative flex items-center space-x-2">
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                        <Heart className="w-3 h-3" />
                      </div>
                      <span className="hidden sm:inline">
                        Design
                      </span>
                      <span className="sm:hidden">Art</span>
                      <ArrowRight className="w-3 h-3 opacity-75 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </div>

                    {/* Floating connection dots */}
                    <div className="absolute -top-2 -left-2 w-2 h-2 bg-green-300 rounded-full animate-ping"></div>
                  </button>
                </div>

                {/* Additional Creative Elements - Bottom Left Skill */}
                <div className="absolute bottom-20 md:bottom-24 left-8 md:left-16 z-40">
                  <button
                    className="group relative bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 hover:from-purple-600 hover:via-indigo-600 hover:to-indigo-700 text-white px-4 py-3 rounded-full text-sm font-semibold shadow-lg animate-float hover:shadow-xl hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
                    style={{ animationDelay: "2.5s" }}
                    onClick={() => onNavigate("explore")}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>

                    <div className="relative flex items-center space-x-2">
                      <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-3 h-3" />
                      </div>
                      <span className="hidden sm:inline">
                        Business
                      </span>
                      <span className="sm:hidden">Biz</span>
                      <ArrowRight className="w-3 h-3 opacity-75 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </div>

                    <div className="absolute -top-2 -right-2 w-2 h-2 bg-purple-300 rounded-full animate-ping"></div>
                  </button>
                </div>

                {/* Interactive Connection Lines */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                  style={{ mixBlendMode: "multiply" }}
                >
                  <defs>
                    <linearGradient
                      id="connectionGradient1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="#3B82F6"
                        stopOpacity="0.4"
                      />
                      <stop
                        offset="50%"
                        stopColor="#8B5CF6"
                        stopOpacity="0.3"
                      />
                      <stop
                        offset="100%"
                        stopColor="#F59E0B"
                        stopOpacity="0.4"
                      />
                    </linearGradient>
                    <linearGradient
                      id="connectionGradient2"
                      x1="100%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="#10B981"
                        stopOpacity="0.4"
                      />
                      <stop
                        offset="50%"
                        stopColor="#06B6D4"
                        stopOpacity="0.3"
                      />
                      <stop
                        offset="100%"
                        stopColor="#8B5CF6"
                        stopOpacity="0.4"
                      />
                    </linearGradient>
                  </defs>

                  {/* Curved connection paths */}
                  <path
                    d="M120 80 Q200 150 280 120 T450 180"
                    stroke="url(#connectionGradient1)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="8,4"
                    className="animate-pulse"
                    style={{ animationDuration: "3s" }}
                  />
                  <path
                    d="M100 380 Q250 300 400 350 T500 280"
                    stroke="url(#connectionGradient2)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="6,3"
                    className="animate-pulse"
                    style={{
                      animationDuration: "4s",
                      animationDelay: "1s",
                    }}
                  />
                </svg>

                {/* Enhanced Background Glow Effects */}
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className="absolute top-16 right-16 w-32 h-32 bg-gradient-to-br from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse"
                    style={{
                      animationDelay: "2s",
                      animationDuration: "4s",
                    }}
                  ></div>
                  <div
                    className="absolute bottom-20 left-12 w-28 h-28 bg-gradient-to-br from-amber-400/15 to-orange-400/15 rounded-full blur-2xl animate-pulse"
                    style={{
                      animationDelay: "3s",
                      animationDuration: "5s",
                    }}
                  ></div>
                  <div
                    className="absolute top-1/3 left-1/4 w-20 h-20 bg-gradient-to-br from-green-400/15 to-teal-400/15 rounded-full blur-xl animate-pulse"
                    style={{
                      animationDelay: "4s",
                      animationDuration: "6s",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-section-title text-skillswap-primary mb-4">
              How SkillSwap Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Three simple steps to start your skill exchange journey
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-skillswap-primary via-skillswap-accent to-skillswap-primary opacity-20 transform -translate-y-1/2"></div>
            
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
              {/* Step 1 */}
              <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-skillswap-primary/20 card-stable">
                {/* Step Number */}
                <div className="absolute -top-4 left-8 w-10 h-10 bg-gradient-to-br from-skillswap-primary to-skillswap-primary-dark rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  1
                </div>
                
                {/* Image */}
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1595074475099-633660478a7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBjcmVhdGluZyUyMG9ubGluZSUyMHByb2ZpbGUlMjBjb21wdXRlcnxlbnwxfHx8fDE3NTYzMjA2OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Person creating online profile"
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-skillswap-primary/10 to-transparent"></div>
                </div>

                <h3 className="text-2xl font-bold text-skillswap-primary mb-4 group-hover:text-skillswap-primary-dark transition-colors">
                  Create Your Profile
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  Set up your profile in minutes. Tell us what you can teach and what you'd like to learn. 
                  From coding to cooking, every skill has value in our community.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-skillswap-primary">
                    <CheckCircle className="w-4 h-4 mr-2 shrink-0" />
                    <span>Add your teaching skills</span>
                  </div>
                  <div className="flex items-center text-sm text-skillswap-primary">
                    <CheckCircle className="w-4 h-4 mr-2 shrink-0" />
                    <span>List what you want to learn</span>
                  </div>
                  <div className="flex items-center text-sm text-skillswap-primary">
                    <CheckCircle className="w-4 h-4 mr-2 shrink-0" />
                    <span>Set your availability</span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-skillswap-accent/20 card-stable">
                {/* Step Number */}
                <div className="absolute -top-4 left-8 w-10 h-10 bg-gradient-to-br from-skillswap-accent to-skillswap-accent-dark rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  2
                </div>
                
                {/* Image */}
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1648128126771-238106c2cc30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBjb25uZWN0aW5nJTIwdmlkZW8lMjBjYWxsJTIwbWVldGluZ3xlbnwxfHx8fDE3NTYzMjA3MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="People connecting through video call"
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-skillswap-accent/10 to-transparent"></div>
                </div>

                <h3 className="text-2xl font-bold text-skillswap-primary mb-4 group-hover:text-skillswap-accent-dark transition-colors">
                  Get Smart Matches
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  Our intelligent algorithm finds perfect learning partners based on complementary skills, 
                  schedules, and learning preferences. No more endless searching!
                </p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-skillswap-accent-dark">
                    <Users className="w-4 h-4 mr-2 shrink-0" />
                    <span>AI-powered skill matching</span>
                  </div>
                  <div className="flex items-center text-sm text-skillswap-accent-dark">
                    <Shield className="w-4 h-4 mr-2 shrink-0" />
                    <span>Verified user profiles</span>
                  </div>
                  <div className="flex items-center text-sm text-skillswap-accent-dark">
                    <Clock className="w-4 h-4 mr-2 shrink-0" />
                    <span>Schedule compatibility</span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-skillswap-primary/20 card-stable">
                {/* Step Number */}
                <div className="absolute -top-4 left-8 w-10 h-10 bg-gradient-to-br from-skillswap-primary to-skillswap-accent rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  3
                </div>
                
                {/* Image */}
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1712904124132-857e6577aab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHRlYWNoaW5nJTIwdmlkZW8lMjBzZXNzaW9ufGVufDF8fHx8MTc1NjMyMDcxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Online learning and teaching session"
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-skillswap-primary/10 to-transparent"></div>
                </div>

                <h3 className="text-2xl font-bold text-skillswap-primary mb-4 group-hover:text-skillswap-primary-dark transition-colors">
                  Learn & Teach Together
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  Join live video sessions with our fair-time system. Spend equal time learning and teaching 
                  for a balanced, enriching experience for everyone involved.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-skillswap-primary">
                    <Globe className="w-4 h-4 mr-2 shrink-0" />
                    <span>HD video sessions</span>
                  </div>
                  <div className="flex items-center text-sm text-skillswap-primary">
                    <TrendingUp className="w-4 h-4 mr-2 shrink-0" />
                    <span>Fair-time exchange system</span>
                  </div>
                  <div className="flex items-center text-sm text-skillswap-primary">
                    <Star className="w-4 h-4 mr-2 shrink-0" />
                    <span>Progress tracking & reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-skillswap-primary/5 via-white to-skillswap-accent/5 rounded-3xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-skillswap-primary mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join thousands of learners who are already exchanging skills and growing together. 
                Your first session is completely free!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  onClick={() => onNavigate("signup")}
                  className="bg-skillswap-primary hover:bg-skillswap-primary-dark text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl btn-stable btn-glow"
                >
                  Start Learning Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate("about")}
                  className="border-2 border-skillswap-primary text-skillswap-primary hover:bg-skillswap-primary hover:text-white px-8 py-4 text-lg font-semibold rounded-xl btn-stable"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-skillswap-success rounded-full animate-pulse"></div>
                <span>25,000+ Active Learners</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-skillswap-success" />
                <span>1M+ Skills Exchanged</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-skillswap-accent fill-current" />
                <span>4.9/5 Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Section */}
      <section className="py-12 bg-white/50 border-y border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
              Trusted by professionals at leading companies
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16 opacity-70 hover:opacity-100 transition-opacity duration-300">
            {/* Google Logo */}
            <div className="group flex items-center justify-center h-12 w-24 md:h-16 md:w-32 transition-all duration-300 hover:scale-110">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1553895501-af9e282e7fc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb29nbGUlMjBsb2dvJTIwY29tcGFueSUyMGJyYW5kfGVufDF8fHx8MTc1NjM2MDgzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Google"
                className="h-full w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>

            {/* Microsoft Logo */}
            <div className="group flex items-center justify-center h-12 w-24 md:h-16 md:w-32 transition-all duration-300 hover:scale-110">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1671944378859-08bcfa15a280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb3NvZnQlMjBvZmZpY2UlMjBsb2dvJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU2MzYwODQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Microsoft"
                className="h-full w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>

            {/* Apple Logo */}
            <div className="group flex items-center justify-center h-12 w-24 md:h-16 md:w-32 transition-all duration-300 hover:scale-110">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1622957042423-41683d2829c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBsZSUyMGxvZ28lMjB0ZWNobm9sb2d5JTIwY29tcGFueXxlbnwxfHx8fDE3NTYzNjA4NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Apple"
                className="h-full w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>

            {/* Amazon Logo */}
            <div className="group flex items-center justify-center h-12 w-24 md:h-16 md:w-32 transition-all duration-300 hover:scale-110">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1662947368770-7cf87e565cdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWF6b24lMjBsb2dvJTIwY29tcGFueSUyMGJyYW5kfGVufDF8fHx8MTc1NjM2MDg1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Amazon"
                className="h-full w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>

            {/* Slack Logo */}
            <div className="group flex items-center justify-center h-12 w-24 md:h-16 md:w-32 transition-all duration-300 hover:scale-110">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1696041759915-db4e520d542a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGFjayUyMGxvZ28lMjBjb21wYW55JTIwd29ya3NwYWNlfGVufDF8fHx8MTc1NjM2MDg1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Slack"
                className="h-full w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>

            {/* Netflix Logo */}
            <div className="group flex items-center justify-center h-12 w-24 md:h-16 md:w-32 transition-all duration-300 hover:scale-110">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1662338035130-516cb712005a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXRmbGl4JTIwbG9nbyUyMHN0cmVhbWluZyUyMGNvbXBhbnl8ZW58MXx8fHwxNzU2MzYwODY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Netflix"
                className="h-full w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>

          {/* Additional trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-skillswap-primary" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-skillswap-primary" />
              <span>500K+ Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-skillswap-primary" />
              <span>180+ Countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-section-title text-skillswap-primary mb-4">
              Why Choose SkillSwap?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for genuine human connection and effective
              skill exchange
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card3D className="p-6 bg-gradient-to-br from-white to-blue-50/30 hover:shadow-xl transition-all duration-300 border border-skillswap-primary/10">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-skillswap-primary/20 to-skillswap-primary/10 rounded-xl flex items-center justify-center mb-4 ring-1 ring-skillswap-primary/20">
                  <Clock className="w-7 h-7 text-skillswap-primary" />
                </div>
                <CardTitle className="text-xl text-skillswap-primary">
                  Fair-Time System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Smart built-in timers automatically ensure
                  equal speaking time for both participants. No
                  more one-sided conversations—every session is
                  perfectly balanced and mutually valuable.
                </p>
              </CardContent>
            </Card3D>

            <Card3D className="p-6 bg-gradient-to-br from-white to-amber-50/30 hover:shadow-xl transition-all duration-300 border border-skillswap-accent/10">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-skillswap-accent/20 to-skillswap-accent/10 rounded-xl flex items-center justify-center mb-4 ring-1 ring-skillswap-accent/20">
                  <Shield className="w-7 h-7 text-skillswap-accent-dark" />
                </div>
                <CardTitle className="text-xl text-skillswap-primary">
                  Verified Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Every member is verified through our
                  multi-step process. Community moderation,
                  safety reporting, and real identity
                  verification create a trustworthy learning
                  environment.
                </p>
              </CardContent>
            </Card3D>

            <Card3D className="p-6 bg-gradient-to-br from-white to-green-50/30 hover:shadow-xl transition-all duration-300 border border-skillswap-success/10">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-skillswap-success/20 to-skillswap-success/10 rounded-xl flex items-center justify-center mb-4 ring-1 ring-skillswap-success/20">
                  <Globe className="w-7 h-7 text-skillswap-success" />
                </div>
                <CardTitle className="text-xl text-skillswap-primary">
                  Global Reach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Connect with skilled people across 150+
                  countries. Break down geographical barriers
                  and access expertise from anywhere—expand your
                  learning beyond your local network.
                </p>
              </CardContent>
            </Card3D>

            <Card3D className="p-6 bg-gradient-to-br from-white to-purple-50/30 hover:shadow-xl transition-all duration-300 border border-purple-500/10">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-xl flex items-center justify-center mb-4 ring-1 ring-purple-500/20">
                  <Heart className="w-7 h-7 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-skillswap-primary">
                  Human-First Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Real conversations, genuine connections,
                  authentic relationships. No AI tutors or
                  bots—just meaningful human interactions that
                  create lasting learning partnerships.
                </p>
              </CardContent>
            </Card3D>

            <Card3D className="p-6 bg-gradient-to-br from-white to-emerald-50/30 hover:shadow-xl transition-all duration-300 border border-emerald-500/10">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 rounded-xl flex items-center justify-center mb-4 ring-1 ring-emerald-500/20">
                  <CheckCircle className="w-7 h-7 text-emerald-600" />
                </div>
                <CardTitle className="text-xl text-skillswap-primary">
                  Quality Guaranteed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Comprehensive rating system and detailed
                  session reviews ensure exceptional quality.
                  Our community actively maintains high
                  standards for every learning experience.
                </p>
              </CardContent>
            </Card3D>

            <Card3D className="p-6 bg-gradient-to-br from-white to-orange-50/30 hover:shadow-xl transition-all duration-300 border border-orange-500/10">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-xl flex items-center justify-center mb-4 ring-1 ring-orange-500/20">
                  <Star className="w-7 h-7 text-orange-600" />
                </div>
                <CardTitle className="text-xl text-skillswap-primary">
                  Smart Scheduling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Intelligent calendar integration with
                  automatic timezone conversion. Book sessions
                  that perfectly fit your schedule with instant
                  availability matching worldwide.
                </p>
              </CardContent>
            </Card3D>
          </div>
        </div>
      </section>

      {/* Trusted by Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50 border-y border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-lg font-semibold text-gray-600 mb-12">
              Trusted by professionals worldwide
            </h2>
            
            {/* Enhanced Trust Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-skillswap-primary mb-2 transition-all duration-300 group-hover:scale-110">25,000+</div>
                <div className="text-sm font-medium text-gray-600">Active professionals</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-skillswap-accent mb-2 transition-all duration-300 group-hover:scale-110">180+</div>
                <div className="text-sm font-medium text-gray-600">Countries represented</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-skillswap-success mb-2 transition-all duration-300 group-hover:scale-110">4.8/5</div>
                <div className="text-sm font-medium text-gray-600">Average satisfaction</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-purple-600 mb-2 transition-all duration-300 group-hover:scale-110">95%</div>
                <div className="text-sm font-medium text-gray-600">Success rate</div>
              </div>
            </div>

            {/* Additional Stats Row */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-1">1M+</div>
                <div className="text-xs text-gray-500">Sessions completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-1">500+</div>
                <div className="text-xs text-gray-500">Skills available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-1">24/7</div>
                <div className="text-xs text-gray-500">Global availability</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-skillswap-primary mb-6 leading-tight tracking-tight">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
              Choose the plan that fits your learning goals. All
              plans include our core features with fair usage
              limits.
            </p>

            {/* Billing Toggle */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6">
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <span
                  className={`text-sm sm:text-base ${billingCycle === "monthly" ? "text-skillswap-primary font-medium" : "text-muted-foreground"}`}
                >
                  Monthly
                </span>
                <Switch
                  checked={billingCycle === "yearly"}
                  onCheckedChange={(checked) =>
                    setBillingCycle(
                      checked ? "yearly" : "monthly",
                    )
                  }
                  className="data-[state=checked]:bg-skillswap-primary data-[state=unchecked]:bg-gray-300 shadow-md"
                  style={{
                    backgroundColor:
                      billingCycle === "yearly"
                        ? "#1E3A8A"
                        : "#d1d5db",
                  }}
                />
                <span
                  className={`text-sm sm:text-base ${billingCycle === "yearly" ? "text-skillswap-primary font-medium" : "text-muted-foreground"}`}
                >
                  Yearly
                </span>
              </div>
              <Badge
                className={`bg-skillswap-accent/10 text-skillswap-accent-dark border-skillswap-accent/20 transition-opacity duration-200 ${
                  billingCycle === "yearly"
                    ? "opacity-100"
                    : "opacity-0"
                }`}
                style={{
                  backgroundColor: "rgba(245, 158, 11, 0.1)",
                  color: "#D97706",
                  borderColor: "rgba(245, 158, 11, 0.2)",
                }}
              >
                Save up to 17%
              </Badge>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative transition-all duration-75 hover:shadow-lg pricing-card ${
                  plan.popular
                    ? "border-skillswap-primary shadow-lg scale-105"
                    : "border-border hover:border-skillswap-primary/50"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-skillswap-primary text-white">
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-lg font-semibold text-skillswap-primary mb-2">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mb-4">
                    {plan.description}
                  </CardDescription>

                  <div className="mb-4">
                    {plan.price[billingCycle] === 0 ? (
                      <div>
                        <span className="text-3xl font-bold text-skillswap-primary">
                          Free
                        </span>
                        <div className="text-sm text-muted-foreground mt-1">
                          {plan.period}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-baseline justify-center">
                          <span className="text-3xl font-bold text-skillswap-primary">
                            ${plan.price[billingCycle]}
                          </span>
                          <span className="text-sm text-muted-foreground ml-1">
                            /
                            {billingCycle === "yearly"
                              ? "year"
                              : "month"}
                          </span>
                        </div>
                        {billingCycle === "yearly" &&
                          plan.price.monthly > 0 && (
                            <div className="text-sm text-skillswap-success mt-1">
                              Save{" "}
                              {calculateYearlyDiscount(
                                plan.price.monthly,
                              )}
                              % annually
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Daily Limits */}
                  <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                    <h4 className="text-sm font-medium text-skillswap-primary">
                      Daily Limits
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="text-center p-2 bg-background rounded border">
                              <div className="font-medium text-skillswap-primary">
                                {plan.limits.requests}
                              </div>
                              <div className="text-muted-foreground">
                                Requests
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Number of skill learning requests
                              you can make per day
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="text-center p-2 bg-background rounded border">
                              <div className="font-medium text-skillswap-primary">
                                {plan.limits.connections}
                              </div>
                              <div className="text-muted-foreground">
                                Connects
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Number of new skill partners you
                              can connect with per day
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="text-center p-2 bg-background rounded border">
                              <div className="font-medium text-skillswap-accent">
                                {plan.limits.speakingTime}m
                              </div>
                              <div className="text-muted-foreground">
                                Speaking
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Maximum speaking time per session
                              (fair-time split)
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="text-center p-2 bg-background rounded border">
                              <div className="font-medium text-skillswap-accent">
                                {plan.limits.totalTime}m
                              </div>
                              <div className="text-muted-foreground">
                                Total
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Maximum total session time per day
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-skillswap-primary">
                      Features Included
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-skillswap-success mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-skillswap-primary hover:bg-skillswap-primary-dark text-white"
                        : "bg-background border border-skillswap-primary text-skillswap-primary hover:bg-skillswap-primary hover:text-white"
                    }`}
                    onClick={() => onNavigate("signup")}
                  >
                    {plan.cta}
                  </Button>

                  {billingCycle === "yearly" &&
                    plan.price.monthly > 0 && (
                      <p className="text-xs text-center text-muted-foreground">
                        Billed annually • Cancel anytime
                      </p>
                    )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pricing Details */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              All plans include access to our core platform
              features and community support.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
              <span>✓ No setup fees</span>
              <span>✓ Cancel anytime</span>
              <span>✓ 7-day free trial</span>
              <span>✓ Community support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-skillswap-primary/5 to-skillswap-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-section-title text-skillswap-primary mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of people already exchanging skills
              and building connections on SkillSwap. Start your
              journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => onNavigate("signup")}
                className="bg-skillswap-primary hover:bg-skillswap-primary-dark text-white px-8"
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("about")}
                className="border-skillswap-primary text-skillswap-primary hover:bg-skillswap-primary hover:text-white px-8"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <LogoLink onNavigate={onNavigate} size="md" />
                <span className="text-2xl font-bold text-skillswap-primary">
                  SkillSwap
                </span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                The global platform for skill exchange. Connect with learners and teachers worldwide 
                to grow your knowledge and share your expertise.
              </p>

              {/* Community Stats */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-skillswap-success rounded-full animate-pulse"></div>
                  <span className="text-skillswap-success font-medium">
                    Global Community
                  </span>
                  <span className="text-muted-foreground">
                    of Learners
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-skillswap-primary" />
                  <span className="text-skillswap-primary font-medium">
                    Safe & Secure
                  </span>
                  <span className="text-muted-foreground">
                    Platform
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-skillswap-accent" />
                  <span className="text-skillswap-accent font-medium">
                    Verified
                  </span>
                  <span className="text-muted-foreground">
                    User Profiles
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <button
                    onClick={() => onNavigate("signup")}
                    className="hover:text-foreground transition-colors"
                  >
                    Get Started
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("about")}
                    className="hover:text-foreground transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("help")}
                    className="hover:text-foreground transition-colors"
                  >
                    Help Center
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <button
                    onClick={() => onNavigate("help")}
                    className="hover:text-foreground transition-colors"
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("community")}
                    className="hover:text-foreground transition-colors"
                  >
                    Community
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("safety")}
                    className="hover:text-foreground transition-colors"
                  >
                    Safety Guidelines
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate("contact")}
                    className="hover:text-foreground transition-colors"
                  >
                    Contact Support
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="mb-8" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SkillSwap. All
              rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <button className="hover:text-foreground transition-colors">
                Privacy Policy
              </button>
              <button className="hover:text-foreground transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>

      <ScrollToTop showAfter={400} />
    </div>
  );
}