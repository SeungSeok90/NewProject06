// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 사용자 등록 API (POST 요청)
router.post('/users', (req, res) => {
    const { name, email, phone, company, department, position, consent } = req.body;
    const query = 'INSERT INTO users (name, email, phone, company, department, position, consent) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, email, phone, company, department, position, consent], (err, result) => {
        if (err) {
            console.error('Database insert error:', err);
            return res.status(500).json({ message: 'Database insert error' });
        }
        res.status(201).json({ message: 'User registered successfully', id: result.insertId });
    });
});

// 사용자 로그인 API (POST 요청)
router.post('/login', (req, res) => {
    const { email, name } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND name = ?';

    db.query(query, [email, name], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database query error' });
        }

        if (results.length > 0) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});


// 다른 API 엔드포인트도 여기에 추가할 수 있습니다

module.exports = router;
