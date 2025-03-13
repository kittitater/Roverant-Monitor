// frontend/components/ChatComponent.jsx

import React, { useState, useEffect, useRef } from "react";

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    ws.current = new WebSocket(`ws://kittitat.trueddns.com:45133/ws/chat`);

    ws.current.onopen = () => {
      console.log("WebSocket connection opened for chat.");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.message) {
        const gptMessage = { sender: data.sender, text: data.message };
        setMessages((prev) => [...prev, gptMessage]);
        setIsLoading(false);
      } else if (data.error) {
        console.error("Error from server:", data.error);
        const errorMessage = { sender: "System", text: data.error };
        setMessages((prev) => [...prev, errorMessage]);
        setIsLoading(false);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handleSend = () => {
    if (input.trim() === "") return;
    const userMessage = { sender: "User", text: input };
    setMessages((prev) => [...prev, userMessage]);
    ws.current.send(JSON.stringify({ message: input }));
    setInput("");
    setIsLoading(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      {/* <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Security Rover Dashboard</h2> */}

      {/* Chat Interface */}

      <div className="bg-gray-100 dark:bg-gray-700 p-2  mb-4 rounded-3xl">
        <div className="h-64 overflow-y-auto mb-4 p-2 border rounded-2xl  bg-white dark:bg-gray-800">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${
                msg.sender === "GPT"
                  ? "text-blue-600 dark:text-blue-400"
                  : msg.sender === "User"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="text-gray-500 dark:text-gray-400">
              GPT is typing...
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow p-2 border rounded-lg dark:bg-gray-600 dark:text-white"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatComponent;
