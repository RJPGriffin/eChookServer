const mongoose = require('mongoose');


//Define Schema for DB
var carSchema = new mongoose.Schema({
  team: {
    type: String,
    unique: true,
    required: [true, 'Team Name is required']
  },
  car: {
    type: String,
    unique: true,
    required: [true, 'Car Name is Required']
  },
  number: {
    type: Number
  },
  password: {
    type: String,
    required: true
  },
  passwordConf: {
    type: String,
    required: true
  },
  visibility: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    unique: true
  },
  lastLive: Date,
});

const Cars = mongoose.model('Cars', carSchema);

module.exports = Cars;
