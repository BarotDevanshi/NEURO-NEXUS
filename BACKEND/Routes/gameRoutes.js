const express = require("express");
const router = express.Router();
const gameController = require("../Controller/gameController");

// 🎮 SAVE GAME SESSION
router.post("/session", gameController.saveGameSession);

// 📊 GET GAME STATISTICS
router.get("/stats", gameController.getGameStats);

// 🏆 GET LEADERBOARD
router.get("/leaderboard", gameController.getLeaderboard);

// 🎯 GET ACHIEVEMENTS
router.get("/achievements", gameController.getAchievements);

module.exports = router;