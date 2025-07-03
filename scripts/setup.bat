@echo off
setlocal enabledelayedexpansion

:: GifStuff Setup Script for Windows
:: This script sets up the application for production deployment on Windows

echo 🚀 Setting up GifStuff application...

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please download and install Node.js 18+ from https://nodejs.org/
    echo Then run this script again.
    pause
    exit /b 1
) else (
    echo ✅ Node.js is already installed
)

:: Check Node.js version
for /f "tokens=1 delims=." %%a in ('node --version') do set NODE_MAJOR=%%a
set NODE_MAJOR=%NODE_MAJOR:v=%
if %NODE_MAJOR% lss 18 (
    echo ❌ Node.js version %NODE_MAJOR% is too old. Please install Node.js 18 or higher.
    pause
    exit /b 1
)

:: Install dependencies
echo 📦 Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

:: Build the application
echo 🔨 Building application...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Failed to build application
    pause
    exit /b 1
)

:: Check if PM2 is installed globally
pm2 --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📦 Installing PM2 process manager...
    call npm install -g pm2
    if %errorlevel% neq 0 (
        echo ❌ Failed to install PM2. You may need to run as Administrator.
        echo Alternative: Run "npm start" manually to start the application
        pause
        exit /b 1
    )
) else (
    echo ✅ PM2 is already installed
)

:: Create logs directory
if not exist "logs" mkdir logs

:: Set up PM2 ecosystem
echo ⚙️ Setting up PM2 configuration...
pm2 delete gifstuff >nul 2>&1
pm2 start ecosystem.config.js
if %errorlevel% neq 0 (
    echo ❌ Failed to start with PM2
    echo You can start manually with: npm start
    pause
    exit /b 1
)

:: Enable PM2 startup (Windows service)
echo 📋 Setting up PM2 startup...
pm2 startup
echo 💾 Saving PM2 configuration...
pm2 save

echo.
echo 🎉 GifStuff setup complete!
echo 📊 Application status:
pm2 status

echo.
echo 🌐 Your application should be running on:
echo    http://localhost:5000
echo.
echo 📋 Useful commands:
echo    pm2 status          - Check application status
echo    pm2 logs gifstuff   - View application logs
echo    pm2 restart gifstuff - Restart application
echo    pm2 stop gifstuff   - Stop application
echo    pm2 delete gifstuff - Remove from PM2
echo.
echo Press any key to exit...
pause >nul