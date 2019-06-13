console.log('Recieved: Car: ' + car);
console.log('Recieved: ID: ' + id);

var local = false; // to change URLs for debug
var url = "";
if (local) {
  if (car === "eChook Demo Car") {
    url = 'http://localhost:3000/api/get/Demo';
  } else {
    url = 'http://localhost:3000/api/get/' + id;
  }
} else {
  if (car === "eChook Demo Car") {
    url = 'https://data.echook.uk/api/get/Demo';
  } else {
    url = 'https://data.echook.uk/api/get/' + id;
  }
}
console.log(url);

//averageing values
var alpha = 0.99;
var voltageAverage = 0;
var currentAverage = 0;
var rpmAverage = 0;
var speedAverage = 0;
var pause = false;
var dataSeconds = $('#graphCount').val() * 60;
var currLap = 0;

//Map Variables
var map;
var marker;
var trackLocation = "";
var currTrack = "";

var voltageChartCtx = document.getElementById("voltageChart").getContext('2d');
var voltageChart = new Chart(voltageChartCtx, graphConfig);



$(document).ready(function() {
  console.log('Document Ready');
  initializeMap();
  setInterval(addData, 2000);

});


//Map Stuff
function initializeMap() {
  //Set Default location - Greenpower HQ
  var myLatLng = new google.maps.LatLng(50.853200, -0.634854);

  myOptions = {
    zoom: 15,
    center: myLatLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map'), myOptions);

  marker = new google.maps.Marker({
    position: myLatLng,
    map: map
  });

  marker.setMap(map);

  var pos = { // Greenpower UK HQ
    lat: 50.853200,
    lng: -0.634854,
    track: ""
  }



};

function moveMarker(lat, lon, track) {
  if (track != "") {
    if (trackLocation === "") {
      let trackUrl = "";

      if (local) {
        trackUrl = 'http://localhost:3000/api/getmappoint/' + track;
      } else {
        trackUrl = 'https://data.echook.uk/api/getmappoint/' + track;
      }

      $.get(trackUrl, function(data, status) {
        try {
          trackLocation = {
            'lat': data.lat,
            'lon': data.lon
          };
          map.panTo({
            lat: Number(trackLocation.lat),
            lng: Number(trackLocation.lon)
          });
        } catch (e) {
          console.log(`Error - pan map: ${e}`);
        } finally {}
      });
    }
  } else {
    trackLocation = "";
    try {
      map.panTo(new google.maps.LatLng(lat, lon));
    } catch (e) {

    } finally {

    }
  }

  try {
    // console.log('Updating Map Marker to ' + lat + ' ' + lon);
    marker.setPosition(new google.maps.LatLng(lat, lon));
  } catch (e) {
    // console.log('Failed to update map marker :(');
  } finally {

  }

};

function addData() {
  $.get(url, function(data, status) {
    if (status === "success") {

      // Don't remember why I'm zeroing these?
      if (voltageAverage === 0) {
        voltageAverage = data.voltage;
      }
      if (currentAverage === 0) {
        currentAverage = data.current;
      }
      if (rpmAverage === 0) {
        rpmAverage = data.rpm;
      }

      //Convert incoming m/s speed to MPH
      data.speed = data.speed * 2.23694;

      //Remove animations after 100 datapoints
      if (voltageChart.data.labels.length === 100) {
        voltageChart.options.animation.duration = 0;
        console.log('Disabled Animations');
      }

      alpha = voltageChart.data.labels.length / (voltageChart.data.labels.length + 1);
      // console.log('Alpha = ' + alpha + ', Data Length = ' + voltageChart.data.labels.length);

      //Voltage Chart
      voltageChart.data.labels.push(data.time);
      voltageChart.data.datasets[0].data.push(data.voltage);
      voltageChart.data.datasets[1].data.push(data.voltsLower);
      voltageChart.data.datasets[2].data.push(data.voltage - data.voltsLower);
      voltageAverage = voltageAverage * alpha + data.voltage * (1 - alpha);
      voltageChart.data.datasets[3].data.push(voltageAverage);

      //Current
      voltageChart.data.datasets[4].data.push(data.current);
      currentAverage = currentAverage * alpha + data.current * (1 - alpha);
      voltageChart.data.datasets[5].data.push(currentAverage);

      //RPM
      voltageChart.data.datasets[6].data.push(data.rpm / 100);
      rpmAverage = rpmAverage * alpha + (data.rpm / 100) * (1 - alpha);
      voltageChart.data.datasets[7].data.push(rpmAverage);

      //Speed
      voltageChart.data.datasets[8].data.push(data.speed);
      speedAverage = speedAverage * alpha + (data.speed) * (1 - alpha);
      voltageChart.data.datasets[9].data.push(speedAverage);

      while (voltageChart.data.labels.length > dataSeconds) {
        voltageChart.data.labels.splice(0, 1);;
        voltageChart.data.datasets.forEach((dataset) => {
          dataset.data.splice(0, 1);;
        });

      }


      var update = updateNumericals(data);

      // moveMarker(JSON.stringify(data.lat), JSON.stringify(data.lon), JSON.stringify(data.track));
      moveMarker(data.lat, data.lon, data.track);


      voltageChart.update();
    } else {
      console.log('Get Data returned status: ' + status);
    }

  })
}

function updateNumericals(data) {
  // console.log('Entering updateNumericals');
  $('#voltageTotal').text(data.voltage);
  $('#voltageLower').text(data.voltsLower);
  $('#voltageUpper').text(data.voltage - data.voltsLower);
  $('#Current').text(data.current);
  $('#AmpHours').text(data.ampH);
  $('#RPM').text(data.rpm);
  $('#Speed').text(data.speed);
  $('#lat-text').text(data.lat);
  $('#lon-text').text(data.lon);
  $('#Throttle').text(data.throttle);
  if (data.track != currTrack) {
    currTrack = data.track;
    if (data.track != "") {
      $('#MapTitle').text(`Map - ${data.track}`);
    } else {
      $('#MapTitle').text(`Map`);
    }
  }

  if (currLap != data.currLap) {
    $('#LapNumber').text(data.currLap.toFixed(0));
    $('#LLLap').text(currLap.toFixed(0));
    $('#LLTime').text(data.LL_Time);
    $('#LLVolts').text(data.LL_V);
    $('#LLCurrent').text(data.LL_I);
    $('#LLSpeed').text(data.LL_Spd);
    $('#LLRPM').text(data.LL_RPM);
    $('#LLAH').text(data.LL_Ah);
    currLap = data.currLap;

  }
}

function updateTime() {
  dataSeconds = 60 * $('#graphCount').val();

};
