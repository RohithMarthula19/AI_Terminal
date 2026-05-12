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

echo "📥 Downloading server files..."

# Download only server files
curl -fsSL https://raw.githubusercontent.com/RohithMarthula19/AI_Terminal/main/server/index.js -o index.js
curl -fsSL https://raw.githubusercontent.com/RohithMarthula19/AI_Terminal/main/server/package.json -o package.json

# Create .env with your API key
echo "NVIDIA_API_KEY=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" > .env

echo "📦 Installing dependencies..."
npm install

echo "✅ Starting AI Terminal backend..."
node index.js &

echo ""
echo "✅ Done! Opening AI Terminal..."
sleep 2
xdg-open https://ai-terminal-nine.vercel.app/ 2>/dev/null || open https://ai-terminal-nine.vercel.app/ 2>/dev/null

echo ""
echo "AI Terminal is running at https://ai-terminal-nine.vercel.app/"
echo "Press Ctrl+C to stop the backend."