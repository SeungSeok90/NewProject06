const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// 모든 사용자 조회
router.get('/users', adminController.getUsers);

module.exports = router;
