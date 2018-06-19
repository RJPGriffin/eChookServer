var tracks = {

  /*
  'name': {
    'latMax': ,
    'latMin': ,
    'lonMax': ,
    'lonMin': ,
  },
  */
  //Currently hardcoded, need to be broken out into a database
  trackList: {
    'dev': {
      'latMax': 52.393066,
      'latMin': 52.392188,
      'lonMax': -1.438002,
      'lonMin': -1.438836
    },
    'Aintree': {
      'latMax': 53.478710,
      'latMin': 53.473684,
      'lonMax': -2.929999,
      'lonMin': -2.945800
    },
    'Anglesey': {
      'latMax': 53.194876,
      'latMin': 53.187160,
      'lonMax': -4.491679,
      'lonMin': -4.505968
    },
    'Blyton Park': {
      'latMax': 53.461727,
      'latMin': 53.453436,
      'lonMax': -0.687125,
      'lonMin': -0.698450
    },
    'Castle Coombe': {
      'latMax': 51.494275,
      'latMin': 51.484060,
      'lonMax': -2.202971,
      'lonMin': -2.219485
    },
    'Croft': {
      'latMax': 54.460223,
      'latMin': 54.451348,
      'lonMax': -1.549663,
      'lonMin': -1.565405
    },
    'Dunsfold': {
      'latMax': 51.117988,
      'latMin': 51.1133986,
      'lonMax': -0.5461998,
      'lonMin': -0.550170
    },
    'Dunton (Ford)': {
      'latMax': 51.586235,
      'latMin': 51.579696,
      'lonMax': 0.411418,
      'lonMin': 0.394519
    },
    'East Fortune': {
      'latMax': 56.005383,
      'latMin': 55.995292,
      'lonMax': -2.701853,
      'lonMin': -2.726098
    },
    'Goodwood': {
      'latMax': 50.864790,
      'latMin': 50.853663,
      'lonMax': -0.750720,
      'lonMin': -0.769699
    },
    'Grampian Transport Museum': {
      'latMax': 57.233788,
      'latMin': 57.231951,
      'lonMax': -2.697122,
      'lonMin': -2.702809
    },
    'Kirkistown': {
      'latMax': 54.459290,
      'latMin': 54.454271,
      'lonMax': -5.459970,
      'lonMin': -5.479920
    },
    'Mallory Park': {
      'latMax': 52.602227,
      'latMin': 52.594237,
      'lonMax': -1.332395,
      'lonMin': -1.343089
    },
    'Predannack Airfield': {
      'latMax': 50.008979,
      'latMin': 49.994198,
      'lonMax': -5.219661,
      'lonMin': -5.243758
    },
    'Rockingham Speedway': {
      'latMax': 52.5179712,
      'latMin': 52.512264,
      'lonMax': -0.649619,
      'lonMin': -0.6661527
    }
  },

  // Takes in a track name, return centre of track calculated as average of
  // lat and lon max an min for map positioning
  getTrackCentre: function(trackName) {
    let lat = 0;
    let lon = 0;

    if (trackName in this.trackList) {
      lat = ((this.trackList[trackName].latMax - this.trackList[trackName].latMin) / 2 + this.trackList[trackName].latMin).toFixed(6);
      lon = ((this.trackList[trackName].lonMax - this.trackList[trackName].lonMin) / 2 + this.trackList[trackName].lonMin).toFixed(6);
      return ({
        'lat': lat,
        'lon': lon
      })
    }

  },

  //Takes in a location, if it's within track boundaries retruns the track
  // name, else returns ""
  getTrack: function(lat, lon) {
    let track = null;
    let tmpTrackList = this.trackList; // not sure why I need this, but I do. this.tracklist doesn't work in loop below.


    Object.keys(tmpTrackList).forEach(function(key) {
      if (track === "") { // If track has already been found, no need to keep searching
        if (lat < tmpTrackList[key].latMax && lat > tmpTrackList[key].latMin) {
          if (lon < tmpTrackList[key].lonMax && lon > tmpTrackList[key].lonMin) {
            track = key;
          }
        }
      }
    });
    console.log('Found Track:' + track);
    return (track);
  }

};

module.exports = tracks