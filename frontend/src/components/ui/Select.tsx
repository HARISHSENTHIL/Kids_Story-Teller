'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  emoji?: string;
  description?: string;
}

interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  error?: string;
  variant?: 'default' | 'magical';
}

export function Select({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  error,
  variant = 'default'
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(option => option.value === value);

  const containerClasses = `
    relative w-full
  `;

  const triggerClasses = `
    w-full px-4 py-3 rounded-xl border-2 
    transition-all duration-200
    focus:outline-none focus:ring-4 focus:ring-opacity-50
    cursor-pointer
    flex items-center justify-between
    ${variant === 'magical' 
      ? 'border-purple-200 focus:border-purple-400 focus:ring-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100' 
      : 'border-gray-200 focus:border-blue-400 focus:ring-blue-300 hover:bg-gray-50'
    }
    ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-300' : ''}
    ${isOpen ? 'ring-4 ring-opacity-50' : ''}
  `;

  // Calculate dropdown position
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      // If there's not enough space below but enough above, position above
      if (spaceBelow < 200 && spaceAbove > 200) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }
  }, [isOpen]);

  const dropdownClasses = `
    absolute left-0 right-0 
    ${dropdownPosition === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2'}
    bg-white border-2 rounded-xl shadow-xl
    z-[99999] max-h-60 overflow-y-auto
    transform-gpu
    ${variant === 'magical' ? 'border-purple-200' : 'border-gray-200'}
  `;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div ref={containerRef} className={containerClasses}>
        <motion.div
          className={triggerClasses}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center space-x-2">
            {selectedOption?.emoji && (
              <span className="text-lg">{selectedOption.emoji}</span>
            )}
            <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={dropdownClasses}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {options.map((option) => (
                <motion.div
                  key={option.value}
                  className={`
                    px-4 py-3 cursor-pointer
                    transition-colors duration-150
                    hover:bg-purple-50
                    flex items-center justify-between
                    ${option.value === value ? 'bg-purple-100' : ''}
                  `}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  whileHover={{ backgroundColor: 'rgb(250 245 255)' }}
                >
                  <div className="flex items-center space-x-3">
                    {option.emoji && (
                      <span className="text-lg">{option.emoji}</span>
                    )}
                    <div>
                      <div className="font-medium text-gray-900">
                        {option.label}
                      </div>
                      {option.description && (
                        <div className="text-sm text-gray-500">
                          {option.description}
                        </div>
                      )}
                    </div>
                  </div>
                  {option.value === value && (
                    <Check className="w-5 h-5 text-purple-600" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Backdrop to close dropdown */}
        {isOpen && (
          <div
            className="fixed inset-0 z-[99998]"
            onClick={() => setIsOpen(false)}
          />
        )}
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

export function MagicalSelect(props: SelectProps) {
  return <Select variant="magical" {...props} />;
}
