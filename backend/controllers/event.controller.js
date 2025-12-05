const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
// @access  Private
exports.getEvents = async (req, res, next) => {
    try {
        const events = await Event.find().sort('date');

        res.status(200).json({
            success: true,
            count: events.length,
            data: events
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Create event (Admin only)
// @route   POST /api/events
// @access  Private (Admin)
exports.createEvent = async (req, res, next) => {
    try {
        const event = await Event.create(req.body);

        res.status(201).json({
            success: true,
            data: event
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
