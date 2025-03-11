const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);
const propertyRoutes = require("./routes/properties");
app.use("/properties", propertyRoutes);

// API: Get all properties
app.get('/properties', (req, res) => {
    db.query('SELECT * FROM properties', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

// Start Server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
