import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { ChevronUp } from 'lucide-react';
import { smoothScrollToTop } from '../../utils/scrollUtils';

interface ScrollToTopProps {
  /** Show button after scrolling this many pixels */
  showAfter?: number;
  /** Button position from bottom of screen */
  bottom?: string;
  /** Button position from right of screen */
  right?: string;
  /** Custom className for styling */
  className?: string;
}

export function ScrollToTop({
  showAfter = 300,
  bottom = '2rem',
  right = '2rem',
  className = '',
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [showAfter]);

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={smoothScrollToTop}
      size="sm"
      className={`
        fixed z-50 w-12 h-12 rounded-full shadow-lg
        bg-skillswap-primary hover:bg-skillswap-primary-dark
        text-white border-0
        transition-all duration-300 ease-out
        hover:scale-110 hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-skillswap-primary focus:ring-offset-2
        ${className}
      `}
      style={{
        bottom,
        right,
      }}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5" />
    </Button>
  );
}