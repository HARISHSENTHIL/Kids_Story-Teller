'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'magical';
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'magical';
}

export function Input({ 
  label, 
  error, 
  icon, 
  variant = 'default',
  className = '', 
  ...props 
}: InputProps) {
  const baseClasses = `
    w-full px-4 py-3 rounded-xl border-2 
    transition-all duration-200
    focus:outline-none focus:ring-4 focus:ring-opacity-50
    ${variant === 'magical' 
      ? 'border-purple-200 focus:border-purple-400 focus:ring-purple-300 bg-gradient-to-r from-purple-50 to-pink-50' 
      : 'border-gray-200 focus:border-blue-400 focus:ring-blue-300'
    }
    ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-300' : ''}
    ${icon ? 'pl-12' : ''}
    ${className}
  `;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={baseClasses}
          {...props}
        />
      </div>
      {error && (
        <motion.p
          className="text-sm text-red-600"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

export function TextArea({ 
  label, 
  error, 
  variant = 'default',
  className = '', 
  ...props 
}: TextAreaProps) {
  const baseClasses = `
    w-full px-4 py-3 rounded-xl border-2 
    transition-all duration-200
    focus:outline-none focus:ring-4 focus:ring-opacity-50
    resize-none
    ${variant === 'magical' 
      ? 'border-purple-200 focus:border-purple-400 focus:ring-purple-300 bg-gradient-to-r from-purple-50 to-pink-50' 
      : 'border-gray-200 focus:border-blue-400 focus:ring-blue-300'
    }
    ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-300' : ''}
    ${className}
  `;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        className={baseClasses}
        {...props}
      />
      {error && (
        <motion.p
          className="text-sm text-red-600"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

export function MagicalInput(props: InputProps) {
  return <Input variant="magical" {...props} />;
}

export function MagicalTextArea(props: TextAreaProps) {
  return <TextArea variant="magical" {...props} />;
}
