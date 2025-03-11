const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const db = require("../config/db");

const router = express.Router();
const SECRET_KEY = "your_secret_key"; // Change this in production

// REGISTER USER
router.post(
    "/register",
    [
        body("name").notEmpty(),
        body("email").isEmail(),
        body("password").isLength({ min: 6 }),
        body("role").isIn(["buyer", "seller", "agent"]),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, role } = req.body;

        try {
            // Check if user exists
            db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
                if (result.length > 0) {
                    return res.status(400).json({ error: "Email already exists" });
                }

                // Hash password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Insert user
                db.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
                    [name, email, hashedPassword, role], (err, result) => {
                        if (err) return res.status(500).json({ error: err.message });
                        res.json({ message: "User registered successfully!" });
                    }
                );
            });
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    }
);

// LOGIN USER
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
        if (result.length === 0) return res.status(400).json({ error: "Invalid email or password" });

        const user = result[0];

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

        // Generate JWT token
        const token = jwt.sign({ user_id: user.user_id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ message: "Login successful", token, user_id: user.user_id, role: user.role });
    });
});

module.exports = router;
