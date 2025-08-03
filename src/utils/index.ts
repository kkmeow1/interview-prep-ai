import { Question, QuestionCategory, InterviewSettings, AIAnalysis } from '@/types';

// Sample questions database
export const sampleQuestions: Question[] = [
  {
    id: '1',
    text: 'Tell me about a time when you had to lead a team through a difficult project.',
    category: 'leadership',
    difficulty: 'medium',
    type: 'behavioral'
  },
  {
    id: '2',
    text: 'Describe a situation where you had to resolve a conflict within your team.',
    category: 'teamwork',
    difficulty: 'medium',
    type: 'behavioral'
  },
  {
    id: '3',
    text: 'How do you approach solving complex problems?',
    category: 'problem-solving',
    difficulty: 'easy',
    type: 'situational'
  },
  {
    id: '4',
    text: 'Explain a technical concept to a non-technical stakeholder.',
    category: 'communication',
    difficulty: 'medium',
    type: 'situational'
  },
  {
    id: '5',
    text: 'What are your career goals for the next 5 years?',
    category: 'future-goals',
    difficulty: 'easy',
    type: 'behavioral'
  },
  {
    id: '6',
    text: 'Tell me about a time when you failed and what you learned from it.',
    category: 'past-experience',
    difficulty: 'hard',
    type: 'behavioral'
  },
  {
    id: '7',
    text: 'How do you stay updated with industry trends and new technologies?',
    category: 'technical-skills',
    difficulty: 'medium',
    type: 'situational'
  },
  {
    id: '8',
    text: 'Describe a time when you had to work with someone you didn&apos;t get along with.',
    category: 'teamwork',
    difficulty: 'hard',
    type: 'behavioral'
  }
];

export function generateQuestions(settings: InterviewSettings): Question[] {
  const { category, difficulty, questionCount } = settings;
  
  let filteredQuestions = sampleQuestions.filter(q => 
    q.category === category && q.difficulty === difficulty
  );
  
  // If not enough questions in the specific category/difficulty, add some from other categories
  if (filteredQuestions.length < questionCount) {
    const additionalQuestions = sampleQuestions.filter(q => 
      q.difficulty === difficulty && q.category !== category
    );
    filteredQuestions = [...filteredQuestions, ...additionalQuestions];
  }
  
  // Shuffle and return the requested number of questions
  return shuffleArray(filteredQuestions).slice(0, questionCount);
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function calculateScore(feedback: AIAnalysis[]): number {
  if (feedback.length === 0) return 0;
  
  const totalScore = feedback.reduce((sum, analysis) => sum + analysis.overallScore, 0);
  return Math.round(totalScore / feedback.length);
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function getCategoryDisplayName(category: QuestionCategory): string {
  const displayNames: Record<QuestionCategory, string> = {
    'leadership': 'Leadership',
    'teamwork': 'Teamwork',
    'problem-solving': 'Problem Solving',
    'communication': 'Communication',
    'technical-skills': 'Technical Skills',
    'culture-fit': 'Culture Fit',
    'past-experience': 'Past Experience',
    'future-goals': 'Future Goals'
  };
  return displayNames[category];
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'easy':
      return 'text-green-600 bg-green-100';
    case 'medium':
      return 'text-yellow-600 bg-yellow-100';
    case 'hard':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

export function getRatingColor(rating: string): string {
  switch (rating) {
    case 'excellent':
      return 'text-green-600';
    case 'good':
      return 'text-blue-600';
    case 'fair':
      return 'text-yellow-600';
    case 'needs-improvement':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
}

export function generateSessionTitle(category: QuestionCategory, difficulty: string): string {
  return `${getCategoryDisplayName(category)} Interview - ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level`;
}

export function analyzeResponseWithAI(_question: Question, _response: string): Promise<AIAnalysis> {
  // This would integrate with OpenAI API in a real implementation
  // For now, return a mock analysis
  return Promise.resolve({
    responseId: Math.random().toString(36).substr(2, 9),
    contentAnalysis: {
      clarity: Math.floor(Math.random() * 4) + 6, // 6-10
      completeness: Math.floor(Math.random() * 4) + 6,
      relevance: Math.floor(Math.random() * 4) + 6,
      structure: Math.floor(Math.random() * 4) + 6,
    },
    deliveryAnalysis: {
      confidence: Math.floor(Math.random() * 4) + 6,
      pace: Math.floor(Math.random() * 4) + 6,
      articulation: Math.floor(Math.random() * 4) + 6,
    },
    suggestions: [
      'Consider providing more specific examples',
      'Try to structure your response using the STAR method',
      'Include quantifiable results when possible'
    ],
    overallScore: Math.floor(Math.random() * 4) + 6
  });
} 