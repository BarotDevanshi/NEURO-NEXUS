const Task = require("../Model/Task");
const { updateProgress } = require("./progressController");

// ➤ Create Task / Subtask
exports.createTask = async (req, res) => {
    try {
        const task = await Task.create({
            userId: req.user.id,
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            parentTask: req.body.parentTask || null
        });

        res.json({ success: true, data: task });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// ➤ Get All Tasks (with subtasks)
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });

        res.json({ success: true, data: tasks });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// ➤ Update Task (status / title / priority)
exports.updateTask = async (req, res) => {
    try {
        // 🔥 SECURITY: Only update tasks owned by current user
        const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
        if (!task) {
            return res.status(404).json({ message: "Task not found or access denied" });
        }

        const updated = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        // 🔥 IMPORTANT LINE
        if (req.body.status === "completed") {
            await updateProgress(req.user.id);
        }

        res.json({ success: true, data: updated });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// ➤ Delete Task (and its subtasks)
exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        // 🔥 SECURITY: Check if task belongs to current user
        const task = await Task.findOne({ _id: taskId, userId: req.user.id });
        if (!task) {
            return res.status(404).json({ message: "Task not found or access denied" });
        }

        // delete main task
        await Task.findByIdAndDelete(taskId);

        // delete subtasks (also check user ownership)
        await Task.deleteMany({ parentTask: taskId, userId: req.user.id });

        res.json({ success: true, message: "Task deleted" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};