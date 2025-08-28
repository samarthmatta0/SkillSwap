import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Avatar } from './ui/avatar';
import { LogoLink } from './ui/logo';
import { Footer } from './ui/footer';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { 
  ArrowLeft, 
  MessageCircle, 
  MessageSquare,
  Users, 
  Heart, 
  Star,
  TrendingUp,
  Award,
  BookOpen,
  HelpCircle,
  Lightbulb,
  CheckCircle,
  Calendar,
  Globe,
  Clock,
  Coffee,
  Shield,
  Crown,
  Zap,
  X
} from 'lucide-react';

interface CommunityProps {
  onNavigate: (page: string) => void;
  onBack?: () => void;
  canGoBack?: boolean;
}

export default function Community({ onNavigate, onBack, canGoBack }: CommunityProps) {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const handleOpenModal = () => {
    console.log('Opening subscription modal');
    setShowSubscriptionModal(true);
  };

  const handleCloseModal = () => {
    console.log('Closing subscription modal');
    setShowSubscriptionModal(false);
  };

  const handleBackClick = () => {
    if (onBack && canGoBack) {
      onBack();
    } else {
      onNavigate('landing');
    }
  };

  const communityStats = [
    { label: "Platform Status", value: "Beta", icon: Users, color: "text-skillswap-primary" },
    { label: "Mission Focus", value: "Human Learning", icon: BookOpen, color: "text-skillswap-accent" },
    { label: "Development", value: "Active", icon: Clock, color: "text-skillswap-success" },
    { label: "Launch Goal", value: "2025", icon: Globe, color: "text-purple-600" }
  ];

  const forumCategories = [
    {
      title: "Platform Development",
      description: "Follow our development progress and share feedback on new features",
      posts: "Coming Soon",
      members: "Beta Testers",
      icon: BookOpen,
      color: "bg-skillswap-primary/10 text-skillswap-primary",
      latest: {
        title: "Welcome to SkillSwap Community Development",
        author: "SkillSwap Team",
        time: "Development Phase",
        replies: "Join Beta"
      }
    },
    {
      title: "Skill Exchange Vision",
      description: "Discuss ideas for how skill exchange should work on our platform",
      posts: "Planning",
      members: "Beta Group",
      icon: Star,
      color: "bg-skillswap-accent/10 text-skillswap-accent",
      latest: {
        title: "Building the future of peer-to-peer learning",
        author: "SkillSwap Team",
        time: "Development Phase",
        replies: "Join Discussion"
      }
    },
    {
      title: "Community Building",
      description: "Help us build a supportive and inclusive learning community",
      posts: "In Progress",
      members: "Early Adopters",
      icon: Award,
      color: "bg-skillswap-success/10 text-skillswap-success",
      latest: {
        title: "Creating safe spaces for learning",
        author: "SkillSwap Team",
        time: "Development Phase",
        replies: "Share Ideas"
      }
    },
    {
      title: "Feature Requests",
      description: "Suggest features that would make SkillSwap better for learners and teachers",
      posts: "Collecting",
      members: "Contributors",
      icon: Lightbulb,
      color: "bg-purple-100 text-purple-600",
      latest: {
        title: "What features matter most to you?",
        author: "SkillSwap Team",
        time: "Development Phase",
        replies: "Contribute"
      }
    },
    {
      title: "General Discussion",
      description: "Connect with fellow beta testers and early supporters",
      posts: "Active",
      members: "Beta Community",
      icon: Coffee,
      color: "bg-orange-100 text-orange-600",
      latest: {
        title: "Introducing ourselves to the community",
        author: "SkillSwap Team",
        time: "Development Phase",
        replies: "Join In"
      }
    }
  ];

  const upcomingEvents = [
    {
      title: "SkillSwap Development Update",
      date: "Coming Soon",
      type: "Development Update",
      attendees: "Beta Community",
      description: "Learn about our progress building the future of skill exchange and share your feedback"
    },
    {
      title: "Beta Tester Onboarding",
      date: "When Available",
      type: "Beta Program",
      attendees: "Early Adopters",
      description: "Join our beta testing program to help shape SkillSwap before launch"
    },
    {
      title: "Community Feedback Session",
      date: "Development Phase",
      type: "Feedback Session",
      attendees: "Contributors",
      description: "Share your thoughts on features, design, and the overall SkillSwap vision"
    }
  ];

  const featuredMembers = [
    {
      name: "Development Team",
      title: "Building SkillSwap",
      skills: ["Platform Development", "Community Building", "User Experience"],
      rating: "N/A",
      sessions: "In Development",
      joinedMonth: "Founding Team",
      profileImage: "https://images.unsplash.com/photo-1661436170168-7ce82d649532?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjM2MDI2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      isFoundingMember: true
    },
    {
      name: "Beta Community",
      title: "Early Supporters",
      skills: ["Testing", "Feedback", "Vision Sharing"],
      rating: "Growing",
      sessions: "Beta Phase",
      joinedMonth: "2024",
      profileImage: "https://images.unsplash.com/photo-1632560962689-da7c2538fc23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjM2MDI2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      isBetaTester: true
    },
    {
      name: "Future Teachers",
      title: "Skill Sharers",
      skills: ["Various Skills", "Teaching", "Community"],
      rating: "Joining Soon",
      sessions: "Coming Soon",
      joinedMonth: "2025 Launch",
      profileImage: "https://images.unsplash.com/photo-1653379671088-c377dd7f7830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHNvZnR3YXJlJTIwZGV2ZWxvcGVyfGVufDF8fHx8MTc1NjM2MDI2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      isPrototypeTester: true
    },
    {
      name: "Future Learners",
      title: "Knowledge Seekers",
      skills: ["Learning", "Growth", "Connection"],
      rating: "Excited",
      sessions: "Pre-Launch",
      joinedMonth: "2025 Launch",
      profileImage: "https://images.unsplash.com/photo-1659355894058-c02512c16533?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjB0ZWFjaGVyJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1NjM2MDI2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      isBetaTester: true
    }
  ];

  const communityGuidelines = [
    {
      title: "Be Respectful",
      description: "Treat all community members with respect and kindness"
    },
    {
      title: "Share Knowledge",
      description: "Help others learn and grow by sharing your expertise"
    },
    {
      title: "Stay On Topic",
      description: "Keep discussions relevant to skills and learning"
    },
    {
      title: "No Spam",
      description: "Avoid promotional content and spam posts"
    },
    {
      title: "Report Issues",
      description: "Report inappropriate behavior to maintain a safe space"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={handleBackClick} 
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <LogoLink 
                onNavigate={onNavigate} 
                className="h-8 w-auto"
              />
              <h1 className="text-2xl font-bold text-skillswap-primary">Community</h1>
            </div>
            <Button 
              className="skillswap-gradient text-white"
              onClick={handleOpenModal}
            >
              Join Discussion
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="min-h-screen bg-gradient-to-b from-background via-skillswap-neutral/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section - Enhanced with Image */}
          <section className="relative py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-6xl font-bold text-skillswap-primary leading-tight">
                    Welcome to the SkillSwap Community
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                    SkillSwap is building the future of human-to-human learning. Our community is growing as we develop 
                    a platform where knowledge flows naturally between people, breaking down barriers to education and skill development.
                  </p>
                </div>
                
                {/* Community Indicators */}
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-3 bg-skillswap-success/10 px-4 py-2 rounded-full border border-skillswap-success/20">
                    <div className="w-3 h-3 bg-skillswap-success rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-skillswap-success">In Development</span>
                  </div>
                  <div className="flex items-center gap-3 bg-skillswap-primary/10 px-4 py-2 rounded-full border border-skillswap-primary/20">
                    <Users className="w-4 h-4 text-skillswap-primary" />
                    <span className="text-sm font-semibold text-skillswap-primary">Growing Community</span>
                  </div>
                  <div className="flex items-center gap-3 bg-skillswap-accent/10 px-4 py-2 rounded-full border border-skillswap-accent/20">
                    <Globe className="w-4 h-4 text-skillswap-accent" />
                    <span className="text-sm font-semibold text-skillswap-accent">Global Vision</span>
                  </div>
                </div>
              </div>
              
              {/* Hero Image */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1658734029438-d97357737bf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwY29tbXVuaXR5JTIwcGVvcGxlJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NTYzNzcwNDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Diverse community collaboration"
                    className="w-full h-80 lg:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-skillswap-primary/20"></div>
                </div>
                
                {/* Floating Stats */}
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-skillswap-primary/10 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-skillswap-primary" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">Our Mission</div>
                      <div className="text-sm text-gray-600">Connecting Learners</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Community Stats - Enhanced Organization */}
          <section className="py-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Development Journey</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-skillswap-primary to-skillswap-accent mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                SkillSwap is being built with a vision to democratize learning through human connection. 
                Our dashboard and core features are under active development.
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {communityStats.map((stat, index) => {
                const images = [
                  "https://images.unsplash.com/photo-1653669487404-09c3617c2b6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwbGVhcm5pbmclMjB0b2dldGhlciUyMG9ubGluZXxlbnwxfHx8fDE3NTYzOTcxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
                  "https://images.unsplash.com/photo-1555069855-e580a9adbf43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBkaXNjdXNzaW9uJTIwZ3JvdXAlMjBtZWV0aW5nfGVufDF8fHx8MTc1NjM5NzEzMXww&ixlib=rb-4.1.0&q=80&w=1080",
                  "https://images.unsplash.com/photo-1726831662513-48fb5f72c6f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwZXZlbnQlMjBvbmxpbmUlMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NTYzOTcxMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
                  "https://images.unsplash.com/photo-1557425631-f132f06f4aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTYzODg4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                ];
                
                return (
                  <Card key={index} className="group relative overflow-hidden bg-white border border-gray-200 hover:border-skillswap-primary/30 hover:shadow-lg transition-all duration-300 rounded-xl">
                    {/* Image Header */}
                    <div className="relative h-24 overflow-hidden">
                      <ImageWithFallback
                        src={images[index]}
                        alt={`${stat.label} community image`}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 ${
                        index === 0 ? 'bg-skillswap-primary/70' :
                        index === 1 ? 'bg-skillswap-accent/70' :
                        index === 2 ? 'bg-skillswap-success/70' :
                        'bg-purple-600/70'
                      }`}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                          <stat.icon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold mb-1" style={{
                        color: index === 0 ? '#1E3A8A' :
                               index === 1 ? '#F59E0B' :
                               index === 2 ? '#10B981' :
                               '#7C3AED'
                      }}>{stat.value}</div>
                      <div className="text-sm font-medium text-gray-700">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <p className="text-center text-sm text-gray-500 mb-6">Building a trustworthy platform for skill exchange</p>
              <div className="flex flex-wrap justify-center items-center gap-6 opacity-70">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                  <Shield className="w-4 h-4 text-skillswap-primary" />
                  <span className="text-xs font-medium text-gray-600">Safety First</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-skillswap-success" />
                  <span className="text-xs font-medium text-gray-600">Quality Focused</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-medium text-gray-600">Human Centered</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                  <Clock className="w-4 h-4 text-skillswap-accent" />
                  <span className="text-xs font-medium text-gray-600">In Development</span>
                </div>
              </div>
            </div>
          </section>

          {/* Our Vision Section */}
          <section className="py-16 bg-gradient-to-br from-skillswap-primary/5 via-white to-skillswap-accent/5">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Vision for the Future</h3>
              <div className="w-32 h-1 bg-gradient-to-r from-skillswap-primary to-skillswap-accent mx-auto rounded-full mb-8"></div>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                SkillSwap is building the future where knowledge flows freely between humans, 
                breaking down traditional barriers to education and creating a world where anyone can learn anything from anyone, anywhere.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Vision Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h4 className="text-2xl font-bold text-skillswap-primary">The Problem We're Solving</h4>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      Traditional education systems are rigid, expensive, and often disconnected from real-world skills. 
                      Millions of people have valuable knowledge to share, but no accessible platform to teach others.
                    </p>
                    <p>
                      Meanwhile, learners struggle to find personalized, human-centered education that fits their schedule, 
                      budget, and learning style. The gap between those who want to teach and those who want to learn continues to grow.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-2xl font-bold text-skillswap-primary">Our Solution</h4>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      SkillSwap creates direct connections between learners and teachers through live, 1:1 video sessions. 
                      No pre-recorded content, no massive lecture halls—just real human interaction where knowledge transfers naturally.
                    </p>
                    <p>
                      We're building a subscription-first platform where teachers earn sustainable income and learners 
                      get unlimited access to human expertise across every imaginable skill.
                    </p>
                  </div>
                </div>
              </div>

              {/* Vision Image */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwbGVhcm5pbmclMjBvbmxpbmUlMjBlZHVjYXRpb258ZW58MXx8fHwxNzU2Mzk3MTM1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Future of online learning"
                    className="w-full h-80 lg:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-skillswap-primary/30 to-skillswap-accent/20"></div>
                </div>
                
                {/* Floating Vision Stats */}
                <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-skillswap-primary mb-1">2025</div>
                    <div className="text-sm font-medium text-gray-600">Target Launch</div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-skillswap-accent/10 rounded-full flex items-center justify-center">
                      <Globe className="w-4 h-4 text-skillswap-accent" />
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-skillswap-accent">Global</div>
                      <div className="text-xs text-gray-600">Vision</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Future Features */}
            <div className="mb-16">
              <h4 className="text-2xl font-bold text-center text-skillswap-primary mb-12">What We're Building</h4>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="relative overflow-hidden bg-white/90 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 rounded-2xl group">
                  <div className="absolute inset-0 bg-gradient-to-br from-skillswap-primary/5 to-skillswap-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="relative p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 bg-skillswap-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-8 h-8 text-skillswap-primary" />
                    </div>
                    <h5 className="text-xl font-bold mb-4 text-gray-900">1:1 Live Sessions</h5>
                    <p className="text-gray-600 leading-relaxed">
                      Real-time video calls between learners and teachers. No recordings, no delays—just authentic human connection and personalized learning.
                    </p>
                  </CardContent>
                </Card>

                <Card className="relative overflow-hidden bg-white/90 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 rounded-2xl group">
                  <div className="absolute inset-0 bg-gradient-to-br from-skillswap-accent/5 to-skillswap-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="relative p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 bg-skillswap-accent/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Crown className="w-8 h-8 text-skillswap-accent" />
                    </div>
                    <h5 className="text-xl font-bold mb-4 text-gray-900">Subscription Model</h5>
                    <p className="text-gray-600 leading-relaxed">
                      One monthly subscription unlocks unlimited learning sessions. Teachers earn sustainable income while learners get affordable access to any skill.
                    </p>
                  </CardContent>
                </Card>

                <Card className="relative overflow-hidden bg-white/90 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300 rounded-2xl group">
                  <div className="absolute inset-0 bg-gradient-to-br from-skillswap-success/5 to-skillswap-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="relative p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 bg-skillswap-success/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Shield className="w-8 h-8 text-skillswap-success" />
                    </div>
                    <h5 className="text-xl font-bold mb-4 text-gray-900">Trust & Safety</h5>
                    <p className="text-gray-600 leading-relaxed">
                      Comprehensive verification, session monitoring, and community guidelines ensure safe, quality learning experiences for everyone.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Development Timeline */}
            <div className="mb-16">
              <h4 className="text-2xl font-bold text-center text-skillswap-primary mb-12">Our Development Journey</h4>
              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 rounded-full"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-skillswap-primary via-skillswap-accent to-skillswap-success rounded-full" style={{height: '60%'}}></div>
                  
                  <div className="space-y-12">
                    {/* Phase 1 */}
                    <div className="relative flex items-center">
                      <div className="flex-1 text-right pr-8">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                          <h5 className="text-lg font-bold text-skillswap-primary mb-2">Phase 1: Foundation</h5>
                          <p className="text-gray-600 text-sm">Platform architecture, core features, and MVP development</p>
                          <div className="text-xs text-skillswap-success font-medium mt-2">✓ In Progress</div>
                        </div>
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-skillswap-primary rounded-full border-4 border-white shadow-lg"></div>
                      <div className="flex-1 pl-8">
                        <div className="text-sm text-gray-500">2024 Q4</div>
                      </div>
                    </div>

                    {/* Phase 2 */}
                    <div className="relative flex items-center">
                      <div className="flex-1 text-right pr-8">
                        <div className="text-sm text-gray-500">2025 Q1</div>
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-skillswap-accent rounded-full border-4 border-white shadow-lg"></div>
                      <div className="flex-1 pl-8">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                          <h5 className="text-lg font-bold text-skillswap-accent mb-2">Phase 2: Beta Testing</h5>
                          <p className="text-gray-600 text-sm">Closed beta with selected teachers and learners, feature refinement</p>
                          <div className="text-xs text-skillswap-accent font-medium mt-2">⏳ Next</div>
                        </div>
                      </div>
                    </div>

                    {/* Phase 3 */}
                    <div className="relative flex items-center">
                      <div className="flex-1 text-right pr-8">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                          <h5 className="text-lg font-bold text-skillswap-success mb-2">Phase 3: Public Launch</h5>
                          <p className="text-gray-600 text-sm">Full platform launch, onboarding, and community growth</p>
                          <div className="text-xs text-gray-500 font-medium mt-2">🎯 Target: 2025</div>
                        </div>
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-skillswap-success rounded-full border-4 border-white shadow-lg"></div>
                      <div className="flex-1 pl-8">
                        <div className="text-sm text-gray-500">2025 Q2-Q3</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-white/50 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
              <h4 className="text-2xl font-bold text-skillswap-primary mb-4">Join Our Journey</h4>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Be part of building the future of human learning. Whether you want to teach, learn, or simply support our mission, 
                there's a place for you in the SkillSwap community.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  className="skillswap-gradient text-white px-8 py-3"
                  onClick={() => onNavigate('signup')}
                >
                  Join Early Access
                </Button>
                <Button 
                  variant="outline" 
                  className="border-skillswap-primary text-skillswap-primary hover:bg-skillswap-primary/5 px-8 py-3"
                  onClick={() => onNavigate('about')}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </section>

          {/* Main Content Navigation */}
          <section className="py-8">
            <Tabs defaultValue="forums" className="w-full space-y-8" style={{ display: 'block', visibility: 'visible' }}>
              {/* Enhanced Tab Navigation */}
              <div className="flex justify-center mb-12">
                <div className="w-full max-w-5xl px-4">
                  {/* Navigation Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Explore Community Sections</h3>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-skillswap-primary to-skillswap-accent mx-auto"></div>
                  </div>
                  
                  {/* Enhanced TabsList */}
                  <TabsList className="!grid !grid-cols-2 lg:!grid-cols-4 !w-full !h-auto !bg-white/80 !backdrop-blur-sm !border !border-gray-200/50 !rounded-3xl !p-2 !shadow-xl !shadow-gray-900/5 !flex-row" style={{ display: 'grid !important', visibility: 'visible !important', minHeight: '100px', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                    <TabsTrigger 
                      value="forums" 
                      className="group relative !flex !flex-col gap-2 py-4 px-4 !h-auto data-[state=active]:bg-white data-[state=active]:text-skillswap-primary data-[state=active]:shadow-lg data-[state=active]:shadow-skillswap-primary/10 hover:bg-white/70 hover:text-skillswap-primary transition-all duration-300 rounded-2xl font-medium text-sm border-0 overflow-hidden"
                      style={{ display: 'flex !important', flexDirection: 'column', height: 'auto', minHeight: '80px' }}
                    >
                      {/* Background gradient for active state */}
                      <div className="absolute inset-0 bg-gradient-to-br from-skillswap-primary/5 via-transparent to-skillswap-accent/5 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                      
                      {/* Icon with enhanced styling */}
                      <div className="relative z-10 w-10 h-10 mx-auto bg-gray-100 group-data-[state=active]:bg-skillswap-primary/10 group-hover:bg-skillswap-primary/10 rounded-xl flex items-center justify-center transition-all duration-300 group-data-[state=active]:scale-110">
                        <MessageSquare className="w-5 h-5 text-gray-600 group-data-[state=active]:text-skillswap-primary group-hover:text-skillswap-primary transition-colors duration-300" />
                      </div>
                      
                      {/* Label with better typography */}
                      <span className="relative z-10 text-gray-700 group-data-[state=active]:text-skillswap-primary group-hover:text-skillswap-primary transition-colors duration-300 font-semibold">Forums</span>
                      
                      {/* Active indicator dot */}
                      <div className="absolute top-2 right-2 w-2 h-2 bg-skillswap-primary rounded-full opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300"></div>
                    </TabsTrigger>
                    
                    <TabsTrigger 
                      value="events" 
                      className="group relative !flex !flex-col gap-2 py-4 px-4 !h-auto data-[state=active]:bg-white data-[state=active]:text-skillswap-primary data-[state=active]:shadow-lg data-[state=active]:shadow-skillswap-primary/10 hover:bg-white/70 hover:text-skillswap-primary transition-all duration-300 rounded-2xl font-medium text-sm border-0 overflow-hidden"
                      style={{ display: 'flex !important', flexDirection: 'column', height: 'auto', minHeight: '80px' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-skillswap-accent/5 via-transparent to-skillswap-primary/5 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                      
                      <div className="relative z-10 w-10 h-10 mx-auto bg-gray-100 group-data-[state=active]:bg-skillswap-accent/10 group-hover:bg-skillswap-accent/10 rounded-xl flex items-center justify-center transition-all duration-300 group-data-[state=active]:scale-110">
                        <Calendar className="w-5 h-5 text-gray-600 group-data-[state=active]:text-skillswap-accent group-hover:text-skillswap-accent transition-colors duration-300" />
                      </div>
                      
                      <span className="relative z-10 text-gray-700 group-data-[state=active]:text-skillswap-accent group-hover:text-skillswap-accent transition-colors duration-300 font-semibold">Events</span>
                      
                      <div className="absolute top-2 right-2 w-2 h-2 bg-skillswap-accent rounded-full opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300"></div>
                    </TabsTrigger>
                    
                    <TabsTrigger 
                      value="members" 
                      className="group relative !flex !flex-col gap-2 py-4 px-4 !h-auto data-[state=active]:bg-white data-[state=active]:text-skillswap-primary data-[state=active]:shadow-lg data-[state=active]:shadow-skillswap-primary/10 hover:bg-white/70 hover:text-skillswap-primary transition-all duration-300 rounded-2xl font-medium text-sm border-0 overflow-hidden"
                      style={{ display: 'flex !important', flexDirection: 'column', height: 'auto', minHeight: '80px' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-skillswap-primary/5 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                      
                      <div className="relative z-10 w-10 h-10 mx-auto bg-gray-100 group-data-[state=active]:bg-purple-500/10 group-hover:bg-purple-500/10 rounded-xl flex items-center justify-center transition-all duration-300 group-data-[state=active]:scale-110">
                        <Users className="w-5 h-5 text-gray-600 group-data-[state=active]:text-purple-600 group-hover:text-purple-600 transition-colors duration-300" />
                      </div>
                      
                      <span className="relative z-10 text-gray-700 group-data-[state=active]:text-purple-600 group-hover:text-purple-600 transition-colors duration-300 font-semibold">Members</span>
                      
                      <div className="absolute top-2 right-2 w-2 h-2 bg-purple-600 rounded-full opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300"></div>
                    </TabsTrigger>
                    
                    <TabsTrigger 
                      value="guidelines" 
                      className="group relative !flex !flex-col gap-2 py-4 px-4 !h-auto data-[state=active]:bg-white data-[state=active]:text-skillswap-primary data-[state=active]:shadow-lg data-[state=active]:shadow-skillswap-primary/10 hover:bg-white/70 hover:text-skillswap-primary transition-all duration-300 rounded-2xl font-medium text-sm border-0 overflow-hidden"
                      style={{ display: 'flex !important', flexDirection: 'column', height: 'auto', minHeight: '80px' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-skillswap-success/5 via-transparent to-skillswap-primary/5 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                      
                      <div className="relative z-10 w-10 h-10 mx-auto bg-gray-100 group-data-[state=active]:bg-skillswap-success/10 group-hover:bg-skillswap-success/10 rounded-xl flex items-center justify-center transition-all duration-300 group-data-[state=active]:scale-110">
                        <Shield className="w-5 h-5 text-gray-600 group-data-[state=active]:text-skillswap-success group-hover:text-skillswap-success transition-colors duration-300" />
                      </div>
                      
                      <span className="relative z-10 text-gray-700 group-data-[state=active]:text-skillswap-success group-hover:text-skillswap-success transition-colors duration-300 font-semibold">Guidelines</span>
                      
                      <div className="absolute top-2 right-2 w-2 h-2 bg-skillswap-success rounded-full opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300"></div>
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Navigation Stats */}
                  <div className="flex justify-center mt-6">
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-skillswap-primary rounded-full"></div>
                        <span>Forums Coming Soon</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-skillswap-accent rounded-full"></div>
                        <span>Events in Planning</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span>Beta Community</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Forums Content */}
              <TabsContent value="forums" className="space-y-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-skillswap-primary/10 via-white to-skillswap-accent/10 px-6 py-3 rounded-full border border-skillswap-primary/20 mb-6">
                    <MessageSquare className="w-6 h-6 text-skillswap-primary" />
                    <span className="text-lg font-semibold text-skillswap-primary">Discussion Forums</span>
                    <div className="w-2 h-2 bg-skillswap-success rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Our discussion forums are being designed to foster meaningful conversations between learners and teachers. 
                    Join our development journey and help shape the future of skill exchange.
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap justify-center gap-4 mb-8 bg-[rgba(0,0,0,0)]">
                  <Button variant="outline" className="bg-white/80 backdrop-blur-sm border-skillswap-primary/20 text-skillswap-primary hover:bg-skillswap-primary/5 hover:border-skillswap-primary/40 hover:text-skillswap-primary transition-all duration-300">
                    <TrendingUp className="w-4 h-4 mr-2 text-skillswap-primary" />
                    Trending Discussions
                  </Button>
                  <Button variant="outline" className="bg-white/80 backdrop-blur-sm border-skillswap-accent/20 text-skillswap-accent hover:bg-skillswap-accent/5 hover:border-skillswap-accent/40 hover:text-skillswap-accent transition-all duration-300">
                    <Star className="w-4 h-4 mr-2 text-skillswap-accent" />
                    Popular Topics
                  </Button>
                  <Button variant="outline" className="bg-white/80 backdrop-blur-sm border-skillswap-success/20 text-skillswap-success hover:bg-skillswap-success/5 hover:border-skillswap-success/40 hover:text-skillswap-success transition-all duration-300">
                    <Clock className="w-4 h-4 mr-2 text-skillswap-success" />
                    Recent Activity
                  </Button>
                </div>
                
                {/* Forum Categories */}
                <div className="grid gap-6">
                  {forumCategories.map((category, index) => (
                    <Card key={index} className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:shadow-xl hover:shadow-gray-900/10 transition-all duration-500 rounded-2xl">
                      {/* Background pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-gray-50/50"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <CardContent className="relative p-6">
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className={`w-14 h-14 ${category.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-gray-900/5`}>
                            <category.icon className="w-7 h-7" />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="text-xl font-bold text-gray-900 group-hover:text-skillswap-primary transition-colors duration-300">{category.title}</h4>
                              <div className="flex gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <MessageCircle className="w-4 h-4" />
                                  {category.posts.toLocaleString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {category.members.toLocaleString()}
                                </span>
                              </div>
                            </div>
                            
                            <p className="text-gray-600 mb-4 leading-relaxed">{category.description}</p>
                            
                            {/* Latest Post */}
                            <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-semibold text-gray-900 mb-1 truncate">{category.latest.title}</h5>
                                  <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <span>by {category.latest.author}</span>
                                    <span>•</span>
                                    <span>{category.latest.time}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                      <MessageCircle className="w-3 h-3" />
                                      {category.latest.replies} replies
                                    </span>
                                  </div>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-skillswap-primary hover:bg-skillswap-primary/10 ml-4"
                                  onClick={handleOpenModal}
                                >
                                  View
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Enhanced Events Content */}
              <TabsContent value="events" className="space-y-8">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-skillswap-accent/10 via-white to-skillswap-primary/10 px-6 py-3 rounded-full border border-skillswap-accent/20 mb-6">
                    <Calendar className="w-6 h-6 text-skillswap-accent" />
                    <span className="text-lg font-semibold text-skillswap-accent">Community Events</span>
                    <div className="w-2 h-2 bg-skillswap-success rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    As we build towards our 2025 launch, we're planning developer updates, beta testing sessions, and community 
                    feedback events. Join us in shaping the future of human-to-human learning.
                  </p>
                </div>

                <div className="grid gap-6">
                  {upcomingEvents.map((event, index) => (
                    <Card key={index} className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:shadow-xl hover:shadow-gray-900/10 transition-all duration-500 rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-gray-50/50"></div>
                      
                      <CardContent className="relative p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-skillswap-accent/10 text-skillswap-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-gray-900/5">
                            <Calendar className="w-7 h-7" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="text-xl font-bold text-gray-900 group-hover:text-skillswap-accent transition-colors duration-300">{event.title}</h4>
                              <Badge variant="outline" className="bg-skillswap-accent/10 text-skillswap-accent border-skillswap-accent/20">
                                {event.type}
                              </Badge>
                            </div>
                            
                            <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {event.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {event.attendees} attending
                                </span>
                              </div>
                              <Button 
                                variant="outline" 
                                className="text-skillswap-accent border-skillswap-accent/20 hover:bg-skillswap-accent/10"
                                onClick={handleOpenModal}
                              >
                                Join Event
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Enhanced Members Content */}
              <TabsContent value="members" className="space-y-8">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/10 via-white to-skillswap-primary/10 px-6 py-3 rounded-full border border-purple-500/20 mb-6">
                    <Users className="w-6 h-6 text-purple-600" />
                    <span className="text-lg font-semibold text-purple-600">Featured Members</span>
                    <div className="w-2 h-2 bg-skillswap-success rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Our growing community includes developers, early supporters, and future teachers who believe in democratizing 
                    education through direct human connection. Together, we're building the future of learning.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredMembers.map((member, index) => (
                    <Card key={index} className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:shadow-xl hover:shadow-gray-900/10 transition-all duration-500 rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-gray-50/50"></div>
                      
                      <CardContent className="relative p-6 text-center">
                        <div className="relative mb-4">
                          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <ImageWithFallback
                              src={member.profileImage}
                              alt={`${member.name} profile`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Badge */}
                          {member.isPrototypeTester && (
                            <div className="absolute -top-1 -right-1 w-8 h-8 bg-skillswap-primary rounded-full flex items-center justify-center">
                              <Crown className="w-4 h-4 text-white" />
                            </div>
                          )}
                          {member.isBetaTester && (
                            <div className="absolute -top-1 -right-1 w-8 h-8 bg-skillswap-accent rounded-full flex items-center justify-center">
                              <Zap className="w-4 h-4 text-white" />
                            </div>
                          )}
                          {member.isFoundingMember && (
                            <div className="absolute -top-1 -right-1 w-8 h-8 bg-skillswap-success rounded-full flex items-center justify-center">
                              <Award className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        
                        <h4 className="font-bold text-gray-900 mb-1">{member.name}</h4>
                        <p className="text-skillswap-primary font-medium mb-3">{member.title}</p>
                        
                        <div className="flex flex-wrap justify-center gap-1 mb-4">
                          {member.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-400" />
                            {member.rating}
                          </span>
                          <span>{member.sessions} sessions</span>
                        </div>
                        
                        <p className="text-xs text-gray-500 mb-4">Joined {member.joinedMonth}</p>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full text-purple-600 border-purple-200 hover:bg-purple-50"
                          onClick={handleOpenModal}
                        >
                          View Profile
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Enhanced Guidelines Content */}
              <TabsContent value="guidelines" className="space-y-8">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-skillswap-success/10 via-white to-skillswap-primary/10 px-6 py-3 rounded-full border border-skillswap-success/20 mb-6">
                    <Shield className="w-6 h-6 text-skillswap-success" />
                    <span className="text-lg font-semibold text-skillswap-success">Community Guidelines</span>
                    <div className="w-2 h-2 bg-skillswap-success rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Our community guidelines help maintain a positive, respectful, and productive environment for all members.
                  </p>
                </div>

                <div className="grid gap-6 max-w-4xl mx-auto">
                  {communityGuidelines.map((guideline, index) => (
                    <Card key={index} className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:shadow-xl hover:shadow-gray-900/10 transition-all duration-500 rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-gray-50/50"></div>
                      
                      <CardContent className="relative p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-skillswap-success/10 text-skillswap-success rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-gray-900/5">
                            <CheckCircle className="w-6 h-6" />
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-skillswap-success transition-colors duration-300">{guideline.title}</h4>
                            <p className="text-gray-600 leading-relaxed">{guideline.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </div>

      {/* Community Access Modal */}
      <Dialog open={showSubscriptionModal} onOpenChange={setShowSubscriptionModal}>
        <DialogContent className="glass-modal max-w-md mx-auto p-0 overflow-hidden border-0 bg-white/95 backdrop-blur-xl">
          <DialogHeader className="relative p-6 pb-4">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 z-10"
            >
              <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
            
            {/* Icon and Title */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-skillswap-primary/10 to-skillswap-accent/10 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-skillswap-primary" />
              </div>
              <DialogTitle className="text-xl font-bold text-gray-900 mb-2">Join the SkillSwap Community</DialogTitle>
              <DialogDescription className="text-sm text-gray-600">Join our development journey and help shape the future of skill exchange</DialogDescription>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="px-6 pb-6 space-y-4">
            {/* Premium Option */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-skillswap-primary/20 bg-gradient-to-br from-skillswap-primary/5 via-white to-skillswap-accent/5 p-4 hover:border-skillswap-primary/40 transition-all duration-300 group">
              {/* Popular Badge */}
              <div className="absolute -top-1 -right-1">
                <div className="bg-skillswap-accent text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  Most Popular
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-skillswap-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Crown className="w-6 h-6 text-skillswap-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-2">
                    <h4 className="font-bold text-lg text-gray-900">Premium Access</h4>
                    <span className="text-2xl font-bold text-skillswap-primary">$10</span>
                    <span className="text-sm text-gray-500">/month</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mb-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-skillswap-success flex-shrink-0" />
                      Early access to beta features
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-skillswap-success flex-shrink-0" />
                      Priority during platform launch
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-skillswap-success flex-shrink-0" />
                      Direct input on development
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-skillswap-success flex-shrink-0" />
                      Support our mission
                    </li>
                  </ul>
                  <Button 
                    className="w-full skillswap-gradient text-white hover:shadow-lg transition-all duration-300"
                    onClick={() => {
                      handleCloseModal();
                      onNavigate('subscription');
                    }}
                  >
                    Subscribe for $10
                  </Button>
                </div>
              </div>
            </div>

            {/* Free Option */}
            <div className="rounded-2xl border border-gray-200 bg-white p-4 hover:border-gray-300 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-2">
                    <h4 className="font-bold text-lg text-gray-900">Free Account</h4>
                    <span className="text-lg font-semibold text-skillswap-success">Free</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1 mb-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      Join our community updates
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      Follow development progress
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      Early access to launch
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      Be part of our mission
                    </li>
                  </ul>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-300 hover:bg-gray-50 transition-all duration-300"
                    onClick={() => {
                      handleCloseModal();
                      onNavigate('signup');
                    }}
                  >
                    Sign Up Free
                  </Button>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-4 pt-2 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                <span>Building Trust Daily</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}