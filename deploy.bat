@echo off
echo 🚀 Website Bug Detector - Deployment Helper
echo ===================================
echo.
echo 1. Deploy to GitHub Pages
echo 2. Deploy to Netlify
echo 3. Deploy to Vercel
echo 4. Run Local Server
echo.
set /p choice=Choose an option (1-4): 

if "%choice%"=="1" (
    echo.
    echo 🚀 Setting up GitHub Pages deployment...
    echo.
    echo 1. Create a new repository at https://github.com/new
    echo 2. Name it "website-bug-detector" (or your preferred name)
    echo 3. Run these commands in your project folder:
    echo.
    echo    git init
    echo    git add .
    echo    git commit -m "Initial commit"
    echo    git branch -M main
    echo    git remote add origin YOUR_REPOSITORY_URL
    echo    git push -u origin main
    echo.
    echo 4. Go to Settings > Pages > Source: main branch
    echo 5. Your site will be live at: https://YOUR_USERNAME.github.io/website-bug-detector
    echo.
    pause
) else if "%choice%"=="2" (
    start https://app.netlify.com/
    echo.
    echo ✅ Ready to deploy to Netlify!
    echo 1. Drag and drop the "frontend" folder to the Netlify dashboard
    echo 2. Wait for deployment to complete
    echo 3. Or connect your GitHub repository for continuous deployment
    echo.
    pause
) else if "%choice%"=="3" (
    echo.
    echo 🚀 Deploying to Vercel...
    echo.
    cd frontend
    call npx vercel --prod
    pause
) else if "%choice%"=="4" (
    echo.
    echo 🚀 Starting local development server...
    echo.
    echo Opening http://localhost:3000 in your browser
    echo Press Ctrl+C to stop the server
    echo.
    cd frontend
    start http://localhost:3000
    python -m http.server 3000 || npx http-server -p 3000 -o
) else (
    echo.
    echo ❌ Invalid choice. Please select 1-4.
    echo.
    pause
)
