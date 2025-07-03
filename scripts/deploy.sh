#!/bin/bash

# GifStuff Deployment Script
# Quick deployment for updates

set -e

echo "🚀 Deploying GifStuff updates..."

# Pull latest changes (if using git)
if [ -d ".git" ]; then
    echo "📥 Pulling latest changes..."
    git pull
fi

# Install/update dependencies
echo "📦 Updating dependencies..."
npm install

# Build application
echo "🔨 Building application..."
npm run build

# Restart application with PM2
if command -v pm2 &> /dev/null; then
    echo "🔄 Restarting application..."
    pm2 restart gifstuff
    pm2 save
    
    echo "📊 Application status:"
    pm2 status
else
    echo "⚠️  PM2 not found. Please run the setup script first or start manually with 'npm start'"
fi

echo ""
echo "✅ Deployment complete!"
echo "🌐 Application should be running on port 5000"