import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './button';
import { Card } from './card';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: {
    text: string;
    action: string;
  };
  gradient: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  onNavigate: (page: string) => void;
  autoPlay?: boolean;
  className?: string;
}

export function HeroCarousel({ 
  slides, 
  onNavigate, 
  autoPlay = true, 
  className = '' 
}: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, slides.length, currentSlide]);

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (!slides || slides.length === 0) return null;

  const current = slides[currentSlide];

  return (
    <div className={`relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-2xl ${className}`}>
      {/* Background with parallax effect */}
      <div className="absolute inset-0">
        <motion.div
          key={currentSlide}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 ${current.gradient}`}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Carousel content */}
      <div 
        className="relative h-full flex items-center"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100, rotateY: 15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -100, rotateY: -15 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full px-6 md:px-12 lg:px-16"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
              {/* Content */}
              <div className="text-white space-y-6 z-10 relative">
                <motion.div
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-reveal">
                    {current.title}
                  </h1>
                  <h2 className="text-xl md:text-2xl font-medium mb-4 text-white/90">
                    {current.subtitle}
                  </h2>
                  <p className="text-lg text-white/80 leading-relaxed max-w-lg">
                    {current.description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <Button
                    size="lg"
                    onClick={() => onNavigate(current.cta.action)}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 
                             backdrop-blur-sm px-8 py-3 rounded-xl transition-all duration-300 group"
                  >
                    {current.cta.text}
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative"
              >
                <Card className="glass-card overflow-hidden transform hover:scale-105 transition-all duration-500">
                  <ImageWithFallback
                    src={current.image}
                    alt={current.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </Card>
                
                {/* Floating elements */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-skillswap-accent/20 rounded-full blur-sm"
                />
                <motion.div
                  animate={{ 
                    y: [0, 15, 0],
                    rotate: [0, -3, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1
                  }}
                  className="absolute -bottom-6 -left-6 w-20 h-20 bg-skillswap-primary/20 rounded-full blur-sm"
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows - Desktop */}
        <div className="hidden md:flex">
          <Button
            variant="ghost"
            size="lg"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full 
                     bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40
                     backdrop-blur-sm transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full 
                     bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40
                     backdrop-blur-sm transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-110 shadow-lg'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <motion.div
            key={currentSlide}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: autoPlay ? 5 : 0 }}
            className="h-full bg-white"
          />
        </div>
      </div>
    </div>
  );
}