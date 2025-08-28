import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Home, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (page: string) => void;
  darkMode?: boolean;
}

export default function NotFoundPage({ onNavigate, darkMode }: NotFoundPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating illustration elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <div className="w-full h-full bg-skillswap-primary rounded-lg" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 404 Text with glow */}
        <motion.div
          initial={{ filter: 'blur(20px)', opacity: 0, scale: 0.8 }}
          animate={{ filter: 'blur(0px)', opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-8"
        >
          <h1 className="text-[8rem] md:text-[12rem] font-bold leading-none mb-4 relative">
            <span className="skillswap-hero-gradient">404</span>
            <div className="absolute inset-0 skillswap-hero-gradient blur-3xl opacity-30 animate-pulse" />
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Oops, the page you're looking for doesn't exist.
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            It looks like you've wandered into uncharted territory. Let's get you back to familiar ground.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            onClick={() => onNavigate('landing')}
            className="glass-card border-skillswap-primary/20 hover:border-skillswap-primary/40 bg-skillswap-primary hover:bg-skillswap-primary-dark text-[rgba(31,41,55,1)] px-8 py-3 rounded-xl transition-all duration-300 group btn-stable"
          >
            <Home className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
            Back to Home
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.history.back()}
            className="glass-card border-skillswap-primary/20 hover:border-skillswap-primary/40 
                     text-skillswap-primary hover:text-skillswap-primary hover:bg-skillswap-primary/5 px-8 py-3 rounded-xl transition-all duration-300 group btn-stable"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Go Back
          </Button>
        </motion.div>

        {/* Additional help text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12 text-sm text-muted-foreground"
        >
          <p>
            Need help? <button 
              onClick={() => onNavigate('help')}
              className="text-skillswap-primary hover:text-skillswap-primary-dark underline"
            >
              Contact our support team
            </button>
          </p>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-skillswap-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-skillswap-primary/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}