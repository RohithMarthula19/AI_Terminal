# AI Terminal

A browser-based terminal that runs real Linux commands with AI assistance.

## Installation

### Linux/Mac — One line install:
curl -fsSL https://raw.githubusercontent.com/RohithMarthula19/AI_Terminal/main/install.sh | bash

### Windows / Manual setup:
git clone https://github.com/RohithMarthula19/AI_Terminal
cd AI_Terminal/server
npm install
node index.js

Then open: http://localhost:5000

## Features
- Run real Linux commands from browser
- @ai <plain english> — AI suggests command
- @ai explain — explains last output  
- @ai fix — fixes last error
- Command history with arrow keys
- Ctrl+C to cancel running process
- Auto scroll and typing animation

## Tech Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- AI: NVIDIA API (LLaMA 4 Maverick)