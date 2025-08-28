import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { LogoLink } from './ui/logo';
import { Card3D } from './ui/card-3d';
import { 
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Play,
  User,
  Users,
  MessageCircle,
  Clock,
  Shield,
  Star,
  Globe,
  BookOpen,
  TrendingUp,
  Heart,
  Zap,
  Target,
  Award,
  Calendar,
  Video,
  Settings,
  CreditCard,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

interface GetStartedPageProps {
  onNavigate: (page: string) => void;
  onBack: () => void;
  canGoBack: boolean;
}

export default function GetStartedPage({ onNavigate, onBack, canGoBack }: GetStartedPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [email, setEmail] = useState('');

  // Steps for getting started
  const steps = [
    {
      id: 1,
      title: "Create Your Profile",
      description: "Set up your account with skills you can teach and want to learn",
      icon: User,
      duration: "2 minutes",
      tasks: [
        "Sign up with email and verify your account",
        "Add a profile photo and write a brief bio",
        "List 3-5 skills you can teach confidently",
        "Choose 3-5 skills you want to learn",
        "Set your availability and timezone"
      ]
    },
    {
      id: 2,
      title: "Get Verified",
      description: "Build trust with identity verification and skill validation",
      icon: Shield,
      duration: "5 minutes",
      tasks: [
        "Verify your identity with a government ID",
        "Complete a brief video introduction",
        "Get endorsed by existing community members",
        "Take optional skill assessments",
        "Set up payment and payout methods"
      ]
    },
    {
      id: 3,
      title: "Find Your Match",
      description: "Discover perfect learning partners with complementary skills",
      icon: Users,
      duration: "10 minutes",
      tasks: [
        "Browse skills you want to learn",
        "Filter by experience level and location",
        "Read profiles and reviews of potential partners",
        "Send connection requests with personalized messages",
        "Wait for acceptance and start chatting"
      ]
    },
    {
      id: 4,
      title: "Schedule Your First Session",
      description: "Book your first skill exchange with built-in fair-time system",
      icon: Calendar,
      duration: "5 minutes",
      tasks: [
        "Choose available time slots that work for both",
        "Set session goals and topics to cover",
        "Confirm the fair-time split (equal teaching/learning)",
        "Add the session to your calendar",
        "Prepare materials and questions in advance"
      ]
    },
    {
      id: 5,
      title: "Join Your Session",
      description: "Experience live skill exchange with built-in tools and timers",
      icon: Video,
      duration: "30-60 minutes",
      tasks: [
        "Join the video call 5 minutes early",
        "Use the fair-time timer to track speaking time",
        "Share your screen for demonstrations",
        "Take notes using the built-in notepad",
        "Rate and review your learning partner"
      ]
    }
  ];

  // Success metrics
  const metrics = [
    { number: "25,000+", label: "Active Members", icon: Users },
    { number: "150+", label: "Countries", icon: Globe },
    { number: "1M+", label: "Skills Exchanged", icon: TrendingUp },
    { number: "4.8/5", label: "Average Rating", icon: Star }
  ];

  // Popular skill categories
  const skillCategories = [
    { name: "Programming", count: "2,500+ members", color: "bg-blue-500", icon: BookOpen },
    { name: "Languages", count: "3,800+ members", color: "bg-green-500", icon: MessageCircle },
    { name: "Design", count: "1,200+ members", color: "bg-purple-500", icon: Heart },
    { name: "Business", count: "1,900+ members", color: "bg-orange-500", icon: TrendingUp },
    { name: "Music", count: "800+ members", color: "bg-pink-500", icon: Play },
    { name: "Fitness", count: "600+ members", color: "bg-emerald-500", icon: Zap }
  ];

  // Success stories
  const successStories = [
    {
      name: "Sarah Chen",
      location: "Tokyo, Japan",
      story: "Learned React from a Silicon Valley developer while teaching Japanese. Now building my own startup!",
      skills: "React ↔ Japanese",
      sessions: 12,
      rating: 5,
      avatar: "S"
    },
    {
      name: "Miguel Rodriguez", 
      location: "Barcelona, Spain",
      story: "Exchanged UX design knowledge for Python skills. Landed a remote job at a tech company.",
      skills: "UX Design ↔ Python",
      sessions: 18,
      rating: 5,
      avatar: "M"
    },
    {
      name: "Priya Patel",
      location: "Mumbai, India", 
      story: "Taught digital marketing while learning French. Planning to move to Paris next year!",
      skills: "Marketing ↔ French",
      sessions: 24,
      rating: 5,
      avatar: "P"
    }
  ];

  const markStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onNavigate('signup');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              {canGoBack && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="gap-2 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              )}
              <LogoLink onNavigate={onNavigate} size="md" />
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => onNavigate('login')}
                className="hidden sm:inline-flex"
              >
                Sign In
              </Button>
              <Button
                onClick={() => onNavigate('signup')}
                className="bg-skillswap-primary hover:bg-skillswap-primary-dark text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-amber-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-amber-100 rounded-full blur-2xl opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl font-black mb-6 text-gray-900 leading-tight">
              Get Started with
              <br />
              <span className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-700 bg-clip-text text-transparent">
                SkillSwap
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Join thousands of learners worldwide exchanging skills through live 1:1 sessions. 
              Start your journey in just 5 simple steps.
            </p>

            {/* Quick Start CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                onClick={() => onNavigate('signup')}
                className="group bg-skillswap-primary hover:bg-skillswap-primary-dark text-white px-8 py-4 text-lg font-semibold"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-skillswap-primary text-skillswap-primary hover:bg-skillswap-primary hover:text-white px-8 py-4 text-lg font-semibold"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-skillswap-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <metric.icon className="w-6 h-6 text-skillswap-primary" />
                  </div>
                  <div className="text-2xl font-bold text-skillswap-primary">{metric.number}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Step by Step */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-section-title text-skillswap-primary mb-4">
              How to Get Started
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to begin your skill exchange journey and connect with learners worldwide.
            </p>
          </div>

          {/* Interactive Step Timeline */}
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="relative mb-12 last:mb-0">
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-20 bg-gray-200 hidden md:block"></div>
                )}
                
                <Card className={`transition-all duration-300 hover:shadow-lg ${
                  completedSteps.includes(index) ? 'border-skillswap-success bg-skillswap-success/5' : 'hover:border-skillswap-primary/50'
                }`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      {/* Step Icon */}
                      <div className={`relative flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ${
                        completedSteps.includes(index) 
                          ? 'bg-skillswap-success text-white'
                          : 'bg-skillswap-primary text-white'
                      }`}>
                        {completedSteps.includes(index) ? (
                          <CheckCircle className="w-8 h-8" />
                        ) : (
                          <step.icon className="w-8 h-8" />
                        )}
                        
                        {/* Step number badge */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-skillswap-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {step.id}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <CardTitle className="text-xl">{step.title}</CardTitle>
                          <Badge variant="secondary" className="bg-skillswap-primary/10 text-skillswap-primary">
                            <Clock className="w-3 h-3 mr-1" />
                            {step.duration}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-4">{step.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Task checklist */}
                    <div className="space-y-3">
                      {step.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 bg-skillswap-primary rounded-full opacity-0"></div>
                          </div>
                          <span className="text-sm text-muted-foreground leading-relaxed">{task}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Action Button */}
                    <div className="mt-6">
                      <Button
                        variant={completedSteps.includes(index) ? "outline" : "default"}
                        onClick={() => {
                          if (index === 0) {
                            onNavigate('signup');
                          } else {
                            markStepComplete(index);
                          }
                        }}
                        className={completedSteps.includes(index) 
                          ? "border-skillswap-success text-skillswap-success hover:bg-skillswap-success hover:text-white"
                          : "bg-skillswap-primary hover:bg-skillswap-primary-dark text-white"
                        }
                      >
                        {completedSteps.includes(index) ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Completed
                          </>
                        ) : index === 0 ? (
                          <>
                            Start This Step
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        ) : (
                          <>
                            Mark Complete
                            <CheckCircle className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Skills */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-section-title text-skillswap-primary mb-4">
              Popular Skills to Exchange
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the most active skill communities on our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {skillCategories.map((category, index) => (
              <Card3D key={index} className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300">
                <CardContent className="text-center p-0">
                  <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-skillswap-primary mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count}</p>
                </CardContent>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-section-title text-skillswap-primary mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real people achieving their learning goals through skill exchange
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-skillswap-primary to-skillswap-primary-light rounded-full flex items-center justify-center text-white font-bold">
                      {story.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold">{story.name}</h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {story.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-skillswap-accent/10 text-skillswap-accent-dark">
                      {story.skills}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-skillswap-accent fill-current" />
                      <span className="text-sm font-medium">{story.rating}.0</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    "{story.story}"
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{story.sessions} sessions completed</span>
                    <div className="flex items-center gap-1 text-skillswap-success">
                      <CheckCircle className="w-4 h-4" />
                      <span>Verified</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Sign Up */}
      <section className="py-20 bg-gradient-to-br from-skillswap-primary/5 to-skillswap-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-section-title text-skillswap-primary mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join SkillSwap today and start exchanging skills with people around the world.
            </p>
            
            {/* Email signup form */}
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button
                type="submit"
                className="bg-skillswap-primary hover:bg-skillswap-primary-dark text-white px-8"
              >
                Get Started
              </Button>
            </form>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-skillswap-success" />
                <span>Free 7-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-skillswap-success" />
                <span>Secure & verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-skillswap-success" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <LogoLink onNavigate={onNavigate} size="md" />
                <span className="text-2xl font-bold text-skillswap-primary">SkillSwap</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                The world's first platform for fair skill exchange. Learn from anyone, teach anything.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Getting Started</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => onNavigate('signup')} className="hover:text-foreground transition-colors">
                    Create Account
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('about')} className="hover:text-foreground transition-colors">
                    How It Works
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('help')} className="hover:text-foreground transition-colors">
                    Help Center
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => onNavigate('contact')} className="hover:text-foreground transition-colors">
                    Contact Us
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('safety')} className="hover:text-foreground transition-colors">
                    Safety Guidelines
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('community')} className="hover:text-foreground transition-colors">
                    Community
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SkillSwap. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <button onClick={() => onNavigate('privacy')} className="hover:text-foreground transition-colors">
                Privacy Policy
              </button>
              <button onClick={() => onNavigate('terms')} className="hover:text-foreground transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}