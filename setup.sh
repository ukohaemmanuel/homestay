#!/bin/bash

# Workshop Management System Setup Script
echo "🚀 Starting Workshop Management System Setup..."

# Check operating system
OS="$(uname)"
case $OS in
  'Linux')
    OS='Linux'
    alias ls='ls --color=auto'
    ;;
  'Darwin') 
    OS='Mac'
    ;;
  *) 
    OS='Windows'
    ;;
esac

echo "📌 Detected OS: $OS"

# Function to check and install dependencies
check_dependency() {
  if ! command -v $1 &> /dev/null; then
    echo "❌ $1 not found. Installing..."
    case $OS in
      'Linux')
        sudo apt-get update && sudo apt-get install -y $1
        ;;
      'Mac')
        brew install $1
        ;;
      'Windows')
        winget install $1
        ;;
    esac
  else
    echo "✅ $1 is installed"
  fi
}

# Check required software
echo "🔍 Checking required software..."
check_dependency "node"
check_dependency "npm"
check_dependency "postgresql"

# Setup environment
echo "⚙️ Setting up environment..."
cp .env.example .env

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Initialize database
echo "🗄️ Setting up database..."
npm run migrate

# Start application
echo "🚀 Starting application..."
npm run dev

echo "✨ Setup complete! Access your workshop management system at:"
echo "📱 Local: http://localhost:3000"