'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'colorful' | 'magical' | 'story';
  hover?: boolean;
  onClick?: () => void;
}

const variants = {
  default: 'bg-white border border-gray-200 shadow-md',
  colorful: 'bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 border-2 border-purple-200 shadow-lg',
  magical: 'bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 border-2 border-pink-300 shadow-xl',
  story: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-indigo-200 shadow-lg',
};

export function Card({ 
  children, 
  className = '', 
  variant = 'default',
  hover = false,
  onClick 
}: CardProps) {
  const baseClasses = `
    rounded-2xl p-6
    transition-all duration-300
    ${variants[variant]}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  const cardContent = (
    <div className={baseClasses}>
      {children}
    </div>
  );

  if (hover || onClick) {
    return (
      <motion.div
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          y: -2
        }}
        whileTap={onClick ? { scale: 0.98 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        onClick={onClick}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
}

export function StoryCard({ children, className = '', ...props }: Omit<CardProps, 'variant'>) {
  return (
    <Card variant="story" className={`relative overflow-hidden ${className}`} {...props}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full opacity-20 -translate-y-10 translate-x-10" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-200 to-purple-300 rounded-full opacity-20 translate-y-8 -translate-x-8" />
      <div className="relative z-10">
        {children}
      </div>
    </Card>
  );
}

export function ConfigCard({ children, className = '', ...props }: Omit<CardProps, 'variant'>) {
  return (
    <Card variant="colorful" className={`relative overflow-hidden ${className}`} {...props}>
      {/* Sparkle decorations */}
      <div className="absolute top-4 right-4">
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
      </div>
      <div className="absolute top-8 right-8">
        <div className="w-1 h-1 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
      <div className="absolute bottom-6 left-6">
        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </Card>
  );
}
