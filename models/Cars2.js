const mongoose = require('mongoose');


//Define Schema for DB
var car2Schema = new mongoose.Schema({
    team: {
        type: String,
        required: [true, 'Team Name is required']
    },
    car: {
        type: String,
        required: [true, 'Car Name is Required']
    },
    raceNumber: {
        type: Number
    },
    passcode: {
        type: String,
        required: true
    },
    spectate: {
        type: Boolean,
        default: true
    },
    lastLive: Date,
    created: Date,
    loginCount: Number,
    avatarUrl: String,

});



const Cars2 = mongoose.model('Cars', car2Schema);

module.exports = Cars2;