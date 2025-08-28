import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './button';
import { Plus, MessageCircle, BookOpen, Users } from 'lucide-react';

interface FloatingActionButtonProps {
  onNavigate: (page: string) => void;
  user?: any;
}

const fabOptions = [
  {
    id: 'ask',
    label: 'Ask for Help',
    icon: MessageCircle,
    action: 'explore',
    color: 'bg-skillswap-primary hover:bg-skillswap-primary-dark',
  },
  {
    id: 'teach',
    label: 'Teach a Skill',
    icon: BookOpen,
    action: 'skill-setup',
    color: 'bg-skillswap-accent hover:bg-skillswap-accent-dark',
  },
  {
    id: 'join',
    label: 'Join Community',
    icon: Users,
    action: 'community',
    color: 'bg-skillswap-success hover:bg-green-600',
  },
];

export function FloatingActionButton({ onNavigate, user }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (action: string) => {
    setIsOpen(false);
    if (!user && action !== 'community') {
      onNavigate('signup');
    } else {
      onNavigate(action);
    }
  };

  return (
    <div className="fab">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-16 right-0 flex flex-col gap-3 mb-2"
          >
            {fabOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20, x: 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: 20, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="bg-background text-foreground px-3 py-2 rounded-lg text-sm font-medium 
                               glass-card border shadow-lg whitespace-nowrap">
                  {option.label}
                </span>
                <Button
                  size="sm"
                  onClick={() => handleOptionClick(option.action)}
                  className={`w-12 h-12 rounded-full ${option.color} text-white shadow-lg
                             transition-all duration-300 hover:scale-110 hover:shadow-xl`}
                >
                  <option.icon className="w-5 h-5" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-full rounded-full bg-skillswap-primary hover:bg-skillswap-primary-dark 
                   text-white shadow-lg transition-all duration-300 ${
                     isOpen ? 'rotate-45 scale-110' : 'hover:scale-110 hover:shadow-xl'
                   }`}
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
}

export default FloatingActionButton;