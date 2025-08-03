'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  ArrowLeft, 
  Play, 
  Clock, 
  Target, 
  BarChart3,
  Users,
  MessageSquare,
  Zap,
  Star
} from 'lucide-react'
import { QuestionCategory, InterviewSettings } from '@/types'
import { getCategoryDisplayName, getDifficultyColor } from '@/utils'

const categories: { category: QuestionCategory; icon: React.ReactNode; description: string }[] = [
  {
    category: 'leadership',
    icon: <Users className="h-8 w-8" />,
    description: 'Practice leadership and management scenarios'
  },
  {
    category: 'teamwork',
    icon: <Users className="h-8 w-8" />,
    description: 'Collaboration and team dynamics questions'
  },
  {
    category: 'problem-solving',
    icon: <Brain className="h-8 w-8" />,
    description: 'Analytical and critical thinking challenges'
  },
  {
    category: 'communication',
    icon: <MessageSquare className="h-8 w-8" />,
    description: 'Verbal and written communication skills'
  },
  {
    category: 'technical-skills',
    icon: <Zap className="h-8 w-8" />,
    description: 'Technical knowledge and expertise'
  },
  {
    category: 'culture-fit',
    icon: <Star className="h-8 w-8" />,
    description: 'Company culture and values alignment'
  },
  {
    category: 'past-experience',
    icon: <BarChart3 className="h-8 w-8" />,
    description: 'Previous work experience and achievements'
  },
  {
    category: 'future-goals',
    icon: <Target className="h-8 w-8" />,
    description: 'Career aspirations and professional development'
  }
]

const difficulties = [
  { value: 'easy', label: 'Beginner', description: 'Basic questions to get started' },
  { value: 'medium', label: 'Intermediate', description: 'Standard interview questions' },
  { value: 'hard', label: 'Advanced', description: 'Challenging scenarios and edge cases' }
]

export default function InterviewPage() {
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory>('leadership')
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  const [questionCount, setQuestionCount] = useState(5)
  const [includeFollowUp, setIncludeFollowUp] = useState(true)

  const handleStartInterview = () => {
    const settings: InterviewSettings = {
      category: selectedCategory,
      difficulty: selectedDifficulty,
      duration: questionCount * 3, // Estimate 3 minutes per question
      questionCount,
      includeFollowUp
    }
    
    // Store settings in localStorage for the interview session
    localStorage.setItem('interviewSettings', JSON.stringify(settings))
    
    // Navigate to the actual interview session
    window.location.href = '/interview/session'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
              <span className="text-gray-600">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">InterviewAI</span>
            </div>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Start Your Interview Practice
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your focus area and difficulty level to begin a personalized interview session with AI feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Category Selection */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-6 w-6 text-blue-600" />
                  <span>Choose Your Focus Area</span>
                </CardTitle>
                <CardDescription>
                  Select the category that best matches your interview preparation needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.category}
                      onClick={() => setSelectedCategory(cat.category)}
                      className={`p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                        selectedCategory === cat.category
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          selectedCategory === cat.category ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          {cat.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {getCategoryDisplayName(cat.category)}
                          </h3>
                          <p className="text-sm text-gray-600">{cat.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                  <span>Interview Settings</span>
                </CardTitle>
                <CardDescription>
                  Customize your practice session
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Difficulty Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Difficulty Level
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {difficulties.map((diff) => (
                      <button
                        key={diff.value}
                        onClick={() => setSelectedDifficulty(diff.value as 'easy' | 'medium' | 'hard')}
                        className={`p-3 rounded-lg border-2 transition-all text-left ${
                          selectedDifficulty === diff.value
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900">{diff.label}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(diff.value)}`}>
                            {diff.value}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{diff.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question Count */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Number of Questions: {questionCount}
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>3</span>
                    <span>5</span>
                    <span>7</span>
                    <span>10</span>
                  </div>
                </div>

                {/* Follow-up Questions */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="followUp"
                    checked={includeFollowUp}
                    onChange={(e) => setIncludeFollowUp(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="followUp" className="text-sm text-gray-700">
                    Include follow-up questions based on my responses
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Session Preview */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Session Preview</CardTitle>
                <CardDescription>
                  Review your interview settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{getCategoryDisplayName(selectedCategory)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Difficulty:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedDifficulty)}`}>
                      {selectedDifficulty}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Questions:</span>
                    <span className="font-medium">{questionCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">~{questionCount * 3} minutes</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Estimated time</span>
                  </div>
                  <Progress value={(questionCount / 10) * 100} className="mb-4" />
                  
                  <Button 
                    onClick={handleStartInterview}
                    className="w-full"
                    size="lg"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start Interview
                  </Button>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  Your session will be saved automatically
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 