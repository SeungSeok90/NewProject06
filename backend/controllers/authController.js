const db = require('../config/db');

// 회원 가입
exports.register = (req, res) => {
    const { name, email, phone, company, department, position, consent } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }

    const query = 'INSERT INTO users (name, email, phone, company, department, position, consent) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, email, phone, company, department, position, consent], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error" });
        }
        res.status(201).json({ message: "Registration successful" });
    });
};

// 로그인
exports.login = (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }

    const query = 'SELECT * FROM users WHERE email = ? AND name = ?';
    db.query(query, [email, name], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error" });
        }

        if (results.length > 0) {
            res.status(200).json({ message: "Login successful", user: results[0] });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    });
};
