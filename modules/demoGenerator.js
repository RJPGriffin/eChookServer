const moment = require('moment');

demo = {

  generate: function() {
    var voltage = Math.floor((Math.random() * 5) + 19);
    var voltageLower = Math.floor((Math.random() * 3) + 9);
    var current = Math.floor((Math.random() * 5) + 17);
    var rpm = Math.floor((Math.random() * 100) + 1650);
    var speed = Math.floor((Math.random() * 2) + 12);
    var time = moment().locale('en-gb').format('LTS');
    var lat = ((Math.random() / 100) + 50.8599424).toFixed(7);
    var lon = ((Math.random() / 100) + -0.7623057).toFixed(7);
    console.log('Latitude generated: ' + lat);
    return ({
      'voltage': voltage,
      'voltsLower': voltageLower,
      'current': current,
      'speed': speed,
      'rpm': rpm,
      'time': time,
      'lat': lat,
      'lon': lon,
    });
  }


};

module.exports = demo