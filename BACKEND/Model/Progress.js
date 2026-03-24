const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.Mixed, // Allow both ObjectId and String
        required: true,
        unique: true
    },

    totalTasks: {
        type: Number,
        default: 0
    },

    completedTasks: {
        type: Number,
        default: 0
    },

    pendingTasks: {
        type: Number,
        default: 0
    },

    completionRate: {
        type: Number,
        default: 0
    },

    streak: {
        type: Number,
        default: 0
    },

    lastCompletedDate: {
        type: Date
    },

    dopamineLevel: {
        type: Number,
        default: 50,
        min: 0,
        max: 100
    }

}, { timestamps: true });

module.exports = mongoose.model("Progress", progressSchema);