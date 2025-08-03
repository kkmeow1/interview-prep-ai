# InterviewAI - AI-Powered Interview Preparation App

A modern, full-stack web application that helps users prepare for interviews using AI-powered practice sessions, real-time feedback, and personalized coaching.

## 🚀 Features

### Core Features
- **AI-Powered Practice Sessions** - Practice with intelligent AI interviewers that adapt to your responses
- **Real-Time Feedback** - Get instant analysis of your responses with detailed scoring and suggestions
- **Voice Recording** - Record your answers using your microphone for a more realistic experience
- **Multiple Categories** - Practice different types of interview questions (Leadership, Teamwork, Problem Solving, etc.)
- **Difficulty Levels** - Choose from Easy, Medium, and Hard difficulty levels
- **Progress Tracking** - Monitor your improvement over time with detailed analytics
- **Personalized Dashboard** - View your performance metrics and get AI-powered insights

### Technical Features
- **Modern UI/UX** - Beautiful, responsive design with smooth animations
- **TypeScript** - Full type safety throughout the application
- **Next.js 15** - Latest React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Real-time Analysis** - AI-powered response analysis (mock implementation)
- **Voice Integration** - Browser-based audio recording and transcription
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Audio**: Web Audio API, MediaRecorder API
- **AI Integration**: OpenAI API (ready for implementation)

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd interview-prep-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Getting Started

1. **Landing Page** - Visit the homepage to learn about the app's features
2. **Start Practice** - Click "Start Practice" to begin a new interview session
3. **Choose Settings** - Select your preferred category, difficulty, and number of questions
4. **Practice** - Answer questions using voice recording or text input
5. **Get Feedback** - Receive real-time AI analysis of your responses
6. **Track Progress** - View your performance on the dashboard

### Interview Categories

- **Leadership** - Management and leadership scenarios
- **Teamwork** - Collaboration and team dynamics
- **Problem Solving** - Analytical and critical thinking challenges
- **Communication** - Verbal and written communication skills
- **Technical Skills** - Technical knowledge and expertise
- **Culture Fit** - Company culture and values alignment
- **Past Experience** - Previous work experience and achievements
- **Future Goals** - Career aspirations and professional development

### Features in Detail

#### AI Analysis
- **Content Analysis**: Clarity, completeness, relevance, and structure scoring
- **Delivery Analysis**: Confidence, pace, and articulation assessment
- **Personalized Suggestions**: Actionable feedback for improvement
- **Overall Scoring**: Comprehensive performance rating

#### Voice Recording
- **Real-time Recording** - Use your microphone to record responses
- **Automatic Transcription** - Convert speech to text (simulated)
- **Audio Quality** - High-quality audio capture and processing

#### Progress Tracking
- **Session History** - View all your practice sessions
- **Performance Metrics** - Track scores, time, and improvement
- **Category Analysis** - See your strengths and areas for improvement
- **AI Insights** - Get personalized recommendations

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# OpenAI API (for real AI integration)
OPENAI_API_KEY=your_openai_api_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Customization

#### Adding New Questions
Edit `src/utils/index.ts` to add new questions to the `sampleQuestions` array:

```typescript
export const sampleQuestions: Question[] = [
  // Add your custom questions here
  {
    id: 'custom-1',
    text: 'Your custom question here?',
    category: 'leadership',
    difficulty: 'medium',
    type: 'behavioral'
  }
]
```

#### Styling
The app uses Tailwind CSS for styling. Customize the design by modifying:
- `src/app/globals.css` - Global styles
- Component files - Individual component styling
- `tailwind.config.js` - Tailwind configuration

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect Next.js and deploy
   - Add environment variables in Vercel dashboard

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - UI components
- [Lucide](https://lucide.dev/) - Icons
- [OpenAI](https://openai.com/) - AI capabilities

## 📞 Support

If you have any questions or need help:
- Create an issue on GitHub
- Email: support@interviewai.com
- Documentation: [docs.interviewai.com](https://docs.interviewai.com)

---

**Made with ❤️ by the InterviewAI Team**
