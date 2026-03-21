const Progress = require("../Model/Progress");
const Task = require("../Model/Task");


// 🔄 UPDATE PROGRESS (internal use)
exports.updateProgress = async (userId) => {
    const total = await Task.countDocuments({ userId });
    const completed = await Task.countDocuments({
        userId,
        status: "completed"
    });

    const pending = total - completed;

    const completionRate = total > 0
        ? (completed / total) * 100
        : 0;

    let progress = await Progress.findOne({ userId });

    if (!progress) {
        progress = new Progress({ userId });
    }

    // 🔥 STREAK LOGIC
    const today = new Date().toDateString();

    if (progress.lastCompletedDate) {
        const last = new Date(progress.lastCompletedDate).toDateString();

        if (last === today) {
            // same day → no change
        } else {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            if (new Date(progress.lastCompletedDate).toDateString() === yesterday.toDateString()) {
                progress.streak += 1;
            } else {
                progress.streak = 1;
            }
        }
    } else {
        progress.streak = 1;
    }

    progress.lastCompletedDate = new Date();

    progress.totalTasks = total;
    progress.completedTasks = completed;
    progress.pendingTasks = pending;
    progress.completionRate = completionRate;

    await progress.save();
};



// 📥 GET PROGRESS
exports.getProgress = async (req, res) => {
    try {
        let progress = await Progress.findOne({
            userId: req.user.id
        });

        // agar nahi hai to create
        if (!progress) {
            progress = await Progress.create({
                userId: req.user.id
            });
        }

        res.json({ success: true, data: progress });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};