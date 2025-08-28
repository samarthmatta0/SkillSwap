import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { LogoLink } from './ui/logo';
import { Footer } from './ui/footer';
import { 
  ArrowLeft, 
  Search, 
  HelpCircle, 
  BookOpen, 
  Users, 
  Shield, 
  Settings,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Star,
  CheckCircle,
  CreditCard,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface HelpCenterProps {
  onNavigate: (page: string) => void;
  onBack?: () => void;
  canGoBack?: boolean;
}

export default function HelpCenter({ onNavigate, onBack, canGoBack }: HelpCenterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleBackClick = () => {
    if (onBack && canGoBack) {
      onBack();
    } else {
      onNavigate('landing');
    }
  };

  const faqCategories = [
    {
      title: "Getting Started",
      icon: BookOpen,
      faqs: [
        {
          question: "How does SkillSwap work?",
          answer: "SkillSwap connects people who want to learn skills with those who can teach them. You create a profile, list skills you can teach, find skills you want to learn, and book 1:1 video sessions for skill exchange."
        },
        {
          question: "How do I create my first profile?",
          answer: "After signing up, you'll be guided through our onboarding process where you can add your skills, set your availability, and complete identity verification for safety."
        },
        {
          question: "What skills can I teach or learn?",
          answer: "Almost any skill! From coding and languages to cooking, music, crafts, business skills, and more. If it's a skill someone can teach in a video call, it's welcome on SkillSwap."
        },
        {
          question: "Do I need any special equipment?",
          answer: "Just a device with a camera, microphone, and stable internet connection. Most smartphones, tablets, or computers work perfectly for SkillSwap sessions."
        }
      ]
    },
    {
      title: "Booking & Sessions",
      icon: Clock,
      faqs: [
        {
          question: "How do I book a session?",
          answer: "Browse skills, find someone you'd like to learn from, check their availability, and send a booking request. Once accepted, you'll receive session details and calendar invites."
        },
        {
          question: "What is fair-time speaking?",
          answer: "Our built-in timer ensures both participants get equal speaking time during sessions. This makes every exchange fair and valuable for both the learner and teacher."
        },
        {
          question: "Can I cancel or reschedule a session?",
          answer: "Yes, you can cancel or reschedule up to 2 hours before the session starts. Both participants will be notified and can agree on a new time."
        },
        {
          question: "What happens if someone doesn't show up?",
          answer: "If someone doesn't join within 10 minutes of the scheduled time, the session is automatically cancelled and you can report the no-show for review."
        }
      ]
    },
    {
      title: "Pricing & Plans",
      icon: CreditCard,
      faqs: [
        {
          question: "What's included in the free trial?",
          answer: "Your 7-day free trial includes up to 3 skill requests per day, 2 connections, 15 minutes speaking time per session, and 30 total minutes per day."
        },
        {
          question: "How does billing work?",
          answer: "Choose from monthly or yearly plans. Yearly plans save you up to 17%. All plans include our core features with different usage limits to match your learning goals."
        },
        {
          question: "Can I upgrade or downgrade my plan?",
          answer: "Yes, you can change your plan anytime. Upgrades take effect immediately, while downgrades apply at your next billing cycle."
        },
        {
          question: "Do you offer refunds?",
          answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund."
        }
      ]
    },
    {
      title: "Safety & Trust",
      icon: Shield,
      faqs: [
        {
          question: "How do you verify users?",
          answer: "All users complete identity verification with a government ID and selfie. We also have community reporting and moderation to maintain a safe environment."
        },
        {
          question: "What if I have a problem during a session?",
          answer: "Use the panic button to immediately end any session and report issues. Our support team reviews all reports and takes appropriate action."
        },
        {
          question: "Can I block or report someone?",
          answer: "Yes, you can block users and report inappropriate behavior. We take all reports seriously and investigate promptly to maintain community standards."
        },
        {
          question: "Is my personal information safe?",
          answer: "We use enterprise-grade encryption and never share your personal information. Your data is protected and only used to provide SkillSwap services."
        }
      ]
    },
    {
      title: "Technical Support",
      icon: Settings,
      faqs: [
        {
          question: "What browsers are supported?",
          answer: "SkillSwap works best on Chrome, Firefox, Safari, and Edge. Make sure your browser allows camera and microphone access for video sessions."
        },
        {
          question: "I'm having video/audio issues",
          answer: "Check your internet connection, browser permissions for camera/microphone, and try refreshing the page. Contact support if issues persist."
        },
        {
          question: "Can I use SkillSwap on mobile?",
          answer: "Yes! SkillSwap is fully responsive and works great on smartphones and tablets through your mobile browser."
        },
        {
          question: "How do I update my notification settings?",
          answer: "Go to Settings > Notifications to customize email alerts, booking confirmations, and reminder preferences."
        }
      ]
    }
  ];

  const quickLinks = [
    {
      title: "Getting Started Guide",
      description: "Complete walkthrough for new users",
      icon: BookOpen,
      action: () => alert('Getting started guide coming soon!')
    },
    {
      title: "Contact Support",
      description: "Get help from our team",
      icon: MessageCircle,
      action: () => onNavigate('contact')
    },
    {
      title: "Community Guidelines",
      description: "Learn about our community standards",
      icon: Users,
      action: () => onNavigate('safety')
    },
    {
      title: "Feature Requests",
      description: "Suggest new features",
      icon: HelpCircle,
      action: () => alert('Feature request form coming soon!')
    }
  ];

  const filteredCategories = faqCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.faqs.some(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
              <h1 className="text-2xl font-bold text-skillswap-primary">Help Center</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-skillswap-primary mb-4">
            How can we help you?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find answers to common questions, learn how to use SkillSwap, and get the support you need.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for help articles, guides, and FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-base"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickLinks.map((link, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={link.action}>
              <CardHeader className="text-center pb-2">
                <div className="w-12 h-12 bg-skillswap-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <link.icon className="w-6 h-6 text-skillswap-primary" />
                </div>
                <CardTitle className="text-lg">{link.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground text-center">{link.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-center">Frequently Asked Questions</h3>
          
          {filteredCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-skillswap-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <category.icon className="w-4 h-4 text-skillswap-primary" />
                  </div>
                  {category.title}
                  <Badge variant="secondary" className="ml-auto">
                    {category.faqs.length} articles
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex;
                  return (
                    <div key={faqIndex}>
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === globalIndex ? null : globalIndex)}
                        className="w-full flex items-center justify-between p-4 text-left border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium text-foreground">{faq.question}</span>
                        {expandedFaq === globalIndex ? (
                          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        )}
                      </button>
                      {expandedFaq === globalIndex && (
                        <div className="mt-2 p-4 bg-muted/30 rounded-lg border border-border">
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Support Section */}
        <Card className="mt-12 bg-gradient-to-r from-skillswap-primary/5 to-skillswap-accent/5 border-skillswap-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-skillswap-primary">
              Still need help?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => onNavigate('contact')}
                className="skillswap-gradient text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
              <Button 
                variant="outline"
                onClick={() => onNavigate('community')}
                className="border-skillswap-primary text-skillswap-primary hover:bg-skillswap-primary hover:text-white"
              >
                <Users className="w-4 h-4 mr-2" />
                Join Community
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}