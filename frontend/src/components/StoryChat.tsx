'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, RotateCcw, Settings, CheckCircle, MessageCircle, Sparkles } from 'lucide-react';
import { useStory } from '@/contexts/StoryContext';
import { Button } from '@/components/ui/Button';
import { MagicalInput } from '@/components/ui/Input';
import { StoryCard, ConfigCard } from '@/components/ui/Card';
import { StoryGeneratingLoader } from '@/components/ui/LoadingSpinner';

export function StoryChat() {
  const { 
    state, 
    continueStory, 
    resetSession,
    canContinue,
    totalWordCount,
    storyProgress
  } = useStory();

  const [userInput, setUserInput] = useState('');
  const [inputError, setInputError] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.storyContent, state.isGenerating]);

  const handleContinueStory = async () => {
    if (!userInput.trim()) {
      setInputError('Please tell us what happens next!');
      return;
    }

    if (userInput.trim().length < 3) {
      setInputError('Please give us a bit more detail!');
      return;
    }

    setInputError('');
    const inputToProcess = userInput.trim();
    setUserInput(''); // Clear input immediately for better UX
    await continueStory(inputToProcess);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (canContinue && userInput.trim()) {
        handleContinueStory();
      }
    }
  };

  const handleNewStory = () => {
    resetSession();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with progress */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <MessageCircle className="w-6 h-6 text-purple-500 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Your Story Adventure</h1>
          </div>
          
          {/* Progress indicator */}
          <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
            <span>{totalWordCount} words</span>
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${storyProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setShowSettings(!showSettings)}
            variant="secondary"
            size="sm"
            icon={<Settings className="w-4 h-4" />}
          >
            Settings
          </Button>
          <Button
            onClick={handleNewStory}
            variant="secondary"
            size="sm"
            icon={<RotateCcw className="w-4 h-4" />}
          >
            New Story
          </Button>
        </div>
      </motion.div>

      {/* Settings panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ConfigCard>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Story Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="font-medium text-gray-700">Content Filter</p>
                  <p className="text-purple-600 capitalize">{state.contentFilter.replace('_', ' ')}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-gray-700">Age Group</p>
                  <p className="text-purple-600">{state.ageGroup} years</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-gray-700">Messages</p>
                  <p className="text-purple-600">{state.messageCount} exchanges</p>
                </div>
              </div>
            </ConfigCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Story content */}
      <div className="space-y-6 min-h-[400px] max-h-[600px] overflow-y-auto pr-2 pb-6 scrollbar-thin">
        {state.storyContent.map((content, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* User input (if exists) */}
            {state.userInputs[index - 1] && (
              <div className="flex justify-end mb-4">
                <div className="max-w-md bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-2xl rounded-br-sm">
                  <p className="text-sm font-medium">{state.userInputs[index - 1]}</p>
                </div>
              </div>
            )}

            {/* Story content */}
            <StoryCard>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-800">Story Narrator</h3>
                    <span className="text-xs text-gray-500">Part {index + 1}</span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {content}
                    </p>
                  </motion.div>
                  
                  {/* Word count for this section */}
                  <div className="mt-3 text-xs text-gray-500">
                    {content.split(' ').length} words
                  </div>
                </div>
              </div>
            </StoryCard>
          </motion.div>
        ))}

        {/* Loading state */}
        {state.isGenerating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-md">
              <StoryGeneratingLoader />
            </div>
          </motion.div>
        )}

        {/* Story complete message */}
        {state.isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl px-6 py-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <span className="font-bold text-green-800">The End! 🎉</span>
            </div>
            <p className="mt-2 text-gray-600">
              What an amazing adventure! Want to create another story?
            </p>
            <Button
              onClick={handleNewStory}
              variant="fun"
              size="lg"
              className="mt-4"
              icon={<Sparkles className="w-5 h-5" />}
            >
              Start New Adventure
            </Button>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
        
        {/* Extra spacing to prevent overlap with input */}
        <div className="h-32" />
      </div>

      {/* Input area */}
      {canContinue && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-0 bg-white bg-opacity-90 backdrop-blur-sm border-t border-gray-200 pt-4"
        >
          <StoryCard>
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 flex items-center">
                <Send className="w-5 h-5 text-purple-500 mr-2" />
                What happens next?
              </h3>
              
              <div className="flex space-x-4">
                <div className="flex-1">
                  <MagicalInput
                    placeholder="Continue the story... (e.g., 'The character discovers a hidden door' or 'Suddenly, a friendly wizard appears')"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    error={inputError}
                  />
                </div>
                <Button
                  onClick={handleContinueStory}
                  disabled={!userInput.trim() || state.isGenerating}
                  isLoading={state.isGenerating}
                  icon={<Send className="w-4 h-4" />}
                  size="lg"
                >
                  Continue
                </Button>
              </div>

              {/* Quick suggestions */}
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-gray-500 mr-2">Quick ideas:</span>
                {[
                  "The character meets a new friend",
                  "They discover something magical",
                  "A fun adventure begins",
                  "They solve a puzzle",
                  "Something surprising happens"
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setUserInput(suggestion)}
                    className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 px-3 py-1 rounded-full transition-colors duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </StoryCard>
        </motion.div>
      )}

      {/* Error display */}
      {state.error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-2 border-red-200 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-red-600 mr-2">⚠️</span>
              <span className="text-red-800 font-medium">Oops!</span>
            </div>
            <p className="text-red-700 text-sm">{state.error}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
