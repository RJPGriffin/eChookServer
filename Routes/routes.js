const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const router = express.Router();
var generate = require("adjective-adjective-animal");
const Cars = require('../models/Cars.js');

var dataStore = {};

var dataTemplate = {
  'voltage': '',
  'current': '',
  'voltageLower': '',
  'rpm': '',
  'speed': '',
  'throttle': '',
  'temp1': '',
  'temp2': '',
  'ampH': '',
  'currLap': '',
  'gear': '',
  'brake': '',
  'lon': '',
  'lat': '',
  'track': '',
  'LL_Time': '',
  'LL_V': '',
  'LL_I': '',
  'LL_RPM': '',
  'LL_Spd': '',
  'LL_Ah': '',
  'updated': '',
  'status': ''
};

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

router.get('/api/get/:id', function(req, res) {
  let key = req.params.id;
  if (key == 'Demo') {
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
  } else {
    if (key in dataStore) {
      res.status(200).send(dataStore[key]).end;
    } else {
      res.status(200).send({
        'status': 'No data found for car',
        'updated': null
      }).end;
    };
  }
});

router.post('/api/send/:id', jsonParser, function(req, res) {
  console.log('Post Recieved with id: ' + req.params.id);
  try {
    updateData(req.params.id, req.body);
  } catch (e) {
    console.log('Error in Update Data: ' + e);
  } finally {

  }

  res.send(dataStore[req.params.id]);
  res.status(200).end();
});




router.post('/api/getid', jsonParser, function(req, res) {
  console.log('Request to get ID for pascode: ' + req.body.passcode);
  Cars.findOne({
    passcode: req.body.passcode
  }).then(function(car) {
    if (car === null) {
      res.send('Passcode Not Recognised');
      res.status(204).end();
    } else {
      console.log('id found: ' + car._id);
      res.send({
        'id': car._id
      });
      res.status(200).end();
    }
  });




});

module.exports = router;


// Data Functions
function updateData(key, dataIn) {
  console.log('Calling Update Data');

  if (key in dataStore) {

  } else {
    console.log('Adding ' + key + ' to Data Store');
    dataStore[key] = dataTemplate;
    console.log(dataStore);
  }

  // console.log(dataStore);

  if ('Vt' in dataIn) {
    dataStore[key].voltage = dataIn.Vt
  }
  if ('A' in dataIn) {
    dataStore[key].current = dataIn.A
  }
  if ('V1' in dataIn) {
    dataStore[key].voltageLower = dataIn.V1
  }
  if ('RPM' in dataIn) {
    dataStore[key].rpm = dataIn.RPM
  }
  if ('Spd' in dataIn) {
    dataStore[key].speed = dataIn.Spd
  }
  if ('Thrtl' in dataIn) {
    dataStore[key].throttle = dataIn.Thrtl
  }
  if ('Tmp1' in dataIn) {
    dataStore[key].temp1 = dataIn.Tmp1
  }
  if ('Tmp2' in dataIn) {
    dataStore[key].temp2 = dataIn.Tmp2
  }
  if ('AH' in dataIn) {
    dataStore[key].ampH = dataIn.AH
  }
  if ('Lap' in dataIn) {
    dataStore[key].currLap = dataIn.Lap
  }
  if ('Gear' in dataIn) {
    dataStore[key].gear = dataIn.Gear
  }
  if ('brk' in dataIn) {
    dataStore[key].brake = dataIn.brk
  }
  if ('Lon' in dataIn) {
    dataStore[key].lon = dataIn.Lon
  }
  if ('Lat' in dataIn) {
    dataStore[key].lat = dataIn.Lat
  }
  if ('LL_Time' in dataIn) {
    dataStore[key].LL_Time = dataIn.LL_Time
  }
  if ('LL_V' in dataIn) {
    dataStore[key].LL_V = dataIn.LL_V
  }
  if ('LL_I' in dataIn) {
    dataStore[key].LL_I = dataIn.LL_I
  }
  if ('LL_RPM' in dataIn) {
    dataStore[key].LL_RPM = dataIn.LL_RPM
  }
  if ('LL_Spd' in dataIn) {
    dataStore[key].LL_Spd = dataIn.LL_Spd
  }
  if ('LL_Ah' in dataIn) {
    dataStore[key].LL_Ah = dataIn.LL_Ah
  }
  dataStore[key].updated = Date.now()
  dataStore[key].status = 'Live'

  console.log(dataStore);

}

$(document).ready(manageData());

function manageData() {
  console.log("Running manageData");
  for (var n in data) {
    if (Date.now() - n.updated > 30000) { //30 seconds
      console.log('Deleting: ' + n);
      n.delete();
    } else if (Date.now() - n.updated > 10000) {
      n.status = 'Stale - 10s'
    }


    return Promise.delay(10000).then(() => manageData());
  }
};
