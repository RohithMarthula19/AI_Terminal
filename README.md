# AI Terminal

A browser-based terminal that runs real Linux commands with AI assistance.

## Use Online (Render server)
Just open: https://ai-terminal-nine.vercel.app/
Commands run on our Linux server.

## Use on Your Own Machine
Run these commands:
git clone https://github.com/RohithMarthula19/AI_Terminal
cd AI_Terminal/server
npm install
node index.js

Then open: https://ai-terminal-nine.vercel.app/
Commands will now run on your own machine.

## Features
- Run real Linux commands from the browser
- @ai <plain english> — AI suggests the right command
- @ai explain — explains the last output
- @ai fix — fixes the last error
- Command history with arrow keys
- Ctrl+C to cancel running processes
- Auto scroll and typing animation

## Tech Stack
- Frontend: React + Vite (Vercel)
- Backend: Node.js + Express (Render)
- AI: NVIDIA API (LLaMA 4 Maverick)

## Setup & Usage

### Option 1 — One line install (Recommended)
curl -fsSL https://raw.githubusercontent.com/RohithMarthula19/AI_Terminal/main/install.sh | bash

Then open: https://ai-terminal-nine.vercel.app/

### Option 2 — Manual setup
git clone https://github.com/RohithMarthula19/AI_Terminal
cd AI_Terminal/server
npm install
node index.js

Then open: https://ai-terminal-nine.vercel.app/