const mongoose = require('mongoose');

const closeDateSchema = new mongoose.Schema({
    date: {
        type: String,
    },
    avaliableSlot: {
        type: String,
    },
    totalSlot: {
        type: String,
    },
})


module.exports = mongoose.model('CloseDateslot', closeDateSchema);