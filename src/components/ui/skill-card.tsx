import React from 'react';
import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Badge } from './badge';
import { Button } from './button';
import { Card, CardContent, CardHeader } from './card';
import { Star, Clock, DollarSign, MessageCircle } from 'lucide-react';

interface SkillCardProps {
  skill: {
    id: string;
    title: string;
    description: string;
    category: string;
    price?: number;
    duration: number;
    rating: number;
    reviewCount: number;
    teacher: {
      id: string;
      name: string;
      avatar?: string;
      verified: boolean;
      level: string;
    };
    tags: string[];
    isOnline?: boolean;
  };
  onConnect?: (skillId: string) => void;
  onMessage?: (teacherId: string) => void;
  className?: string;
}

export function SkillCard({ skill, onConnect, onMessage, className = '' }: SkillCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'advanced': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'expert': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, rotateX: 5, rotateY: 5 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`skill-card ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <Card className="glass-card overflow-hidden group hover:shadow-2xl transition-all duration-300">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="relative">
                <Avatar className="w-12 h-12 avatar-ring">
                  <AvatarImage src={skill.teacher.avatar} alt={skill.teacher.name} />
                  <AvatarFallback className="bg-skillswap-primary text-white text-sm">
                    {getInitials(skill.teacher.name)}
                  </AvatarFallback>
                </Avatar>
                {skill.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm truncate">{skill.teacher.name}</h4>
                  {skill.teacher.verified && (
                    <div className="w-4 h-4 bg-skillswap-success rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>
                <Badge variant="outline" className={`text-xs ${getLevelColor(skill.teacher.level)}`}>
                  {skill.teacher.level}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="w-3 h-3 fill-current text-amber-400" />
              <span className="font-medium">{skill.rating}</span>
              <span>({skill.reviewCount})</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-2">
          <div className="mb-3">
            <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-skillswap-primary transition-colors">
              {skill.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {skill.description}
            </p>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {skill.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {skill.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{skill.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{skill.duration}min</span>
            </div>
            {skill.price !== undefined && (
              <div className="flex items-center gap-1 font-semibold text-skillswap-primary">
                <DollarSign className="w-4 h-4" />
                <span>{skill.price === 0 ? 'Free' : `$${skill.price}`}</span>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => onConnect?.(skill.id)}
              className="flex-1 bg-skillswap-primary hover:bg-skillswap-primary-dark text-white
                         transition-all duration-200 hover:shadow-lg"
            >
              Connect
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onMessage?.(skill.teacher.id)}
              className="px-3 hover:bg-skillswap-primary/5 hover:border-skillswap-primary/30"
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}