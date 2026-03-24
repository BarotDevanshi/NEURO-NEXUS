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

    // 🔥 Calculate dopamine level
    let dopamineLevel = 50; // base level
    dopamineLevel += (completionRate / 100) * 30; // completion rate (0-30)
    const streakBonus = Math.min(progress.streak * 2, 20); // streak (0-20)
    dopamineLevel += streakBonus;
    const taskBonus = Math.min(total / 10, 10); // tasks (0-10)
    dopamineLevel += taskBonus;
    dopamineLevel += 10; // recent activity bonus
    progress.dopamineLevel = Math.min(Math.round(dopamineLevel), 100);

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
                userId: req.user.id,
                dopamineLevel: 50 // default starting level
            });
        }

        // 🔥 Calculate dopamine level based on activity
        let dopamineLevel = 50; // base level

        // Completion rate contribution (0-30 points)
        dopamineLevel += (progress.completionRate / 100) * 30;

        // Streak contribution (0-20 points)
        const streakBonus = Math.min(progress.streak * 2, 20);
        dopamineLevel += streakBonus;

        // Total tasks contribution (0-10 points)
        const taskBonus = Math.min(progress.totalTasks / 10, 10);
        dopamineLevel += taskBonus;

        // Recent activity bonus (0-10 points)
        if (progress.lastCompletedDate) {
            const daysSinceLastActivity = Math.floor(
                (new Date() - new Date(progress.lastCompletedDate)) / (1000 * 60 * 60 * 24)
            );
            if (daysSinceLastActivity <= 1) {
                dopamineLevel += 10;
            } else if (daysSinceLastActivity <= 3) {
                dopamineLevel += 5;
            }
        }

        // Cap at 100
        dopamineLevel = Math.min(Math.round(dopamineLevel), 100);

        // Update the dopamine level in database
        progress.dopamineLevel = dopamineLevel;
        await progress.save();

        res.json({ success: true, data: progress });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};