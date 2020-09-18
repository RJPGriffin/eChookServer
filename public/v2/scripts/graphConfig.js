var graphConfig = {
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
};