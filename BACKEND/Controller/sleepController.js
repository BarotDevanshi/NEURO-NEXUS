const Sleep = require("../Model/Sleep");

// ➤ Add Sleep Data
exports.addSleep = async (req, res) => {
    try {
        const { sleepTime, wakeTime, quality } = req.body;

        // duration calculate
        const duration =
            (new Date(wakeTime) - new Date(sleepTime)) / (1000 * 60 * 60);

        const sleep = await Sleep.create({
            userId: req.user.id,
            sleepTime,
            wakeTime,
            duration,
            quality
        });

        res.json({ success: true, data: sleep });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// ➤ Get Sleep History
exports.getSleep = async (req, res) => {
    try {
        const sleepData = await Sleep.find({ userId: req.user.id })
            .sort({ createdAt: -1 });

        res.json({ success: true, data: sleepData });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// ➤ Update Sleep
exports.updateSleep = async (req, res) => {
    try {
        const { sleepTime, wakeTime } = req.body;

        let duration;
        if (sleepTime && wakeTime) {
            duration =
                (new Date(wakeTime) - new Date(sleepTime)) /
                (1000 * 60 * 60);
        }

        const updated = await Sleep.findByIdAndUpdate(
            req.params.id,
            { ...req.body, duration },
            { new: true }
        );

        res.json({ success: true, data: updated });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// ➤ Delete Sleep Entry
exports.deleteSleep = async (req, res) => {
    try {
        await Sleep.findByIdAndDelete(req.params.id);

        res.json({ success: true, message: "Sleep record deleted" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};