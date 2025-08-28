import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { FloatingActionButton } from './ui/floating-action-button';
import { HeroCarousel } from './ui/hero-carousel';
import { SkillCard } from './ui/skill-card';
import { motion } from 'motion/react';
import {
  Calendar,
  Star,
  TrendingUp,
  MessageCircle,
  Coins,
  Plus,
  UserPlus,
  MessageSquare
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string) => void;
  user?: any;
  onLogout: () => void;
}

export default function Dashboard({ onNavigate, user }: DashboardProps) {
  const upcomingSessions = [
    {
      id: 1,
      skill: 'React Development',
      partner: 'Sarah Chen',
      time: '2:00 PM',
      date: 'Today',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face',
      type: 'learn'
    },
    {
      id: 2,
      skill: 'UI/UX Design',
      partner: 'Mike Johnson',
      time: '4:30 PM',
      date: 'Tomorrow',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      type: 'teach'
    }
  ];

  const featuredSkills = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      instructor: 'Alex Rodriguez',
      rating: 4.9,
      price: 50,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      category: 'Programming'
    },
    {
      id: 2,
      title: 'Digital Marketing Strategy',
      instructor: 'Emma Watson',
      rating: 4.8,
      price: 35,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      category: 'Business'
    }
  ];

  return (
    <div className="p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name || 'John'}! 👋
        </h1>
        <p className="text-gray-600">
          Ready to learn something new today?
        </p>
      </div>

      {/* Hero Carousel */}
      <div className="mb-8">
        <HeroCarousel />
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Stats Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-skillswap-primary" />
              Your Learning Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-skillswap-primary">12</div>
                <div className="text-sm text-muted-foreground">Skills Learned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-skillswap-accent">8</div>
                <div className="text-sm text-muted-foreground">Skills Taught</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-skillswap-success">45h</div>
                <div className="text-sm text-muted-foreground">Learning Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">4.8</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Weekly Goal</span>
                <span className="text-sm text-muted-foreground">7/10 hours</span>
              </div>
              <Progress value={70} className="h-2 progress-animated" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Wallet */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-skillswap-accent coin-glow" />
              SkillCoins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-skillswap-accent mb-2">2,485</div>
              <div className="text-sm text-muted-foreground mb-4">Available Balance</div>
              <Button
                onClick={() => onNavigate('wallet')}
                className="w-full btn-glow bg-gradient-to-r from-skillswap-accent to-skillswap-accent-light hover:from-skillswap-accent-dark hover:to-skillswap-accent"
              >
                View Wallet
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-skillswap-primary" />
              Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <motion.div
                  key={session.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={session.avatar} />
                    <AvatarFallback>{session.partner[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm truncate">{session.skill}</span>
                      <Badge
                        variant={session.type === 'learn' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {session.type}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      with {session.partner} • {session.date} at {session.time}
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => onNavigate('booking')}
            >
              Schedule New Session
            </Button>
          </CardContent>
        </Card>

        {/* Featured Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-skillswap-accent" />
              Featured Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {featuredSkills.map((skill) => (
                <SkillCard
                  key={skill.id}
                  {...skill}
                  onExplore={() => onNavigate('explore')}
                  compact
                />
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => onNavigate('explore')}
            >
              Explore All Skills
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-20">
        <FloatingActionButton
          icon={Plus}
          label="Ask"
          onClick={() => onNavigate('explore')}
          variant="primary"
        />
        <FloatingActionButton
          icon={UserPlus}
          label="Teach"
          onClick={() => onNavigate('skill-setup')}
          variant="secondary"
        />
        <FloatingActionButton
          icon={MessageSquare}
          label="Join"
          onClick={() => onNavigate('community')}
          variant="accent"
        />
      </div>
    </div>
  );
}