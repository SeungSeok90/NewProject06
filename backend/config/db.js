const mysql = require('mysql2');
const dotenv = require('dotenv');

// 환경 변수 설정 파일 로드
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
        return;
    }
    if (connection) connection.release();
    console.log('MySQL에 성공적으로 연결되었습니다.');
});

module.exports = pool.promise();
