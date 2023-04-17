const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
    date: {
        type: String,
    },
    avaliableSlot: {
        type: String,
        default: "closed"
    },
    totalSlot: {
        type: String,
        default: "closed"
    },
})


module.exports = mongoose.model('Dateslot', dateSchema);