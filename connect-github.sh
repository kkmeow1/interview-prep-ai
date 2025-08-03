#!/bin/bash

echo "🔗 Connecting InterviewAI to GitHub"
echo "=================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Initializing..."
    git init
    git add .
    git commit -m "Initial commit"
fi

echo "✅ Git repository is ready!"
echo ""
echo "📋 Follow these steps:"
echo ""
echo "1. Go to https://github.com"
echo "2. Sign in to your account"
echo "3. Click the '+' icon → 'New repository'"
echo "4. Repository name: interview-prep-ai"
echo "5. Description: AI-powered interview preparation app"
echo "6. Make it Public (or Private)"
echo "7. DON'T check 'Add README' (we already have one)"
echo "8. Click 'Create repository'"
echo ""
echo "🔧 After creating the repository, run these commands:"
echo ""
echo "Replace YOUR_USERNAME with your actual GitHub username:"
echo ""
echo "git remote add origin https://github.com/YOUR_USERNAME/interview-prep-ai.git"
echo "git branch -M main"
echo "git push -u origin main"
echo ""
echo "📝 Example (if your username is 'johndoe'):"
echo "git remote add origin https://github.com/johndoe/interview-prep-ai.git"
echo "git branch -M main"
echo "git push -u origin main"
echo ""
echo "🎯 After pushing to GitHub, you can deploy to:"
echo "   - Vercel: https://vercel.com/new"
echo "   - Netlify: https://app.netlify.com/start"
echo "   - Railway: https://railway.app"
echo ""
echo "📖 For detailed deployment instructions, see DEPLOYMENT.md" 