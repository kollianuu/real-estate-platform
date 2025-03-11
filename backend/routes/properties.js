const express = require("express");
const db = require("../config/db");
const router = express.Router();

// ADD PROPERTY
router.post("/add", (req, res) => {
    const { user_id, title, description, price, location, property_type, image_url } = req.body;

    db.query(
        "INSERT INTO properties (user_id, title, description, price, location, property_type, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [user_id, title, description, price, location, property_type, image_url],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Property added successfully!" });
        }
    );
});

module.exports = router;
