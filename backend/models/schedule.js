const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
    processed_by:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
    date_schedule: {
        type: Date
    },
    category: {
        type: String,
        enum: {
            values: [
                'Recreational Activity',
                'Dialysis',
                'Multipurpose Hall',
            ],
            message: 'Please select correct category for schedule'
        }
    }, 
    
//-----------------------

//recreational activities
    recreational_services: [{
        type: String}],

//multipurpose hall
    purpose: {
            type: String,
        },   
    attendees_number: {
            type: String,
        }, 

//-----------------------

    time: {
        type: String,
        enum: {
            values: [
                'am',
                'pm',
                'whole_day'
            ],
            message: 'Please select correct category for schedule'
        }
    },
    status: {
        type: String,
        enum: {
            values: [
                'attended',
                'reserved',
                'not attended',
            ],
            message: 'Please select correct category for schedule'
        }
    },
    dialysis_status: {
        type: String,
        enum: {
            values: [
                'accepted',
                'denied',
                'pending',
            ],
            message: 'Please select correct category for schedule'
        }
    },
    batch: {
        type: String,
    },
    qr_code: {
        public_id: {
            type: String,
           
        },
        url: {
            type: String,
         
        }
    },
    review: {
        rate: {
            type: Number,
           
        },
        comment: {
            type: String,
         
        }
    },

    notif_tomorrow:{
        type: Boolean,
        required: true,
        default: false
    },

    notif_today:{
        type: Boolean,
        required: true,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})


module.exports = mongoose.model('Schedule', scheduleSchema);