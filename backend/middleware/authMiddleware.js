const jwt = require('jsonwebtoken');
const db = require('../db');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const [rows] = await db.execute('SELECT id, name, email FROM users WHERE id = ?', [decoded.id]);
            if (rows.length === 0) {
                return res.status(401).json({ message: 'User not found' });
            }

            req.user = rows[0];
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = protect;
