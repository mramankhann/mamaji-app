const express = require('express');
const { getEvents, createEvent } = require('../controllers/event.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router
    .route('/')
    .get(getEvents)
    .post(authorize('admin'), createEvent);

module.exports = router;
