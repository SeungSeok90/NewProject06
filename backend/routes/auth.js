const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, name } = req.body;

    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ? AND name = ?', [email, name]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or name' });
        }

        const user = rows[0];

        // JWT 토큰 생성
        const token = jwt.sign(
            { id: user.id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // 클라이언트에 사용자 정보와 토큰 반환
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: token,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
