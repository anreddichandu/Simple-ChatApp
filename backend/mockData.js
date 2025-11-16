// backend/mockData.js
const { v4: uuidv4 } = require("uuid");

// Predefined sessions for sidebar (your 2 manual examples)

const sessions = [
  { id: "session1", title: "What is React.js" },
  { id: "session2", title: "Tailwind Q&A" },
  { id:"session3", title: "Goldman sachs"},
  { id:"session4", title: "New york City"},
];

// Conversation history per session
// IMPORTANT: use `text` (not `content`) so frontend can read it.
const sessionHistories = {
  session1: [
    { role: "user", text: "React.js?" },
    {
      role: "assistant",
      text: "React.js is a JavaScript library for building user interfaces",
    },
  ],
  session2: [
    { role: "user", text: "How do I use dark mode in Tailwind?" },
    {
      role: "assistant",
      text: 'Tailwind uses the "dark:" variant plus a "dark" class on <html> or a parent.',
    },
  ],
  session3: [
    { role: "user", text: "Goldman Sachs" },
    {
      role: "assistant",
      text: "Goldman Sachs is a multinational investment bank and financial services company based in New York City.",
    },
  ],
  session4: [
    { role: "user", text: "How to Travel to New York City" },
    {
      role: "assistant",
      text: 'New York City is a major city in the United States, located on the eastern coast of the country. It is known for its vibrant culture, diverse population, and many attractions, including museums, parks, and landmarks.',
    },
  ],
};

// Create a new session with a temporary title; will be renamed on first message

function generateNewSession() {
  const newId = uuidv4();
  const newSession = { id: newId, title: "New chat" };
  sessions.push(newSession);
  sessionHistories[newId] = [];
  return newSession;
}

// Returns mock text + table for any message
function getTableResponse(message) {
  return {
    response: `Here is some info related to: "${message}"`,
    table: [
      { Field: "Question", Answer: message },
      { Field: "Length", Answer: `${message.length} characters` },
    ],
  };
}

module.exports = {
  sessions,
  sessionHistories,
  generateNewSession,
  getTableResponse,
};