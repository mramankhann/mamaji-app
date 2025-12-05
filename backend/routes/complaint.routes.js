const express = require('express');
const {
    getComplaints,
    getComplaint,
    createComplaint,
    updateComplaint
} = require('../controllers/complaint.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router
    .route('/')
    .get(getComplaints)
    .post(createComplaint);

router
    .route('/:id')
    .get(getComplaint)
    .put(authorize('admin'), updateComplaint);

module.exports = router;
