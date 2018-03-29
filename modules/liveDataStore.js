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