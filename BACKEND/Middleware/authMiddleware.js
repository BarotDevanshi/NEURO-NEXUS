// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//     try {
//         const token = req.headers.authorization;

//         if (!token) return res.status(401).json("No token");

//         const decoded = jwt.verify(token, "secret");

//         req.user = decoded;

//         next();
//     } catch (err) {
//         res.status(401).json("Invalid token");
//     }
// // };
// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//     try {
//         let token = req.headers.authorization;

//         if (!token) {
//             return res.status(401).json({ message: "No token" });
//         }

//         // 🔥 Bearer remove kar
//         if (token.startsWith("Bearer ")) {
//             token = token.split(" ")[1];
//         }

//         const decoded = jwt.verify(token, "secret");

//         req.user = decoded;

//         next();

//     } catch (err) {
//         return res.status(401).json({ message: "Invalid token" });
//     }
// };
// module.exports = (req, res, next) => {
// req.user = { id: "507f1f77bcf86cd799439011" };// fake user
//     next();
// };
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "No token" });
        }

        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }

        const decoded = jwt.verify(token, "secret");

        req.user = decoded;

        next();

    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};