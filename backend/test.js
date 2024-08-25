const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // MySQL 연결 파일
const app = express();

app.use(cors());
app.use(express.json());

// 1. 데이터 조회 (READ)
app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database query error' });
        }
        res.status(200).json(results);
    });
});

// 2. 데이터 입력 (CREATE)
app.post('/api/users', (req, res) => {
    const { name, email, phone, company, department, position, consent } = req.body;
    const query = 'INSERT INTO users (name, email, phone, company, department, position, consent) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, email, phone, company, department, position, consent], (err, result) => {
        if (err) {
            console.error('Database insert error:', err);
            return res.status(500).json({ message: 'Database insert error' });
        }
        res.status(201).json({ message: 'User added successfully', id: result.insertId });
    });
});

// 3. 데이터 수정 (UPDATE)
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone, company, department, position, consent } = req.body;
    const query = 'UPDATE users SET name = ?, email = ?, phone = ?, company = ?, department = ?, position = ?, consent = ? WHERE id = ?';
    db.query(query, [name, email, phone, company, department, position, consent, id], (err, result) => {
        if (err) {
            console.error('Database update error:', err);
            return res.status(500).json({ message: 'Database update error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully' });
    });
});

// 4. 데이터 삭제 (DELETE)
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Database delete error:', err);
            return res.status(500).json({ message: 'Database delete error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    });
});

// 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
