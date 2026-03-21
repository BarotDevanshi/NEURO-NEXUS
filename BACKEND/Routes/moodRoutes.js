const express = require("express");
const router = express.Router();

const {
    addMood,
    getMoods,
    deleteMood
} = require("../Controller/moodController");

const auth = require("../Middleware/authMiddleware");

// Add mood
router.post("/", auth, addMood);

// Get moods
router.get("/", auth, getMoods);

// Delete mood
router.delete("/:id", auth, deleteMood);

module.exports = router;