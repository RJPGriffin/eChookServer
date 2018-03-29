tracks = {

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
      'lonMax': -1.438836,
      'lonMin': -1.438002,
    },
    'Rockingham': {
      'latMax': 52.5179712,
      'latMin': 52.512264,
      'lonMax': -0.649619,
      'lonMin': -0.6661527,
    },
    'Goodwood': {
      'latMax': 50.864790,
      'latMin': 50.853663,
      'lonMax': -0.750720,
      'lonMin': -0.769699,
    }
  },

  getTrack: function(lat, lon) {
    let track = "";

    Object.keys(this.tracklist).forEach(function(key) {
      if (lat > this.trackList[key].latMax && lat < this.trackList[key].latMin) {
        if (lon > this.trackList[key].lonMax && lon < this.trackList[key].lonMin) {
          track = key;
        }
      }
      console.log('Found Track:' + track);
    });
  }

};

module.exports = tracks