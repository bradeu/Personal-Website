#!/bin/bash

# Personal Website Development Script
# This script starts the development server for the personal website

echo "🚀 Starting Personal Website Development Server..."
echo ""

# Navigate to client directory
cd "$(dirname "$0")/client"

# Check if node_modules exists or if esbuild has architecture mismatch
if [ ! -d "node_modules" ]; then
    echo "📦 Dependencies not found. Installing..."
    npm install
    echo ""
elif [ -d "node_modules/@esbuild/darwin-x64" ] && [ ! -d "node_modules/@esbuild/darwin-arm64" ]; then
    echo "🔧 Detected esbuild architecture mismatch. Reinstalling dependencies..."
    rm -rf node_modules package-lock.json
    npm install
    echo ""
fi

# Start the development server
echo "✨ Starting Vite development server..."
echo "🌐 Your website will be available at http://localhost:5173"
echo ""
npm run dev
