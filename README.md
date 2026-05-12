# AI Terminal

A browser-based terminal that runs real Linux commands with AI assistance, built with React and Node.js.

## Features

- Run real Linux commands directly from the browser
- `@ai <plain english>` — AI suggests the right command
- `@ai explain` — explains the last command output
- `@ai fix` — suggests a fix for failed commands
- Command history with arrow keys
- Ctrl+C to cancel running processes
- Auto scroll and typing animation

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- AI: NVIDIA API (LLaMA 4 Maverick)

## Setup

### Backend
cd server
npm install
add your NVIDIA_API_KEY to .env
node index.js

### Frontend
cd client
npm install
npm run dev

## Usage

| Command | Description |
|--------|-------------|
| `ls`, `pwd`, `mkdir` | Any Linux command |
| `@ai create a file named x` | AI suggests command |
| `@ai explain` | Explain last output |
| `@ai fix` | Fix last error |
| `help` | Show all commands |
| `clear` | Clear terminal |