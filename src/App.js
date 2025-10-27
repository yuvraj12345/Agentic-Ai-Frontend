import React, { useState } from "react";
import "./App.css";
import ChatbotPage from "./pages/ChatbotPage";
import AdminUpload from "./pages/AdminUpload";
import SpeechChatPage from "./pages/SpeechChatPage";

function App() {
  const [activePage, setActivePage] = useState("chatbot");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="w-full bg-blue-600 text-white py-4 text-center shadow-md">
        <h1 className="text-2xl font-bold">MetaStore Companion</h1>
      </header>

      {/* Button Navigation */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => setActivePage("chatbot")}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            activePage === "chatbot"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 border border-blue-600"
          }`}
        >
          Chatbot
        </button>
        <button
          onClick={() => setActivePage("admin")}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            activePage === "admin"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 border border-blue-600"
          }`}
        >
          Admin Upload
        </button>
      </div>
      
      {/* Render Selected Component */}
      <div className="w-full max-w-4xl mt-10">
        {activePage === "chatbot" ? <SpeechChatPage /> : <AdminUpload />}
      </div>
    </div>
  );
}

export default App;
