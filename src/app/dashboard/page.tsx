'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  Play, 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Target,
  Award,
  Calendar,
  MessageSquare,
  Users,
  Zap,
  Star,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { InterviewSession, QuestionCategory } from '@/types'
import { getCategoryDisplayName, getRatingColor } from '@/utils'

// Mock data for demonstration
const mockSessions: InterviewSession[] = [
  {
    id: '1',
    userId: 'user1',
    title: 'Leadership Interview - Medium Level',
    category: 'leadership',
    questions: [],
    responses: [],
    feedback: [],
    score: 8.5,
    duration: 15,
    status: 'completed',
    createdAt: new Date('2024-01-15'),
    completedAt: new Date('2024-01-15T10:30:00')
  },
  {
    id: '2',
    userId: 'user1',
    title: 'Teamwork Interview - Easy Level',
    category: 'teamwork',
    questions: [],
    responses: [],
    feedback: [],
    score: 7.2,
    duration: 12,
    status: 'completed',
    createdAt: new Date('2024-01-14'),
    completedAt: new Date('2024-01-14T14:20:00')
  },
  {
    id: '3',
    userId: 'user1',
    title: 'Problem Solving Interview - Hard Level',
    category: 'problem-solving',
    questions: [],
    responses: [],
    feedback: [],
    score: 6.8,
    duration: 18,
    status: 'completed',
    createdAt: new Date('2024-01-13'),
    completedAt: new Date('2024-01-13T09:15:00')
  }
]

const categoryStats = [
  { category: 'leadership' as QuestionCategory, score: 8.5, sessions: 3, improvement: 12 },
  { category: 'teamwork' as QuestionCategory, score: 7.2, sessions: 2, improvement: 8 },
  { category: 'problem-solving' as QuestionCategory, score: 6.8, sessions: 1, improvement: -5 },
  { category: 'communication' as QuestionCategory, score: 0, sessions: 0, improvement: 0 },
  { category: 'technical-skills' as QuestionCategory, score: 0, sessions: 0, improvement: 0 },
  { category: 'culture-fit' as QuestionCategory, score: 0, sessions: 0, improvement: 0 },
  { category: 'past-experience' as QuestionCategory, score: 0, sessions: 0, improvement: 0 },
  { category: 'future-goals' as QuestionCategory, score: 0, sessions: 0, improvement: 0 }
]

export default function DashboardPage() {
  const [sessions, setSessions] = useState<InterviewSession[]>(mockSessions)
  const [stats, setStats] = useState(categoryStats)

  const totalSessions = sessions.length
  const averageScore = sessions.length > 0 
    ? Math.round((sessions.reduce((sum, session) => sum + session.score, 0) / sessions.length) * 10) / 10
    : 0
  const totalTime = sessions.reduce((sum, session) => sum + session.duration, 0)

  const recentSessions = sessions.slice(0, 3)
  const topCategories = stats
    .filter(stat => stat.sessions > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">InterviewAI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/interview">
                <Button>
                  <Play className="mr-2 h-4 w-4" />
                  Start Practice
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Track your interview preparation progress and performance</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">{totalSessions}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Play className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">{averageScore}/10</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Time</p>
                  <p className="text-2xl font-bold text-gray-900">{totalTime}m</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Recent Activity & Quick Actions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <span>Recent Sessions</span>
                </CardTitle>
                <CardDescription>
                  Your latest interview practice sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <MessageSquare className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{session.title}</h3>
                          <p className="text-sm text-gray-600">
                            {session.createdAt.toLocaleDateString()} • {session.duration} minutes
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-medium text-gray-900">{session.score}/10</div>
                          <div className="text-sm text-gray-600">Score</div>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    </div>
                  ))}
                  
                  {recentSessions.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No sessions yet. Start your first practice session!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Performance by Category */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                  <span>Performance by Category</span>
                </CardTitle>
                <CardDescription>
                  Your scores across different interview categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.filter(stat => stat.sessions > 0).map((stat) => (
                    <div key={stat.category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">
                          {getCategoryDisplayName(stat.category)}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{stat.sessions} sessions</span>
                          <span className="font-medium text-gray-900">{stat.score}/10</span>
                        </div>
                      </div>
                      <Progress value={stat.score * 10} className="h-2" />
                    </div>
                  ))}
                  
                  {stats.filter(stat => stat.sessions === 0).length > 0 && (
                    <div className="pt-4 border-t">
                      <h4 className="font-medium text-gray-900 mb-3">Categories to Try</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {stats.filter(stat => stat.sessions === 0).map((stat) => (
                          <Link key={stat.category} href="/interview">
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <Target className="mr-2 h-4 w-4" />
                              {getCategoryDisplayName(stat.category)}
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Actions & Insights */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Start practicing or review your progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/interview">
                  <Button className="w-full justify-start">
                    <Play className="mr-2 h-4 w-4" />
                    Start New Practice
                  </Button>
                </Link>
                
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Compare Performance
                </Button>
              </CardContent>
            </Card>

            {/* Top Performing Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Top Categories</CardTitle>
                <CardDescription>
                  Your best performing areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCategories.map((stat, index) => (
                    <div key={stat.category} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-100 text-yellow-600' :
                        index === 1 ? 'bg-gray-100 text-gray-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {getCategoryDisplayName(stat.category)}
                        </div>
                        <div className="text-sm text-gray-600">{stat.score}/10</div>
                      </div>
                      <div className={`flex items-center text-sm ${
                        stat.improvement > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <TrendingUp className="h-4 w-4 mr-1" />
                        {stat.improvement > 0 ? '+' : ''}{stat.improvement}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Insights */}
            <Card>
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
                <CardDescription>
                  Personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Focus on Problem Solving</p>
                      <p className="text-xs text-gray-600">Your score dropped 5% this week</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Leadership Improving</p>
                      <p className="text-xs text-gray-600">Great progress in this category</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Zap className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Try Technical Skills</p>
                      <p className="text-xs text-gray-600">You haven't practiced this yet</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 