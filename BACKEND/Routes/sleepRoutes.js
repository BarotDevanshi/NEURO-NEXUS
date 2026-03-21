const express = require("express");
const router = express.Router();

const {
    addSleep,
    getSleep,
    updateSleep,
    deleteSleep
} = require("../Controller/sleepController");

const auth = require("../Middleware/authMiddleware");

// Add
router.post("/", auth, addSleep);

// Get
router.get("/", auth, getSleep);

// Update
router.put("/:id", auth, updateSleep);

// Delete
router.delete("/:id", auth, deleteSleep);

module.exports = router;