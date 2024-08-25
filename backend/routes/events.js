const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/', eventController.getEvents);
// 추가적인 이벤트 관련 라우팅

module.exports = router;
