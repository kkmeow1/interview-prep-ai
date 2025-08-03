#!/bin/bash

echo "🚀 InterviewAI Deployment Script"
echo "================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Initializing..."
    git init
    git add .
    git commit -m "Initial commit"
fi

# Check if changes need to be committed
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Committing changes..."
    git add .
    git commit -m "Update: $(date)"
fi

echo "✅ Code is ready for deployment!"
echo ""
echo "🎯 Choose your deployment method:"
echo ""
echo "1. Vercel (Recommended)"
echo "   - Go to https://vercel.com/new"
echo "   - Import your GitHub repository"
echo "   - Deploy automatically"
echo ""
echo "2. Netlify"
echo "   - Go to https://app.netlify.com/start"
echo "   - Connect your GitHub repository"
echo "   - Deploy with build command: npm run build"
echo ""
echo "3. Railway"
echo "   - Go to https://railway.app"
echo "   - Create new project from GitHub"
echo "   - Auto-deploys Next.js apps"
echo ""
echo "4. Manual Vercel CLI"
echo "   - Run: vercel login"
echo "   - Run: vercel --yes"
echo ""
echo "📋 Before deploying, make sure to:"
echo "   - Set up environment variables (OPENAI_API_KEY, etc.)"
echo "   - Test your app locally: npm run dev"
echo "   - Check that all features work correctly"
echo ""
echo "🌐 After deployment, your app will be available at:"
echo "   - Vercel: https://your-app-name.vercel.app"
echo "   - Netlify: https://your-app-name.netlify.app"
echo "   - Railway: https://your-app-name.railway.app"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "🎉 Good luck with your InterviewAI app!" 