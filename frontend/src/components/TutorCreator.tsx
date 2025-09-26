'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Settings, Lightbulb } from 'lucide-react';
import { useStory } from '@/contexts/StoryContext';
import { Button } from '@/components/ui/Button';
import { MagicalTextArea } from '@/components/ui/Input';
import { MagicalSelect } from '@/components/ui/Select';
import { ConfigCard, StoryCard } from '@/components/ui/Card';
import { TutorThinkingLoader } from '@/components/ui/LoadingSpinner';

export function TutorCreator() {
  const { 
    state, 
    setConfig, 
    startTutor, 
    loadFilters,
    loadSubjects,
    clearError,
    showModeSelector
  } = useStory();

  const [question, setQuestion] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [questionError, setQuestionError] = useState('');

  // Load filters and subjects on component mount
  useEffect(() => {
    loadFilters();
    loadSubjects();
  }, [loadFilters, loadSubjects]);

  const handleStartTutor = async () => {
    // Question is optional for starting a tutor session
    if (question.trim() && question.trim().length < 5) {
      setQuestionError('Please give us a bit more detail about your question!');
      return;
    }

    setQuestionError('');
    clearError();

    await startTutor({
      subject: selectedSubject || undefined,
      age_group: state.ageGroup,
      content_filter: state.contentFilter,
      initial_question: question.trim() || undefined,
    });
  };

  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject);
    // Clear question when changing subjects to avoid confusion
    if (question && subject !== selectedSubject) {
      setQuestion('');
    }
  };

  const getSubjectExamples = (subject: string) => {
    const examples = state.availableSubjects?.example_questions?.[subject] || [];
    return examples.slice(0, 3); // Show only first 3 examples
  };

  const filterOptions = [
    {
      value: 'educational',
      label: 'Educational Focus',
      emoji: '',
      description: 'Detailed explanations with learning opportunities'
    },
    {
      value: 'moral_values',
      label: 'Good Values',
      emoji: '',
      description: 'Answers that include positive values and character'
    },
    {
      value: 'fun_only',
      label: 'Fun Learning',
      emoji: '',
      description: 'Make learning feel like engaging games'
    }
  ];

  const ageOptions = [
    {
      value: '3-5',
      label: 'Ages 3-5 years',
      emoji: '',
      description: 'Very simple explanations with basic concepts'
    },
    {
      value: '6-8',
      label: 'Ages 6-8 years',
      emoji: '',
      description: 'Clear explanations with practical examples'
    },
    {
      value: '9-12',
      label: 'Ages 9-12 years',
      emoji: '',
      description: 'Detailed explanations with deeper concepts'
    }
  ];

  const subjectOptions = state.availableSubjects?.available_subjects?.map(subject => ({
    value: subject,
    label: {
      'math': 'Mathematics',
      'science': 'Science',
      'language': 'Language Arts',
      'social_studies': 'Social Studies',
      'art': 'Arts & Crafts',
      'general': 'General Knowledge'
    }[subject] || subject,
    emoji: '',
    description: state.availableSubjects?.subject_descriptions?.[subject] || ''
  })) || [];

  if (state.isGenerating) {
    return (
      <div className="max-w-2xl mx-auto">
        <TutorThinkingLoader />
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Learning Assistant
          </h1>
        </div>
        <p className="text-lg text-gray-600">
          I&apos;m here to help you learn about any subject. What would you like to know today?
        </p>
        
        {/* Back to mode selection */}
        <motion.button
          onClick={showModeSelector}
          className="text-sm text-blue-600 hover:text-blue-700 underline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          ← Back to Mode Selection
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Question Input */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <StoryCard>
            <div className="flex items-center mb-6">
              <Lightbulb className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">Your Question</h2>
            </div>

            <div className="space-y-6">
              <MagicalSelect
                label="Subject Area (Optional)"
                value={selectedSubject}
                onChange={handleSubjectChange}
                options={[
                  { value: '', label: 'Any Subject', emoji: '🤔', description: 'Ask about anything!' },
                  ...subjectOptions
                ]}
              />

              <MagicalTextArea
                label="What would you like to learn about? (Optional)"
                placeholder="Ask me anything! For example: How do plants grow? What is 5 + 3? Why is the sky blue?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={4}
                error={questionError}
              />

              <Button
                onClick={handleStartTutor}
                size="xl"
                variant="fun"
                fullWidth
                isLoading={state.isGenerating}
                disabled={state.isGenerating}
                icon={state.isGenerating ? undefined : <GraduationCap className="w-5 h-5" />}
              >
                {state.isGenerating 
                  ? 'Preparing Session...' 
                  : (question.trim() ? 'Ask Question' : 'Start Learning Session')
                }
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
              <Settings className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Learning Settings</h2>
            </div>

            <div className="space-y-6 pb-8">
              <MagicalSelect
                label="Learning Style"
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
            </div>

            {/* Learning tip */}
            <motion.div
              className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border-2 border-blue-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-gray-700">
                <span className="font-semibold">💡 Learning Tip:</span> I&apos;ll adapt my explanations to be perfect for{' '}
                <span className="font-medium text-blue-700">
                  {ageOptions.find(a => a.value === state.ageGroup)?.label.toLowerCase()}
                </span>{' '}
                with a{' '}
                <span className="font-medium text-blue-700">
                  {filterOptions.find(f => f.value === state.contentFilter)?.label.toLowerCase()}
                </span>{' '}
                approach!
              </p>
            </motion.div>
          </ConfigCard>
        </motion.div>
      </div>

      {/* Subject Examples */}
      {selectedSubject && (
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {subjectOptions.find(s => s.value === selectedSubject)?.label} Examples
            </h3>
            <p className="text-gray-600">Here are some questions you could ask about {selectedSubject}!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {getSubjectExamples(selectedSubject).map((example, index) => (
              <motion.button
                key={index}
                className="p-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-200 text-left"
                onClick={() => setQuestion(example)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <p className="text-sm font-medium text-gray-700">{example}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* General Examples */}
      {!selectedSubject && (
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Need Some Ideas?</h3>
            <p className="text-gray-600">Here are some questions you could ask me!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "How do plants grow?",
              "What is 2 + 2?",
              "Why is the sky blue?",
              "How do I spell difficult words?",
              "What makes thunder and lightning?",
              "How do I be a good friend?"
            ].map((example, index) => (
              <motion.button
                key={index}
                className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 hover:border-purple-300 transition-all duration-200 text-left"
                onClick={() => setQuestion(example)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <p className="text-sm font-medium text-gray-700">{example}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

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
    </div>
  );
}
