const express = require('express');
const { getBroadcasts, createBroadcast } = require('../controllers/broadcast.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router
    .route('/')
    .get(getBroadcasts)
    .post(authorize('admin'), createBroadcast);

module.exports = router;
