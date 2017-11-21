console.log('Recieved: Car: ' + car);

//averageing values
var alpha = 0.99;
var voltageAverage = 0;
var currentAverage = 0;
var pause = false;

// //testing a voltage chart`
// const VCHART = document.getElementById("voltageChart");
// let voltageChart = new Chart(VCHART, {
//   type: 'line',
//   data: {
//     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//     datasets: [{
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3]
//     }]
//   }
// });


var voltageChartCtx = document.getElementById("voltageChart").getContext('2d');
var voltageChart = new Chart(voltageChartCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
        label: 'Total Voltage',
        data: [],
        backgroundColor: [
          'rgba(60, 128, 195, 0.2)'
        ],
        borderColor: [
          'rgba(60, 128, 195, 1)'
        ],
        borderWidth: 2
      },
      {
        label: 'Batt1 Voltage',
        data: [],
        fill: 2,
        backgroundColor: [
          'rgba(195, 128, 60, 0.5)'
        ],
        borderColor: [
          'rgba(60, 128, 195, 1)'
        ],
        borderWidth: 1
      },
      {
        label: 'Batt2 Voltage',
        data: [],
        fill: false,
        backgroundColor: [
          'rgba(60, 128, 195, 0.2)'
        ],
        borderColor: [
          'rgba(60, 128, 195, 1)'
        ],
        borderWidth: 1
      },
      {
        label: 'Average',
        data: [],
        fill: false,
        backgroundColor: [
          'rgba(60, 128, 195, 0.2)'
        ],
        borderColor: [
          'rgba(60, 128, 195, 1)'
        ],
        borderWidth: 1
      }
    ]
  },
  options: {
    animation: {
      duration: 300
    },
    elements: {
      point: {
        radius: 0.8
      }
    },
    tooltips: {
      mode: 'nearest'
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

var currentChartCtx = document.getElementById("currentChart").getContext('2d');
var currentChart = new Chart(currentChartCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
        label: 'Current',
        data: [],
        backgroundColor: [
          'rgba(60, 128, 195, 0.2)'
        ],
        borderColor: [
          'rgba(60, 128, 195, 1)'
        ],
        borderWidth: 2
      },
      {
        label: 'Average Current',
        data: [],
        fill: 2,
        backgroundColor: [
          'rgba(195, 128, 60, 0.5)'
        ],
        borderColor: [
          'rgba(60, 128, 195, 1)'
        ],
        borderWidth: 2
      }
    ]
  },
  options: {
    animation: {
      duration: 300
    },
    elements: {
      point: {
        radius: 1
      }
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

var rpmChart = document.getElementById("rpmChart").getContext('2d');
var rChart = new Chart(rpmChart, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
        label: 'Current',
        data: [],
        backgroundColor: [
          'rgba(60, 128, 195, 0.2)'
        ],
        borderColor: [
          'rgba(60, 128, 195, 1)'
        ],
        borderWidth: 2
      },
      {
        label: 'Average Current',
        data: [],
        fill: 2,
        backgroundColor: [
          'rgba(195, 128, 60, 0.5)'
        ],
        borderColor: [
          'rgba(60, 128, 195, 1)'
        ],
        borderWidth: 2
      }
    ]
  },
  options: {
    animation: {
      duration: 300
    },
    elements: {
      point: {
        radius: 1
      }
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
  $.get("http://localhost:3000/api/get", function(data, status) {
    if (voltageAverage === 0) {
      voltageAverage = data.voltage;
    }
    if (currentAverage === 0) {
      currentAverage = data.current;
    }

    //Remove animations after 100 datapoints
    if (voltageChart.data.labels.length === 100) {
      voltageChart.options.animation.duration = 0;
      currentChart.options.animation.duration = 0;
      console.log('Disabled Animations');
    }

    alpha = voltageChart.data.labels.length / (voltageChart.data.labels.length + 1);
    console.log('Alpha = ' + alpha + ', Data Length = ' + voltageChart.data.labels.length);

    //Voltage Chart
    voltageChart.data.labels.push(data.time);
    voltageChart.data.datasets[0].data.push(data.voltage);
    voltageChart.data.datasets[1].data.push(data.voltsLower);
    voltageChart.data.datasets[2].data.push(data.voltage - data.voltsLower);
    voltageAverage = voltageAverage * alpha + data.voltage * (1 - alpha);
    voltageChart.data.datasets[3].data.push(voltageAverage);

    //Current Chart
    currentChart.data.labels.push(data.time);
    currentChart.data.datasets[0].data.push(data.current);
    currentAverage = currentAverage * alpha + data.current * (1 - alpha);
    currentChart.data.datasets[1].data.push(currentAverage);


    if (!pause) {
      voltageChart.update();
      currentChart.update();
    }
  })
}, 1000);

function pauseGraphs() {
  pause = !pause;
}
