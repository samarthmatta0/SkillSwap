import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimezoneDisplayProps {
  timezone?: string;
  format?: '12' | '24';
  showDate?: boolean;
  showTimezone?: boolean;
  className?: string;
  compact?: boolean;
}

export function TimezoneDisplay({ 
  timezone = 'Asia/Kolkata',
  format = '12',
  showDate = true,
  showTimezone = true,
  className = '',
  compact = false
}: TimezoneDisplayProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Prevent hydration mismatch by not rendering time until mounted
  if (!mounted) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Clock className="w-4 h-4 text-muted-foreground" />
        <div className="space-y-1">
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          {showDate && <div className="h-3 w-20 bg-muted rounded animate-pulse" />}
        </div>
      </div>
    );
  }

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: format === '12'
    };
    
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      weekday: compact ? 'short' : 'long',
      year: 'numeric',
      month: compact ? 'short' : 'long',
      day: 'numeric'
    };
    
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const getTimezoneAbbr = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      timeZoneName: 'short'
    };
    
    const formatted = new Intl.DateTimeFormat('en-US', options).formatToParts(date);
    const timeZonePart = formatted.find(part => part.type === 'timeZoneName');
    return timeZonePart?.value || 'IST';
  };

  const getTimezoneOffset = () => {
    const date = new Date();
    const utc = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const targetTime = new Date(utc.toLocaleString('en-US', { timeZone: timezone }));
    const offset = (targetTime.getTime() - utc.getTime()) / (1000 * 60 * 60);
    const sign = offset >= 0 ? '+' : '-';
    const hours = Math.floor(Math.abs(offset));
    const minutes = Math.round((Math.abs(offset) - hours) * 60);
    return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  if (compact) {
    return (
      <div className={`flex items-center gap-2 text-sm ${className}`}>
        <Clock className="w-3 h-3 text-muted-foreground" />
        <div className="flex items-center gap-1">
          <span className="font-mono">{formatTime(currentTime)}</span>
          {showTimezone && (
            <span className="text-xs text-muted-foreground">
              {getTimezoneAbbr()}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-shrink-0">
        <Clock className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-lg font-semibold text-foreground">
            {formatTime(currentTime)}
          </span>
          {showTimezone && (
            <div className="flex flex-col text-xs text-muted-foreground">
              <span>{getTimezoneAbbr()}</span>
              <span className="text-[10px]">{getTimezoneOffset()}</span>
            </div>
          )}
        </div>
        {showDate && (
          <div className="text-sm text-muted-foreground">
            {formatDate(currentTime)}
          </div>
        )}
      </div>
    </div>
  );
}

// Specific component for Asia/Kolkata
export function IndiaTimeDisplay(props: Omit<TimezoneDisplayProps, 'timezone'>) {
  return <TimezoneDisplay {...props} timezone="Asia/Kolkata" />;
}

// Multiple timezone display component
interface MultiTimezoneDisplayProps {
  timezones: Array<{
    timezone: string;
    label: string;
    primary?: boolean;
  }>;
  className?: string;
}

export function MultiTimezoneDisplay({ timezones, className = '' }: MultiTimezoneDisplayProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className={`space-y-3 ${className}`}>
        {timezones.map((_, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            <div className="h-4 w-20 bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  const formatTime = (date: Date, timezone: string) => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const getTimezoneAbbr = (timezone: string) => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      timeZoneName: 'short'
    };
    
    const formatted = new Intl.DateTimeFormat('en-US', options).formatToParts(date);
    const timeZonePart = formatted.find(part => part.type === 'timeZoneName');
    return timeZonePart?.value || '';
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {timezones.map((tz, index) => (
        <div 
          key={index} 
          className={`flex items-center justify-between p-3 rounded-lg border ${
            tz.primary 
              ? 'bg-skillswap-primary/5 border-skillswap-primary/20' 
              : 'bg-muted/30 border-border'
          }`}
        >
          <div className="flex items-center gap-2">
            <Clock className={`w-4 h-4 ${tz.primary ? 'text-skillswap-primary' : 'text-muted-foreground'}`} />
            <span className={`font-medium ${tz.primary ? 'text-skillswap-primary' : 'text-foreground'}`}>
              {tz.label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg font-semibold">
              {formatTime(currentTime, tz.timezone)}
            </span>
            <span className="text-xs text-muted-foreground">
              {getTimezoneAbbr(tz.timezone)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}