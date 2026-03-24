const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🔹 Register
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check user
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // 🔥 Generate token for auto-login after register
        const token = jwt.sign(
            { id: user._id },
            "secret",
            { expiresIn: "1d" }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

// 🔹 Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Wrong password" });

        // 🔥 TOKEN GENERATE
        const token = jwt.sign(
            { id: user._id },
            "secret",
            { expiresIn: "1d" }
        );

        // 🔥 Return token AND user (without password)
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};