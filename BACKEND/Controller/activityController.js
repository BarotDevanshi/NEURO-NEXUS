const Activity = require("../Model/Activity");
const Task = require("../Model/Task");
const Mood = require("../Model/Mood");
const Sleep = require("../Model/Sleep");


// 💬 CHATBOT (with mood detection)
exports.chat = async (req, res) => {
    try {
        const { message } = req.body;
        const userId = req.user.id;

        let response = "I'm here for you 💙";
        let detectedMood = null;

        const msg = message.toLowerCase();

        if (msg.includes("sad") || msg.includes("low")) {
            detectedMood = "sad";
            response = "I understand 💛 try something you enjoy";
        } 
        else if (msg.includes("stress") || msg.includes("tension")) {
            detectedMood = "stressed";
            response = "Take a deep breath 🧘 start small";
        } 
        else if (msg.includes("happy")) {
            detectedMood = "happy";
            response = "Great! Use this energy 🚀";
        }

        // save mood from chat
        if (detectedMood) {
            await Mood.create({
                userId,
                mood: detectedMood,
                note: "Detected from chat"
            });
        }

        // save chat
        await Activity.create({
            userId,
            type: "chat",
            message,
            response
        });

        res.json({ success: true, response });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// 🤖 AI RECOMMENDATION (smart logic)
exports.getRecommendation = async (req, res) => {
    try {
        const userId = req.user.id;

        const mood = await Mood.findOne({ userId }).sort({ createdAt: -1 });
        const sleep = await Sleep.findOne({ userId }).sort({ createdAt: -1 });

        const tasks = await Task.find({
            userId,
            status: "pending",
            parentTask: null
        });

        let suggestion = "";

        if (!mood) {
            suggestion = "Please log your mood first 😊";
        } 
        else if (mood.mood === "stressed") {
            const smallTask = tasks.find(t => t.priority === "low");

            suggestion = smallTask
                ? `You are stressed 😟 start with: ${smallTask.title}`
                : "You are stressed 😟 take a break 🧘";
        } 
        else if (mood.mood === "sad") {
            suggestion = "Do something relaxing 🎵 then continue";
        } 
        else if (sleep && sleep.duration < 5) {
            suggestion = "Low sleep 😴 do light work today";
        } 
        else if (tasks.length > 0) {
            const high = tasks.find(t => t.priority === "high");

            suggestion = high
                ? `Mood is ${mood.mood} 😊 Focus on: ${high.title}`
                : `Mood is ${mood.mood} 👍 Start any task`;
        } 
        else {
            suggestion = "All tasks done 🎉 relax!";
        }

        // save recommendation
        await Activity.create({
            userId,
            type: "recommendation",
            message: `Mood: ${mood?.mood}`,
            response: suggestion
        });

        // save log
        await Activity.create({
            userId,
            type: "log",
            message: "AI recommendation generated"
        });

        res.json({ success: true, suggestion });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// 📥 CHAT HISTORY
exports.getChatHistory = async (req, res) => {
    const data = await Activity.find({
        userId: req.user.id,
        type: "chat"
    }).sort({ createdAt: -1 });

    res.json({ success: true, data });
};



// 📥 RECOMMENDATION HISTORY
exports.getRecommendations = async (req, res) => {
    const data = await Activity.find({
        userId: req.user.id,
        type: "recommendation"
    }).sort({ createdAt: -1 });

    res.json({ success: true, data });
};



// 📜 LOGS (optional)
exports.getLogs = async (req, res) => {
    const data = await Activity.find({
        userId: req.user.id,
        type: "log"
    }).sort({ createdAt: -1 });

    res.json({ success: true, data });
};