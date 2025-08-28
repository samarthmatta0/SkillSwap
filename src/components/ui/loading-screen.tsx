import React from 'react';
import { LogoLink } from './logo';

interface LoadingScreenProps {
  isVisible: boolean;
  isInitial?: boolean;
}

export function LoadingScreen({ isVisible, isInitial = false }: LoadingScreenProps) {
  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[60] flex items-center justify-center transition-all duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } ${isInitial ? 'initial-loading' : ''}`}
    >
      {/* Enhanced background for initial loading */}
      <div className={`absolute inset-0 ${
        isInitial 
          ? 'bg-gradient-to-br from-skillswap-primary/5 via-background to-skillswap-accent/5' 
          : 'bg-background/90 backdrop-blur-sm'
      }`} />
      
      {/* Loading Content */}
      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* Logo with Enhanced Animation */}
        <div className={`flex flex-col items-center gap-4 ${
          isInitial ? 'initial-logo-animation' : ''
        }`}>
          <div className={`transform ${isInitial ? 'scale-125' : 'scale-110'} transition-transform duration-700`}>
            <LogoLink onNavigate={() => {}} size="lg" />
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className={`${
              isInitial ? 'text-4xl' : 'text-3xl'
            } font-bold skillswap-hero-gradient transition-all duration-700`}>
              SkillSwap
            </span>
            {isInitial && (
              <p className="text-muted-foreground text-lg animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                Connecting minds, sharing skills
              </p>
            )}
          </div>
        </div>
        
        {/* Enhanced Loading Animation */}
        <div className={`flex space-x-1 ${isInitial ? 'loading-dots-enhanced' : ''}`}>
          <div className={`${
            isInitial ? 'w-3 h-3' : 'w-2 h-2'
          } bg-skillswap-primary rounded-full animate-bounce transition-all duration-300`} 
          style={{ animationDelay: '0ms' }}></div>
          <div className={`${
            isInitial ? 'w-3 h-3' : 'w-2 h-2'
          } bg-skillswap-accent rounded-full animate-bounce transition-all duration-300`} 
          style={{ animationDelay: '150ms' }}></div>
          <div className={`${
            isInitial ? 'w-3 h-3' : 'w-2 h-2'
          } bg-skillswap-success rounded-full animate-bounce transition-all duration-300`} 
          style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Progress indicator for initial loading */}
        {isInitial && (
          <div className="w-48 h-1 bg-muted rounded-full overflow-hidden animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <div className="h-full bg-gradient-to-r from-skillswap-primary via-skillswap-accent to-skillswap-success animate-loading-progress"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoadingScreen;