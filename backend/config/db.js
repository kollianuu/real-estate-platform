const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Madhavareddy@0303',  // Change to your MySQL password
    database: 'real_estate_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected');
});

module.exports = db;
