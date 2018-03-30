console.log('Recieved: Car: ' + car);
console.log('Recieved: ID: ' + id);

var local = true; // to change URLs for debug
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

//Map Variables
var map;
var marker;

var voltageChartCtx = document.getElementById("voltageChart").getContext('2d');
var voltageChart = new Chart(voltageChartCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
        label: 'V Total',
        data: [],
        fill: false,
        borderColor: [
          '#2292A4'
        ],
        backgroundColor: [
          '#2292A4'
        ],
        borderWidth: 4
      },
      {
        label: 'V Batt1',
        hidden: true,
        data: [],
        fill: false,


        borderColor: [
          'rgba(60, 128, 195, 1)'
        ],
        borderWidth: 1
      },
      {
        label: 'V Batt2',
        hidden: true,
        data: [],
        fill: false,

        borderColor: [
          'rgba(60, 128, 195, 1)'
        ],
        borderWidth: 1
      },
      {
        label: 'V Avg',
        data: [],
        hidden: true,
        fill: false,

        borderColor: [
          '#2292A4'
        ],
        backgroundColor: [
          '#2292A4'
        ],
        borderWidth: 2
      },
      {
        label: 'Current',
        data: [],
        fill: false,
        borderColor: [
          '#D74E09'
        ],
        backgroundColor: [
          '#D74E09'
        ],
        borderWidth: 4
      }, {
        label: 'Current Avg',
        data: [],
        fill: false,
        hidden: true,
        borderColor: [
          '#D74E09'
        ],
        backgroundColor: [
          '#D74E09'
        ],
        borderWidth: 2
      }, {
        label: 'RPM x100',
        data: [],
        fill: false,
        backgroundColor: [
          '#F2BB05'
        ],
        borderColor: [
          '#F2BB05'
        ],
        borderWidth: 4
      },
      {
        label: 'RPM Avg x100',
        data: [],
        fill: false,
        hidden: true,
        backgroundColor: [
          '#F2BB05'
        ],
        borderColor: [
          '#F2BB05'
        ],
        borderWidth: 2
      },
      {
        label: 'Speed MPH',
        data: [],
        fill: false,
        backgroundColor: [
          '#43b929'
        ],
        borderColor: [
          '#43b929'
        ],
        borderWidth: 4
      },
      {
        label: 'Speed MPH Avg',
        data: [],
        fill: false,
        hidden: true,
        backgroundColor: [
          '#43b929'
        ],
        borderColor: [
          '#43b929'
        ],
        borderWidth: 2
      }
    ]
  },
  options: {
    intersect: true,
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 200
    },
    elements: {
      point: {
        radius: 0.6
      }
    },
    tooltips: {
      mode: 'x'
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: 'rgb(255, 99, 132)'
      }
    },
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        display: false,

      }]
    }
  }
});



$(document).ready(function() {
  console.log('Document Ready');
  initializeMap();
  setInterval(addData, 2000);

});


//Map Stuff
function initializeMap() {
  console.log('Entering initializeMap');

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

  var pos = {
    lat: 50.853200,
    lng: -0.634854,
    track: ""
  }

  marker.setMap(map);


};

function moveMarker(lat, lon, track) {
  console.log('Entering moveMarker');
  var trackLocation = "";
  console.log('move marker recieved: ' + lat + ' ' + lon + ' ' + track);

  if (track != "") {
    if (trackLocation === "") {
      console.log("Track detected, getting centre");
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
        } catch (e) {
          console.log('Invalid Track Coordinates Response');
        } finally {}
      });
      map.panTo({
        lat: trackLocation.lat,
        lng: trackLocation.lon
      });
    }
  } else {
    try {
      map.panTo(new google.maps.LatLng(trackLocation.lat, trackLocation.lon));
    } catch (e) {

    } finally {

    }
  }

  try {
    console.log('Updating Map Marker to ' + lat + ' ' + lon);
    marker.setPosition(new google.maps.LatLng(lat, lon));
  } catch (e) {
    console.log('Failed to update map marker :(');
  } finally {

  }

};

function addData() {
  console.log('Entering addData');
  $.get(url, function(data, status) {
    if (status === "success") {
      if (voltageAverage === 0) {
        voltageAverage = data.voltage;
      }
      if (currentAverage === 0) {
        currentAverage = data.current;
      }
      if (rpmAverage === 0) {
        rpmAverage = data.rpm;
      }

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
      voltageChart.data.datasets[8].data.push(data.speed * 2.23694);
      speedAverage = speedAverage * alpha + (data.speed * 2.23694) * (1 - alpha);
      voltageChart.data.datasets[9].data.push(speedAverage);

      while (voltageChart.data.labels.length > dataSeconds) {
        voltageChart.data.labels.splice(0, 1);;
        voltageChart.data.datasets.forEach((dataset) => {
          dataset.data.splice(0, 1);;
        });

      }


      var update = updateNumericals(data);

      moveMarker(JSON.stringify(data.lat), JSON.stringify(data.lon), JSON.stringify(data.track));


      voltageChart.update();
    } else {
      console.log('Get Data returned status: ' + status);
    }

  })
}

function updateNumericals(data) {
  console.log('Entering updateNumericals');
  $('#voltageTotal').text(data.voltage);
  $('#voltageLower').text(data.voltsLower);
  $('#voltageUpper').text(data.voltage - data.voltsLower);
  $('#Current').text(data.current);
  $('#RPM').text(data.rpm);
  $('#Speed').text(data.speed);
  $('#lat-text').text(data.lat);
  $('#lon-text').text(data.lon);
  $('#Throttle').text(data.throttle);
}

function updateTime() {
  dataSeconds = 60 * $('#graphCount').val();

};