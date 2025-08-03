export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  interviewHistory: InterviewSession[];
}

export interface Question {
  id: string;
  text: string;
  category: QuestionCategory;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'behavioral' | 'technical' | 'situational';
  industry?: string;
  role?: string;
}

export type QuestionCategory = 
  | 'leadership'
  | 'teamwork'
  | 'problem-solving'
  | 'communication'
  | 'technical-skills'
  | 'culture-fit'
  | 'past-experience'
  | 'future-goals';

export interface InterviewSession {
  id: string;
  userId: string;
  title: string;
  category: QuestionCategory;
  questions: Question[];
  responses: InterviewResponse[];
  feedback: Feedback[];
  score: number;
  duration: number; // in minutes
  status: 'in-progress' | 'completed' | 'paused';
  createdAt: Date;
  completedAt?: Date;
}

export interface InterviewResponse {
  questionId: string;
  answer: string;
  duration: number; // in seconds
  confidence: number; // 1-10
  timestamp: Date;
}

export interface Feedback {
  questionId: string;
  score: number; // 1-10
  strengths: string[];
  areasForImprovement: string[];
  suggestions: string[];
  overallRating: 'excellent' | 'good' | 'fair' | 'needs-improvement';
}

export interface AIAnalysis {
  responseId: string;
  contentAnalysis: {
    clarity: number;
    completeness: number;
    relevance: number;
    structure: number;
  };
  deliveryAnalysis: {
    confidence: number;
    pace: number;
    articulation: number;
  };
  suggestions: string[];
  overallScore: number;
}

export interface InterviewSettings {
  category: QuestionCategory;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number; // in minutes
  questionCount: number;
  includeFollowUp: boolean;
  industry?: string;
  role?: string;
}
