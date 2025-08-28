import { useState, useEffect } from 'react';

interface UseThemeReturn {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  systemPrefersDark: boolean;
}

export function useTheme(): UseThemeReturn {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('skillswap-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setSystemPrefersDark(systemPrefersDark);
    
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    setIsDarkMode(shouldUseDark);
    
    if (shouldUseDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
      
      const savedTheme = localStorage.getItem('skillswap-theme');
      // Only follow system theme if user hasn't explicitly set a preference
      if (!savedTheme) {
        setIsDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('skillswap-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('skillswap-theme', 'light');
        }
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  // Listen for custom theme change events from other components
  useEffect(() => {
    const handleCustomThemeChange = (event: CustomEvent) => {
      setIsDarkMode(event.detail.isDark);
    };

    window.addEventListener('theme-changed', handleCustomThemeChange as EventListener);
    return () => window.removeEventListener('theme-changed', handleCustomThemeChange as EventListener);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('skillswap-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('skillswap-theme', 'light');
      }
      
      // Dispatch custom event for other components to respond
      window.dispatchEvent(new CustomEvent('theme-changed', { 
        detail: { isDark: newMode } 
      }));
      
      return newMode;
    });
  };

  return {
    isDarkMode,
    toggleDarkMode,
    systemPrefersDark
  };
}

export default useTheme;