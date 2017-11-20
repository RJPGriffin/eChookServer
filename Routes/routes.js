const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Cars = require('../models/Cars.js');

var urlEncodedParder = bodyParser.urlencoded({
  extended: false
});

router.get('/', function(req, res) {
  console.log("Loading");
  var carList = Cars.find({}).then(function(carList) {
    console.log(carList);
    res.render('cars', {
      data: carList
    });
  });
});

router.get('/add', function(req, res) {
  res.render('addCar');

});

router.post('/add', urlEncodedParder, function(req, res) {
  console.log(req.body);
  Cars.create(req.body).then(function(cars) {
    //  res.send(cars);
    res.render('carAdded', cars)
    //res.status(200).end();
  });




});

module.exports = router;
