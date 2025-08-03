'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  SkipForward, 
  Mic, 
  MicOff,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Brain
} from 'lucide-react'
import { Question, InterviewResponse, AIAnalysis } from '@/types'
import { generateQuestions, formatDuration, analyzeResponseWithAI } from '@/utils'

export default function InterviewSessionPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [responses, setResponses] = useState<InterviewResponse[]>([])
  const [currentResponse, setCurrentResponse] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null)
  const [currentQuestionStartTime, setCurrentQuestionStartTime] = useState<Date | null>(null)
  const [feedback, setFeedback] = useState<AIAnalysis | null>(null)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  useEffect(() => {
    // Load interview settings and generate questions
    const settingsStr = localStorage.getItem('interviewSettings')
    if (settingsStr) {
      const settings = JSON.parse(settingsStr)
      const generatedQuestions = generateQuestions(settings)
      setQuestions(generatedQuestions)
      setSessionStartTime(new Date())
      setCurrentQuestionStartTime(new Date())
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        chunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' })
        // In a real app, you'd send this to a speech-to-text service
        // For now, we'll simulate the transcription
        simulateTranscription()
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Please allow microphone access to use voice recording')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const simulateTranscription = () => {
    // Simulate speech-to-text processing
    setTimeout(() => {
      const mockTranscription = "This is a simulated transcription of my response to the interview question. I would provide a detailed answer based on my experience and the specific situation described."
      setCurrentResponse(mockTranscription)
    }, 1000)
  }

  const handleNextQuestion = async () => {
    if (currentResponse.trim()) {
      // Save current response
      const response: InterviewResponse = {
        questionId: questions[currentQuestionIndex].id,
        answer: currentResponse,
        duration: currentQuestionStartTime ? Math.floor((Date.now() - currentQuestionStartTime.getTime()) / 1000) : 0,
        confidence: 7, // Mock confidence level
        timestamp: new Date()
      }
      
      setResponses([...responses, response])
      
      // Analyze response with AI
      setIsAnalyzing(true)
      try {
        const analysis = await analyzeResponseWithAI(questions[currentQuestionIndex], currentResponse)
        setFeedback(analysis)
        
        // Update total score
        const newScore = Math.round((totalScore + analysis.overallScore) / (currentQuestionIndex + 2))
        setTotalScore(newScore)
      } catch (error) {
        console.error('Error analyzing response:', error)
      }
      setIsAnalyzing(false)
    }

    // Move to next question or complete session
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setCurrentResponse('')
      setFeedback(null)
      setCurrentQuestionStartTime(new Date())
    } else {
      setSessionComplete(true)
    }
  }

  const handleSkipQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setCurrentResponse('')
      setFeedback(null)
      setCurrentQuestionStartTime(new Date())
    }
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="text-center">
              <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Loading Interview...</h2>
              <p className="text-gray-600">Preparing your personalized questions</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (sessionComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="text-center">
            <CardHeader>
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-3xl">Interview Complete!</CardTitle>
              <CardDescription>
                Great job! You've completed your interview practice session.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
                  <div className="text-gray-600">Questions Answered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{totalScore}/10</div>
                  <div className="text-gray-600">Average Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {sessionStartTime ? formatDuration(Math.floor((Date.now() - sessionStartTime.getTime()) / 1000)) : '0:00'}
                  </div>
                  <div className="text-gray-600">Total Time</div>
                </div>
              </div>
              
              <div className="pt-6 border-t">
                <Link href="/dashboard">
                  <Button size="lg" className="mr-4">
                    View Dashboard
                  </Button>
                </Link>
                <Link href="/interview">
                  <Button variant="outline" size="lg">
                    Practice Again
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/interview" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
              <span className="text-gray-600">Back to Setup</span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Brain className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-600">Score: {totalScore}/10</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm font-medium text-gray-900">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Question Section */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                  <span>Question {currentQuestionIndex + 1}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-900 mb-4">{currentQuestion.text}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-600' :
                    currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {currentQuestion.difficulty}
                  </span>
                  <span>•</span>
                  <span>{currentQuestion.type}</span>
                </div>
              </CardContent>
            </Card>

            {/* Response Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mic className="h-6 w-6 text-purple-600" />
                  <span>Your Response</span>
                </CardTitle>
                <CardDescription>
                  Record your answer or type it below
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Recording Controls */}
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    variant={isRecording ? "destructive" : "outline"}
                    size="lg"
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="mr-2 h-4 w-4" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Mic className="mr-2 h-4 w-4" />
                        Start Recording
                      </>
                    )}
                  </Button>
                  
                  {isRecording && (
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-600">Recording...</span>
                    </div>
                  )}
                </div>

                {/* Text Input */}
                <div>
                  <textarea
                    value={currentResponse}
                    onChange={(e) => setCurrentResponse(e.target.value)}
                    placeholder="Type your response here or use voice recording..."
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isRecording}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                  <Button
                    onClick={handleSkipQuestion}
                    variant="outline"
                    disabled={isRecording}
                  >
                    <SkipForward className="mr-2 h-4 w-4" />
                    Skip Question
                  </Button>
                  
                  <Button
                    onClick={handleNextQuestion}
                    disabled={!currentResponse.trim() || isRecording || isAnalyzing}
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        {currentQuestionIndex === questions.length - 1 ? 'Complete Interview' : 'Next Question'}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feedback Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>AI Feedback</CardTitle>
                <CardDescription>
                  Real-time analysis of your responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                {feedback ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-1">{feedback.overallScore}/10</div>
                      <div className="text-sm text-gray-600">Overall Score</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Clarity</span>
                          <span>{feedback.contentAnalysis.clarity}/10</span>
                        </div>
                        <Progress value={feedback.contentAnalysis.clarity * 10} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Completeness</span>
                          <span>{feedback.contentAnalysis.completeness}/10</span>
                        </div>
                        <Progress value={feedback.contentAnalysis.completeness * 10} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Relevance</span>
                          <span>{feedback.contentAnalysis.relevance}/10</span>
                        </div>
                        <Progress value={feedback.contentAnalysis.relevance * 10} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Suggestions:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {feedback.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Complete your response to see AI feedback</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 