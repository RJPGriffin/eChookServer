const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const socket = require('socket.io');


//Connect to Database
mongoose.connect('mongodb://echookServer:echookdatabasepassword@ds259855.mlab.com:59855/echook-cars')

//Define Schema for DB
var carsSchema = new mongoose.Schema({
  team: String,
  car: String,
  number: Number,
  passcode: String,
  email: String,
  lastLive: Date,
});

var Cars = mongoose.model('Cars', carsSchema);

// App setup
var app = express();
var jsonParser = bodyParser.json();
var urlEncodedParder = bodyParser.urlencoded({
  extended: false
});
app.set('view engine', 'ejs');

var server = app.listen(3000, function() {
  console.log('listening for requests on port 4000,');
});

// app.use(express.static('public'));

// app.post('/post/:id', jsonParser, function(req, res) {
//   console.log(req.params.id + ' posted ' + JSON.stringify(req.body));
//   res.status(200).end();
//
// });

var carData = {
  cars: [{
    name: 'car1',
    number: '1'
  }, {
    name: 'car2',
    number: '2'
  }]
}

app.get('/', function(req, res) {
  res.render('cars', {
    'cars': [{
      'name': 'car1'
    }, {
      name: 'car2'
    }]
  });
});

app.get('/add', function(req, res) {
  res.render('addCar');

});

app.post('/add', urlEncodedParder, function(req, res) {
  console.log(req.body);
  var newCar = Cars(req.body).save(function(err) {
    if (err) throw err;
    console.log('New Car Saved');
  });
  res.status(200).end();


});

// Socket setup & pass server
// var io = socket(server);
// io.on('connection', (socket) => {
//
//   console.log('made socket connection', socket.id);
//
// });
