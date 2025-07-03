@echo off
setlocal enabledelayedexpansion

:: GifStuff Deployment Script for Windows
:: Quick deployment for updates

echo 🚀 Deploying GifStuff updates...

:: Pull latest changes (if using git)
if exist ".git" (
    echo 📥 Pulling latest changes...
    git pull
    if %errorlevel% neq 0 (
        echo ⚠️ Git pull failed, continuing with local changes...
    )
)

:: Install/update dependencies
echo 📦 Updating dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to update dependencies
    pause
    exit /b 1
)

:: Build application
echo 🔨 Building application...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Failed to build application
    pause
    exit /b 1
)

:: Restart application with PM2
pm2 --version >nul 2>&1
if %errorlevel% equ 0 (
    echo 🔄 Restarting application...
    pm2 restart gifstuff
    if %errorlevel% neq 0 (
        echo ❌ Failed to restart with PM2
        echo Try: pm2 start ecosystem.config.js
        pause
        exit /b 1
    )
    pm2 save
    
    echo 📊 Application status:
    pm2 status
) else (
    echo ⚠️ PM2 not found. Please run setup.bat first or start manually with 'npm start'
    pause
    exit /b 1
)

echo.
echo ✅ Deployment complete!
echo 🌐 Application should be running on port 5000
echo.
echo Press any key to exit...
pause >nul