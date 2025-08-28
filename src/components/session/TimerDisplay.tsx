import React from 'react';
import { Progress } from '../ui/progress';
import { formatTime, getColorClass, getProgressColor } from './utils';

interface TimerDisplayProps {
  title: string;
  time: number;
  maxTime: number;
  isActive: boolean;
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ 
  title, 
  time, 
  maxTime, 
  isActive, 
  color = 'primary' 
}) => {
  const percentage = (time / maxTime) * 100;
  const remaining = maxTime - time;

  return (
    <div className={`p-3 rounded-lg border-2 transition-all ${isActive ? 'border-primary bg-primary/5' : 'border-border'}`}>
      <div className="text-center mb-2">
        <div className={`text-2xl font-bold ${getColorClass(color)}`}>
          {formatTime(remaining)}
        </div>
        <div className="text-xs text-muted-foreground">
          {title} ({formatTime(time)} used)
        </div>
      </div>
      <div className="relative">
        <Progress value={percentage} className="h-2" />
        <div className={`absolute inset-0 h-2 rounded-full ${getProgressColor(remaining)}`} 
             style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};