import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { Footer } from './ui/footer';
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Phone, 
  MessageSquare, 
  Settings, 
  Clock, 
  Star,
  Share2,
  Maximize,
  Users,
  CheckCircle,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  ArrowLeft,
  Calendar,
  Zap
} from 'lucide-react';

interface SessionInterfaceProps {
  onNavigate: (page: string) => void;
}

const SessionInterface: React.FC<SessionInterfaceProps> = ({ onNavigate }) => {
  const [sessionTime, setSessionTime] = useState(0);
  const [userSpeakingTime, setUserSpeakingTime] = useState(0);
  const [providerSpeakingTime, setProviderSpeakingTime] = useState(0);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [currentSpeaker, setCurrentSpeaker] = useState<SpeakerType>(null);
  const [showChat, setShowChat] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const maxSpeakingTime = Math.floor(SESSION_CONSTANTS.MAX_SESSION_TIME / 2);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1);
      
      if (currentSpeaker === 'user') {
        setUserSpeakingTime(prev => prev + 1);
      } else if (currentSpeaker === 'provider') {
        setProviderSpeakingTime(prev => prev + 1);
      }
      
      if (Math.random() < SESSION_CONSTANTS.SPEAKER_CHANGE_PROBABILITY) {
        const speakers: SpeakerType[] = ['user', 'provider', null];
        setCurrentSpeaker(speakers[Math.floor(Math.random() * speakers.length)]);
      }
    }, SESSION_CONSTANTS.TIMER_INTERVAL);

    return () => clearInterval(interval);
  }, [currentSpeaker]);

  const remainingTime = SESSION_CONSTANTS.MAX_SESSION_TIME - sessionTime;
  const isNearingLimit = remainingTime <= SESSION_CONSTANTS.WARNING_TIME;
  const isAlmostOver = remainingTime <= SESSION_CONSTANTS.CRITICAL_TIME;
  const isTimeUp = remainingTime <= 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Live Session
            </Badge>
            <div className="text-sm">
              <span className="font-medium">{MOCK_PROVIDER.skill}</span>
              <span className="text-gray-400 ml-2">with {MOCK_PROVIDER.name}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <PanicButton onNavigate={onNavigate} />
            <Button variant="ghost" size="sm" className="text-white">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Time Warnings */}
      {isNearingLimit && !isTimeUp && (
        <Alert className="mx-4 mt-4 border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            {isAlmostOver 
              ? `Session ends in ${remainingTime} seconds!` 
              : `Session ends in ${Math.floor(remainingTime / 60)} minutes. Consider wrapping up.`
            }
          </AlertDescription>
        </Alert>
      )}

      {isTimeUp && (
        <Alert className="mx-4 mt-4 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 flex items-center justify-between">
            <span>Time limit reached! Session will end automatically.</span>
            <Button size="sm" onClick={() => onNavigate('purchase-booster')} className="ml-4">
              <Zap className="w-4 h-4 mr-1" />
              Buy Booster
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="p-4">
        <div className="grid lg:grid-cols-4 gap-4">
          {/* Video Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Main Video Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* User Video */}
              <Card className="bg-gray-800 border-gray-700 relative overflow-hidden">
                <CardContent className="p-0 aspect-video bg-gray-900 flex items-center justify-center">
                  {isVideoEnabled ? (
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-lg">Your Video</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar className="w-20 h-20">
                        <AvatarFallback className="bg-gray-700 text-white text-lg">You</AvatarFallback>
                      </Avatar>
                      <span className="text-gray-400">Camera Off</span>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-black/50 text-white">You</Badge>
                    {currentSpeaker === 'user' && (
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="text-white hover:bg-white/20"
                    >
                      {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Provider Video */}
              <Card className="bg-gray-800 border-gray-700 relative overflow-hidden">
                <CardContent className="p-0 aspect-video bg-gray-900 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-green-600 to-teal-600 flex items-center justify-center">
                    <span className="text-white text-lg">{MOCK_PROVIDER.name}'s Video</span>
                  </div>
                  <div className="absolute bottom-2 left-2 flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-black/50 text-white">
                      {MOCK_PROVIDER.name.split(' ')[0]}
                    </Badge>
                    {currentSpeaker === 'provider' && (
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Controls */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant={isAudioEnabled ? "secondary" : "destructive"}
                    size="lg"
                    onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                    className="rounded-full w-12 h-12"
                  >
                    {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </Button>
                  
                  <Button
                    variant={isVideoEnabled ? "secondary" : "destructive"}
                    size="lg"
                    onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                    className="rounded-full w-12 h-12"
                  >
                    {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                  </Button>

                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={() => onNavigate('session-end')}
                    className="rounded-full w-12 h-12"
                  >
                    <Phone className="w-5 h-5" />
                  </Button>

                  <Button
                    variant={showChat ? "default" : "secondary"}
                    size="lg"
                    onClick={() => setShowChat(!showChat)}
                    className="rounded-full w-12 h-12"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timer Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 space-y-4">
                <div className="text-center">
                  <h3 className="font-semibold text-white mb-2">Session Time</h3>
                  <div className="text-3xl font-bold text-yellow-400">
                    {formatTime(remainingTime)}
                  </div>
                  <div className="text-sm text-gray-400">remaining</div>
                </div>
                
                <div className="space-y-3">
                  <TimerDisplay
                    title="Your Speaking Time"
                    time={userSpeakingTime}
                    maxTime={maxSpeakingTime}
                    isActive={currentSpeaker === 'user'}
                    color="primary"
                  />
                  
                  <TimerDisplay
                    title={`${MOCK_PROVIDER.name.split(' ')[0]}'s Time`}
                    time={providerSpeakingTime}
                    maxTime={maxSpeakingTime}
                    isActive={currentSpeaker === 'provider'}
                    color="success"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Chat Panel */}
            {showChat && (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-white mb-4">Session Chat</h3>
                  <Alert className="mb-4 border-yellow-200 bg-yellow-50">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800 text-xs">
                      Do not share external contact information during the session.
                    </AlertDescription>
                  </Alert>
                  <div className="text-center text-gray-400 text-sm">
                    Chat functionality coming soon
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionInterface;