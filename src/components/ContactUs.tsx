import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { MultiTimezoneDisplay } from './ui/timezone-display';
import { LogoLink } from './ui/logo';
import { Footer } from './ui/footer';
import { 
  ArrowLeft, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Bug,
  Lightbulb,
  CreditCard,
  Shield,
  Star,
  Users,
  Globe,
  BookOpen
} from 'lucide-react';

interface ContactUsProps {
  onNavigate: (page: string) => void;
}

export default function ContactUs({ onNavigate }: ContactUsProps) {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
    priority: 'normal'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      primary: "support@skillswapp.in",
      secondary: "General inquiries: hello@skillswapp.in",
      description: "For general support and inquiries",
      responseTime: "Usually within 4-6 hours",
      available: "24/7"
    },
    {
      icon: Phone,
      title: "Phone Support",
      primary: "+46 704750853",
      secondary: "Sweden timezone (CET/CEST)",
      description: "For urgent issues requiring immediate assistance",
      responseTime: "Immediate during business hours",
      available: "Mon-Fri, 9:00-17:00 CET"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      primary: "Available on platform",
      secondary: "Real-time support chat",
      description: "Quick answers to common questions",
      responseTime: "Usually under 5 minutes",
      available: "Daily, 8:00-22:00 CET"
    }
  ];

  const supportCategories = [
    { value: "technical", label: "Technical Issues", icon: Bug },
    { value: "account", label: "Account & Billing", icon: CreditCard },
    { value: "safety", label: "Safety & Security", icon: Shield },
    { value: "general", label: "General Inquiry", icon: HelpCircle },
    { value: "feedback", label: "Feedback & Suggestions", icon: Star },
    { value: "partnership", label: "Business & Partnerships", icon: Users }
  ];

  const quickAnswers = [
    {
      question: "How do I reset my password?",
      answer: "Go to the login page and click 'Forgot password'. Enter your email and follow the reset instructions."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "Visit Settings > Subscription in your account. You can cancel anytime and access features until your billing period ends."
    },
    {
      question: "Why was my session cancelled?",
      answer: "Sessions can be cancelled by users up to 2 hours before start time, or automatically if someone doesn't join within 10 minutes."
    },
    {
      question: "How do I report inappropriate behavior?",
      answer: "Use the panic button during sessions or visit our Safety Center to file a detailed report."
    }
  ];

  const officeInfo = {
    headquarters: "Stockholm, Sweden",
    timezone: "Central European Time (CET/CEST)",
    languages: ["English", "Swedish", "German", "Spanish"],
    globalSupport: "24/7 email support worldwide"
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      return;
    }
    
    // In a real app, this would submit to your support system
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: '',
        priority: 'normal'
      });
    }, 3000);
  };

  const handleQuickContact = (method: string) => {
    switch (method) {
      case 'email':
        window.location.href = 'mailto:support@skillswapp.in?subject=Support Request from SkillSwap';
        break;
      case 'phone':
        window.location.href = 'tel:+46704750853';
        break;
      case 'general':
        window.location.href = 'mailto:hello@skillswapp.in?subject=General Inquiry';
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('landing')} 
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold text-skillswap-primary">Contact Us</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Mobile-Optimized Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-skillswap-primary mb-3 sm:mb-4">
            How can we help?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Choose the fastest way to get help
          </p>
          
          {/* Urgent vs Non-Urgent Quick Access */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto mb-6">
            <Button 
              onClick={() => handleQuickContact('phone')}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white h-12 sm:h-14 text-sm sm:text-base"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Urgent Help
              <span className="ml-2 text-xs opacity-80">Call Now</span>
            </Button>
            <Button 
              onClick={() => handleQuickContact('email')}
              size="lg"
              className="skillswap-gradient text-white h-12 sm:h-14 text-sm sm:text-base"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              General Support
              <span className="ml-2 text-xs opacity-80">4-6 hrs</span>
            </Button>
          </div>
          
          {/* Self-Service Prominent CTA */}
          <div className="bg-skillswap-primary/5 rounded-xl p-4 max-w-lg mx-auto">
            <p className="text-sm text-muted-foreground mb-3">
              <span className="font-medium text-skillswap-primary">Try self-help first</span> - Get instant answers
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline"
                onClick={() => onNavigate('help')}
                className="flex-1 text-sm"
                size="sm"
              >
                <HelpCircle className="w-4 h-4 mr-1" />
                FAQ & Guides
              </Button>
              <Button 
                variant="outline"
                onClick={() => onNavigate('community')}
                className="flex-1 text-sm"
                size="sm"
              >
                <Users className="w-4 h-4 mr-1" />
                Ask Community
              </Button>
            </div>
          </div>
        </div>

        {/* Responsive Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
          {/* Smart Contact Form - Full width on mobile, 2 cols on desktop */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <Card className="border-2 border-dashed border-muted hover:border-skillswap-primary/30 transition-colors">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl sm:text-2xl">
                  <Send className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-skillswap-primary" />
                  Send us a message
                </CardTitle>
                <p className="text-sm sm:text-base text-muted-foreground">
                  We'll respond within 4-6 hours during business days
                </p>
              </CardHeader>
              <CardContent>
                {formSubmitted ? (
                  <Alert className="bg-skillswap-success/10 border-skillswap-success/20">
                    <CheckCircle className="h-4 w-4 text-skillswap-success" />
                    <AlertDescription className="text-skillswap-success">
                      Message sent! We'll respond to {contactForm.email} within 4-6 hours.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-6">
                    {/* Category First - This drives the experience */}
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-base font-medium">
                        What do you need help with? *
                      </Label>
                      <Select value={contactForm.category} onValueChange={(value) => setContactForm(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Choose your topic" />
                        </SelectTrigger>
                        <SelectContent>
                          {supportCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value} className="text-base py-3">
                              <div className="flex items-center">
                                <category.icon className="w-4 h-4 mr-2 text-skillswap-primary" />
                                {category.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {/* Dynamic help text based on category */}
                      {contactForm.category && (
                        <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            {contactForm.category === 'technical' && "💡 Include your device type, browser, and steps to reproduce the issue"}
                            {contactForm.category === 'account' && "💡 Include your account email and billing questions"}
                            {contactForm.category === 'safety' && "⚠️ For urgent safety issues, call +46 704750853 immediately"}
                            {contactForm.category === 'general' && "💬 Feel free to ask anything about SkillSwap"}
                            {contactForm.category === 'feedback' && "🌟 We love hearing your suggestions for improvement"}
                            {contactForm.category === 'partnership' && "🤝 Tell us about your business and collaboration ideas"}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Contact Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-base">Name *</Label>
                        <Input
                          id="name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Your name"
                          className="h-12 text-base"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-base">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="your@email.com"
                          className="h-12 text-base"
                          required
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-base">
                        Tell us more *
                      </Label>
                      <Textarea
                        id="message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder={contactForm.category === 'technical' 
                          ? "Describe the issue you're experiencing..." 
                          : contactForm.category === 'safety' 
                          ? "Describe the safety concern in detail..."
                          : "How can we help you?"}
                        rows={4}
                        className="text-base resize-none"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        {contactForm.message.length}/500 characters
                      </p>
                    </div>

                    {/* Smart Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full skillswap-gradient text-white h-12 sm:h-14 text-base font-medium"
                      disabled={!contactForm.name || !contactForm.email || !contactForm.message}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {contactForm.category === 'safety' ? 'Send Safety Report' : 'Send Message'}
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground">
                      We typically respond in 4-6 hours during business days
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Contextual Help */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            {/* Quick Help - Mobile Optimized */}
            <Card className="bg-gradient-to-br from-skillswap-primary/5 to-skillswap-accent/5 border-skillswap-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <HelpCircle className="w-5 h-5 mr-2 text-skillswap-accent" />
                  Quick Solutions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickAnswers.slice(0, 2).map((qa, index) => (
                    <div 
                      key={index} 
                      className="p-3 bg-white/80 rounded-lg border border-white/60 cursor-pointer hover:bg-white transition-colors"
                      onClick={() => {
                        // Could expand to show full answer
                      }}
                    >
                      <h4 className="font-medium text-sm mb-1 text-skillswap-primary">{qa.question}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">{qa.answer}</p>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline"
                  onClick={() => onNavigate('help')}
                  className="w-full mt-4 border-skillswap-primary text-skillswap-primary hover:bg-skillswap-primary hover:text-white"
                  size="sm"
                >
                  View All Help Articles
                </Button>
              </CardContent>
            </Card>

            {/* Contact Methods - Condensed */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Clock className="w-5 h-5 mr-2 text-skillswap-primary" />
                  Response Times
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-red-600 mr-2" />
                    <span className="text-sm font-medium">Phone</span>
                  </div>
                  <span className="text-xs text-red-600 font-medium">Immediate</span>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-sm font-medium">Email</span>
                  </div>
                  <span className="text-xs text-blue-600 font-medium">4-6 hours</span>
                </div>
                
                <div className="flex items-center justify-between p-2 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 text-amber-600 mr-2" />
                    <span className="text-sm font-medium">Live Chat</span>
                  </div>
                  <span className="text-xs text-amber-600 font-medium">5 min</span>
                </div>
              </CardContent>
            </Card>

            {/* Emergency - Always Visible */}
            <Card className="border-red-200 bg-red-50/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-red-700 text-lg">
                  <Shield className="w-5 h-5 mr-2" />
                  Emergency?
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-red-600 mb-3 text-sm">
                  Safety issue during a session?
                </p>
                <div className="space-y-2">
                  <Button 
                    onClick={() => handleQuickContact('phone')}
                    className="w-full bg-red-600 hover:bg-red-700 text-white text-sm"
                    size="sm"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call +46 704750853
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => onNavigate('safety')}
                    className="w-full border-red-300 text-red-700 hover:bg-red-100 text-sm"
                    size="sm"
                  >
                    Safety Resources
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile-Optimized Alternative Methods */}
        <div className="mt-8 sm:mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-lg sm:text-xl">More Ways to Connect</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button 
                  variant="outline"
                  onClick={() => onNavigate('help')}
                  className="h-16 sm:h-20 flex-col gap-1 sm:gap-2 text-center"
                >
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                  <div>
                    <div className="text-sm font-medium">Help Center</div>
                    <div className="text-xs text-muted-foreground">Self-service</div>
                  </div>
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => onNavigate('community')}
                  className="h-16 sm:h-20 flex-col gap-1 sm:gap-2 text-center"
                >
                  <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                  <div>
                    <div className="text-sm font-medium">Community</div>
                    <div className="text-xs text-muted-foreground">Ask others</div>
                  </div>
                </Button>
                <Button 
                  variant="outline"
                  className="h-16 sm:h-20 flex-col gap-1 sm:gap-2 text-center"
                >
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  <div>
                    <div className="text-sm font-medium">Live Chat</div>
                    <div className="text-xs text-muted-foreground">Coming soon</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}