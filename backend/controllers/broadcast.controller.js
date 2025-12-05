const Broadcast = require('../models/Broadcast');

// @desc    Get all broadcasts
// @route   GET /api/broadcasts
// @access  Private
exports.getBroadcasts = async (req, res, next) => {
    try {
        const broadcasts = await Broadcast.find().sort('-createdAt');

        res.status(200).json({
            success: true,
            count: broadcasts.length,
            data: broadcasts
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Create broadcast (Admin only)
// @route   POST /api/broadcasts
// @access  Private (Admin)
exports.createBroadcast = async (req, res, next) => {
    try {
        const broadcast = await Broadcast.create(req.body);

        // TODO: Send push notification to all users

        res.status(201).json({
            success: true,
            data: broadcast
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
