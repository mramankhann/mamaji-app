const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    department: {
        type: String,
        required: [true, 'Please select a department'],
        enum: ['Roads', 'Water', 'Electricity', 'Sanitation', 'Police', 'Other']
    },
    category: {
        type: String,
        required: [true, 'Please select a category']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        // GeoJSON Point
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    },
    media: {
        type: [String], // Array of URLs
        validate: [arrayLimit, '{PATH} exceeds the limit of 5']
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
        default: 'Pending'
    },
    updates: [
        {
            message: String,
            image: String,
            date: {
                type: Date,
                default: Date.now
            },
            updatedBy: {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

function arrayLimit(val) {
    return val.length <= 5;
}

module.exports = mongoose.model('Complaint', ComplaintSchema);
