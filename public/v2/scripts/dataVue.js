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
        title: "Motor Speed",
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
    },]
  },
  watch: {
    active: function () {
      if (this.active) {
        setTimeout(() => this.activateGraph(), 200); //Gives time for the canvas element to be loaded to the DOM before placing graph
        this.sessions[0].start = new Date();
      }
    },
    views: function () {
      if (views.graph.active) setTimeout(() => this.activateGraph(), 200); //Gives time for the canvas element to be loaded to the DOM before placing graph
    }
  },
  computed: {

  },
  methods: {
    activateGraph: function () {
      var voltageChartCtx = document.getElementById("voltageChart").getContext('2d');
      var voltageChart = new Chart(voltageChartCtx, graphConfig);
    },
    isAdmin: function () {
      return(this.role === 'admin');
    },
    getData: function () {
      // let url = "https://data.echook.uk/api/get/Demo";
      let url = "http://localhost:3000/api/get/Demo";
      let vm = this;
      $.get(url, function (data, status) {
        if (status === "success") {

                  //Convert incoming m/s speed to MPH
                  data.speed = data.speed * 2.23694;

                  console.log(data);
          
                  if(data.hasOwnProperty('voltage')) {
                     vm.latest.vTotal.value = data.voltage;
                     vm.latest.vTotal.show = true;
                  }
                  if(data.hasOwnProperty('voltsLower')) {
                     vm.latest.vLower.value = data.voltsLower;
                     vm.latest.vLower.show = true;
                  }
                  if(data.hasOwnProperty('voltage')) {
                     vm.latest.vUpper.value = (data.voltage - data.voltsLower).toFixed(2);
                     vm.latest.vUpper.show = true;
                  }
                  if(data.hasOwnProperty('current')) {
                     vm.latest.current.value = data.current;
                     vm.latest.current.show = true;
                  }
                  if(data.hasOwnProperty('ampH')) {
                     vm.latest.ah.value = data.ampH;
                     vm.latest.ah.show = true;
                  }
                  if(data.hasOwnProperty('rpm')) {
                     vm.latest.rpm.value = data.rpm;
                     vm.latest.rpm.show = true;
                  }
                  if(data.hasOwnProperty('speed')) {
                     vm.latest.speed.value = data.speed.toFixed(1);
                     vm.latest.speed.show = true;
                  }
                  if(data.hasOwnProperty('lat')) {
                     vm.latest.location.lat = data.lat;
                  }
                  if(data.hasOwnProperty('lon')) {
                     vm.latest.location.lng = data.lon;
                  }
                  if(data.hasOwnProperty('throttle')) {
                     vm.latest.throttle.value = data.throttle;
                     vm.latest.throttle.show = true;
                  }
                  if(data.hasOwnProperty('temp1')) {
                     vm.latest.tempOne.value = data.temp1;
                     vm.latest.tempOne.show = true;
                  }
                  if(data.hasOwnProperty('temp2')) {
                     vm.latest.tempTwo.value = data.temp2;
                     vm.latest.tempTwo.show = true;
                  }
                  if(data.hasOwnProperty('brake')) {
                     vm.latest.brake.value = data.brake == 1 ? "ON" : "OFF";
                     vm.latest.brake.show = true;
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
        } else {
          console.log('Get Data returned status: ' + status);
        }
        //
      });
    }
  }
})