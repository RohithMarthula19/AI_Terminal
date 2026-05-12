import { useState, useRef, useEffect } from "react";

function Terminal({ history, input, setInput, handleCommand, cwd, isRunning }) {

  const [commandHistory, setCommandHistory] = useState([]);
const [historyIndex, setHistoryIndex] = useState(-1);

  const bottomRef = useRef(null);
  useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [history]);

  const handleKeyDown = (e) => {
    if (e.key === "c" && e.ctrlKey) {
  e.preventDefault();
  fetch("http://localhost:5000/cancel", { method: "POST" })
    .then((res) => res.json())
    .then((data) => {
      setHistory((prev) => [...prev, "^C", data.output]);
    });
  return;
}

  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (commandHistory.length === 0) return;
    const newIndex = historyIndex + 1;
    if (newIndex < commandHistory.length) {
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    }
  }

  if (e.key === "ArrowDown") {
    e.preventDefault();
    const newIndex = historyIndex - 1;
    if (newIndex < 0) {
      setHistoryIndex(-1);
      setInput("");
    } else {
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    }
  }
};
const handleSubmit = (e) => {
  if (input.trim()) {
    setCommandHistory((prev) => [input.trim(), ...prev]);
    setHistoryIndex(-1);
  }
  handleCommand(e);
};
  return (
    <div style={{
      background: "#0d0d0d",
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'JetBrains Mono', monospace",
      overflow: "hidden",
    }}>

      {/* Top bar */}
      <div style={{
        background: "#1a1a1a",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        borderBottom: "1px solid #2a2a2a",
        flexShrink: 0,
      }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f" }} />
        <span style={{ color: "#555", fontSize: 13, marginLeft: "auto", marginRight: "auto" }}>
          ai-terminal
        </span>
      </div>

      {/* Output area */}
      <div style={{
        flex: 1,
        padding: "16px 20px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "2px",
      }}>
        {history.map((line, index) => (
          <div key={index} style={{
            fontSize: 14,
            lineHeight: "1.7",
            color: line.startsWith("AI suggests:")
              ? "#22d3ee"
              : line.startsWith("Error") || line.includes("not found")
              ? "#f87171"
              : line.startsWith("Type") || line.startsWith("Commands")
              ? "#a3a3a3"
              : line.startsWith(">")
              ? "#a78bfa"
              : "#e5e5e5",
          }}>
            {line}
          </div>
        ))}

        <div ref={bottomRef} />

        {/* Input row */}
        <form onSubmit={handleSubmit} style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "4px",
        }}>
          <span style={{
            color: "#27c93f",
            fontSize: 14,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}>
            rohith@ai-terminal:{cwd}$
          </span>
          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isRunning ? "running..." : ""}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#ffffff",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 16,
              width: "100%",
            }}
          />
        </form>
      </div>

    </div>
  );
}

export default Terminal;