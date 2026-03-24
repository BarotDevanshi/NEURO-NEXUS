const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.Mixed, // Allow both ObjectId and String
        required: true
    },

    gameType: {
        type: String,
        enum: ["breathing", "memory", "focus", "patterns"],
        required: true
    },

    score: {
        type: Number,
        default: 0
    },

    duration: {
        type: Number, // in seconds
        default: 0
    },

    completed: {
        type: Boolean,
        default: false
    },

    metadata: {
        type: mongoose.Schema.Types.Mixed, // Store game-specific data
        default: {}
    }

}, { timestamps: true });

// Index for efficient queries
gameSchema.index({ userId: 1, gameType: 1, createdAt: -1 });

module.exports = mongoose.model("Game", gameSchema);