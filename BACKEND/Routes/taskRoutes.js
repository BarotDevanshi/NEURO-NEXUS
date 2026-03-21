const express = require("express");
const router = express.Router();

const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require("../Controller/taskController");

const auth = require("../Middleware/authMiddleware");

// Create
router.post("/", auth, createTask);

// Read
router.get("/", auth, getTasks);

// Update
router.put("/:id", auth, updateTask);

// Delete
router.delete("/:id", auth, deleteTask);

module.exports = router;