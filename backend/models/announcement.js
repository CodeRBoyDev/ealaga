const mongoose = require('mongoose')

const announcement = new mongoose.Schema({
    announcement: {
        type: String,
        required: [true, 'Please provide description'],
    },
    title: {
        type: String,
        required: [true, 'Please provide description'],
    },
    date: {
        type: Date,
        required: [true, 'Please provide description'],
    },
    status: {
        type: String,
        enum: {
            values: [
                'set',
                'not set',
            ],
            message: 'Please select status for announcement'
        },
        default: 'not set'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Announcement', announcement);