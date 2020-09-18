const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Cars = require('../models/Cars.js');
const demoGenerator = require('../modules/demoGenerator.js');
const tracks = require('../modules/tracks.js');
const liveDataStore = require('../modules/liveDataStore.js');


var urlEncodedParser = bodyParser.urlencoded({
    extended: false
});

var jsonParser = bodyParser.json();

router.get('/', function (req, res) {
    res.render('v2app');
});

router.get('/data', isLoggedIn, function (req, res) {

    res.render('data', {
        user: req.user
    })

});

router.get('/spectate', function (req, res) {
    res.render('spectate');
});

router.get('/add', function (req, res) {
    res.render('addCar');

});

router.post('/add', urlEncodedParser, function (req, res, next) {
    // console.log(req.body);
    Cars.create(req.body).then(function (cars) {
        //  res.send(cars);
        res.render('carAdded', cars)
        //res.status(200).end();
    }).catch(next);
});


//API access
// TODO maybe rewrite this to work with login - otoh that would disable access from node red etc.
router.get('/api/get/:id', function (req, res) {
    let key = req.params.id;
    if (key == 'Demo') {
        res.status(200).send(demoGenerator.generate()).end;
    } else {
        if (key in liveDataStore.dataStore) {
            res.status(200).send(liveDataStore.dataStore[key]).end;
        } else {
            res.status(204).send({}).end;
        };
    }
});

// recieves a track name and returns it's centre coordinates
router.get('/api/getmappoint/:id', function (req, res) {
    let key = req.params.id;
    let location = tracks.getTrackCentre(key);
    res.status(200).send(location).end;
});

//Recieve post data from server
router.post('/api/send/:id', jsonParser, function (req, res) {
    // console.log('Post Recieved with id: ' + req.params.id);
    try {
        liveDataStore.updateData(req.params.id, req.body);
    } catch (e) {
        console.log('Error in Update Data: ' + e);
    } finally {

    }
    //res.send(liveDataStore.dataStore[req.params.id]);
    res.send();
    res.status(200).end();
});

//APIv2
router.get('/api2/get/:id', function (req, res) {
    // let key = req.params.id;
    // if (key == 'demodemo') {
    res.status(200).send(demoGenerator.generate()).end;
    // } else {
    //   if (key in liveDataStore.dataStore) {
    //     res.status(200).send(liveDataStore.dataStore[key]).end;
    //   } else {
    //     res.status(204).send({}).end;
    //   };
    // }
});



// Used to get the database ID of a car - for app to send data
// @despreciated
router.post('/api/getid', jsonParser, function (req, res) {
    // console.log('Request to get ID for passcode: ' + req.body.username);

    Cars.findOne({
        'car': req.body.username
    }, function (err, car) {
        // if there are any errors, return the error before anything else
        if (err) {
            console.log(err);
            res.send('Undefined Error');
            res.status(204).end();
        }

        // if no user is found, return the message
        if (!car) {
            console.log("Car Not Found");
            res.send('Car not found');
            res.status(204).end();
        } else if (!car.validPassword(req.body.password)) {
            console.log("Invalid Password");
            res.send('Incorrect Password');
            res.status(204).end();
        } else {
            //Car found, Password Incorrect
            console.log('Car found: ' + car.id);
            res.send({
                'id': car.id
            });
            res.status(200).end();
        }

    })


});

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;