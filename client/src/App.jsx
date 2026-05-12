import { useState, useEffect } from "react";
import Terminal from "./components/Terminal";
import API_URL from "./config";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [lastOutput, setLastOutput] = useState("");
  const [cwd, setCwd] = useState("~");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    "AI Terminal v0.1",
    "Type 'help' to begin",
  ]);
  const [pendingCommand, setPendingCommand] = useState(null);

  const fetchCwd = async () => {
  const res = await fetch(`${API_URL}/cwd`);
  const data = await res.json();
  setCwd(data.cwd);
};

useEffect(() => {
  fetchCwd();
}, []);

  const typeWriter = (text, callback) => {
  let i = 0;
  setHistory((prev) => [...prev, ""]);

  const interval = setInterval(() => {
    i++;
    setHistory((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = text.slice(0, i);
      return updated;
    });

    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 18);
};
   
  const handleCommand = async (e) => {
  e.preventDefault();
  if (!input.trim()) return;
  if (isRunning) return; 

  const command = input.trim();
  setInput("");

  if (command === "clear") {
    setHistory([]);
    return;
  }

  if (command === "help") {
    setHistory((prev) => [
      ...prev,
      `> ${command}`,
      "Commands: help, clear, or any Linux command",
      "Use @ai <plain english> to get AI help",
      "Use @ai explain to explain last output",
      "Use @ai fix to fix last error",
    ]);
    return;
  }

  if (command === "@ai explain") {
    if (!lastOutput) {
      setHistory((prev) => [...prev, "> @ai explain", "No previous output to explain."]);
      return;
    }
    setHistory((prev) => [...prev, "> @ai explain", "AI is thinking..."]);
    const prompt = `I ran a Linux command and got this output: "${lastOutput}". Explain what it means in simple terms and suggest what to do next. Keep it short and clear.`;
    const res = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt }),
    });
    const data = await res.json();
    setHistory((prev) => prev.slice(0, -1));
    typeWriter(data.reply.trim());
    return;
  }

  if (command === "@ai fix") {
    if (!lastOutput) {
      setHistory((prev) => [...prev, "> @ai fix", "No previous output to fix."]);
      return;
    }
    setHistory((prev) => [...prev, "> @ai fix", "AI is thinking..."]);
    const prompt = `I ran a Linux command and got this error: "${lastOutput}". Give me the corrected Linux command to fix this. Reply with ONLY the exact command, nothing else.`;
    const res = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt }),
    });
    const data = await res.json();
    const fixedCommand = data.reply.trim();
    setHistory((prev) => prev.slice(0, -1));
    setHistory((prev) => [
      ...prev,
      `AI suggests: ${fixedCommand}`,
      `Type "yes" to execute or "no" to cancel`,
    ]);
    setPendingCommand(fixedCommand);
    return;
  }

  if (command.startsWith("@ai ")) {
    const userRequest = command.slice(4);
    setHistory((prev) => [...prev, `> ${command}`, "AI is thinking..."]);
    const prompt = `You are a Linux terminal assistant. The user wants to: "${userRequest}". Reply with ONLY the exact Linux command, nothing else. No explanation, no markdown, just the raw command.`;
    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt }),
      });
      const data = await res.json();
      const suggestedCommand = data.reply.trim();
      setHistory((prev) => prev.slice(0, -1));
      typeWriter(`AI suggests: ${suggestedCommand}`, () => {
        setHistory((prev) => [...prev, `Type "yes" to execute or "no" to cancel`]);
      });
      setPendingCommand(suggestedCommand);
    } catch (error) {
      setHistory((prev) => [...prev.slice(0, -1), "Error: Could not reach AI"]);
    }
    return;
  }

  if (pendingCommand) {
    if (command === "yes") {
      setHistory((prev) => [...prev, `> yes`, "Executing..."]);
      const res = await fetch(`${API_URL}/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: pendingCommand }),
      });
      const data = await res.json();
      const output = data.output || "Done.";
      setHistory((prev) => [...prev, output]);
      setLastOutput(output);
    } else {
      setHistory((prev) => [...prev, `> no`, "Cancelled."]);
    }
    setPendingCommand(null);
    return;
  }

  setIsRunning(true);
setHistory((prev) => [...prev, `> ${command}`]);
try {
const res = await fetch(`${API_URL}/execute`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ command }),
});
const data = await res.json();
const output = data.output || "Done.";
setHistory((prev) => [...prev, output]);
setLastOutput(output);
fetchCwd();
}finally{
  setIsRunning(false);
}
};
  
  return (
    <Terminal
      history={history}
      input={input}
      setInput={setInput}
      handleCommand={handleCommand}
      cwd={cwd}
      isRunning={isRunning}
    />
  );
}

export default App;