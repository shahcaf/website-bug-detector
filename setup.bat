@echo off
echo Setting up Website Bug Detector...
echo ===================================

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install Node.js from https://nodejs.org/ and run this script again.
    pause
    exit /b
)

:: Check npm version
npm -v >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo npm is not working properly. Please ensure Node.js is installed correctly.
    pause
    exit /b
)

echo.
echo [1/4] Setting up backend...
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Failed to install backend dependencies.
    pause
    exit /b
)

:: Start backend in a new window
start "Backend Server" cmd /k "cd /d %~dp0backend && npm start"

:: Wait a bit for backend to start
timeout /t 5 >nul

cd ..

echo.
echo [2/4] Setting up frontend...
cd frontend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Failed to install frontend dependencies.
    pause
    exit /b
)

:: Start frontend in a new window
start "Frontend Server" cmd /k "cd /d %~dp0frontend && npm run dev"

:: Wait a bit for frontend to start
timeout /t 5 >nul

cd ..

echo.
echo ===================================
echo Setup complete!
echo.
echo The application should open in your default browser shortly.
echo If it doesn't, please open: http://localhost:3000
echo.
echo To stop the servers, simply close the command windows.
echo ===================================

:: Open the application in default browser
start http://localhost:3000

pause
