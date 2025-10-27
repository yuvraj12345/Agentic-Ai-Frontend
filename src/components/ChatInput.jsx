import { useState } from "react";

export default function ChatInput({ onSend, loading }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex gap-2 mt-3">
      <input
        className="flex-1 p-2 border rounded-lg"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about products or offers..."
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        disabled={loading}
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "..." : "Send"}
      </button>
    </div>
  );
}
