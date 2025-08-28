/**
 * Enhanced scroll utilities for SkillSwap application
 * Provides smooth scrolling, scroll-to-top, and scroll restoration functionality
 */

// Scroll to top with smooth animation
export const scrollToTop = (behavior: ScrollBehavior = 'smooth') => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior,
  });
};

// Scroll to a specific element
export const scrollToElement = (
  elementId: string,
  behavior: ScrollBehavior = 'smooth',
  offset: number = 80 // Account for sticky header
) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior,
    });
  }
};

// Scroll to element by selector
export const scrollToSelector = (
  selector: string,
  behavior: ScrollBehavior = 'smooth',
  offset: number = 80
) => {
  const element = document.querySelector(selector);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior,
    });
  }
};

// Debounced scroll event listener
export const createScrollListener = (
  callback: (scrollY: number) => void,
  delay: number = 10
) => {
  let timeoutId: number | null = null;

  const handleScroll = () => {
    if (timeoutId) return;

    timeoutId = window.requestAnimationFrame(() => {
      callback(window.scrollY);
      timeoutId = null;
    });
  };

  return {
    addListener: () => {
      window.addEventListener('scroll', handleScroll, { passive: true });
    },
    removeListener: () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        window.cancelAnimationFrame(timeoutId);
      }
    },
  };
};

// Save and restore scroll position
export const scrollPosition = {
  save: (key: string = 'scrollPosition') => {
    const position = window.scrollY;
    sessionStorage.setItem(key, position.toString());
  },
  
  restore: (key: string = 'scrollPosition', behavior: ScrollBehavior = 'auto') => {
    const savedPosition = sessionStorage.getItem(key);
    if (savedPosition) {
      const position = parseInt(savedPosition, 10);
      window.scrollTo({
        top: position,
        behavior,
      });
      sessionStorage.removeItem(key);
    }
  },
  
  clear: (key: string = 'scrollPosition') => {
    sessionStorage.removeItem(key);
  },
};

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get appropriate scroll behavior based on user preference
export const getScrollBehavior = (): ScrollBehavior => {
  return prefersReducedMotion() ? 'auto' : 'smooth';
};

// Enhanced scroll to top that respects user preferences and performance
export const smoothScrollToTop = () => {
  // Use requestAnimationFrame for better performance
  requestAnimationFrame(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
  });
};

// Enhanced scroll to element that respects user preferences
export const smoothScrollToElement = (elementId: string, offset?: number) => {
  scrollToElement(elementId, getScrollBehavior(), offset);
};

// Enhanced scroll to selector that respects user preferences
export const smoothScrollToSelector = (selector: string, offset?: number) => {
  scrollToSelector(selector, getScrollBehavior(), offset);
};

// Intersection Observer for scroll-triggered animations
export const createScrollObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Smooth scroll navigation for internal links
export const handleInternalNavigation = (
  event: React.MouseEvent<HTMLAnchorElement>,
  targetId: string,
  offset?: number
) => {
  event.preventDefault();
  smoothScrollToElement(targetId, offset);
};