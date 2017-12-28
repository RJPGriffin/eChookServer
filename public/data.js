console.log('Recieved: Car: ' + car);
console.log('Recieved: ID: ' + id);

var url = "";
if (car === "eChook Demo Car") {
  //url = 'http://data.echook.uk/api/get/Demo';
  url = 'http://localhost:3000/api/get/Demo';
} else {
  url = 'http://data.echook.uk/api/get/' + id;
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


setInterval(function addData() {


  $.get(url, function(data, status) {
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

    voltageChart.update();

    movePointer(map, marker, {
      lat: data.lat,
      lng: data.lon
    });


  })
}, 2000);

function updateTime() {
  dataSeconds = 60 * $('#graphCount').val();

};

function updateNumericals(data) {
  $('#voltageTotal').text(data.voltage);
  $('#voltageLower').text(data.voltsLower);
  $('#voltageUpper').text(data.voltage - data.voltsLower);
  $('#Current').text(data.current);
  $('#RPM').text(data.rpm);
  $('#Speed').text(data.speed);
}

//Map Stuff
function initializeMap() {

  var myLatLng = new google.maps.LatLng(50.8599424, -0.7623057),
    myOptions = {
      zoom: 15,
      center: myLatLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    map = new google.maps.Map(document.getElementById('map'), myOptions),
    marker = new google.maps.Marker({
      position: myLatLng,
      map: map
    });

  var pos = {
    lat: 50.8599424,
    lng: -0.7623057
  }

  marker.setMap(map);
  movePointer(map, marker, pos);

}

function movePointer(map, marker, pos) {

  marker.setPosition(new google.maps.LatLng(pos.lat, pos.lng));
  map.panTo(new google.maps.LatLng(pos.lat, pos.lng));

};

// initializeMap();

// function initMap() {
//   var uluru = {
//     lat: -25.363,
//     lng: 131.044
//   };
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 4,
//     center: uluru
//   });
//   var marker = new google.maps.Marker({position: uluru, map: map});
// }