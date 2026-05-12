const express = require("express");
const cors = require("cors");

const { exec } = require("child_process");

const dotenv = require("dotenv");
dotenv.config();

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: "https://integrate.api.nvidia.com/v1",
});

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.get("/cwd", (req, res) => {
  res.json({ cwd: currentDir });
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await client.chat.completions.create({
      model: "meta/llama-4-maverick-17b-128e-instruct",
      messages: [{ role: "user", content: message }],
      max_tokens: 500,
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "AI request failed" });
  }
});

let currentDir = process.cwd();
let currentProcess = null;

const blockedCommands = ["nano", "vim", "vi", "htop", "top", "less", "man", "ssh"];

app.post("/execute", (req, res) => {
  const { command } = req.body;

  const firstWord = command.trim().split(" ")[0];

  if (blockedCommands.includes(firstWord)) {
    return res.json({ output: `'${firstWord}' is an interactive command and cannot run in this terminal.` });
  }

  if (command.startsWith("cd ")) {
    const target = command.slice(3).trim();
    const newDir = require("path").resolve(currentDir, target);
    currentDir = newDir;
    return res.json({ output: `Changed to ${newDir}` });
  }

  currentProcess = exec(command, { cwd: currentDir }, (error, stdout, stderr) => {
    currentProcess = null;
    if (error) {
      return res.json({ output: stderr || error.message });
    }
    res.json({ output: stdout || "Command executed." });
  });
});

app.post("/cancel", (req, res) => {
  if (currentProcess) {
    currentProcess.kill();
    currentProcess = null;
    res.json({ output: "Process cancelled." });
  } else {
    res.json({ output: "No process running." });
  }
});

app.listen(5000, () => {
  console.log(
    "Server running on port 5000"
  );
});