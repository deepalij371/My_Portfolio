import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { callClaude } from "../api/claude.js";

const INITIAL_MESSAGES = [
  { role: "assistant", content: "Hi! Ask me anything about Deepali's experience, skills, or projects." },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      // Skip the initial greeting message from API call
      const apiMessages = nextMessages
        .filter((m) => !(m.role === "assistant" && m === nextMessages[0]))
        .map((m) => ({ role: m.role, content: m.content }));
      const reply = await callClaude(apiMessages);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection lost. Try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Hint bubble */}
      {!open && <div className="chat-hint">Hi! Ask me! 👋</div>}

      {/* Launcher button */}
      <button
        className="chat-launcher"
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="chat-panel">
          <div className="chat-header">
            <span>ASK_DEEPALI.AI</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={16} />
            </button>
          </div>

          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>
                {m.content}
              </div>
            ))}
            {loading && <div className="chat-msg assistant">thinking…</div>}
            <div ref={endRef} />
          </div>

          <form className="chat-form" onSubmit={handleSend}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my experience..."
            />
            <button type="submit" aria-label="Send">
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
