import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  tiltMaxAngle?: number;
  tiltReverse?: boolean;
  tiltScale?: number;
  glareEnable?: boolean;
  glareMaxOpacity?: number;
  glareColor?: string;
  glarePosition?: string;
  glareBorderRadius?: string;
  style?: React.CSSProperties;
}

export function Card3D({
  children,
  className = '',
  tiltMaxAngle = 20,
  tiltReverse = false,
  tiltScale = 1.05,
  glareEnable = true,
  glareMaxOpacity = 0.7,
  glareColor = 'rgba(255,255,255,0.3)',
  glarePosition = 'bottom',
  glareBorderRadius = '0',
  style = {},
  ...props
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardCenter, setCardCenter] = useState({ x: 0, y: 0 });
  const [cardSize, setCardSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateCardDimensions = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setCardCenter({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
        setCardSize({
          width: rect.width,
          height: rect.height,
        });
      }
    };

    updateCardDimensions();
    window.addEventListener('resize', updateCardDimensions);
    window.addEventListener('scroll', updateCardDimensions);

    return () => {
      window.removeEventListener('resize', updateCardDimensions);
      window.removeEventListener('scroll', updateCardDimensions);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setMousePosition({ x: e.clientX, y: e.clientY });
    setCardCenter({ x: centerX, y: centerY });
    setCardSize({ width: rect.width, height: rect.height });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  // Calculate tilt based on mouse position
  const calculateTilt = () => {
    if (!isHovered || !cardSize.width || !cardSize.height) {
      return { rotateX: 0, rotateY: 0, scale: 1 };
    }

    const mouseX = mousePosition.x - cardCenter.x;
    const mouseY = mousePosition.y - cardCenter.y;

    const rotateY = (mouseX / (cardSize.width / 2)) * tiltMaxAngle;
    const rotateX = -(mouseY / (cardSize.height / 2)) * tiltMaxAngle;

    return {
      rotateX: tiltReverse ? -rotateX : rotateX,
      rotateY: tiltReverse ? -rotateY : rotateY,
      scale: isHovered ? tiltScale : 1,
    };
  };

  // Calculate gradient position
  const calculateGradientPosition = () => {
    if (!isHovered || !cardSize.width || !cardSize.height) {
      return { x: 50, y: 50 };
    }

    const mouseX = mousePosition.x - cardCenter.x + cardSize.width / 2;
    const mouseY = mousePosition.y - cardCenter.y + cardSize.height / 2;

    const x = (mouseX / cardSize.width) * 100;
    const y = (mouseY / cardSize.height) * 100;

    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  // Calculate sheen position
  const calculateSheenPosition = () => {
    if (!isHovered) return { x: -100, y: -100 };

    const gradientPos = calculateGradientPosition();
    return {
      x: gradientPos.x - 50,
      y: gradientPos.y - 50,
    };
  };

  const tilt = calculateTilt();
  const gradientPos = calculateGradientPosition();
  const sheenPos = calculateSheenPosition();

  return (
    <motion.div
      ref={cardRef}
      className={`relative transform-gpu transition-all duration-200 ease-out ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        ...style,
      }}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        scale: tilt.scale,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-lg opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, rgba(30, 58, 138, 0.15) 0%, rgba(30, 58, 138, 0.05) 40%, transparent 80%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Glare effect */}
      {glareEnable && (
        <div
          className="absolute inset-0 pointer-events-none rounded-lg opacity-0 transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, transparent 30%, ${glareColor} 50%, transparent 70%)`,
            transform: `translate(${sheenPos.x * 0.5}px, ${sheenPos.y * 0.3}px)`,
            opacity: isHovered ? glareMaxOpacity : 0,
            borderRadius: glareBorderRadius,
            mixBlendMode: 'overlay',
          }}
        />
      )}

      {/* Sheen effect that follows cursor */}
      <div
        className="absolute inset-0 pointer-events-none rounded-lg transition-all duration-200"
        style={{
          background: `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 30%, transparent 60%)`,
          opacity: isHovered ? 0.6 : 0,
          transform: `translate(${sheenPos.x * 0.1}px, ${sheenPos.y * 0.1}px)`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Subtle shadow enhancement */}
      <div
        className="absolute inset-0 -z-10 rounded-lg transition-all duration-300"
        style={{
          boxShadow: isHovered 
            ? '0 20px 40px rgba(30, 58, 138, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)' 
            : '0 4px 8px rgba(0, 0, 0, 0.05)',
          transform: 'translateZ(-1px)',
        }}
      />
    </motion.div>
  );
}

// Enhanced version with more dramatic effects for hero cards
export function Card3DHero({
  children,
  className = '',
  accentColor = 'var(--skillswap-primary)',
  ...props
}: Card3DProps & { accentColor?: string }) {
  return (
    <Card3D
      className={`relative overflow-hidden ${className}`}
      tiltMaxAngle={15}
      tiltScale={1.08}
      glareMaxOpacity={0.8}
      glareColor="rgba(255, 255, 255, 0.4)"
      {...props}
    >
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Additional animated border glow */}
      <div 
        className="absolute inset-0 rounded-lg pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(45deg, ${accentColor}20, transparent, ${accentColor}20)`,
          backgroundSize: '200% 200%',
          animation: 'gradientMove 3s ease infinite',
        }}
      />
    </Card3D>
  );
}

// Subtle version for regular content cards
export function Card3DSubtle({
  children,
  className = '',
  ...props
}: Card3DProps) {
  return (
    <Card3D
      className={className}
      tiltMaxAngle={8}
      tiltScale={1.02}
      glareMaxOpacity={0.3}
      glareColor="rgba(255, 255, 255, 0.2)"
      {...props}
    >
      {children}
    </Card3D>
  );
}