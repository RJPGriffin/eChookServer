const moment = require('moment');

demo = {

  //Generates random data for the demo functionality
  generate: function() {
    var voltage = Math.floor((Math.random() * 5) + 19);
    var voltageLower = Math.floor((Math.random() * 3) + 9);
    var current = Math.floor((Math.random() * 5) + 17);
    var rpm = Math.floor((Math.random() * 100) + 1650);
    var speed = Math.floor((Math.random() * 2) + 12);
    var time = moment().locale('en-gb').format('LTS');
    var lat = ((Math.random() / 100) + 50.8599424).toFixed(7);
    var lon = ((Math.random() / 100) + -0.7623057).toFixed(7);
    return ({
      'voltage': voltage,
      'voltsLower': voltageLower,
      'current': current,
      'speed': speed,
      'rpm': rpm,
      'time': time,
      'lat': lat,
      'lon': lon,
      'track': "",
    });
  }


};

module.exports = demo