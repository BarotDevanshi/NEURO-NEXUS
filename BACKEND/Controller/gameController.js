const Game = require("../Model/Game");
const Progress = require("../Model/Progress");

// 🎮 SAVE GAME SESSION
exports.saveGameSession = async (req, res) => {
    try {
        const { gameType, score, duration, completed, metadata, userId } = req.body;

        // For now, use a default userId if not provided (since no auth)
        const finalUserId = userId || "default_user";

        // Save game session
        const gameSession = await Game.create({
            userId: finalUserId,
            gameType,
            score: score || 0,
            duration: duration || 0,
            completed: completed || false,
            metadata: metadata || {}
        });

        // Update progress with game activity (small dopamine boost)
        let progress = await Progress.findOne({ userId: finalUserId });
        if (!progress) {
            progress = new Progress({ userId: finalUserId, dopamineLevel: 50 });
        }

        // Small dopamine boost for completing games
        let dopamineBoost = 0;
        if (completed) {
            dopamineBoost = gameType === "breathing" ? 3 :
                           gameType === "memory" ? 5 :
                           gameType === "focus" ? 4 : 2;
        }

        progress.dopamineLevel = Math.min(progress.dopamineLevel + dopamineBoost, 100);
        await progress.save();

        res.json({
            success: true,
            data: gameSession,
            dopamineBoost
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 📊 GET GAME STATISTICS
exports.getGameStats = async (req, res) => {
    try {
        const { userId } = req.query;
        const finalUserId = userId || "default_user";
        const { gameType } = req.query;

        let matchCondition = { userId: finalUserId };
        if (gameType) {
            matchCondition.gameType = gameType;
        }

        // Get overall stats
        const totalGames = await Game.countDocuments(matchCondition);
        const completedGames = await Game.countDocuments({
            ...matchCondition,
            completed: true
        });

        // Get best scores
        const bestScores = await Game.aggregate([
            { $match: matchCondition },
            {
                $group: {
                    _id: "$gameType",
                    bestScore: { $max: "$score" },
                    totalScore: { $sum: "$score" },
                    avgScore: { $avg: "$score" },
                    gamesPlayed: { $sum: 1 },
                    totalDuration: { $sum: "$duration" }
                }
            }
        ]);

        // Get recent games
        const recentGames = await Game.find(matchCondition)
            .sort({ createdAt: -1 })
            .limit(10);

        res.json({
            success: true,
            data: {
                totalGames,
                completedGames,
                completionRate: totalGames > 0 ? (completedGames / totalGames) * 100 : 0,
                bestScores,
                recentGames
            }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 🏆 GET LEADERBOARD (user's own best scores)
exports.getLeaderboard = async (req, res) => {
    try {
        const { userId } = req.query;
        const finalUserId = userId || "default_user";

        const leaderboard = await Game.aggregate([
            { $match: { userId: finalUserId } },
            {
                $group: {
                    _id: "$gameType",
                    bestScore: { $max: "$score" },
                    bestTime: { $min: "$duration" },
                    gamesPlayed: { $sum: 1 },
                    lastPlayed: { $max: "$createdAt" }
                }
            },
            {
                $project: {
                    gameType: "$_id",
                    bestScore: 1,
                    bestTime: 1,
                    gamesPlayed: 1,
                    lastPlayed: 1
                }
            },
            { $sort: { bestScore: -1 } }
        ]);

        res.json({ success: true, data: leaderboard });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 🎯 GET GAME ACHIEVEMENTS
exports.getAchievements = async (req, res) => {
    try {
        const { userId } = req.query;
        const finalUserId = userId || "default_user";

        const achievements = [];

        // Breathing achievements
        const breathingGames = await Game.countDocuments({
            userId: finalUserId,
            gameType: "breathing",
            completed: true
        });

        if (breathingGames >= 1) achievements.push("First Breath");
        if (breathingGames >= 5) achievements.push("Mindful Breather");
        if (breathingGames >= 10) achievements.push("Zen Master");

        // Memory achievements
        const memoryGames = await Game.find({
            userId: finalUserId,
            gameType: "memory",
            completed: true
        });

        const perfectMemory = memoryGames.filter(g => g.score === 100).length;
        if (perfectMemory >= 1) achievements.push("Perfect Memory");
        if (perfectMemory >= 3) achievements.push("Memory Champion");

        // Focus achievements
        const focusGames = await Game.find({
            userId: finalUserId,
            gameType: "focus"
        });

        const highScores = focusGames.filter(g => g.score >= 50).length;
        if (highScores >= 1) achievements.push("Focused Mind");
        if (highScores >= 5) achievements.push("Concentration Master");

        res.json({ success: true, data: achievements });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};