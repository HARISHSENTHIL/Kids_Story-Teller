'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'fun';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const variants = {
  primary: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg',
  secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 border-2 border-gray-300',
  success: 'bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white shadow-lg',
  warning: 'bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white shadow-lg',
  fun: 'bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 hover:from-pink-500 hover:via-purple-600 hover:to-indigo-600 text-white shadow-xl',
};

const sizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-6 py-4 text-lg',
  xl: 'px-8 py-5 text-xl',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  fullWidth = false,
  className = '',
  disabled,
  onClick,
  type = 'button'
}: ButtonProps) {
  const baseClasses = `
    font-bold rounded-xl
    transition-all duration-200
    transform-gpu
    focus:outline-none focus:ring-4 focus:ring-opacity-50 focus:ring-blue-300
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    select-none
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  return (
    <motion.button
      className={baseClasses}
      disabled={disabled || isLoading}
      whileHover={!disabled && !isLoading ? { 
        scale: 1.05,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
      } : {}}
      whileTap={!disabled && !isLoading ? { 
        scale: 0.95 
      } : {}}
      initial={{ scale: 1 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      onClick={onClick}
      type={type}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        {!isLoading && icon && icon}
        {children}
      </div>
    </motion.button>
  );
}
