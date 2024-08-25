const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
const registerRoutes = require('./routes/register');

// 환경 변수 설정 파일 로드
dotenv.config();

const app = express();

// 미들웨어 설정
app.use(express.json()); // JSON 요청 본문 처리
app.use(express.urlencoded({ extended: true })); // URL-encoded 요청 본문 처리
app.use(cors()); // CORS 허용
app.use(helmet()); // 보안 관련 HTTP 헤더 설정
app.use(morgan('dev')); // 요청 로그

// 라우트 설정
app.use('/api/auth', authRoutes);
app.use('/api/register', registerRoutes);

// 404 에러 핸들링
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// 서버 에러 핸들링
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server error' });
});

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
