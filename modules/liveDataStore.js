const tracks = require('../modules/tracks.js');

var liveDataStore = {

  dataStore: {},

  dataTemplate: {
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
  },

  updateData: function(key, dataIn) {
    // console.log('Calling Update Data');

    if (key in this.dataStore) {

    } else {
      // console.log('Adding ' + key + ' to Data Store');
      this.dataStore[key] = this.dataTemplate;
      // console.log(this.dataStore);
    }

    // console.log(this.dataStore);

    if ('Vt' in dataIn) {
      this.dataStore[key].voltage = dataIn.Vt
    }
    if ('A' in dataIn) {
      this.dataStore[key].current = dataIn.A
    }
    if ('V1' in dataIn) {
      this.dataStore[key].voltageLower = dataIn.V1
    }
    if ('RPM' in dataIn) {
      this.dataStore[key].rpm = dataIn.RPM
    }
    if ('Spd' in dataIn) {
      this.dataStore[key].speed = dataIn.Spd
    }
    if ('Thrtl' in dataIn) {
      this.dataStore[key].throttle = dataIn.Thrtl
    }
    if ('Tmp1' in dataIn) {
      this.dataStore[key].temp1 = dataIn.Tmp1
    }
    if ('Tmp2' in dataIn) {
      this.dataStore[key].temp2 = dataIn.Tmp2
    }
    if ('AH' in dataIn) {
      this.dataStore[key].ampH = dataIn.AH
    }
    if ('Lap' in dataIn) {
      this.dataStore[key].currLap = dataIn.Lap
    }
    if ('Gear' in dataIn) {
      this.dataStore[key].gear = dataIn.Gear
    }
    if ('brk' in dataIn) {
      this.dataStore[key].brake = dataIn.brk
    }
    if ('Lon' in dataIn) {
      this.dataStore[key].lon = dataIn.Lon
    }
    if ('Lat' in dataIn) {
      this.dataStore[key].lat = dataIn.Lat
    }
    if ('Lon' in dataIn && 'Lat' in dataIn) {
      this.dataStore[key].track = tracks.getTrack(dataIn.Lat, dataIn.Lon);
    }
    if ('LL_Time' in dataIn) {
      this.dataStore[key].LL_Time = dataIn.LL_Time
    }
    if ('LL_V' in dataIn) {
      this.dataStore[key].LL_V = dataIn.LL_V
    }
    if ('LL_I' in dataIn) {
      this.dataStore[key].LL_I = dataIn.LL_I
    }
    if ('LL_RPM' in dataIn) {
      this.dataStore[key].LL_RPM = dataIn.LL_RPM
    }
    if ('LL_Spd' in dataIn) {
      this.dataStore[key].LL_Spd = dataIn.LL_Spd
    }
    if ('LL_Ah' in dataIn) {
      this.dataStore[key].LL_Ah = dataIn.LL_Ah
    }
    this.dataStore[key].updated = Date.now()
    this.dataStore[key].status = 'Live'

    // console.log(this.dataStore);
  },

  getData: function(key) {
    console.log('Looking For: ' + key + ' in ' + JSON.stringify(data));
    if (key in data) {
      return data[key];
    } else {
      return {
        'status': 'No data found from car',
        'updated': null
      }
    };
  },

  manageData: function() {
    // console.log("Running manageData");
    Object.keys(dataStore).forEach(function(key) {
      // console.log('Checking ' + n + n.updated);
      // console.log('In Loop');
      if (Date.now() - dataStore[key].updated > 30000) { //30 seconds
        // console.log('Deleting: ' + dataStore[key]);
        delete dataStore[key];
      } else if (Date.now() - dataStore[key].updated > 10000) {
        // console.log('Marking ' + dataStore[key] + ' Stale');
        dataStore[key].status = 'Stale'
      }
    });
  }
  // setInterval(manageData, 10000);
};
module.exports = liveDataStore;