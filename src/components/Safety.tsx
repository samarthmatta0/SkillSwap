import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { LogoLink } from './ui/logo';
import { Footer } from './ui/footer';
import { 
  ArrowLeft, 
  Shield,
  AlertTriangle,
  CheckCircle,
  Eye,
  Lock,
  UserCheck,
  Phone,
  MessageCircle,
  MessageSquare,
  Mail,
  AlertCircle,
  Camera,
  FileText,
  Users,
  HelpCircle,
  Flag,
  Info
} from 'lucide-react';

interface SafetyProps {
  onNavigate: (page: string) => void;
}

export default function Safety({ onNavigate }: SafetyProps) {
  const [reportForm, setReportForm] = useState({
    type: '',
    description: '',
    userEmail: '',
    sessionId: '',
    evidence: ''
  });
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const safetyFeatures = [
    {
      icon: UserCheck,
      title: "Identity Verification",
      description: "All users complete KYC verification with government ID and selfie to ensure authentic profiles.",
      status: "Active"
    },
    {
      icon: Eye,
      title: "Session Monitoring",
      description: "Advanced monitoring systems detect inappropriate behavior and automatically flag violations.",
      status: "Active"
    },
    {
      icon: AlertTriangle,
      title: "Panic Button",
      description: "Instantly end any session and report issues with our one-click panic button feature.",
      status: "Active"
    },
    {
      icon: Lock,
      title: "Data Encryption",
      description: "All communications and personal data are protected with enterprise-grade encryption.",
      status: "Active"
    },
    {
      icon: Camera,
      title: "Session Recording",
      description: "Optional session recording for safety and quality assurance (with mutual consent).",
      status: "Available"
    },
    {
      icon: MessageSquare,
      title: "24/7 Support",
      description: "Round-the-clock support team ready to handle safety concerns and investigations.",
      status: "Active"
    }
  ];

  const safetyGuidelines = [
    {
      category: "Before Sessions",
      guidelines: [
        "Verify the other person's profile and reviews before booking",
        "Share session details with a friend or family member",
        "Ensure you're in a well-lit, private environment",
        "Test your audio and video before the session starts",
        "Have a backup plan if technical issues arise"
      ]
    },
    {
      category: "During Sessions",
      guidelines: [
        "Keep sessions focused on skill exchange and learning",
        "Maintain professional boundaries at all times",
        "Don't share personal information (address, phone, etc.)",
        "Use the panic button if you feel uncomfortable",
        "Report any inappropriate behavior immediately"
      ]
    },
    {
      category: "After Sessions",
      guidelines: [
        "Leave honest reviews to help other community members",
        "Report any post-session harassment or unwanted contact",
        "Keep all SkillSwap communications on the platform",
        "Block users who make you feel uncomfortable",
        "Contact support if you need to report an incident"
      ]
    }
  ];

  const reportTypes = [
    "Inappropriate behavior during session",
    "Harassment or unwanted contact",
    "Fake profile or identity",
    "Spam or promotional content",
    "Technical abuse or hacking",
    "Violation of community guidelines",
    "Other safety concern"
  ];

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportForm.type || !reportForm.description) {
      return;
    }
    
    // In a real app, this would submit to your reporting system
    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      setReportForm({
        type: '',
        description: '',
        userEmail: '',
        sessionId: '',
        evidence: ''
      });
    }, 3000);
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
              <h1 className="text-2xl font-bold text-skillswap-primary">Safety Center</h1>
            </div>
            <Button 
              variant="outline"
              className="border-red-500 text-red-600 hover:bg-red-500 hover:text-white"
            >
              <Flag className="w-4 h-4 mr-2" />
              Report Issue
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-skillswap-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-skillswap-primary" />
          </div>
          <h2 className="text-4xl font-bold text-skillswap-primary mb-4">
            Your Safety is Our Priority
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            SkillSwap is built with multiple layers of safety features and community guidelines 
            to ensure a secure and positive learning environment for everyone.
          </p>
        </div>

        {/* Safety Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {safetyFeatures.map((feature, index) => (
            <Card key={index} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-skillswap-primary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-skillswap-primary" />
                  </div>
                  <Badge 
                    variant={feature.status === 'Active' ? 'default' : 'secondary'}
                    className={feature.status === 'Active' ? 'bg-skillswap-success text-white' : ''}
                  >
                    {feature.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="guidelines" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="guidelines">Safety Guidelines</TabsTrigger>
            <TabsTrigger value="report">Report an Issue</TabsTrigger>
            <TabsTrigger value="resources">Safety Resources</TabsTrigger>
          </TabsList>

          {/* Safety Guidelines Tab */}
          <TabsContent value="guidelines" className="space-y-6">
            {safetyGuidelines.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-skillswap-success" />
                    {section.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.guidelines.map((guideline, guidelineIndex) => (
                      <li key={guidelineIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-skillswap-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{guideline}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            {/* Emergency Contact Info */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Emergency Situations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-600 mb-4">
                  If you're in immediate danger or experiencing a life-threatening emergency, 
                  contact your local emergency services immediately.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="outline" 
                    className="border-red-500 text-red-600 hover:bg-red-500 hover:text-white"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Emergency: 911 (US)
                  </Button>
                  <Button 
                    onClick={() => onNavigate('contact')}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Contact SkillSwap Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Report Issue Tab */}
          <TabsContent value="report" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Flag className="w-5 h-5 mr-2 text-red-600" />
                  Report a Safety Issue
                </CardTitle>
              </CardHeader>
              <CardContent>
                {reportSubmitted ? (
                  <Alert className="bg-skillswap-success/10 border-skillswap-success/20">
                    <CheckCircle className="h-4 w-4 text-skillswap-success" />
                    <AlertDescription className="text-skillswap-success">
                      Your report has been submitted successfully. Our safety team will review it within 24 hours 
                      and take appropriate action. You may receive follow-up communication at the email address provided.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <form onSubmit={handleReportSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="report-type">Type of Issue *</Label>
                      <Select value={reportForm.type} onValueChange={(value) => setReportForm(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the type of safety issue" />
                        </SelectTrigger>
                        <SelectContent>
                          {reportTypes.map((type, index) => (
                            <SelectItem key={index} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="user-email">User's Email (if known)</Label>
                      <Input
                        id="user-email"
                        type="email"
                        placeholder="user@example.com"
                        value={reportForm.userEmail}
                        onChange={(e) => setReportForm(prev => ({ ...prev, userEmail: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="session-id">Session ID (if applicable)</Label>
                      <Input
                        id="session-id"
                        placeholder="Session ID from your booking confirmation"
                        value={reportForm.sessionId}
                        onChange={(e) => setReportForm(prev => ({ ...prev, sessionId: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description of Issue *</Label>
                      <Textarea
                        id="description"
                        placeholder="Please provide a detailed description of what happened, including dates, times, and any relevant context..."
                        value={reportForm.description}
                        onChange={(e) => setReportForm(prev => ({ ...prev, description: e.target.value }))}
                        rows={5}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="evidence">Additional Evidence</Label>
                      <Textarea
                        id="evidence"
                        placeholder="Any additional evidence, screenshots, or information that might help our investigation..."
                        value={reportForm.evidence}
                        onChange={(e) => setReportForm(prev => ({ ...prev, evidence: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        All reports are taken seriously and investigated thoroughly. We may contact you for additional 
                        information. Your report will be kept confidential and only shared with authorized personnel.
                      </AlertDescription>
                    </Alert>

                    <Button 
                      type="submit" 
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      disabled={!reportForm.type || !reportForm.description}
                    >
                      Submit Safety Report
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Safety Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-skillswap-primary" />
                    Safety Features Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Learn how to use SkillSwap's built-in safety features effectively.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• How to use the panic button</li>
                    <li>• Blocking and reporting users</li>
                    <li>• Privacy settings and controls</li>
                    <li>• Session recording guidelines</li>
                  </ul>
                  <Button 
                    variant="outline"
                    onClick={() => onNavigate('help')}
                    className="w-full"
                  >
                    View Safety Guide
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-skillswap-accent" />
                    Community Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Connect with other community members for support and advice.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• Safety discussion forums</li>
                    <li>• Peer support groups</li>
                    <li>• Safety tips from experienced users</li>
                    <li>• Community guidelines</li>
                  </ul>
                  <Button 
                    variant="outline"
                    onClick={() => onNavigate('community')}
                    className="w-full"
                  >
                    Join Community
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-skillswap-success" />
                    Crisis Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Important crisis and mental health resources.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• National Suicide Prevention Lifeline: 988</li>
                    <li>• Crisis Text Line: Text HOME to 741741</li>
                    <li>• RAINN National Sexual Assault Hotline: 1-800-656-4673</li>
                    <li>• National Domestic Violence Hotline: 1-800-799-7233</li>
                  </ul>
                  <p className="text-xs text-muted-foreground">
                    These are US-based resources. For international users, please contact your local emergency services.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
                    Safety Updates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Stay informed about the latest safety features and updates.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• Monthly safety newsletters</li>
                    <li>• New feature announcements</li>
                    <li>• Policy updates and changes</li>
                    <li>• Safety best practices</li>
                  </ul>
                  <Button 
                    variant="outline"
                    className="w-full"
                  >
                    Subscribe to Updates
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Contact Support Section */}
        <Card className="mt-12 bg-gradient-to-r from-skillswap-primary/5 to-skillswap-accent/5 border-skillswap-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-skillswap-primary">
              Need immediate help?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Our safety team is available 24/7 to handle urgent safety concerns and investigations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => onNavigate('contact')}
                className="skillswap-gradient text-white"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact Safety Team
              </Button>
              <Button 
                variant="outline"
                className="border-red-500 text-red-600 hover:bg-red-500 hover:text-white"
              >
                <Flag className="w-4 h-4 mr-2" />
                Emergency Report
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