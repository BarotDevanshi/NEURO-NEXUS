const Activity = require("../Model/Activity");
const Task = require("../Model/Task");
const Mood = require("../Model/Mood");
const Sleep = require("../Model/Sleep");


// 💬 ENHANCED FRIENDLY CHATBOT WITH IMPROVED ACCURACY
exports.chat = async (req, res) => {
    try {
        const { message } = req.body;
        const userId = req.user.id;
        const msg = message.toLowerCase().trim();

        let response = "";
        let detectedMood = null;
        let detectedTask = null;
        let conversationContext = null;

        // Get recent chat history for context (last 3 messages)
        const recentChats = await Activity.find({
            userId,
            type: "chat"
        }).sort({ createdAt: -1 }).limit(3);

        // PRIORITY ORDER: Most specific to general patterns

        // 1. Task-related commands (most specific)
        if ((msg.includes("add") || msg.includes("create") || msg.includes("new")) &&
            (msg.includes("task") || msg.includes("todo") || msg.includes("item"))) {
            const taskMatch = msg.match(/(?:add|create|new)\s+(?:a\s+)?(?:task|todo|item)?\s*(.+?)(?:\s|$)/i);
            if (taskMatch && taskMatch[1].trim()) {
                detectedTask = taskMatch[1].trim();
                response = `Got it! I'll help you remember to "${detectedTask}". Want me to add this to your task list right now, or would you like to set a priority or deadline for it?`;
            } else {
                response = "I'd love to help you add a task! What task would you like to add? Just tell me what it is.";
            }
        }
        // 2. Direct mood expressions
        else if (msg.includes("i feel") || msg.includes("i'm feeling") || msg.includes("i am feeling")) {
            if (msg.includes("happy") || msg.includes("great") || msg.includes("good") || msg.includes("awesome") || msg.includes("excited")) {
                response = "That's wonderful to hear! 🎉 When you're feeling good, it's the perfect time to make progress on your goals. Want me to help you prioritize your tasks or suggest something productive to do with this positive energy?";
                detectedMood = "happy";
            }
            else if (msg.includes("sad") || msg.includes("depressed") || msg.includes("unhappy") || msg.includes("down")) {
                response = "I'm really sorry you're feeling sad 💙. It's completely okay to have tough days. Would you like to talk about what's making you feel this way? Sometimes sharing helps, and I can suggest some gentle activities that might help lift your spirits.";
                detectedMood = "sad";
                conversationContext = "asking_about_sadness";
            }
            else if (msg.includes("stressed") || msg.includes("overwhelmed") || msg.includes("anxious") || msg.includes("worried")) {
                response = "Stress can be really tough to handle 😟. Let's break this down - what's causing you the most stress right now? We can tackle it together, maybe by breaking big tasks into smaller steps or finding some relaxation techniques.";
                detectedMood = "stressed";
                conversationContext = "asking_about_stress";
            }
            else if (msg.includes("tired") || msg.includes("exhausted") || msg.includes("sleepy") || msg.includes("fatigued")) {
                response = "I hear you - feeling tired can really affect everything 😴. Have you been getting enough sleep lately? Maybe we can look at your sleep patterns or find some quick ways to recharge your energy.";
                detectedMood = "tired";
            }
            else if (msg.includes("angry") || msg.includes("frustrated") || msg.includes("irritated")) {
                response = "I can sense some frustration there 😤. It's normal to feel angry sometimes. Want to talk about what's bothering you? Sometimes venting helps, and I can help you find constructive ways to deal with it.";
                detectedMood = "angry";
                conversationContext = "asking_about_frustration";
            }
            else {
                response = "Thanks for sharing how you're feeling! 🌈 It's really helpful for me to understand your current state. Is there anything specific you'd like help with today, or would you like to talk more about your feelings?";
                conversationContext = "asking_about_feelings";
            }
        }
        // 3. Problem statements
        else if (msg.includes("not feeling good") || msg.includes("feeling bad") || msg.includes("don't feel good")) {
            response = "I'm sorry to hear you're not feeling good 💙. Can you tell me more about what's bothering you? Sometimes talking about it helps, and I can also suggest some activities that might lift your mood.";
            conversationContext = "asking_about_feelings";
        }
        // 4. Task discussions (general)
        else if (msg.includes("task") || msg.includes("work") || msg.includes("todo") || msg.includes("assignment")) {
            response = "Tasks can be overwhelming sometimes! 📝 What are you working on right now? I can help you break it down, set priorities, or just provide some motivation to get started.";
        }
        // 5. Mood inquiries
        else if (msg.includes("mood") || msg.includes("feeling") || msg.includes("emotion")) {
            response = "Talking about our feelings is so important! 🌈 How are you feeling right now? You can tell me anything - happy, sad, stressed, excited, tired... I'm here to listen and help however I can.";
            conversationContext = "asking_about_mood";
        }
        // 6. Greetings
        else if (msg === "hi" || msg === "hello" || msg === "hey" || msg === "hi there") {
            response = "Hey there! 👋 How are you feeling today? I'm here to chat and help you stay on track with your goals!";
        }
        else if (msg.includes("how are you") || msg.includes("how's it going") || msg.includes("how do you do")) {
            response = "I'm doing great, thanks for asking! 😊 I'm here and ready to help you with whatever you need - whether it's tracking your mood, managing tasks, or just having a friendly chat. What's on your mind?";
        }
        // 7. Gratitude
        else if (msg.includes("thank") || msg.includes("thanks") || msg.includes("appreciate")) {
            response = "You're so welcome! 😊 I'm always here whenever you need someone to talk to or help with your goals. Don't hesitate to reach out anytime!";
        }
        // 8. Goodbyes
        else if (msg.includes("bye") || msg.includes("goodbye") || msg.includes("see you") || msg.includes("talk later")) {
            response = "Take care! 💙 Remember, I'm here whenever you need me. Have a great day!";
        }
        // 9. Help requests
        else if (msg.includes("help") || msg.includes("what can you do") || msg.includes("assist")) {
            response = "I'm here to be your friendly companion! 💬 I can help you:\n\n• Track and discuss your mood\n• Manage and organize your tasks\n• Chat about anything on your mind\n• Provide personalized suggestions\n• Help you stay motivated\n\nWhat would you like to talk about or work on today?";
        }
        // 10. Default responses for unrecognized input
        else {
            // More contextual default responses
            const contextualResponses = [
                "That's interesting! Tell me more about that 💭",
                "I hear you! How does that make you feel? 💙",
                "Thanks for sharing that with me. What's been on your mind lately? 🤔",
                "I appreciate you opening up to me! Is there anything specific you'd like help with? 🌟",
                "That sounds important to you. Want to explore that a bit more? 💭",
                "I'm here to listen! What's something you'd like to talk about or work on? 🌈"
            ];
            response = contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
        }

        // IMPROVED MOOD DETECTION - More accurate and contextual
        if (detectedMood) {
            // Only save mood if it's clearly expressed and not contradictory
            const moodKeywords = {
                happy: ['happy', 'great', 'good', 'awesome', 'excited', 'joyful', 'pleased'],
                sad: ['sad', 'depressed', 'unhappy', 'down', 'blue', 'heartbroken', 'disappointed'],
                stressed: ['stressed', 'overwhelmed', 'anxious', 'worried', 'tense', 'pressured'],
                tired: ['tired', 'exhausted', 'sleepy', 'fatigued', 'drained', 'weary'],
                angry: ['angry', 'frustrated', 'irritated', 'annoyed', 'mad', 'furious']
            };

            // Verify the mood detection is accurate by checking if mood keywords appear
            const moodWords = moodKeywords[detectedMood] || [];
            const hasMoodKeywords = moodWords.some(word => msg.includes(word));

            if (hasMoodKeywords) {
                await Mood.create({
                    userId,
                    mood: detectedMood,
                    note: `Detected from chat: "${message}"`
                });
            }
        }

        // IMPROVED TASK DETECTION - More accurate extraction
        if (detectedTask) {
            // Clean up the task text and ensure it's meaningful
            detectedTask = detectedTask.replace(/[^\w\s-]/g, '').trim();

            if (detectedTask.length > 2 && detectedTask.length < 200) {
                await Task.create({
                    userId,
                    title: detectedTask,
                    status: "pending",
                    priority: "medium",
                    description: "Added from chat conversation"
                });
            }
        }

        // Save conversation context for follow-up
        if (conversationContext) {
            await Activity.create({
                userId,
                type: "chat_context",
                message: conversationContext,
                response: "active"
            });
        }

        // Save user message to database
        await Activity.create({
            userId,
            type: "chat",
            message: message,
            response: null // User messages don't have AI responses yet
        });

        // Save AI response to database
        await Activity.create({
            userId,
            type: "chat",
            message: null, // AI responses don't have user messages
            response: response
        });

        res.json({
            success: true,
            data: {
                id: Date.now().toString(),
                text: response,
                sender: 'ai',
                timestamp: new Date().toISOString(),
                context: conversationContext
            }
        });

    } catch (err) {
        console.error('Chat error:', err);
        res.status(500).json({
            error: err.message,
            data: {
                id: Date.now().toString(),
                text: "I'm having a little trouble right now, but I'm still here for you! 💙 Try again in a moment.",
                sender: 'ai',
                timestamp: new Date().toISOString()
            }
        });
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
    try {
        const chats = await Activity.find({
            userId: req.user.id,
            type: "chat"
        }).sort({ createdAt: 1 }).limit(100); // Sort by oldest first, increase limit for more messages

        const formattedChats = [];

        chats.forEach(chat => {
            if (chat.message) {
                // This is a user message
                formattedChats.push({
                    id: chat._id.toString() + '_user',
                    text: chat.message,
                    sender: 'user',
                    timestamp: chat.createdAt.toISOString()
                });
            } else if (chat.response) {
                // This is an AI response
                formattedChats.push({
                    id: chat._id.toString() + '_ai',
                    text: chat.response,
                    sender: 'ai',
                    timestamp: chat.createdAt.toISOString()
                });
            }
        });

        res.json({ success: true, data: formattedChats });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
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