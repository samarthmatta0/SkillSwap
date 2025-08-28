import React, { useState, useEffect } from 'react';
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
  Zap,
  Crown,
  Award,
} from "lucide-react";

interface PricingPageProps {
  onNavigate: (page: string) => void;
  onBack?: () => void;
  canGoBack?: boolean;
}

export default function PricingPage({
  onNavigate,
  onBack,
  canGoBack = false,
}: PricingPageProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
      icon: Star,
      color: "from-gray-100 to-gray-200",
      textColor: "text-gray-700",
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
      icon: BookOpen,
      color: "from-blue-100 to-blue-200",
      textColor: "text-blue-700",
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
      icon: Zap,
      color: "from-amber-100 to-amber-200",
      textColor: "text-amber-700",
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
      icon: Crown,
      color: "from-purple-100 to-purple-200",
      textColor: "text-purple-700",
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
              {canGoBack && (
                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="ml-4 header-button btn-stable"
                >
                  ← Back
                </Button>
              )}
            </div>

            {/* Center - Navigation */}
            <nav className="hidden md:flex items-center space-x-8 header-nav flex-1">
              <button
                onClick={() => onNavigate("landing")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => onNavigate("about")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </button>
              <button
                onClick={() => onNavigate("pricing")}
                className="text-skillswap-primary font-medium"
              >
                Pricing
              </button>
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
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden mobile-menu-btn"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
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

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white z-[60]">
          <div className="container mx-auto px-4 py-6">
            <nav className="space-y-4 mb-6">
              <button
                onClick={() => {
                  onNavigate("landing");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-muted-foreground hover:text-skillswap-primary transition-all duration-200 hover:bg-skillswap-primary/10"
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
                  onNavigate("pricing");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-skillswap-primary font-semibold bg-skillswap-primary/10 transition-all duration-200 hover:bg-skillswap-primary/20"
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
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Pricing Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-amber-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-amber-100 rounded-full blur-2xl opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-700 bg-clip-text text-transparent">
                Learning Plan
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Start with our free trial, then choose the plan that fits your learning journey.
              All plans include our fair-time system for balanced skill exchange.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`font-medium ${billingCycle === "monthly" ? "text-skillswap-primary" : "text-gray-500"}`}>
                Monthly
              </span>
              <Switch
                checked={billingCycle === "yearly"}
                onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
                className="data-[state=checked]:bg-skillswap-primary"
              />
              <span className={`font-medium ${billingCycle === "yearly" ? "text-skillswap-primary" : "text-gray-500"}`}>
                Yearly
              </span>
              <Badge variant="secondary" className="bg-skillswap-accent/10 text-skillswap-accent border-skillswap-accent/20">
                Save up to 17%
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <Card
                  key={plan.name}
                  className={`relative overflow-hidden border-2 hover:shadow-2xl transition-all duration-500 card-stable ${
                    plan.popular
                      ? "border-skillswap-primary shadow-xl scale-105"
                      : "border-gray-200 hover:border-skillswap-primary/50"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-skillswap-primary text-white text-center py-2 text-sm font-semibold">
                      ⭐ Most Popular
                    </div>
                  )}

                  <CardHeader className={`text-center ${plan.popular ? "pt-8" : ""}`}>
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                      <IconComponent className={`w-8 h-8 ${plan.textColor}`} />
                    </div>
                    
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-lg">{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="text-center space-y-6">
                    {/* Pricing */}
                    <div className="space-y-2">
                      {plan.price[billingCycle] === 0 ? (
                        <div className="text-4xl font-bold text-skillswap-primary">Free</div>
                      ) : (
                        <>
                          <div className="text-4xl font-bold text-skillswap-primary">
                            ${billingCycle === "yearly" ? plan.price.yearly : plan.price.monthly}
                            {billingCycle === "yearly" && (
                              <span className="text-lg text-gray-500 ml-1">
                                /year
                              </span>
                            )}
                            {billingCycle === "monthly" && plan.price.monthly > 0 && (
                              <span className="text-lg text-gray-500 ml-1">
                                /month
                              </span>
                            )}
                          </div>
                          {billingCycle === "yearly" && plan.price.monthly > 0 && (
                            <div className="text-sm text-gray-500">
                              <span className="line-through">
                                ${plan.price.monthly * 12}/year
                              </span>
                              <Badge variant="secondary" className="ml-2 bg-skillswap-accent/10 text-skillswap-accent">
                                {calculateYearlyDiscount(plan.price.monthly)}% off
                              </Badge>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    <Separator />

                    {/* Features */}
                    <div className="space-y-3 text-left">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-skillswap-success shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* CTA Button */}
                    <Button
                      onClick={() => onNavigate("signup")}
                      className={`w-full py-6 text-lg font-semibold rounded-xl transition-all duration-300 ${
                        plan.popular
                          ? "bg-skillswap-primary hover:bg-skillswap-primary-dark text-white shadow-lg hover:shadow-2xl btn-glow"
                          : "bg-gray-100 hover:bg-skillswap-primary hover:text-white text-gray-700"
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Everything you need to know about our pricing and plans.
            </p>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-3">What is the fair-time system?</h3>
                <p className="text-gray-600">
                  Our fair-time system ensures balanced exchanges. When you teach someone for 30 minutes, 
                  you earn 30 minutes of learning time. It's completely fair and transparent.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-3">Can I change plans anytime?</h3>
                <p className="text-gray-600">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                  and we'll prorate any billing adjustments.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-3">What happens after my free trial?</h3>
                <p className="text-gray-600">
                  After your 7-day free trial, you can choose to continue with a paid plan or 
                  your account will be paused. No automatic charges.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-3">Do you offer refunds?</h3>
                <p className="text-gray-600">
                  Yes, we offer a 30-day money-back guarantee on all paid plans. 
                  If you're not satisfied, we'll refund your payment in full.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-skillswap-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of learners exchanging skills worldwide.
          </p>
          <Button
            onClick={() => onNavigate("signup")}
            size="lg"
            className="bg-white text-skillswap-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl btn-stable"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}