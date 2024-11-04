#!/bin/bash

# Production setup script
echo "🚀 Setting up production environment..."

# Check required tools
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed."; exit 1; }
command -v openssl >/dev/null 2>&1 || { echo "❌ OpenSSL is required but not installed."; exit 1; }

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Build application
echo "🏗️ Building application..."
npm run build

# Setup SSL
echo "🔐 Setting up SSL..."
npm run setup-ssl

# Run database migrations
echo "🗃️ Running database migrations..."
npm run migrate

# Setup backup service
echo "💾 Setting up backup service..."
npm run setup-backup

echo "✅ Production setup completed!"