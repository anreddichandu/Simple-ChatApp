import React, { useState, useRef, useEffect } from "react";

function ChatInput({ onSend, disabled = false }) {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput("");
    
   
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-6 pt-2">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-end gap-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              rows="1"
              className="w-full px-4 py-3 bg-transparent border-0 focus:ring-0 resize-none max-h-40 overflow-y-auto"
              placeholder="Send a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              aria-label="Type your message"
              style={{
                minHeight: '44px',
                maxHeight: '200px',
                scrollbarWidth: 'thin',
                scrollbarColor: '#9ca3af #f3f4f6',
              }}
            />
            <div className="px-4 pb-2 text-xs text-gray-500 dark:text-gray-400">
              Press Enter to send
            </div>
          </div>
          <button
            type="submit"
            disabled={!input.trim() || disabled}
            className={`m-2 px-4 py-2 rounded-lg transition-colors ${
              input.trim() && !disabled
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
            aria-label="Send message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatInput;
