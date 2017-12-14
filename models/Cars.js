const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


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

// generating a hash
carSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
carSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};


const Cars = mongoose.model('Cars', carSchema);

module.exports = Cars;