import React, { useState } from "react";

export default function SpeechChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🎤 Start speech recognition
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition 😔");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    setListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("🎤 Recognized:", transcript);
      setTimeout(() => {
        setInput(transcript);
        setListening(false);
        recognition.stop();
      }, 2000);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
      recognition.stop();
    };
  };

  // 🚀 Send message
  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

  //   try {
  //     const res = await fetch("https://agentic-ai-j5i8.onrender.com/ask", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ query: text }),
  //     });

  //     const data = await res.json();
  //     const botMessage = { role: "assistant", content: data.response };
  //     setMessages((prev) => [...prev, botMessage]);
  //   } catch (err) {
  //     console.error("Error:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  try {
      const res = await fetch("http://127.0.0.1:10000/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log(data)
      const botMessage = { role: "assistant", content: data.message };
      console.log(botMessage)
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Allow Enter key to send
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-4 flex flex-col">
    <h1 className="text-3xl font-bold text-blue-700 mb-6 tracking-wide" style={{ margin: "auto" , marginBottom: "1rem"}}>
      MetaStore Companion
    </h1>
        <div className="h-96 overflow-y-auto border rounded-lg p-3 bg-gray-50 ">
            
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`my-2 p-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-100 text-blue-800 text-right"
                  : "bg-gray-200 text-gray-800 text-left"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="italic text-gray-500 text-sm">Thinking...</div>
          )}
        </div>

        {/* 🎤 Input Section */}
        <div className="flex items-center space-x-2">
          <button
            onClick={startListening}
            disabled={listening}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              listening
                ? "bg-red-500 text-white animate-pulse"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {listening ? "Listening..." : "🎤 Speak"}
          </button>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type or edit your message..."
            rows={2}
            className="flex-1 border border-gray-300 rounded-lg p-2 resize-none focus:ring focus:ring-blue-300"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          >
            Send 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
