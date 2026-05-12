const API_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000"  
  : "https://ai-terminal-pxs0.onrender.com";

export default API_URL;