import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  phrases: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenPhrases?: number;
  className?: string;
  initialWaitTime?: number;
  cursorStyle?: "line" | "block" | "underline";
  cursorBlinkSpeed?: number;
  showCursorDuringDelete?: boolean;
  pauseAfterTyping?: number;
}

export function TypewriterText({ 
  phrases, 
  typeSpeed = 100, 
  deleteSpeed = 50, 
  delayBetweenPhrases = 2000,
  className = "",
  initialWaitTime = 1500,
  cursorStyle = "line", // "line", "block", "underline"
  cursorBlinkSpeed = 1000, // milliseconds
  showCursorDuringDelete = false,
  pauseAfterTyping = 800
}: TypewriterTextProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isInitialWait, setIsInitialWait] = useState(true);
  const [isPausingAfterTyping, setIsPausingAfterTyping] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) return;

    // Initial wait period - just show blinking cursor
    if (isInitialWait) {
      const initialTimeout = setTimeout(() => {
        setIsInitialWait(false);
      }, initialWaitTime);
      
      return () => clearTimeout(initialTimeout);
    }

    const currentPhrase = phrases[currentPhraseIndex];
    
    const timeout = setTimeout(() => {
      if (isPausingAfterTyping) {
        setIsPausingAfterTyping(false);
        setIsWaiting(true);
        return;
      }

      if (isWaiting) {
        setIsWaiting(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        // Deleting characters
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Finished deleting, move to next phrase
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      } else {
        // Typing characters
        if (currentText.length < currentPhrase.length) {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        } else {
          // Finished typing, pause with cursor visible
          setIsPausingAfterTyping(true);
        }
      }
    }, 
      isPausingAfterTyping ? pauseAfterTyping :
      isWaiting ? delayBetweenPhrases : 
      isDeleting ? deleteSpeed : 
      typeSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isWaiting, isPausingAfterTyping, currentPhraseIndex, phrases, typeSpeed, deleteSpeed, delayBetweenPhrases, pauseAfterTyping, isInitialWait, initialWaitTime]);

  // Determine cursor visibility based on current state
  const shouldShowCursor = () => {
    // Always show cursor in initial wait
    if (isInitialWait) return true;
    
    // Show cursor while typing
    if (!isDeleting && !isWaiting && !isPausingAfterTyping) return true;
    
    // Show cursor during pause after typing (key enhancement)
    if (isPausingAfterTyping) return true;
    
    // Show cursor during main waiting period
    if (isWaiting) return true;
    
    // Show cursor during deletion only if enabled
    if (isDeleting && showCursorDuringDelete) return true;
    
    return false;
  };

  // Get cursor class based on style
  const getCursorClass = () => {
    const baseClasses = "inline-block bg-current ml-1";
    const blinkClass = "typewriter-cursor";
    
    switch (cursorStyle) {
      case "block":
        return `${baseClasses} w-[0.6em] h-[1em] ${blinkClass}`;
      case "underline":
        return `${baseClasses} w-[0.8em] h-[0.15em] ${blinkClass}`;
      case "line":
      default:
        return `${baseClasses} w-0.5 h-[1em] ${blinkClass}`;
    }
  };

  if (phrases.length === 0) {
    return <span className={className}>No phrases provided</span>;
  }

  return (
    <span className={`typewriter-text-protected ${className}`}>
      {currentText}
      {shouldShowCursor() && (
        <span 
          className={getCursorClass()}
          style={{ 
            verticalAlign: cursorStyle === "underline" ? "baseline" : "baseline",
            animationDuration: `${cursorBlinkSpeed}ms`
          }}
        />
      )}
    </span>
  );
}