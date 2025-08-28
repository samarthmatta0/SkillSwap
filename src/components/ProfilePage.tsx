import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { motion } from 'motion/react';
import {
  User,
  MapPin,
  Calendar,
  Star,
  Award,
  BookOpen,
  Users,
  Settings,
  Edit,
  Share,
  Heart,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
  user?: any;
  onLogout: () => void;
}

export default function ProfilePage({ onNavigate, user }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const profile = {
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    bio: 'Passionate learner and teacher. Love sharing knowledge about web development, design, and digital marketing. Always excited to learn new skills!',
    location: 'San Francisco, CA',
    joinDate: 'January 2024',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    totalSessions: 156,
    hoursLearned: 89,
    hoursTaught: 67,
    skillsLearned: 12,
    skillsTaught: 8
  };

  const skills = {
    teaching: [
      { name: 'React Development', level: 'Expert', sessions: 45, rating: 4.9 },
      { name: 'UI/UX Design', level: 'Advanced', sessions: 32, rating: 4.8 },
      { name: 'Digital Marketing', level: 'Intermediate', sessions: 18, rating: 4.7 }
    ],
    learning: [
      { name: 'Machine Learning', level: 'Beginner', sessions: 8, progress: 60 },
      { name: 'Spanish', level: 'Intermediate', sessions: 15, progress: 75 },
      { name: 'Photography', level: 'Beginner', sessions: 5, progress: 40 }
    ]
  };

  const achievements = [
    { name: 'Learning Streak', description: '30 days of continuous learning', earned: true, icon: Zap },
    { name: 'Top Teacher', description: 'Rated 4.8+ for 6 months', earned: true, icon: Award },
    { name: 'Community Helper', description: 'Helped 100+ learners', earned: true, icon: Heart },
    { name: 'Skill Master', description: 'Master level in 5 skills', earned: false, icon: Target }
  ];

  const reviews = [
    {
      id: 1,
      reviewer: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face',
      skill: 'React Development',
      rating: 5,
      comment: 'John is an amazing teacher! His explanations are clear and he makes complex concepts easy to understand.',
      date: '2024-01-10'
    },
    {
      id: 2,
      reviewer: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      skill: 'UI/UX Design',
      rating: 5,
      comment: 'Great session on design principles. John provided practical examples and actionable feedback.',
      date: '2024-01-08'
    }
  ];

  const TabButton = ({ id, label, active, onClick }: any) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        active 
          ? 'bg-skillswap-primary text-white shadow-lg' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      }`}
    >
      {label}
    </motion.button>
  );

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Profile
          </h1>
          <p className="text-gray-600">
            Your learning journey and achievements
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onNavigate('settings')}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <Card className="glass-card border-white/20 dark:border-slate-700/50 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex items-center gap-4 flex-1">
                <Avatar className="w-20 h-20 md:w-24 md:h-24">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="text-xl">{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {profile.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Joined {profile.joinDate}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{profile.bio}</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 md:items-end">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(profile.rating) 
                            ? 'text-skillswap-accent fill-current' 
                            : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{profile.rating}</span>
                  <span className="text-sm text-muted-foreground">({profile.totalSessions} sessions)</span>
                </div>
                
                <Button onClick={() => onNavigate('settings')}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="glass-card border-white/20 dark:border-slate-700/50 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-skillswap-primary mb-1">{profile.hoursLearned}h</div>
              <div className="text-sm text-muted-foreground">Learned</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-white/20 dark:border-slate-700/50 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-skillswap-accent mb-1">{profile.hoursTaught}h</div>
              <div className="text-sm text-muted-foreground">Taught</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-white/20 dark:border-slate-700/50 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-skillswap-success mb-1">{profile.skillsLearned}</div>
              <div className="text-sm text-muted-foreground">Skills Learned</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-white/20 dark:border-slate-700/50 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600 mb-1">{profile.skillsTaught}</div>
              <div className="text-sm text-muted-foreground">Skills Taught</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <TabButton
            id="overview"
            label="Overview"
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          />
          <TabButton
            id="skills"
            label="Skills"
            active={activeTab === 'skills'}
            onClick={() => setActiveTab('skills')}
          />
          <TabButton
            id="achievements"
            label="Achievements"
            active={activeTab === 'achievements'}
            onClick={() => setActiveTab('achievements')}
          />
          <TabButton
            id="reviews"
            label="Reviews"
            active={activeTab === 'reviews'}
            onClick={() => setActiveTab('reviews')}
          />
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="glass-card border-white/20 dark:border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-skillswap-primary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <div className="w-2 h-2 bg-skillswap-success rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Completed React session with Sarah</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <div className="w-2 h-2 bg-skillswap-accent rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Earned "Learning Streak" achievement</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <div className="w-2 h-2 bg-skillswap-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Started learning Machine Learning</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Learning Progress */}
              <Card className="glass-card border-white/20 dark:border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-skillswap-primary" />
                    Learning Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skills.learning.slice(0, 3).map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs text-muted-foreground">{skill.progress}%</span>
                        </div>
                        <Progress value={skill.progress} className="h-2" />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{skill.level}</span>
                          <span>{skill.sessions} sessions</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Teaching Skills */}
              <Card className="glass-card border-white/20 dark:border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-skillswap-accent" />
                    Teaching Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skills.teaching.map((skill, index) => (
                      <div key={index} className="p-4 rounded-lg bg-white/50 dark:bg-slate-800/50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{skill.name}</h4>
                          <Badge variant="secondary">{skill.level}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-skillswap-accent fill-current" />
                            <span>{skill.rating}</span>
                          </div>
                          <span>{skill.sessions} sessions</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Learning Skills */}
              <Card className="glass-card border-white/20 dark:border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-skillswap-primary" />
                    Learning Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skills.learning.map((skill, index) => (
                      <div key={index} className="p-4 rounded-lg bg-white/50 dark:bg-slate-800/50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{skill.name}</h4>
                          <Badge variant="outline">{skill.level}</Badge>
                        </div>
                        <div className="space-y-2">
                          <Progress value={skill.progress} className="h-2" />
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{skill.progress}% complete</span>
                            <span>{skill.sessions} sessions</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className={`glass-card transition-all hover:scale-105 ${
                  achievement.earned 
                    ? 'border-skillswap-success/50 bg-skillswap-success/5' 
                    : 'border-white/20 dark:border-slate-700/50'
                }`}>
                  <CardContent className="p-6 text-center">
                    <achievement.icon className={`w-12 h-12 mx-auto mb-3 ${
                      achievement.earned ? 'text-skillswap-success' : 'text-muted-foreground'
                    }`} />
                    <h3 className="font-semibold mb-2">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                    {achievement.earned ? (
                      <Badge className="bg-skillswap-success text-white">Earned</Badge>
                    ) : (
                      <Badge variant="outline">In Progress</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="glass-card border-white/20 dark:border-slate-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback>{review.reviewer[0]}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{review.reviewer}</h4>
                            <p className="text-sm text-muted-foreground">{review.skill}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating 
                                    ? 'text-skillswap-accent fill-current' 
                                    : 'text-muted'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-2">{review.comment}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}