var data = {
  'greeting': 'hi'
};


function updateData(key, data) {
  // console.log(JSON.stringify(key) + JSON.stringify(data));
  var dataIn = {
    'voltage': data.Vt,
    'current': data.A,
    'voltageLower': data.V1,
    'rpm': data.RPM,
    'speed': data.Spd,
    'throttle': data.Thrtl,
    'temp1': data.Tmp1,
    'temp2': data.Tmp2,
    'ampH': data.AH,
    'currLap': data.Lap,
    'gear': data.Gear,
    'brake': data.brk,
    'lon': data.Lon,
    'lat': data.Lat,
    'updated': Date.now(),
    'status': 'Live'
  };

  // console.log('Data In: ' + JSON.stringify(dataIn));

  data[key] = dataIn;

  console.log('Added Data: ' + JSON.stringify(data));

  // Control What is actually Stored




  //TODO add return for status
};

function getData(key) {
  console.log('Looking For: ' + key + ' in ' + JSON.stringify(data));
  if (key in data) {
    return data[key];
  } else {
    return {
      'status': 'No data found from car',
      'updated': null
    }
  };
};

module.exports.updateData = updateData;
module.exports.getData = getData;
