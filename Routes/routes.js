const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const router = express.Router();
//var generate = require('project-name-generator');
var generate = require("adjective-adjective-animal");
const Cars = require('../models/Cars.js');

var urlEncodedParser = bodyParser.urlencoded({
  extended: false
});

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
  var time = moment().locale('en-gb').format('LTS');
  res.status(200).send({
    'voltage': voltage,
    'voltsLower': voltageLower,
    'current': current,
    'time': time
  }).end;


});

module.exports = router;
