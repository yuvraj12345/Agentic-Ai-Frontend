import { useState } from "react";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your Store Companion. How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    const newMessage = { role: "user", content: text };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setLoading(true);
    const API_URL = "http://127.0.0.1:8000/ask";
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
      });

      const data = await res.json();
      console.log(data);
      setMessages([...updatedMessages, { role: "assistant", content: data.response }]);
    } catch (error) {
      setMessages([...updatedMessages, { role: "assistant", content: "Error connecting to server." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
    {/* Header */}
    <h1 className="text-3xl font-bold text-blue-700 mb-6 tracking-wide">
      MetaStore Companion
    </h1>

    {/* 💬 Chat Container */}
    <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-4">
      <div className="h-96 overflow-y-auto border rounded-lg p-3 bg-gray-50">
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
      </div>
      <ChatInput onSend={sendMessage} loading={loading} />
    </div>
  </div>
);

}
