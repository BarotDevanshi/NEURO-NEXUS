const express = require("express");
const router = express.Router();

const { getProgress } = require("../Controller/progressController");
const auth = require("../Middleware/authMiddleware");

// Get progress
router.get("/", auth, getProgress);

module.exports = router;