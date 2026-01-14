import { useState, useRef, useEffect } from "react";
import axios from "axios";

const suggestions = [
  "Show fiction books",
  "Suggest tech books",
  "Best business books",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatBodyRef = useRef(null);
  const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/chat"
    : "/chat";
  // Auto-scroll to bottom
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop =
        chatBodyRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}`, {
        message: text,
      });

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: res.data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Server error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* 🧠 BOT MESSAGE RENDERER */
  const renderBotMessage = (text) => {
    if (typeof text !== "string") return null;

    // Split into sections by blank line
    const sections = text.split("\n\n");

    // Multiple sections → render as chat blocks
    if (sections.length > 1) {
      return sections.map((sec, i) => {
        const lines = sec.split("\n");

        return (
          <div key={i} style={botBubble}>
            <div style={botHeading}>{lines[0]}</div>
            <div style={botText}>
              {lines.slice(1).join(" ")}
            </div>
          </div>
        );
      });
    }

    // Single message
    return <div style={botBubble}>{text}</div>;
  };

  return (
    <>
      {/* Floating Button */}
      <button  onClick={() => setOpen(!open)} style={floatingBtn}>
        <span className="w-45 h-45">💬</span>
      </button>

      {open && (
        <div style={chatBox}>
          {/* Header */}
          <div style={header}>
            Book Store AI
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          {/* Body */}
          <div style={body} ref={chatBodyRef}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  textAlign: m.from === "user" ? "right" : "left",
                  marginBottom: 10,
                }}
              >
                {m.from === "user" ? (
                  <div style={userBubble}>{m.text}</div>
                ) : (
                  renderBotMessage(m.text)
                )}
              </div>
            ))}

            {loading && (
              <div style={typing}>Bot is typing...</div>
            )}
          </div>

          {/* Suggestions */}
          <div style={suggestionsBox}>
            {suggestions.map((s) => (
              <button
                key={s}
                style={suggestionBtn}
                onClick={() => sendMessage(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div style={footer}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about books..."
              style={inputBox}
              className="text-orange-900 outline-none shadow-md"
            />
            <button
            
              style={sendBtn}
              onClick={() => sendMessage(input)}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ================= STYLES ================= */

const floatingBtn = {
  position: "fixed",
  bottom: 20,
  right: 20,
  fontSize: 22,
  padding: 12,
  borderRadius: "50%",
  cursor: "pointer",
};

const chatBox = {
  position: "fixed",
  bottom: 80,
  right: 20,
  width: 340,
  background: "#0f172a",
  color: "#fff",
  borderRadius: 12,
  display: "flex",
  flexDirection: "column",
};

const header = {
  padding: 10,
  background: "#020617",
  display: "flex",
  justifyContent: "space-between",
};

const body = {
  padding: 10,
  height: 280,
  overflowY: "auto",
};

const footer = {
  display: "flex",
  gap: 6,
  padding: 10,
};

const inputBox = {
  flex: 1,
  padding: 6,
  borderRadius: 8,
};

const sendBtn = {
  background: "#facc15",
  padding: "6px 10px",
  borderRadius: 8,
  cursor: "pointer",
};

const suggestionsBox = {
  display: "flex",
  gap: 6,
  padding: 8,
  flexWrap: "wrap",
};

const suggestionBtn = {
  fontSize: 12,
  padding: "4px 8px",
  borderRadius: 6,
  cursor: "pointer",
};

/* ===== CHAT BUBBLES ===== */

const botBubble = {
  background: "#020617",
  borderRadius: 10,
  padding: "8px 10px",
  marginBottom: 8,
  maxWidth: "90%",
};

const botHeading = {
  fontWeight: "600",
  marginBottom: 4,
};

const botText = {
  fontSize: 13,
  color: "#cbd5f5",
};

const userBubble = {
  background: "#facc15",
  color: "#000",
  borderRadius: 10,
  padding: "8px 10px",
  display: "inline-block",
  maxWidth: "90%",
};

const typing = {
  fontStyle: "italic",
  color: "#94a3b8",
  marginTop: 6,
};
