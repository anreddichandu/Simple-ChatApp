// backend/server.js
const express = require("express");
const cors = require("cors");
const {
  sessions,
  sessionHistories,
  generateNewSession,
  getTableResponse,
} = require("./mockData");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// GET all sessions for sidebar
app.get("/api/sessions", (req, res) => {
  res.json(sessions);
});

// GET new session id
app.get("/api/new-chat", (req, res) => {
  const newSession = generateNewSession();
  res.json(newSession);
});

// GET full history for a session
app.get("/api/session/:id", (req, res) => {
  const sessId = req.params.id;

  // RETURN AN OBJECT with history (frontend expects `history`)
  res.json({
    id: sessId,
    history: sessionHistories[sessId] || [],
  });
});

// POST: send a message in a session
app.post("/api/chat/:id", (req, res) => {
  const sessId = req.params.id;
  const { message } = req.body;

  if (!sessionHistories[sessId]) {
    sessionHistories[sessId] = [];
  }

  // 1. Add user message to history
  sessionHistories[sessId].push({ role: "user", text: message });

  // 1b. If this is the FIRST message, update the session title
  if (sessionHistories[sessId].length === 1) {
    const words = message.trim().split(/\s+/);
    const shortTitle = words.slice(0, 3).join(" "); // 1–3 words
    const session = sessions.find((s) => s.id === sessId);
    if (session) {
      session.title = shortTitle || "New chat";
    }
  }

  // 2. Get mock structured response
  const { response, table } = getTableResponse(message);

  // 3. Add assistant message to history
  sessionHistories[sessId].push({ role: "assistant", text: response });

  // 4. Send response back to frontend
  res.json({ response, table });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
