# Website Bug Detector - Quick Start Guide

## Prerequisites
1. **Node.js** (v16 or higher)
   - Download and install from: https://nodejs.org/
   - Choose the LTS (Long Term Support) version
   - Follow the installation wizard with default settings

## Setup Instructions

### Automatic Setup (Recommended)
1. Double-click on `setup.bat` in the project root folder
2. Follow the on-screen instructions
3. The application should open automatically in your default browser

### Manual Setup (If automatic setup fails)

#### Backend Setup
1. Open a command prompt
2. Navigate to the backend folder:
   ```
   cd path\to\website-bug-detector\backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the backend server:
   ```
   npm start
   ```
   (Keep this terminal window open)

#### Frontend Setup
1. Open a new command prompt
2. Navigate to the frontend folder:
   ```
   cd path\to\website-bug-detector\frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Access the Application
- Open your web browser and go to: http://localhost:3000

## Troubleshooting
- If you see any errors during setup, make sure you have Node.js installed correctly
- Try running the commands in an administrator command prompt if you get permission errors
- Ensure no other applications are using ports 3000 (frontend) or 3001 (backend)

## Stopping the Application
1. Close both command prompt windows (frontend and backend)
2. Or press `Ctrl + C` in each terminal window to stop the servers
