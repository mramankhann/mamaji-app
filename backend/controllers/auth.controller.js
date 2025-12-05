const User = require('../models/User');
const crypto = require('crypto');

// @desc    Register user / Send OTP
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({ success: false, error: 'Please provide a phone number' });
        }

        let user = await User.findOne({ phone });

        if (!user) {
            user = await User.create({ phone });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // In production, hash this OTP
        user.otp = otp;
        user.otpExpire = Date.now() + 10 * 60 * 1000; // 10 mins

        await user.save();

        // Send OTP (Mock)
        console.log(`OTP for ${phone}: ${otp}`);

        res.status(200).json({
            success: true,
            data: 'OTP sent successfully',
            // For dev convenience, return OTP
            devOtp: otp
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify
// @access  Public
exports.verifyOTP = async (req, res, next) => {
    try {
        const { phone, otp } = req.body;

        if (!phone || !otp) {
            return res.status(400).json({ success: false, error: 'Please provide phone and OTP' });
        }

        const user = await User.findOne({ phone });

        if (!user) {
            return res.status(400).json({ success: false, error: 'Invalid credentials' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ success: false, error: 'Invalid OTP' });
        }

        if (user.otpExpire < Date.now()) {
            return res.status(400).json({ success: false, error: 'OTP expired' });
        }

        // Clear OTP
        user.otp = undefined;
        user.otpExpire = undefined;
        await user.save();

        sendTokenResponse(user, 200, res);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        httpOnly: true
    };

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            user
        });
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
