const Complaint = require('../models/Complaint');
const path = require('path');
const fs = require('fs');

// @desc    Get all complaints (Citizen: own, Admin: all)
// @route   GET /api/complaints
// @access  Private
exports.getComplaints = async (req, res, next) => {
    try {
        let query;

        if (req.user.role !== 'admin') {
            query = Complaint.find({ user: req.user.id });
        } else {
            query = Complaint.find();
        }

        const complaints = await query.sort('-createdAt');

        res.status(200).json({
            success: true,
            count: complaints.length,
            data: complaints
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get single complaint
// @route   GET /api/complaints/:id
// @access  Private
exports.getComplaint = async (req, res, next) => {
    try {
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ success: false, error: 'Complaint not found' });
        }

        // Make sure user is complaint owner or admin
        if (complaint.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, error: 'Not authorized to view this complaint' });
        }

        res.status(200).json({
            success: true,
            data: complaint
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Create new complaint
// @route   POST /api/complaints
// @access  Private
exports.createComplaint = async (req, res, next) => {
    try {
        // Add user to req.body
        req.body.user = req.user.id;

        // Handle file uploads (mock for now, assume URLs are passed or handled by middleware)
        // In a real scenario, we would process req.files here and upload to S3

        const complaint = await Complaint.create(req.body);

        res.status(201).json({
            success: true,
            data: complaint
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update complaint status (Admin only)
// @route   PUT /api/complaints/:id
// @access  Private (Admin)
exports.updateComplaint = async (req, res, next) => {
    try {
        let complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ success: false, error: 'Complaint not found' });
        }

        // Make sure user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, error: 'Not authorized to update this complaint' });
        }

        complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: complaint
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
