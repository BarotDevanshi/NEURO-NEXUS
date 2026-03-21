const express = require("express");
const router = express.Router();

const {
    chat,
    getRecommendation,
    getChatHistory,
    getRecommendations,
    getLogs
} = require("../Controller/activityController");

const auth = require("../Middleware/authMiddleware");

// Chat
router.post("/chat", auth, chat);

// AI Suggestion
router.post("/recommend", auth, getRecommendation);

// History
router.get("/chat", auth, getChatHistory);
router.get("/recommend", auth, getRecommendations);

// Logs
router.get("/logs", auth, getLogs);

module.exports = router;