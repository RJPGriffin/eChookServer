const tracks = require('./tracks.js');
const moment = require('moment');
const Cars = require('../models/Cars.js');
const crypto = require('crypto');
// const uuid = require('uuid/v1');

var liveDataStore = {

  dataStore: {},
  spectatorData: {},
  carLookup: {},

  dataTemplate: {
    'voltage': '',
    // 'current': '',
    // 'voltageLower': '',
    // 'rpm': '',
    // 'speed': '',
    // 'throttle': '',
    // 'temp1': '',
    // 'temp2': '',
    // 'ampH': '',
    // 'currLap': '',
    // 'gear': '',
    // 'brake': '',
    // 'lon': '',
    // 'lat': '',
    // 'track': '',
    // 'LL_Time': '',
    // 'LL_V': '',
    // 'LL_I': '',
    // 'LL_RPM': '',
    // 'LL_Spd': '',
    // 'LL_Ah': '',
    'updated': '',
    'status': ''
  },

  // Using the database UUID to identify the car in the spectator data
  // would reaveal it publicly, allowing anyone to request that car's full
  // data through the API, so new UUID needs to be generated for the public
  // lookup
  carLookupTemplate: {
    'name': '',
    'teamName': '',
    'number': '',
    'ID': '',
    'lastUsed': ''
  },

  spectatorDataTemplate: {
    'name': '',
    'teamName': '',
    'number': '',
    'lap': '',
    'speed': '',
    'lat': '',
    'lon': '',
    'updated': ''
  },
  //Takes in car ID (key) and incoming data. Checks if that car has an entry in
  // datastore, if not, creates one.
  // Updates data store with any new data from dataIn
  updateData: function(key, dataIn) {
    key = "$" + key; //Ensures key does not start with a number
    if (!this.dataStore.hasOwnProperty(key)) {
      this.dataStore[key] = {};
    }

    if (dataIn.hasOwnProperty('Vt')) {
      this.dataStore[key].voltage = dataIn.Vt;
    }
    if (dataIn.hasOwnProperty('A')) {
      this.dataStore[key].current = dataIn.A
    }
    if (dataIn.hasOwnProperty('V1')) {
      this.dataStore[key].voltageLower = dataIn.V1
    }
    if (dataIn.hasOwnProperty('RPM')) {
      this.dataStore[key].rpm = dataIn.RPM
    }
    if (dataIn.hasOwnProperty('Spd')) {
      this.dataStore[key].speed = dataIn.Spd
    }
    if (dataIn.hasOwnProperty('Thrtl')) {
      this.dataStore[key].throttle = dataIn.Thrtl
    }
    if (dataIn.hasOwnProperty('Tmp1')) {
      this.dataStore[key].temp1 = dataIn.Tmp1
    }
    if (dataIn.hasOwnProperty('Tmp2')) {
      this.dataStore[key].temp2 = dataIn.Tmp2
    }
    if (dataIn.hasOwnProperty('AH')) {
      this.dataStore[key].ampH = dataIn.AH
    }
    if (dataIn.hasOwnProperty('Lap')) {
      this.dataStore[key].currLap = dataIn.Lap
    }
    if (dataIn.hasOwnProperty('Gear')) {
      this.dataStore[key].gear = dataIn.Gear
    }
    if (dataIn.hasOwnProperty('brk')) {
      this.dataStore[key].brake = dataIn.brk
    }
    if (dataIn.hasOwnProperty('LL_Time')) {
      this.dataStore[key].LL_Time = dataIn.LL_Time
    }
    if (dataIn.hasOwnProperty('LL_V')) {
      this.dataStore[key].LL_V = dataIn.LL_V
    }
    if (dataIn.hasOwnProperty('LL_I')) {
      this.dataStore[key].LL_I = dataIn.LL_I
    }
    if (dataIn.hasOwnProperty('LL_RPM')) {
      this.dataStore[key].LL_RPM = dataIn.LL_RPM
    }
    if (dataIn.hasOwnProperty('LL_Spd')) {
      this.dataStore[key].LL_Spd = dataIn.LL_Spd
    }
    if (dataIn.hasOwnProperty('LL_Ah')) {
      this.dataStore[key].LL_Ah = dataIn.LL_Ah
    }
    if ('Lon' in dataIn && 'Lat' in dataIn) {
      this.dataStore[key].lon = dataIn.Lon
      this.dataStore[key].lat = dataIn.Lat
      this.dataStore[key].track = tracks.getTrack(dataIn.Lat, dataIn.Lon);
    }
    this.dataStore[key].updated = Date.now()
    this.dataStore[key].status = 'Live'


    console.log(JSON.stringify(this.dataStore));
  },
  updateDataOld: function(key, dataIn) {
    key = "A" + key;

    // console.log('Calling Update Data');
    console.log(`___________Data incoming from ${key}________`);


    if (!this.dataStore.hasOwnProperty(key)) { // Key doesn't exist yet - add it
      this.dataStore[key] = {};
    }

    console.log(`Adding data to key: ${key}`);

    var tempData = this.dataTemplate;

    if ('Vt' in dataIn) {
      tempData.voltage = dataIn.Vt;
      // console.log(`Updating voltage in ${key}`);
      // this.dataStore[key].voltage = dataIn.Vt
    }

    for (existingKey in this.dataStore) {
      if (existingKey === key) {
        console.log(`${key} matches ${existingKey} - entering data`);
        this.dataStore[key] = tempData;
      } else {
        console.log(`${key} does not match ${existingKey} - WRONG KEY`);
      }
    }

    // if ('A' in dataIn) {
    //   this.dataStore[key].current = dataIn.A
    // }
    // if ('V1' in dataIn) {
    //   this.dataStore[key].voltageLower = dataIn.V1
    // }
    // if ('RPM' in dataIn) {
    //   this.dataStore[key].rpm = dataIn.RPM
    // }
    // if ('Spd' in dataIn) {
    //   this.dataStore[key].speed = dataIn.Spd
    // }
    // if ('Thrtl' in dataIn) {
    //   this.dataStore[key].throttle = dataIn.Thrtl
    // }
    // if ('Tmp1' in dataIn) {
    //   this.dataStore[key].temp1 = dataIn.Tmp1
    // }
    // if ('Tmp2' in dataIn) {
    //   this.dataStore[key].temp2 = dataIn.Tmp2
    // }
    // if ('AH' in dataIn) {
    //   this.dataStore[key].ampH = dataIn.AH
    // }
    // if ('Lap' in dataIn) {
    //   this.dataStore[key].currLap = dataIn.Lap
    // }
    // if ('Gear' in dataIn) {
    //   this.dataStore[key].gear = dataIn.Gear
    // }
    // if ('brk' in dataIn) {
    //   this.dataStore[key].brake = dataIn.brk
    // }
    // if ('Lon' in dataIn && 'Lat' in dataIn) {
    //   this.dataStore[key].lon = dataIn.Lon
    //   this.dataStore[key].lat = dataIn.Lat
    //   this.dataStore[key].track = tracks.getTrack(dataIn.Lat, dataIn.Lon);
    // }
    // if ('LL_Time' in dataIn) {
    //   this.dataStore[key].LL_Time = dataIn.LL_Time
    // }
    // if ('LL_V' in dataIn) {
    //   this.dataStore[key].LL_V = dataIn.LL_V
    // }
    // if ('LL_I' in dataIn) {
    //   this.dataStore[key].LL_I = dataIn.LL_I
    // }
    // if ('LL_RPM' in dataIn) {
    //   this.dataStore[key].LL_RPM = dataIn.LL_RPM
    // }
    // if ('LL_Spd' in dataIn) {
    //   this.dataStore[key].LL_Spd = dataIn.LL_Spd
    // }
    // if ('LL_Ah' in dataIn) {
    //   this.dataStore[key].LL_Ah = dataIn.LL_Ah
    // }
    this.dataStore[key].updated = Date.now()
    this.dataStore[key].status = 'Live'
    console.log(`Datastore is now ${JSON.stringify(this.dataStore)}`);

    // // Now data store has been filled, should we add the car to the spectatorData?
    // if (this.dataStore[key].track !== "") { //car is on a track
    //   // console.log(`Entering Add Spectator Data - car on track `);
    //   // console.log(`Attempting to stringify `);
    //   // console.log(`Current Car Lookup: $ {JSON.stringify(this.carLookup)}`);
    //   // console.log(`stringified `);
    //   // Do we have a local copy of the car?
    //   if (key in this.carLookup) {
    //     console.log(`car in carLookup already `);
    //     let carName = this.carLookup[key].name;
    //     let teamName = this.carLookup[key].teamName;
    //     let id = this.carLookup[key].id;
    //     let number = this.carLookup[key].number;
    //     this.carLookup[key].lastUsed = new moment();
    //
    //     let currTrack = this.dataStore[key].track;
    //     if (!(currTrack in this.spectatorData)) {
    //       this.spectatorData[currTrack] = {}; //add the track
    //     }
    //
    //     //now check for/add cars ID to track
    //     if (!(id in this.spectatorData[currTrack])) {
    //       this.spectatorData[currTrack][id] = this.spectatorDataTemplate;
    //       this.spectatorData[currTrack][id].name = carName;
    //       this.spectatorData[currTrack][id].teamName = teamName;
    //       this.spectatorData[currTrack][id].number = number;
    //     }
    //
    //     //Fill In data
    //     this.spectatorData[currTrack][id].speed = dataIn.Spd;
    //     this.spectatorData[currTrack][id].lap = dataIn.Lap;
    //     this.spectatorData[currTrack][id].lon = dataIn.Lon;
    //     this.spectatorData[currTrack][id].lat = dataIn.Lat;
    //     this.spectatorData[currTrack][id].updated = new moment();
    //
    //     console.log(`Spectator Data Added: $ {JSON.stringify(this.spectatorData)}`);
    //
    //   } else { //add key and info. Data will be added next time data comes in.
    //     console.log(`car not in car lookup, fetching info from DB `);
    //     this.carLookup[key] = {};
    //     console.log(`Added Key: $ {JSON.stringify(this.carLookup)}`);
    //
    //     Cars.findOne({
    //       '_id': key
    //     }, function(err, car) {
    //       // if there are any errors, return the error before anything else
    //       if (err) {
    //         console.log(err);
    //       }
    //
    //       // if no user is found, return the message
    //       if (!car) {
    //         console.log("Car Not Found Spectator");
    //       } else {
    //         console.log(`
    //         Car found in DB `);
    //         let tmpCar = car.car;
    //         let tmpTeam = car.team;
    //         let tmpNum = car.number;
    //         // let temp = {
    //         liveDataStore.carLookup[key] = {
    //           'car': tmpCar,
    //           'teamName': tmpTeam,
    //           'number': tmpNum,
    //           'lastUsed': new moment(),
    //           'id': crypto.randomBytes(16).toString("hex")
    //         };
    //       }
    //     })
    //     console.log(`New Car Lookup: $ {JSON.stringify(this.carLookup)}`);
    //
    //   }
    // }

  },


  //Takes a car ID, returns all data on that ID from datastore
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

  //Cleanup! runs regularly to mark datastore data as old, then delete it.
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