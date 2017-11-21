const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const router = express.Router();
const dataStore = require('../DataStore/dataStore.js');
//var generate = require('project-name-generator');
var generate = require("adjective-adjective-animal");
const Cars = require('../models/Cars.js');




var urlEncodedParser = bodyParser.urlencoded({
  extended: false
});

var jsonParser = bodyParser.json();

router.get('/', function(req, res) {
  //console.log("Loading");
  var carList = Cars.find({}).then(function(carList) {
    //  console.log(carList);
    res.render('cars', {
      data: carList
    });
  });
});

router.post('/data', urlEncodedParser, function(req, res) {
  console.log('Looking for' + req.body.passcode);
  Cars.findOne({
    passcode: req.body.passcode
  }).then(function(car) {
    console.log(car);
    res.render('data', {
      data: car
    })
  });
});


router.get('/add', function(req, res) {
  generate({
    adjectives: 1,
    format: "param"
  }).then(function(name) {
    var randObject = {
      'randName': name
    }
    console.log(name);
    res.render('addCar', randObject);

  });

});

router.post('/add', urlEncodedParser, function(req, res, next) {
  // console.log(req.body);
  Cars.create(req.body).then(function(cars) {
    //  res.send(cars);
    res.render('carAdded', cars)
    //res.status(200).end();
  }).catch(next);
});


//API access

router.get('/api/get', function(req, res) {
  var voltage = Math.floor((Math.random() * 6) + 19);
  var voltageLower = Math.floor((Math.random() * 3) + 9);
  var current = Math.floor((Math.random() * 10) + 17);
  var rpm = Math.floor((Math.random() * 300) + 1650);
  var time = moment().locale('en-gb').format('LTS');
  res.status(200).send({
    'voltage': voltage,
    'voltsLower': voltageLower,
    'current': current,
    'rpm': rpm,
    'time': time
  }).end;
});

router.post('/api/send/:id', jsonParser, function(req, res) {
  console.log('Post Recieved with id: ' + req.params.id);
  var dataIn = {
    // 'voltage': req.body.Vt,
    // 'current': req.body.A,
    // 'voltageLower': req.body.V1,
    // 'rpm': req.body.RPM,
    // 'speed': req.body.Spd,
    // 'throttle': req.body.Thrtl,
    // 'temp1': req.body.Tmp1,
    // 'temp2': req.body.Tmp2,
    // 'ampH': req.body.AH,
    // 'currLap': req.body.Lap,
    // 'gear': req.body.Gear,
    // 'brake': req.body.brk,
    // 'lon': req.body.Lon,
    // 'lat': req.body.Lat
  };

  // dataStore.data[req.params.id] = dataIn;
  // console.log('Stored: ' + dataStore.data[req.params.id] + " in " + req.params.id);

  res.status(200).end();

});

module.exports = router;
