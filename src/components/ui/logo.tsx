import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  clickable?: boolean;
}

const sizeClasses = {
  sm: 'h-5 w-auto', // ~20px height - for compact contexts
  md: 'h-8 w-auto', // ~32px height - ideal for navbar (h-16)
  lg: 'h-10 w-auto', // ~40px height - for larger headers
  xl: 'h-14 w-auto'  // ~56px height - for hero sections
};

export function Logo({ className = '', size = 'md', onClick, clickable = true }: LogoProps) {
  const logoElement = (
    <svg 
      className={`${sizeClasses[size]} ${className} ${clickable ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
      viewBox="0 0 112 105" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      role={clickable ? "button" : "img"}
      aria-label="SkillSwap"
    >
      <g clipPath="url(#clip0_1_2)">
        <path 
          d="M37.71 0L95.47 0.03C96.77 0.46 95.7 1.98 95.29 2.79C92.76 7.71 89.24 13.22 86.33 18.01C84.95 20.29 83.56 23.94 80.57 24.13C66.93 24.69 52.67 23.36 39.1 24.11C38.39 24.15 37.33 24.24 36.64 24.35C27.02 25.9 23.95 37.81 35.18 39.31C48.64 39.87 62.59 38.65 75.99 39.33C96.22 40.35 111.68 56.01 107.69 76.91C104.74 92.32 89.74 103.23 74.52 104.18L16.98 104.02C16.12 103.57 15.84 102.85 16.25 101.94C18.25 98.5 20.13 94.99 22.09 91.53C23.84 88.44 26.18 83.65 28.2 80.97C29.05 79.84 30 79.48 31.38 79.36L75.52 79.34C85.41 77.94 85.63 66.49 75.52 65.21C61.26 64.58 46.4 65.96 32.21 65.19C5.3 63.74 -6.81 35.28 10.99 14.95C18.58 6.27 25.67 0.75 37.71 0Z" 
          fill="url(#paint0_linear_1_2)"
        />
        <path 
          d="M97.59 21.04C98.42 10.51 113.53 13.12 111.88 22.72C110.39 31.41 96.94 29.33 97.59 21.04Z" 
          fill="url(#paint1_linear_1_2)"
        />
        <path 
          d="M3.02 79.75C11.48 74.46 18.29 88.48 8.97 91.65C1.32 94.25 -3.42 83.78 3.02 79.75Z" 
          fill="url(#paint2_linear_1_2)"
        />
      </g>
      <defs>
        <linearGradient id="paint0_linear_1_2" x1="24.85" y1="84.82" x2="98.68" y2="9.07" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4B79BD"/>
          <stop offset="1" stopColor="#37A7DF"/>
        </linearGradient>
        <linearGradient id="paint1_linear_1_2" x1="100.291" y1="19.5524" x2="111.861" y2="23.9063" gradientUnits="userSpaceOnUse">
          <stop stopColor="#30A5DE"/>
          <stop offset="0.24" stopColor="#31A1DB"/>
          <stop offset="0.47" stopColor="#3695D2"/>
          <stop offset="0.69" stopColor="#3F82C5"/>
          <stop offset="0.92" stopColor="#4B67B1"/>
          <stop offset="1" stopColor="#515BA9"/>
        </linearGradient>
        <linearGradient id="paint2_linear_1_2" x1="13.4615" y1="85.7787" x2="-1.82545" y2="84.6866" gradientUnits="userSpaceOnUse">
          <stop stopColor="#30A5DE"/>
          <stop offset="0.24" stopColor="#31A1DB"/>
          <stop offset="0.47" stopColor="#3695D3"/>
          <stop offset="0.69" stopColor="#3F82C5"/>
          <stop offset="0.91" stopColor="#4A68B2"/>
          <stop offset="1" stopColor="#515BA9"/>
        </linearGradient>
        <clipPath id="clip0_1_2">
          <rect width="112.01" height="104.19" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );

  if (clickable && onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center focus:outline-none focus:ring-2 focus:ring-skillswap-primary focus:ring-offset-2 rounded"
        aria-label="Go to SkillSwap home page"
      >
        {logoElement}
      </button>
    );
  }

  return logoElement;
}

// Convenience components for specific use cases
export function LogoLink({ onNavigate, ...props }: LogoProps & { onNavigate: (page: string) => void }) {
  return (
    <Logo 
      {...props} 
      onClick={() => onNavigate('landing')}
      clickable={true}
    />
  );
}

export function LogoStatic(props: Omit<LogoProps, 'onClick' | 'clickable'>) {
  return <Logo {...props} clickable={false} />;
}