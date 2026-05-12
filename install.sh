#!/bin/bash

echo "🚀 Setting up AI Terminal..."

# Check Node.js
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed."
  echo "Install it from: https://nodejs.org"
  exit 1
fi

# Create folder
mkdir -p ~/ai-terminal
cd ~/ai-terminal

echo "📥 Downloading files..."

# Download server files
curl -fsSL https://raw.githubusercontent.com/RohithMarthula19/AI_Terminal/main/server/index.js -o index.js
curl -fsSL https://raw.githubusercontent.com/RohithMarthula19/AI_Terminal/main/server/package.json -o package.json

# Download frontend build
mkdir -p public
curl -fsSL https://raw.githubusercontent.com/RohithMarthula19/AI_Terminal/main/server/public/index.html -o public/index.html

echo "NVIDIA_API_KEY=your_actual_key_here" > .env

echo "📦 Installing dependencies..."
npm install

echo "✅ Starting AI Terminal..."
node index.js &

sleep 2
xdg-open http://localhost:5000 2>/dev/null || open http://localhost:5000 2>/dev/null

echo ""
echo "✅ AI Terminal is running at http://localhost:5000"
echo "Press Ctrl+C to stop."