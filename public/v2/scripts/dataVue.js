// Placeholder
var voltageChart = {};

//Map
//Map Variables
var map;
var marker;
var trackLocation = "";
var currTrack = "";


var dataApp = new Vue({
  el: '#data-app',
  data: {
    active: false,
    role: 'member',
    views: {
      numerical: {
        active: true
      },
      laps: {
        active: true
      },
      graph: {
        active: true
      },
      map: {
        active: true
      }
    },
    latest: {
      vTotal: {
        title: "Voltage Total",
        value: 24,
        low: 20,
        high: 24,
        max: 34,
        min: 15,
        unit: "Volts",
        show: true
      },
      vUpper: {
        title: "Upper Battery",
        value: 12,
        low: 10,
        high: 17,
        max: 17,
        min: 0,
        unit: "Volts",
        show: false
      },
      vLower: {
        title: "Lower Battery",
        value: 12,
        low: 10,
        high: 17,
        max: 17,
        min: 0,
        unit: "Volts",
        show: false
      },
      current: {
        title: "Current",
        value: 20,
        low: 0,
        high: 30,
        max: 35,
        min: 6,
        unit: "Amps",
        show: true
      },
      rpm: {
        title: "Motor Speed",
        value: 1800,
        low: 0,
        high: 2400,
        max: 3000,
        min: 1600,
        unit: "RPM",
        show: false
      },
      speed: {
        title: "Speed",
        value: 20,
        low: 0,
        high: 50,
        max: 50,
        min: 0,
        unit: "Mph",
        show: false
      },
      throttle: {
        title: "Throttle",
        value: 100,
        low: 0,
        high: 101,
        max: 100,
        min: 0,
        unit: "%",
        show: false
      },
      tempOne: {
        title: "Temperature 1",
        value: 17,
        low: 0,
        high: 50,
        max: 70,
        min: 0,
        unit: "°c",
        show: false
      },
      tempTwo: {
        title: "Temperature 2",
        value: 27,
        low: 0,
        high: 50,
        max: 70,
        min: 0,
        unit: "°c",
        show: false
      },
      ah: {
        title: "Amp Hours Used",
        value: 4,
        low: 0,
        high: 25,
        max: 34,
        min: 0,
        unit: "Ah",
        show: false
      },
      brake: {
        title: "Brake",
        value: 0,
        low: 0,
        high: 0,
        max: 1,
        min: 0,
        unit: "",
        show: false
      },
      lap: {
        title: "Lap Number",
        value: 2,
        low: 0,
        high: 70,
        max: 70,
        min: 0,
        unit: "",
        show: false
      },
      location: {
        title: "GPS Location",
        lat: 0,
        lng: 0,
        show: false
      }
    },
    sessions: [{
      start: 'time',
      finish: 'time',
      laps: [{
          lap: 1,
          v: 23.5,
          i: 20,
          rpm: 1800,
          speed: 20,
          time: "1m20s"
        },
        {
          lap: 2,
          v: 22,
          i: 19,
          rpm: 1800,
          speed: 20,
          time: "1m20s"
        },
        {
          lap: 3,
          v: 21,
          i: 18,
          rpm: 1800,
          speed: 20,
          time: "1m20s"
        },
      ]
    }, ],
    chartOptions: {
      dataSeconds: 600,
      alpha: 0.9889,
    }
  },
   watch: {
    active: function () {
      if (this.active) {
        setTimeout(() => this.activateGraph(), 200); //Gives time for the canvas element to be loaded to the DOM before placing graph
        this.sessions[0].start = new Date();

        //Start the data polling
        var poll = setInterval(function () {
          this.getData();
        }.bind(this), 2000);

        // initializeMap
        setTimeout(() => this.initializeMap(), 200);


      } else {
        poll.clearInterval();
      }
    },
    views: function () {
      if (views.graph.active) setTimeout(() => this.activateGraph(), 200); //Gives time for the canvas element to be loaded to the DOM before placing graph
    }
  },
  computed: {

  },
  ready: function () {
    this.getData();

    setInterval(function () {
      this.getData();
    }.bind(this), 2000);
  },
  methods: {
    activateGraph: function () {
      var voltageChartCtx = document.getElementById("voltageChart").getContext('2d');
      voltageChart = new Chart(voltageChartCtx, graphConfig);
    },
    initializeMap: function(){
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
    },
    isAdmin: function () {
      return (this.role === 'admin');
    },
    getData: function () {
      // let url = "https://data.echook.uk/api/get/Demo";
      let url = "http://localhost:3000/api/get/Demo";
      let latest = this.latest;
      let vm = this;
      $.get(url, function (data, status) {
        if (status === "success") {
          vm.updateaLatestData(data);
        } else {
          console.log('Get Data returned status: ' + status);
        }
        //
      });
    },
    updateaLatestData: function (data) {
      data.speed = data.speed * 2.23694;

      // console.log(data);

      if (data.hasOwnProperty('voltage')) {
        this.latest.vTotal.value = data.voltage;
        this.latest.vTotal.show = true;
      }
      if (data.hasOwnProperty('voltsLower')) {
        this.latest.vLower.value = data.voltsLower;
        this.latest.vLower.show = true;
      }
      if (data.hasOwnProperty('voltage')) {
        this.latest.vUpper.value = (data.voltage - data.voltsLower).toFixed(2);
        this.latest.vUpper.show = true;
      }
      if (data.hasOwnProperty('current')) {
        this.latest.current.value = data.current;
        this.latest.current.show = true;
      }
      if (data.hasOwnProperty('ampH')) {
        this.latest.ah.value = data.ampH;
        this.latest.ah.show = true;
      }
      if (data.hasOwnProperty('rpm')) {
        this.latest.rpm.value = data.rpm;
        this.latest.rpm.show = true;
      }
      if (data.hasOwnProperty('speed')) {
        this.latest.speed.value = data.speed.toFixed(1);
        this.latest.speed.show = true;
      }
      if (data.hasOwnProperty('lat')) {
        this.latest.location.lat = data.lat;
      }
      if (data.hasOwnProperty('lon')) {
        this.latest.location.lng = data.lon;
      }
      if (data.hasOwnProperty('throttle')) {
        this.latest.throttle.value = data.throttle;
        this.latest.throttle.show = true;
      }
      if (data.hasOwnProperty('temp1')) {
        this.latest.tempOne.value = data.temp1;
        this.latest.tempOne.show = true;
      }
      if (data.hasOwnProperty('temp2')) {
        this.latest.tempTwo.value = data.temp2;
        this.latest.tempTwo.show = true;
      }
      if (data.hasOwnProperty('brake')) {
        this.latest.brake.value = data.brake == 1 ? "ON" : "OFF";
        this.latest.brake.show = true;
      }
      // if (data.track != currTrack) {
      //   currTrack = data.track;
      //   if (data.track != "") {
      //     $('#MapTitle').text(`Map - ${data.track}`);
      //   } else {
      //     $('#MapTitle').text(`Map`);
      //   }
      // }
      //
      // if (currLap != data.currLap) {
      //   $('#LapNumber').text(data.currLap.toFixed(0));
      //   $('#LLLap').text(currLap.toFixed(0));
      //   $('#LLTime').text(data.LL_Time);
      //   $('#LLVolts').text(data.LL_V);
      //   $('#LLCurrent').text(data.LL_I);
      //   $('#LLSpeed').text(data.LL_Spd);
      //   $('#LLRPM').text(data.LL_RPM);
      //   $('#LLAH').text(data.LL_Ah);
      //   currLap = data.currLap;
      //   jasc

      this.updateGraphData(data);
    },
    updateGraphData: function (data) {
      
      let chartLength = voltageChart.data.datasets[0].data.length-1;
      chartLength = chartLength > 0 ? chartLength:0;
      // console.log(`Chart Length = ${chartLength}`);
      
      alpha = Number(this.chartOptions.alpha);
      
      // Averages:
      let voltageAverage, currentAverage, rpmAverage, speedAverage;
      if(chartLength == 0){
        voltageAverage = this.latest.vTotal.value;
        currentAverage = this.latest.current.value;
        rpmAverage = this.latest.rpm.value/100;
        speedAverage = this.latest.speed.value;

      }else{
        voltageAverage = voltageChart.data.datasets[1].data[chartLength];
        currentAverage = voltageChart.data.datasets[3].data[chartLength];
        rpmAverage = voltageChart.data.datasets[5].data[chartLength];
        speedAverage = voltageChart.data.datasets[7].data[chartLength];
      }
      
      
      voltageChart.data.labels.push(data.time);
      voltageChart.data.datasets[0].data.push(this.latest.vTotal.value);
      voltageAverage = voltageAverage * alpha + (this.latest.vTotal.value) * (1 - alpha);
      voltageChart.data.datasets[1].data.push(voltageAverage);
      
      //Current
      voltageChart.data.datasets[2].data.push(this.latest.current.value);
      currentAverage = currentAverage * alpha + this.latest.current.value * (1 - alpha);
      voltageChart.data.datasets[3].data.push(currentAverage);

      //RPM
      let rpmMod = this.latest.rpm.value / 100; // Scaled down to fit on graph nicely
      voltageChart.data.datasets[4].data.push(rpmMod);
      rpmAverage = rpmAverage * alpha + (rpmMod * (1 - alpha));
      voltageChart.data.datasets[5].data.push(rpmAverage);

      //Speed
      voltageChart.data.datasets[6].data.push(this.latest.speed.value);
      speedAverage = speedAverage * alpha + (this.latest.speed) * (1 - alpha);
      voltageChart.data.datasets[7].data.push(speedAverage);

      while (voltageChart.data.labels.length > this.chartOptions.dataSeconds) {
          voltageChart.data.labels.splice(0, 1);;
          voltageChart.data.datasets.forEach((dataset) => {
          dataset.data.splice(0, 1);;
        });
      }
      
      voltageChart.update();
    }
  }
  
})