import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatInput from "./ChatInput";
import TableResponse from "./TableResponse";
import AnswerFeedback from "./AnswerFeedback";

function ChatWindow() {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [tableData, setTableData] = useState([]);

  const loadHistory = async () => {
    const res = await fetch(`http://localhost:5000/api/session/${sessionId}`);
    const data = await res.json();
    setMessages(data.history || []);
  };

  useEffect(() => {
    loadHistory();
  }, [sessionId]);

  async function sendMessage(userMessage) {
    const userMessageObj = { role: "user", text: userMessage };
    setMessages((prev) => [...prev, userMessageObj]);

    try {
      const res = await fetch(`http://localhost:5000/api/chat/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      
      
      setMessages((prev) => [...prev, { role: "assistant", text: data.response }]);
      
      if (data.table && data.table.length > 0) {
        setTableData(data.table);
      } else {
        setTableData([]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        text: "Sorry, I encountered an error processing your request. Please try again." 
      }]);
      setTableData([]);
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-[#111827]">

      
      <div className="flex-1 overflow-auto flex justify-center px-4 py-6">
        <div className="w-full max-w-3xl space-y-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`w-full ${msg.role === "user" ? "text-right" : "text-left"}`}
            >
              <div
                className={`inline-block px-4 py-2 rounded-lg shadow-sm ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
              {i === messages.length - 1 && msg.role === "assistant" && tableData.length > 0 && (
                <div className="mt-4">
                  <TableResponse table={tableData} />
                  <div className="mt-2">
                    <AnswerFeedback />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <ChatInput onSend={sendMessage} />
    </div>
  );
}

export default ChatWindow;
