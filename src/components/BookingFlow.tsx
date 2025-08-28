import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Calendar } from './ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { Footer } from './ui/footer';
import { 
  ArrowLeft, 
  Clock, 
  Star, 
  CheckCircle, 
  Calendar as CalendarIcon,
  Globe,
  Users,
  Zap,
  AlertTriangle,
  MapPin
} from 'lucide-react';

interface BookingFlowProps {
  onNavigate: (page: string) => void;
}

const BookingFlow: React.FC<BookingFlowProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [message, setMessage] = useState('');
  const [timezone, setTimezone] = useState('America/New_York');

  // Mock provider data
  const provider = {
    name: "Maria Rodriguez",
    avatar: "/api/placeholder/80/80",
    skills: ["Spanish Conversation", "Business Spanish", "Spanish Grammar"],
    rating: 4.9,
    reviewCount: 127,
    responseTime: "< 2 hours",
    verified: true,
    online: true,
    timezone: "Europe/Madrid",
    languages: ["Spanish (Native)", "English (Fluent)"],
    experience: "5+ years teaching Spanish",
    description: "Native Spanish speaker from Madrid with 5 years of teaching experience. I specialize in conversational Spanish and helping students build confidence in speaking."
  };

  const availableSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "07:00 PM", "08:00 PM"
  ];

  const userLimits = {
    dailyRequests: { used: 3, total: 10 },
    dailyConnections: { used: 2, total: 10 },
    sessionMinutes: { used: 0, total: 45 },
    boosters: { used: 1, total: 5 }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const ProviderInfo = () => (
    <Card className="sticky top-4">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3 mb-4">
          <div className="relative">
            <Avatar className="w-16 h-16">
              <AvatarImage src={provider.avatar} alt={provider.name} />
              <AvatarFallback>{provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            {provider.online && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold">{provider.name}</h3>
              {provider.verified && (
                <CheckCircle className="w-4 h-4 text-blue-500" />
              )}
            </div>
            <div className="flex items-center space-x-3 text-sm text-muted-foreground mb-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                <span>{provider.rating} ({provider.reviewCount})</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{provider.responseTime}</span>
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1" />
              <span>Madrid, Spain ({provider.timezone})</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3 text-sm">
          <div>
            <span className="font-medium">Experience: </span>
            <span className="text-muted-foreground">{provider.experience}</span>
          </div>
          <div>
            <span className="font-medium">Languages: </span>
            <span className="text-muted-foreground">{provider.languages.join(', ')}</span>
          </div>
        </div>

        <Separator className="my-4" />

        <div>
          <h4 className="font-medium mb-2">Available Skills</h4>
          <div className="flex flex-wrap gap-1">
            {provider.skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const LimitsAlert = () => (
    <Alert className="mb-4">
      <Zap className="h-4 w-4" />
      <AlertDescription>
        This booking will use: 1 daily connection, up to {userLimits.sessionMinutes.total} minutes session time.
        <div className="mt-2 text-xs text-muted-foreground">
          Remaining today: {userLimits.dailyConnections.total - userLimits.dailyConnections.used} connections, {userLimits.sessionMinutes.total - userLimits.sessionMinutes.used} minutes
        </div>
      </AlertDescription>
    </Alert>
  );

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-white border-b px-4 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => onNavigate('dashboard')}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-lg font-semibold">Book a Session</h1>
            </div>
            <Badge variant="secondary">Step 1 of 3</Badge>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Select Skill & Time</CardTitle>
                  <p className="text-muted-foreground">
                    Choose what you'd like to learn and when you're available
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <LimitsAlert />

                  {/* Skill Selection */}
                  <div className="space-y-3">
                    <Label>What would you like to learn? *</Label>
                    <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a skill" />
                      </SelectTrigger>
                      <SelectContent>
                        {provider.skills.map((skill) => (
                          <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Calendar Selection */}
                  <div className="space-y-3">
                    <Label>Select Date *</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                      className="rounded-md border"
                    />
                  </div>

                  {/* Time Selection */}
                  {selectedDate && (
                    <div className="space-y-3">
                      <Label>Available Times *</Label>
                      <div className="flex items-center space-x-2 mb-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Times shown in your timezone ({timezone})
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {availableSlots.map((slot) => (
                          <Button
                            key={slot}
                            variant={selectedTime === slot ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(slot)}
                            className={selectedTime === slot ? "skillswap-gradient text-white" : ""}
                          >
                            {slot}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end pt-4">
                    <Button 
                      onClick={() => setCurrentStep(2)}
                      disabled={!selectedSkill || !selectedDate || !selectedTime}
                      className="skillswap-gradient text-white"
                    >
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <ProviderInfo />
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-white border-b px-4 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => setCurrentStep(1)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-lg font-semibold">Add Message</h1>
            </div>
            <Badge variant="secondary">Step 2 of 3</Badge>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Introduce Yourself</CardTitle>
                  <p className="text-muted-foreground">
                    Tell {provider.name.split(' ')[0]} about your goals and current level
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <LimitsAlert />

                  <div className="space-y-3">
                    <Label>Message to {provider.name.split(' ')[0]} *</Label>
                    <Textarea
                      placeholder={`Hi ${provider.name.split(' ')[0]}! I'd like to learn ${selectedSkill}. My current level is... My goals are... I'm particularly interested in...`}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                    />
                    <div className="text-right text-xs text-muted-foreground">
                      {message.length}/500 characters
                    </div>
                  </div>

                  {/* Selected Details Summary */}
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <h4 className="font-medium">Session Details</h4>
                    <div className="text-sm space-y-1">
                      <div><span className="font-medium">Skill:</span> {selectedSkill}</div>
                      <div><span className="font-medium">Date:</span> {formatDate(selectedDate)}</div>
                      <div><span className="font-medium">Time:</span> {selectedTime}</div>
                      <div><span className="font-medium">Duration:</span> Up to {userLimits.sessionMinutes.total} minutes</div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>
                      Back
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(3)}
                      disabled={message.length < 20}
                      className="skillswap-gradient text-white"
                    >
                      Review & Send
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <ProviderInfo />
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-white border-b px-4 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => setCurrentStep(2)}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-lg font-semibold">Confirm Booking</h1>
            </div>
            <Badge variant="secondary">Step 3 of 3</Badge>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Booking</CardTitle>
                  <p className="text-muted-foreground">
                    Please review all details before sending your request
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Booking Summary */}
                  <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">Session with {provider.name}</h3>
                      <Badge className="bg-green-100 text-green-800">Pending Approval</Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-muted-foreground">Skill:</span>
                        <p>{selectedSkill}</p>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Date:</span>
                        <p>{formatDate(selectedDate)}</p>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Time:</span>
                        <p>{selectedTime} ({timezone})</p>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Duration:</span>
                        <p>Up to {userLimits.sessionMinutes.total} minutes</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <span className="font-medium text-muted-foreground">Your Message:</span>
                      <p className="mt-1 text-sm bg-white p-3 rounded border italic">
                        "{message}"
                      </p>
                    </div>
                  </div>

                  {/* Usage Impact */}
                  <Alert>
                    <Users className="h-4 w-4" />
                    <AlertDescription>
                      <div className="font-medium">This booking will use:</div>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• 1 daily connection ({userLimits.dailyConnections.total - userLimits.dailyConnections.used - 1} remaining after)</li>
                        <li>• Up to {userLimits.sessionMinutes.total} minutes session time</li>
                      </ul>
                    </AlertDescription>
                  </Alert>

                  {/* Cancellation Policy */}
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="font-medium">Cancellation Policy:</div>
                      <div className="mt-1 text-sm">
                        You can cancel or reschedule up to 2 hours before the session without penalty. 
                        Last-minute cancellations may result in usage limits being consumed.
                      </div>
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setCurrentStep(2)}>
                      Back to Edit
                    </Button>
                    <Button 
                      onClick={() => onNavigate('booking-confirmation')}
                      className="skillswap-gradient text-white"
                    >
                      Send Booking Request
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <ProviderInfo />
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

  return null;
};

export default BookingFlow;