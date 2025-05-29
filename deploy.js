const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Website Bug Detector - Deployment Helper\n');

const deployOptions = `
Choose a deployment option:
1. GitHub Pages (Easiest)
2. Netlify (Recommended for Production)
3. Vercel (Best for React/Next.js)
4. Local Development Server

Enter your choice (1-4): `;

readline.question(deployOptions, (choice) => {
  switch(choice) {
    case '1':
      setupGitHubPages();
      break;
    case '2':
      console.log('\n✅ Ready to deploy to Netlify!');
      console.log('1. Go to https://app.netlify.com/');
      console.log('2. Drag and drop the "frontend" folder to the Netlify dashboard');
      console.log('3. Wait for deployment to complete');
      console.log('\nOr connect your GitHub repository for continuous deployment.');
      break;
    case '3':
      console.log('\n🚀 Deploying to Vercel...');
      try {
        execSync('npm install -g vercel', { stdio: 'inherit' });
        process.chdir('frontend');
        execSync('vercel --prod', { stdio: 'inherit' });
      } catch (error) {
        console.error('❌ Error deploying to Vercel:', error.message);
      }
      break;
    case '4':
      startLocalServer();
      break;
    default:
      console.log('❌ Invalid choice. Please select 1-4.');
  }
  readline.close();
});

function setupGitHubPages() {
  console.log('\n🚀 Setting up GitHub Pages deployment...');
  
  // Initialize Git if not already
  if (!fs.existsSync('.git')) {
    console.log('Initializing Git repository...');
    execSync('git init', { stdio: 'inherit' });
  }
  
  // Create a simple CNAME file (optional)
  const cname = 'website-bug-detector';
  fs.writeFileSync('CNAME', cname);
  
  console.log('\n✅ GitHub Pages setup complete! Next steps:');
  console.log('1. Create a new repository at https://github.com/new');
  console.log(`2. Name it "${cname}" (or your preferred name)`);
  console.log('3. Follow the instructions to push your code');
  console.log('4. Go to Settings > Pages > Source: main branch');
  console.log('5. Your site will be live at: https://YOUR_USERNAME.github.io/website-bug-detector');
}

function startLocalServer() {
  console.log('\n🚀 Starting local development server...');
  console.log('\nServing your website at http://localhost:3000');
  console.log('Press Ctrl+C to stop the server\n');
  
  try {
    // Try to use Python's built-in HTTP server
    execSync('python --version', { stdio: 'ignore' });
    process.chdir('frontend');
    execSync('python -m http.server 3000', { stdio: 'inherit' });
  } catch (e) {
    try {
      // Fallback to Node.js http-server
      execSync('npx http-server frontend -p 3000 -o', { stdio: 'inherit' });
    } catch (error) {
      console.error('\n❌ Error: Could not start a local server.');
      console.log('Please install Python or Node.js to use the local server.');
      console.log('Alternatively, open frontend/index.html directly in your browser.');
    }
  }
}
