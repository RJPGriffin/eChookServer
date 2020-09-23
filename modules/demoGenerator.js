const moment = require('moment');
const tracks = require('./tracks.js');

demo = {

  //Generates random data for the demo functionality
  generate: function() {
    var voltage = Math.floor((Math.random() * 5) + 19);
    var voltageLower = Math.floor((Math.random() * 3) + 9);
    var current = Math.floor((Math.random() * 5) + 17);
    var rpm = Math.floor((Math.random() * 100) + 1650);
    var speed = Math.floor((Math.random() * 2) + 12);
    var time = moment().locale('en-gb').format('LTS');
    var lat = ((Math.random() / 100) + 50.8519424).toFixed(7);
    var lon = ((Math.random() / 100) + -0.7623057).toFixed(7);
    var lap = Math.random() * 10;
    var temp1 = (Math.random()* 10 + 10).toFixed(1);
    var temp2 = (Math.random()* 10 + 10).toFixed(1);
    var throttle = Math.floor(100 - Math.random()*2);
    var track = tracks.getTrack(lat, lon);
    return ({
      'voltage': voltage,
      'voltsLower': voltageLower,
      'current': current,
      'speed': speed,
      'throttle': throttle,
      'rpm': rpm,
      'time': time,
      'lat': lat,
      'lon': lon,
      'temp1': temp1,
      'temp2': temp2,
      'track': track,
      'currLap': lap

    });
  }


};

module.exports = demo