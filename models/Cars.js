const mongoose = require('mongoose');


//Define Schema for DB
var carsSchema = new mongoose.Schema({
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
  passcode: String,
  visibility: {
    type: Boolean,
    default: false
  },
  email: String,
  lastLive: Date,
});

const Cars = mongoose.model('Cars', carsSchema);

module.exports = Cars;
