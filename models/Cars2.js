const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


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
    number: {
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
    email: {
        type: String,
    },
    lastLive: Date,
});

// generating a hash
carSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
carSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


const Cars = mongoose.model('Cars', carSchema);

module.exports = Cars2;