import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { LogoLink } from './ui/logo';
import { Footer } from './ui/footer';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Users,
  Globe,
  Heart,
  Lightbulb,
  Target,
  Award,
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Star,
  Zap,
  Shield,
  TrendingUp,
  Clock,
  MessageCircle,
  Menu,
  X,
  Building2,
  Crown,
  Handshake,
  Rocket,
  MapPin,
  Calendar,
  ChevronRight,
  Quote
} from 'lucide-react';

// Import flag images
import japanFlag from 'figma:asset/c40067f7e06618acf032f23cef2a6d09b2125887.png';
import mexicoFlag from 'figma:asset/4d4b88c69e7a51ef74ec530b00fa112c731bb22d.png';
import australiaFlag from 'figma:asset/49b623dfa28b8deddbda58127fcc9d998404c030.png';

// Import founder and co-founder images
import founderImage from 'figma:asset/8a4498cf4c24d0b6a6c9e332f438b55e14c4ba0c.png';
import coFounderImage from 'figma:asset/bceb4b8175ce2565b0bba6c0b9feddede5cd18ee.png';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [visibleTimelineItems, setVisibleTimelineItems] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Timeline scroll animation effect
  useEffect(() => {
    const observerOptions = {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      rootMargin: '-10% 0px -10% 0px'
    };

    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const timelineSection = entry.target;
        if (entry.isIntersecting) {
          // Calculate timeline progress based on intersection ratio
          const progress = Math.min(entry.intersectionRatio * 1.2, 1);
          setTimelineProgress(progress);
        }
      });
    }, observerOptions);

    const itemObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const itemIndex = parseInt(entry.target.getAttribute('data-timeline-index') || '0');
        if (entry.isIntersecting) {
          setVisibleTimelineItems(prev => {
            if (!prev.includes(itemIndex)) {
              return [...prev, itemIndex].sort((a, b) => a - b);
            }
            return prev;
          });
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -20% 0px'
    });

    // Setup observers
    const timelineSection = document.querySelector('[data-timeline-section]');
    if (timelineSection) {
      timelineObserver.observe(timelineSection);
    }

    const timelineItems = document.querySelectorAll('[data-timeline-index]');
    timelineItems.forEach(item => {
      itemObserver.observe(item);
    });

    return () => {
      timelineObserver.disconnect();
      itemObserver.disconnect();
    };
  }, []);

  const getHeaderClass = () => {
    if (scrollPosition === 0) return 'bg-white/70 backdrop-blur-sm transition-all duration-300 ease-out';
    if (scrollPosition < 50) return 'bg-white/75 backdrop-blur-md shadow-sm transition-all duration-300 ease-out';
    if (scrollPosition < 200) return 'bg-white/85 backdrop-blur-lg shadow-md transition-all duration-300 ease-out';
    return 'bg-white/90 backdrop-blur-xl shadow-lg transition-all duration-300 ease-out';
  };

  const stats = [
    { number: 'Growing', label: 'Community', icon: Users, trend: 'Building connections' },
    { number: 'Global', label: 'Vision', icon: Globe, trend: 'Connecting minds' },
    { number: 'Every Day', label: 'Learning', icon: BookOpen, trend: 'Skills shared' },
    { number: 'Human', label: 'Connection', icon: Star, trend: 'Real relationships' },
  ];

  const coreValues = [
    {
      icon: Heart,
      title: 'Human Connection',
      description: 'We believe in the power of authentic human-to-human learning, building real relationships through skill exchange.',
      color: 'text-skillswap-primary',
      bgColor: 'bg-skillswap-primary/5',
      borderColor: 'border-skillswap-primary/20'
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Creating a secure environment where everyone feels safe to learn, teach, and grow together.',
      color: 'text-skillswap-primary-dark',
      bgColor: 'bg-skillswap-primary/8',
      borderColor: 'border-skillswap-primary/25'
    },
    {
      icon: Target,
      title: 'Accessibility',
      description: 'Breaking down barriers to make quality education and mentorship available to everyone, everywhere.',
      color: 'text-skillswap-accent',
      bgColor: 'bg-skillswap-accent/8',
      borderColor: 'border-skillswap-accent/25'
    },
    {
      icon: Zap,
      title: 'Fair Exchange',
      description: 'Ensuring balanced value exchange where both learners and teachers benefit equally from every interaction.',
      color: 'text-skillswap-accent-dark',
      bgColor: 'bg-skillswap-accent/10',
      borderColor: 'border-skillswap-accent/30'
    }
  ];

  const timeline = [
    {
      year: '2024',
      quarter: 'Q1',
      title: 'The Vision',
      description: 'Samarth Matta and Samarth Vashishth created SkillSwap from a simple belief: everyone has something valuable to teach and learn.',
      icon: Lightbulb,
      color: 'bg-skillswap-primary',
      achievements: ['The idea was born', 'First conversations about fair learning', 'Vision for human connection']
    },
    {
      year: '2024',
      quarter: 'Q2',
      title: 'Platform Development',
      description: 'We began building the platform, focusing on creating meaningful connections between learners and teachers.',
      icon: Rocket,
      color: 'bg-purple-600',
      achievements: ['Platform foundation', 'Fair-time concept', 'User-centered design']
    },
    {
      year: '2024',
      quarter: 'Q3',
      title: 'First Connections',
      description: 'The first version came to life, enabling people to connect and share skills in meaningful ways.',
      icon: Users,
      color: 'bg-skillswap-accent',
      achievements: ['Platform launch', 'First skill exchanges', 'Community building begins']
    },
    {
      year: '2024',
      quarter: 'Q4',
      title: 'Growing Together',
      description: 'Our community began to grow as more people discovered the joy of learning from and teaching others.',
      icon: Globe,
      color: 'bg-emerald-600',
      achievements: ['Community growth', 'Real connections', 'Stories of learning']
    },
    {
      year: '2025',
      quarter: 'Q1',
      title: 'Building Dreams',
      description: 'We continue improving the platform, guided by our community and the belief that everyone deserves to learn.',
      icon: TrendingUp,
      color: 'bg-indigo-600',
      achievements: ['Continuous improvement', 'User feedback', 'Building the future']
    }
  ];

  const teamMembers = [
    {
      name: 'Samarth Matta',
      role: 'Founder & CEO',
      description: 'Visionary entrepreneur passionate about democratizing education and creating global learning opportunities.',
      icon: Crown,
      color: 'text-skillswap-primary',
      bgColor: 'bg-skillswap-primary/10',
      expertise: ['Product Strategy', 'Global Expansion', 'Vision & Leadership'],
      quote: 'Every person has something valuable to teach and learn. We are building the bridge that connects them.',
      hasImage: true,
      image: founderImage
    },
    {
      name: 'Samarth Vashishth',
      role: 'Co-Founder',
      description: 'Technology leader and innovation driver focused on building scalable platforms that transform how people learn.',
      icon: Rocket,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      expertise: ['Technology Leadership', 'Platform Architecture', 'Innovation'],
      quote: 'Technology should empower human connections, not replace them. We are creating the future of peer learning.',
      hasImage: true,
      image: coFounderImage
    }
  ];

  const achievements = [
    { title: 'Featured in TechCrunch', subtitle: 'Top EdTech Startup 2024', icon: Award },
    { title: 'Global Recognition', subtitle: 'Best Learning Platform', icon: Globe },
    { title: 'Community Choice', subtitle: '99% User Satisfaction', icon: Heart },
    { title: 'Innovation Award', subtitle: 'Best Peer Learning Solution', icon: Lightbulb }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`border-b border-gray-200/60 sticky top-0 z-50 ${getHeaderClass()}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center header-logo flex-1">
              <LogoLink onNavigate={onNavigate} size="md" />
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center space-x-8 header-nav flex-1">
              <button
                onClick={() => onNavigate("landing")}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => onNavigate("about")}
                className="text-skillswap-primary font-medium"
                aria-current="page"
              >
                About
              </button>
              <button
                onClick={() => onNavigate("community")}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Community
              </button>
              <button
                onClick={() => onNavigate("help")}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Help
              </button>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center justify-end space-x-4 header-actions flex-1">
              <Button
                variant="ghost"
                onClick={() => onNavigate("login")}
                className="header-button btn-stable"
              >
                Sign In
              </Button>
              <Button
                onClick={() => onNavigate("signup")}
                className="bg-skillswap-primary hover:bg-skillswap-primary-dark text-white header-button btn-stable"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="header-button mobile-menu-btn relative overflow-hidden"
              >
                <div className={`transition-all duration-300 ease-out ${isMobileMenuOpen ? 'rotate-180 scale-110' : 'rotate-0 scale-100'}`}>
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6 transition-all duration-200 ease-out" />
                  ) : (
                    <Menu className="h-6 w-6 transition-all duration-200 ease-out" />
                  )}
                </div>
                <div className="absolute inset-0 rounded-md bg-skillswap-primary/10 scale-0 transition-transform duration-300 ease-out mobile-menu-ripple"></div>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-lg animate-mobile-menu-enter">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => {
                    onNavigate("landing");
                    setIsMobileMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md w-full text-left transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    onNavigate("about");
                    setIsMobileMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-base font-medium text-skillswap-primary bg-skillswap-primary/5 rounded-md w-full text-left"
                  aria-current="page"
                >
                  About
                </button>
                <button
                  onClick={() => {
                    onNavigate("community");
                    setIsMobileMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md w-full text-left transition-colors"
                >
                  Community
                </button>
                <button
                  onClick={() => {
                    onNavigate("help");
                    setIsMobileMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md w-full text-left transition-colors"
                >
                  Help
                </button>
                <div className="pt-4 pb-2 border-t border-gray-200 mt-4">
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        onNavigate("login");
                        setIsMobileMenuOpen(false);
                      }}
                      className="justify-start"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => {
                        onNavigate("signup");
                        setIsMobileMenuOpen(false);
                      }}
                      className="bg-skillswap-primary hover:bg-skillswap-primary-dark text-white"
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 bg-gradient-to-br from-skillswap-neutral via-white to-skillswap-primary/5 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 right-20 w-96 h-96 bg-skillswap-primary/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 left-20 w-80 h-80 bg-skillswap-accent/8 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-skillswap-primary/3 to-skillswap-accent/3 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            
            {/* Company badge */}
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-skillswap-primary/20 text-skillswap-primary px-6 py-3 rounded-full shadow-lg">
              <Building2 className="w-5 h-5" />
              <span className="font-semibold">SkillSwap</span>
              <Badge variant="secondary" className="bg-skillswap-accent/10 text-skillswap-accent border-skillswap-accent/20">
                Est. 2024
              </Badge>
            </div>
            
            {/* Main heading */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Connecting Minds,
                <br />
                <span className="skillswap-hero-gradient">Sharing Skills</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                We started with a simple belief: everyone has something valuable to teach and learn. 
                SkillSwap is our attempt to create a space where people can connect authentically, 
                share their knowledge, and grow together through genuine human interaction.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                onClick={() => onNavigate('signup')}
                className="bg-skillswap-primary hover:bg-skillswap-primary-dark text-white px-10 py-4 rounded-xl font-semibold text-lg btn-stable shadow-lg"
              >
                <Users className="w-6 h-6 mr-3" />
                Join Our Community
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('landing')}
                className="border-2 border-skillswap-primary text-skillswap-primary hover:bg-skillswap-primary/10 hover:text-skillswap-primary-dark hover:border-skillswap-primary-dark px-10 py-4 rounded-xl font-semibold text-lg btn-stable transition-all duration-200"
              >
                <Heart className="w-6 h-6 mr-3" />
                Learn More
              </Button>
            </div>

            {/* Global impact stats */}
            <div className="mt-20">
              {/* Stats section header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-skillswap-primary/10 text-skillswap-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Star className="w-4 h-4" />
                  Our Impact
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Building a <span className="text-skillswap-primary">Better Future</span> Together
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Every connection made, every skill shared, and every relationship built contributes to our vision of democratized learning.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {stats.map((stat, index) => {
                  const images = [
                    "https://images.unsplash.com/photo-1658734029438-d97357737bf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwY29tbXVuaXR5JTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NTYzOTY5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
                    "https://images.unsplash.com/photo-1742415105376-43d3a5fd03fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG9iYWwlMjB3b3JsZCUyMG1hcCUyMGNvbm5lY3Rpb258ZW58MXx8fHwxNzU2Mzk2OTk4fDA&ixlib=rb-4.1.0&q=80&w=1080",
                    "https://images.unsplash.com/photo-1617755870291-1f0de453ad30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMGVkdWNhdGlvbiUyMGxhcHRvcHxlbnwxfHx8fDE3NTYzOTY5OTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
                    "https://images.unsplash.com/photo-1752159684779-0639174cdfac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kc2hha2UlMjBidXNpbmVzcyUyMGh1bWFuJTIwY29ubmVjdGlvbnxlbnwxfHx8fDE3NTYzOTY5OTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  ];
                  
                  return (
                    <Card key={index} className="overflow-hidden bg-white border border-gray-200 hover:border-skillswap-primary/30 hover:shadow-lg transition-all duration-200 rounded-xl">
                      {/* Image Header */}
                      <div className="relative h-32 overflow-hidden">
                        <ImageWithFallback
                          src={images[index]}
                          alt={`${stat.label} illustration`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-skillswap-primary/80"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                            <stat.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 text-center">
                        <div className="text-3xl font-bold text-skillswap-primary mb-2">{stat.number}</div>
                        <div className="text-sm font-medium text-gray-700 mb-2">{stat.label}</div>
                        <div className="text-xs text-skillswap-accent font-medium">{stat.trend}</div>
                      </div>
                    </Card>
                  );
                })}
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-16 pt-8 border-t border-gray-200">
                <p className="text-center text-sm text-gray-500 mb-6">Trusted by learners and teachers worldwide</p>
                <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                  {/* Trust badges */}
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                    <Shield className="w-4 h-4 text-skillswap-primary" />
                    <span className="text-xs font-medium text-gray-600">Secure Platform</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-skillswap-success" />
                    <span className="text-xs font-medium text-gray-600">Verified Users</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                    <Clock className="w-4 h-4 text-skillswap-accent" />
                    <span className="text-xs font-medium text-gray-600">24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                    <Star className="w-4 h-4 text-skillswap-accent" />
                    <span className="text-xs font-medium text-gray-600">Quality Assured</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          {/* Leadership Team Section */}
          <section className="reveal-on-scroll">
            <div className="text-center mb-16 space-y-6 reveal-on-scroll">
              <div className="inline-flex items-center gap-2 bg-skillswap-primary/10 text-skillswap-primary px-4 py-2 rounded-full text-sm font-medium">
                <Crown className="w-4 h-4" />
                Leadership Team
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Meet Our <span className="text-skillswap-primary">Founders</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Passionate entrepreneurs and technology leaders building the future of human-to-human learning
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              {teamMembers.map((member, index) => (
                <Card key={index} className={`p-10 ${member.bgColor} border-2 ${member.color === 'text-skillswap-primary' ? 'border-skillswap-primary/20' : 'border-purple-200'} hover:shadow-2xl hover:border-opacity-40 transition-all duration-500 rounded-3xl card-stable reveal-on-scroll`}
                  style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="space-y-6">
                    
                    {/* Member header */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                      <div className="relative">
                        {/* Background glow effect */}
                        <div className={`absolute inset-0 w-32 h-32 sm:w-36 sm:h-36 rounded-3xl ${member.color === 'text-skillswap-primary' ? 'bg-skillswap-primary/20' : 'bg-purple-500/20'} blur-xl scale-110 opacity-40`}></div>
                        
                        <div className={`relative w-32 h-32 sm:w-36 sm:h-36 rounded-3xl shadow-2xl border-4 ${member.color === 'text-skillswap-primary' ? 'border-skillswap-primary/40 shadow-skillswap-primary/30' : 'border-purple-300 shadow-purple-500/30'} overflow-hidden ${!member.hasImage ? `${member.bgColor} flex items-center justify-center` : 'group cursor-default flex-shrink-0'} bg-white`}>
                          {member.hasImage ? (
                            <>
                              <ImageWithFallback
                                src={member.image}
                                alt={`${member.name} profile photo`}
                                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/5 via-transparent to-transparent group-hover:from-black/0 transition-all duration-500 pointer-events-none"></div>
                            </>
                          ) : (
                            <member.icon className={`w-12 h-12 ${member.color}`} />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{member.name}</h3>
                          <p className={`text-lg sm:text-xl font-semibold ${member.color}`}>{member.role}</p>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-base sm:text-lg">{member.description}</p>
                      </div>
                    </div>

                    {/* Expertise */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className={`${member.bgColor} ${member.color} border ${member.color === 'text-skillswap-primary' ? 'border-skillswap-primary/30' : 'border-purple-300'}`}>
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="bg-white/70 border-l-4 border-skillswap-accent p-6 rounded-r-xl">
                      <Quote className="w-6 h-6 text-skillswap-accent mb-3" />
                      <p className="text-gray-700 italic leading-relaxed">{member.quote}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Company info */}
            <div className="mt-16 text-center">
              <Card className="p-8 bg-gradient-to-r from-skillswap-primary/5 to-skillswap-accent/5 border border-skillswap-primary/20 rounded-2xl">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Building2 className="w-12 h-12 text-skillswap-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">SkillSwap</h3>
                  <p className="text-lg text-gray-600">
                    A platform where people connect to share knowledge, learn new skills, and build meaningful relationships
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <Badge variant="outline" className="border-skillswap-accent text-skillswap-accent">
                      <Calendar className="w-3 h-3 mr-1" />
                      Founded 2024
                    </Badge>
                    <Badge variant="outline" className="border-emerald-500 text-emerald-600">
                      <Globe className="w-3 h-3 mr-1" />
                      Global Operations
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Mission & Vision Section */}
          <section className="reveal-on-scroll">
            <div className="text-center mb-16 space-y-6 reveal-on-scroll">
              <div className="inline-flex items-center gap-2 bg-skillswap-accent/10 text-skillswap-accent px-4 py-2 rounded-full text-sm font-medium">
                <Target className="w-4 h-4" />
                Mission & Vision
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Our <span className="text-skillswap-accent">Purpose</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Mission */}
              <Card className="p-8 bg-gradient-to-br from-skillswap-primary/5 to-skillswap-primary/10 border border-skillswap-primary/20 rounded-2xl reveal-on-scroll card-stable">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-skillswap-primary/10 rounded-xl flex items-center justify-center">
                      <Target className="w-8 h-8 text-skillswap-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-skillswap-primary">Our Mission</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    To create a space where learning happens naturally between people - where a designer can teach creativity 
                    while learning coding, where a musician shares rhythm while discovering new languages, where knowledge 
                    flows freely because everyone has something to offer.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-skillswap-success" />
                      <span className="text-gray-700">Connect learners with expert mentors globally</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-skillswap-success" />
                      <span className="text-gray-700">Ensure fair and balanced skill exchange</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-skillswap-success" />
                      <span className="text-gray-700">Build trust and safety in learning communities</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Vision */}
              <Card className="p-8 bg-gradient-to-br from-skillswap-accent/5 to-skillswap-accent/10 border border-skillswap-accent/20 rounded-2xl reveal-on-scroll card-stable"
                style={{ animationDelay: '200ms' }}>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-skillswap-accent/10 rounded-xl flex items-center justify-center">
                      <Lightbulb className="w-8 h-8 text-skillswap-accent" />
                    </div>
                    <h3 className="text-2xl font-bold text-skillswap-accent">Our Vision</h3>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    A world where every person's skills are valued and accessible, creating a global learning economy 
                    that empowers individuals and communities to grow together through authentic human connections.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-skillswap-accent" />
                      <span className="text-gray-700">100 million connected learners by 2030</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-skillswap-accent" />
                      <span className="text-gray-700">Skills accessible in every language and culture</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-skillswap-accent" />
                      <span className="text-gray-700">AI-powered personalized learning experiences</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Core Values Section */}
          <section className="reveal-on-scroll">
            <div className="text-center mb-16 space-y-6 reveal-on-scroll">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
                <Heart className="w-4 h-4" />
                Core Values
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                What <span className="text-emerald-600">Drives Us</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These fundamental principles guide every decision we make and every feature we build
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {coreValues.map((value, index) => (
                <Card key={index} className={`p-8 ${value.bgColor} border-2 ${value.borderColor} hover:shadow-xl transition-all duration-300 rounded-2xl card-stable reveal-on-scroll`}
                  style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 ${value.bgColor} rounded-xl flex items-center justify-center border-2 ${value.borderColor}`}>
                        <value.icon className={`w-7 h-7 ${value.color}`} />
                      </div>
                      <h3 className={`text-2xl font-bold ${value.color}`}>{value.title}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">{value.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Journey Timeline Section */}
          <section data-timeline-section className="timeline-section">
            <div className="text-center mb-16 space-y-6 reveal-on-scroll">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                <Clock className="w-4 h-4" />
                Our Journey
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                The <span className="text-purple-600">SkillSwap Story</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From vision to global impact - how we are building the future of learning
              </p>
            </div>

            <div className="relative timeline-container">
              {/* Timeline line with progressive animation */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200 timeline-line-bg"></div>
              <div 
                className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 w-1 bg-gradient-to-b from-skillswap-primary via-skillswap-accent to-purple-600 timeline-line-progress transition-all duration-1000 ease-out"
                style={{ 
                  height: `${timelineProgress * 100}%`,
                  transformOrigin: 'top'
                }}
              ></div>

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div 
                    key={index} 
                    data-timeline-index={index}
                    className={`timeline-item relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:items-center gap-8 ${
                      visibleTimelineItems.includes(index) ? 'timeline-item-visible' : 'timeline-item-hidden'
                    }`}
                    style={{ 
                      transitionDelay: `${index * 200}ms`,
                      animation: visibleTimelineItems.includes(index) ? `timelineItemSlide ${600 + index * 100}ms cubic-bezier(0.16, 1, 0.3, 1) both` : 'none'
                    }}
                  >
                    
                    {/* Timeline dot with scale animation */}
                    <div 
                      className={`timeline-dot absolute left-8 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1 w-4 h-4 rounded-full border-4 border-white shadow-lg z-10 transition-all duration-500 ${
                        visibleTimelineItems.includes(index) ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                      }`}
                      style={{ 
                        backgroundColor: item.color.replace('bg-', 'var(--color-') + ')',
                        transitionDelay: `${index * 200 + 300}ms`
                      }}
                    ></div>

                    {/* Content card with directional slide animation */}
                    <Card className={`timeline-card ${index % 2 === 0 ? 'md:mr-8 ml-20 md:ml-0' : 'md:ml-8 ml-20 md:mr-0'} flex-1 p-8 bg-white border border-gray-200 hover:border-skillswap-primary/30 transition-all duration-300 rounded-2xl shadow-lg card-stable`}>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div 
                            className={`timeline-icon w-12 h-12 ${item.color} rounded-xl flex items-center justify-center transition-all duration-500 ${
                              visibleTimelineItems.includes(index) ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                            }`}
                            style={{ transitionDelay: `${index * 200 + 500}ms` }}
                          >
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="timeline-content">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-semibold text-gray-500">{item.year}</span>
                              <Badge 
                                variant="outline" 
                                className={`text-xs transition-all duration-300 ${
                                  visibleTimelineItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                }`}
                                style={{ transitionDelay: `${index * 200 + 700}ms` }}
                              >
                                {item.quarter}
                              </Badge>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900 text-sm">Key Achievements:</h4>
                          <div className="flex flex-wrap gap-2">
                            {item.achievements.map((achievement, idx) => (
                              <Badge 
                                key={idx} 
                                variant="secondary" 
                                className={`text-xs transition-all duration-300 ${
                                  visibleTimelineItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                }`}
                                style={{ transitionDelay: `${index * 200 + 900 + idx * 100}ms` }}
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {achievement}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Empty space for alternating layout */}
                    <div className="hidden md:block flex-1"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Recognition & Achievements */}
          <section className="reveal-on-scroll">
            <div className="text-center mb-16 space-y-6 reveal-on-scroll">
              <div className="inline-flex items-center gap-2 bg-skillswap-accent/10 text-skillswap-accent px-4 py-2 rounded-full text-sm font-medium">
                <Award className="w-4 h-4" />
                Recognition
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Industry <span className="text-skillswap-accent">Recognition</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="p-6 text-center bg-white border border-gray-200 hover:border-skillswap-accent/30 transition-all duration-300 rounded-xl shadow-md card-stable reveal-on-scroll"
                  style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-skillswap-accent/10 rounded-full flex items-center justify-center mx-auto">
                      <achievement.icon className="w-6 h-6 text-skillswap-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.subtitle}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center reveal-on-scroll">
            <Card className="p-12 bg-gradient-to-br from-skillswap-primary via-skillswap-primary-light to-skillswap-accent text-white rounded-3xl shadow-2xl card-stable">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold">
                    Ready to Join the Revolution?
                  </h2>
                  <p className="text-xl opacity-90 max-w-2xl mx-auto">
                    Be part of the global community that's changing how we learn and grow together. 
                    Your skills matter, and the world is waiting to learn from you.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => onNavigate('signup')}
                    className="bg-white text-skillswap-primary hover:bg-gray-100 px-10 py-4 rounded-xl font-semibold text-lg btn-stable"
                  >
                    <Users className="w-6 h-6 mr-3" />
                    Start Your Journey
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => onNavigate('community')}
                    className="border-2 border-white text-white hover:bg-white hover:text-skillswap-primary px-10 py-4 rounded-xl font-semibold text-lg btn-stable"
                  >
                    <MessageCircle className="w-6 h-6 mr-3" />
                    Explore Community
                  </Button>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}