const express = require('express');
const { login, verifyOTP, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/login', login);
router.post('/verify', verifyOTP);
router.get('/me', protect, getMe);

module.exports = router;
