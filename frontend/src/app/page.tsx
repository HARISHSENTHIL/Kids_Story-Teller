'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useStory } from '@/contexts/StoryContext';
import { StoryCreator } from '@/components/StoryCreator';
import { StoryChat } from '@/components/StoryChat';
import { TutorCreator } from '@/components/TutorCreator';
import { TutorChat } from '@/components/TutorChat';
import { ModeSelector } from '@/components/ModeSelector';

export default function HomePage() {
  const { hasActiveSession, state, currentModeInfo } = useStory();

  const renderContent = () => {
    // Show mode selector if explicitly requested
    if (state.showModeSelector) {
      return <ModeSelector />;
    }

    // If there's an active session, show the appropriate chat interface
    if (hasActiveSession) {
      if (state.mode === 'story') {
        return <StoryChat />;
      } else if (state.mode === 'tutor') {
        return <TutorChat />;
      }
    }

    // If no active session, show the appropriate creator
    if (state.mode === 'story') {
      return <StoryCreator />;
    } else if (state.mode === 'tutor') {
      return <TutorCreator />;
    }

    // Fallback to mode selector
    return <ModeSelector />;
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white bg-opacity-80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center
                ${state.mode === 'story' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                  : 'bg-gradient-to-r from-blue-500 to-green-500'
                }
              `}>
                <span className="text-white text-lg font-bold">
                  {state.mode === 'story' ? '📖' : '🎓'}
                </span>
              </div>
              <div>
                <span className={`
                  text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent
                  ${state.mode === 'story' 
                    ? 'from-purple-600 to-pink-600' 
                    : 'from-blue-600 to-green-600'
                  }
                `}>
                  {hasActiveSession ? currentModeInfo.name : 'Kids Learning Bot'}
                </span>
                {hasActiveSession && (
                  <div className="text-xs text-gray-500">
                    {currentModeInfo.description}
                  </div>
                )}
                {/* {!hasActiveSession && !state.showModeSelector && (
                  <button
                    onClick={showModeSelector}
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    ← Change Mode
                  </button>
                )} */}
              </div>
            </motion.div>
            
            <motion.div
              className="hidden sm:flex items-center space-x-4 text-sm text-gray-600"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                Safe & Educational
              </span>
              <span className={`
                px-3 py-1 rounded-full text-xs font-medium
                ${state.mode === 'story' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-blue-100 text-blue-800'
                }
              `}>
                {state.mode === 'story' ? 'Story Mode' : 'Tutor Mode'}
              </span>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative mb-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {renderContent()}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white bg-opacity-60 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <motion.div
              className="flex items-center justify-center space-x-6 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">🛡️</span>
                <span className="text-sm font-medium">Safe Content</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">📚</span>
                <span className="text-sm font-medium">Stories</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">🎓</span>
                <span className="text-sm font-medium">Learning</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">✓</span>
                <span className="text-sm font-medium">Professional</span>
              </div>
            </motion.div>
            
            <motion.p
              className="text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Creating engaging stories and educational experiences for young minds with AI
            </motion.p>
            
            <motion.div
              className="mt-4 flex justify-center space-x-4 text-xs text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span>Stories & Learning with AI</span>
              <span>•</span>
              <span>Kid-safe content</span>
              <span>•</span>
              <span>Made with ❤️ for young learners</span>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}