'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, User, Settings, Wand2 } from 'lucide-react';
import { useStory } from '@/contexts/StoryContext';
import { Button } from '@/components/ui/Button';
import { MagicalTextArea, MagicalInput } from '@/components/ui/Input';
import { MagicalSelect } from '@/components/ui/Select';
import { ConfigCard, StoryCard } from '@/components/ui/Card';
import { StoryGeneratingLoader } from '@/components/ui/LoadingSpinner';

export function StoryCreator() {
  const { 
    state, 
    setConfig, 
    startStory, 
    loadFilters,
    clearError,
    showModeSelector
  } = useStory();

  const [prompt, setPrompt] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [promptError, setPromptError] = useState('');

  // Load filters on component mount
  useEffect(() => {
    loadFilters();
  }, [loadFilters]);

  const handleStartStory = async () => {
    // Validate prompt
        if (!prompt.trim()) {
          setPromptError('Please tell us what kind of story you&apos;d like to hear!');
          return;
        }

        if (prompt.trim().length < 10) {
          setPromptError('Please give us a bit more detail about your story idea!');
          return;
    }

    setPromptError('');
    clearError();

    // Update config with character name
    if (characterName.trim()) {
      setConfig({ characterName: characterName.trim() });
    }

    await startStory(prompt.trim());
  };

  const filterOptions = [
    {
      value: 'educational',
      label: 'Educational Stories',
      emoji: '',
      description: 'Learn while having fun with educational content'
    },
    {
      value: 'moral_values',
      label: 'Value-Based Stories',
      emoji: '',
      description: 'Stories that teach positive values and character'
    },
    {
      value: 'fun_only',
      label: 'Entertainment Stories',
      emoji: '',
      description: 'Engaging adventures focused on entertainment'
    }
  ];

  const ageOptions = [
    {
      value: '3-5',
      label: 'Ages 3-5 years',
      emoji: '',
      description: 'Simple vocabulary and basic concepts'
    },
    {
      value: '6-8',
      label: 'Ages 6-8 years',
      emoji: '',
      description: 'Engaging stories with educational elements'
    },
    {
      value: '9-12',
      label: 'Ages 9-12 years',
      emoji: '',
      description: 'Complex narratives with deeper themes'
    }
  ];

  const lengthOptions = [
    {
      value: 'short',
      label: 'Short Story',
      emoji: '',
      description: 'Perfect for a quick story session'
    },
    {
      value: 'medium',
      label: 'Medium Story',
      emoji: '',
      description: 'Balanced length for storytelling'
    },
    {
      value: 'long',
      label: 'Long Story',
      emoji: '',
      description: 'Extended narrative for deeper engagement'
    }
  ];

  if (state.isGenerating) {
    return (
      <div className="max-w-2xl mx-auto">
        <StoryGeneratingLoader />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Story Creator
          </h1>
        </div>
        <p className="text-lg text-gray-600">
          Tell us what kind of story you&apos;d like to hear, and we&apos;ll create something engaging just for you!
        </p>
        
        {/* Back to mode selection */}
        <motion.button
          onClick={showModeSelector}
          className="text-sm text-purple-600 hover:text-purple-700 underline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          ← Back to Mode Selection
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Story Prompt */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <StoryCard>
            <div className="flex items-center mb-6">
              <Wand2 className="w-6 h-6 text-purple-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">Your Story Idea</h2>
            </div>

            <div className="space-y-6">
              <MagicalTextArea
                label="What should your story be about?"
                placeholder="A brave dragon who loves to bake cookies, a magical forest where animals can talk, a superhero cat who saves the day..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                error={promptError}
              />

              <MagicalInput
                label="Main Character Name (Optional)"
                placeholder="Give your main character a special name!"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
                icon={<User className="w-5 h-5" />}
              />

              <Button
                onClick={handleStartStory}
                size="xl"
                variant="fun"
                fullWidth
                isLoading={state.isGenerating}
                disabled={!prompt.trim() || state.isGenerating}
                icon={state.isGenerating ? undefined : <Sparkles className="w-5 h-5" />}
              >
                {state.isGenerating ? 'Creating Story...' : 'Create Story'}
              </Button>
            </div>
          </StoryCard>
        </motion.div>

        {/* Settings */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ConfigCard>
            <div className="flex items-center mb-6">
              <Settings className="w-6 h-6 text-purple-500 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Story Settings</h2>
            </div>

            <div className="space-y-6 pb-8">
              <MagicalSelect
                label="Story Type"
                value={state.contentFilter}
                onChange={(value) => setConfig({ contentFilter: value as 'moral_values' | 'educational' | 'fun_only' })}
                options={filterOptions}
              />

              <MagicalSelect
                label="Age Group"
                value={state.ageGroup}
                onChange={(value) => setConfig({ ageGroup: value as '3-5' | '6-8' | '9-12' })}
                options={ageOptions}
              />

              <MagicalSelect
                label="Story Length"
                value={state.storyLength}
                onChange={(value) => setConfig({ storyLength: value as 'short' | 'medium' | 'long' })}
                options={lengthOptions}
              />
            </div>

            {/* Fun fact about current settings */}
            <motion.div
              className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-gray-700">
                <span className="font-semibold">💡 Did you know?</span> We&apos;ll create a{' '}
                <span className="font-medium text-purple-700">
                  {lengthOptions.find(l => l.value === state.storyLength)?.label.toLowerCase()}
                </span>{' '}
                perfect for{' '}
                <span className="font-medium text-purple-700">
                  {ageOptions.find(a => a.value === state.ageGroup)?.label.toLowerCase()}
                </span>{' '}
                with a{' '}
                <span className="font-medium text-purple-700">
                  {filterOptions.find(f => f.value === state.contentFilter)?.label.toLowerCase()}
                </span>{' '}
                theme!
              </p>
            </motion.div>
          </ConfigCard>
        </motion.div>
      </div>

      {/* Error Display */}
      {state.error && (
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-sm">⚠️</span>
                </div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Oops! Something went wrong
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  {state.error}
                </div>
              </div>
              <div className="ml-auto">
                <Button
                  onClick={clearError}
                  size="sm"
                  variant="secondary"
                >
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Fun examples */}
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Need Some Ideas?</h3>
          <p className="text-gray-600">Here are some fun story ideas to get you started!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "A magical library where books come to life",
            "A friendly monster who loves to garden",
            "A space adventure with talking planets",
            "A underwater city made of coral and pearls",
            "A time-traveling treehouse",
            "A superhero who saves the day with kindness"
          ].map((idea, index) => (
            <motion.button
              key={index}
              className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 hover:border-purple-300 transition-all duration-200 text-left"
              onClick={() => setPrompt(idea)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <p className="text-sm font-medium text-gray-700">{idea}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
