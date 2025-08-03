# 🔗 GitHub Setup Guide

## Quick Steps to Connect Your Code to GitHub

### Step 1: Create GitHub Repository

1. **Open GitHub**: Go to [github.com](https://github.com)
2. **Sign in** to your account
3. **Create new repository**:
   - Click the **"+"** icon in top right
   - Select **"New repository"**
   - **Repository name**: `interview-prep-ai`
   - **Description**: `AI-powered interview preparation app`
   - **Visibility**: Public (or Private)
   - **❌ DON'T** check "Add a README file"
   - **❌ DON'T** check "Add .gitignore"
   - Click **"Create repository"**

### Step 2: Connect Your Local Code

After creating the repository, run these commands in your terminal:

```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/interview-prep-ai.git
git branch -M main
git push -u origin main
```

### Step 3: Verify Connection

Check that your code is on GitHub:

```bash
git remote -v
```

You should see:
```
origin  https://github.com/YOUR_USERNAME/interview-prep-ai.git (fetch)
origin  https://github.com/YOUR_USERNAME/interview-prep-ai.git (push)
```

### Step 4: Deploy Your App

Now you can deploy to any platform:

- **Vercel**: [vercel.com/new](https://vercel.com/new)
- **Netlify**: [app.netlify.com/start](https://app.netlify.com/start)
- **Railway**: [railway.app](https://railway.app)

## 🆘 Troubleshooting

### If you get "remote already exists" error:
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/interview-prep-ai.git
```

### If you get authentication error:
1. Use GitHub CLI: `gh auth login`
2. Or use Personal Access Token
3. Or use SSH keys

### If you need to update the remote URL:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/interview-prep-ai.git
```

## ✅ Success Checklist

- [ ] GitHub repository created
- [ ] Local code connected to GitHub
- [ ] Code pushed to GitHub
- [ ] Repository is accessible online
- [ ] Ready for deployment

---

**Your InterviewAI app is now ready to go live! 🚀** 