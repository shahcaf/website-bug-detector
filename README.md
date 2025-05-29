# Website Bug Detector

A powerful tool to scan websites for performance, accessibility, SEO, and best practices issues.

## Features

- **Website Scanning**: Enter any URL to scan for issues
- **Comprehensive Reports**: Get detailed reports on various aspects of the website
- **Performance Analysis**: Check loading performance and optimization opportunities
- **Accessibility Check**: Identify accessibility issues based on WCAG guidelines
- **SEO Audit**: Get suggestions for better search engine visibility
- **Best Practices**: Check for security, modern web standards, and performance best practices
- **Screenshots**: View how the website appears during the scan

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Chrome (for Lighthouse)

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```
   The backend will be available at `http://localhost:3001`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`

## Deployment

### Option 1: GitHub Pages (Easiest)

1. **Create a GitHub repository** at [github.com/new](https://github.com/new)
   - Name it `website-bug-detector` (or any name you prefer)
   - Make it public or private
   - Don't initialize with README

2. **Initialize Git and push your code**:
   ```bash
   # In your project directory
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_REPOSITORY_URL
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click "Settings" > "Pages"
   - Under "Source", select "main" branch and "/ (root)" folder
   - Click "Save"

Your site will be live at: `https://YOUR_USERNAME.github.io/website-bug-detector`

### Option 2: Netlify (Recommended for Production)

1. **Sign up** at [app.netlify.com](https://app.netlify.com/)
2. **Drag and drop** the `frontend` folder to Netlify's dashboard
   OR
   - Click "Add new site" > "Import an existing project"
   - Connect to GitHub and select your repository
   - Set "Build command" to empty (since we're using plain HTML/JS)
   - Set "Publish directory" to `.` (root)
   - Click "Deploy site"

### Option 3: Vercel (Best for React/Next.js)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```
   - Follow the prompts to log in and deploy

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter the URL of the website you want to scan in the input field
3. Click the "Scan Website" button
4. Wait for the scan to complete (this may take a few seconds)
5. View the detailed report with scores and recommendations

## Project Structure

```
website-bug-detector/
├── backend/               # Backend server code
│   ├── node_modules/      # Backend dependencies
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies and scripts
├── frontend/              # Frontend React application
│   ├── public/            # Static files
│   ├── src/               # React source code
│   ├── package.json       # Frontend dependencies and scripts
│   └── vite.config.js     # Vite configuration
└── README.md             # This file
```

## Technologies Used

### Backend
- Node.js
- Express
- Lighthouse
- Puppeteer
- Chrome Launcher

### Frontend
- React
- Vite
- Tailwind CSS
- React Icons
- Axios
- React JSON View

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
