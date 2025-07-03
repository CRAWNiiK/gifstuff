#!/bin/bash

# GifStuff Setup Script for VPS/Local Machine
# This script sets up the application for production deployment

set -e

echo "🚀 Setting up GifStuff application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Installing Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "✅ Node.js is already installed"
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please install Node.js 18 or higher."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Install PM2 globally if not present
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2 process manager..."
    sudo npm install -g pm2
else
    echo "✅ PM2 is already installed"
fi

# Create logs directory
mkdir -p logs

# Set up PM2 ecosystem
echo "⚙️ Setting up PM2 configuration..."
pm2 delete gifstuff 2>/dev/null || true
pm2 start ecosystem.config.js

# Enable PM2 startup
pm2 startup | tail -1 | sudo bash
pm2 save

echo ""
echo "🎉 GifStuff setup complete!"
echo "📊 Application status:"
pm2 status
echo ""
echo "🌐 Your application should be running on:"
echo "   http://localhost:5000"
echo ""
echo "📋 Useful commands:"
echo "   pm2 status          - Check application status"
echo "   pm2 logs gifstuff   - View application logs"
echo "   pm2 restart gifstuff - Restart application"
echo "   pm2 stop gifstuff   - Stop application"