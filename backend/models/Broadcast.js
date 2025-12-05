const mongoose = require('mongoose');

const BroadcastSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    media: {
        type: String, // URL to image/video/pdf
    },
    mediaType: {
        type: String,
        enum: ['image', 'video', 'pdf', 'none'],
        default: 'none'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Broadcast', BroadcastSchema);
