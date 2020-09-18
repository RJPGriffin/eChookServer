var dataApp = new Vue({
  el: '#data-app',
  data: {
    active: false,
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
        show: true
      },
      vLower: {
        title: "Lower Battery",
        value: 12,
        low: 10,
        high: 17,
        max: 17,
        min: 0,
        unit: "Volts",
        show: true
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
        show: true
      },
      speed: {
        title: "Motor Speed",
        value: 20,
        low: 0,
        high: 50,
        max: 50,
        min: 0,
        unit: "Mph",
        show: true
      },
      throttle: {
        title: "Throttle",
        value: 100,
        low: 0,
        high: 101,
        max: 100,
        min: 0,
        unit: "%",
        show: true
      },
      tempOne: {
        title: "Temperature 1",
        value: 17,
        low: 0,
        high: 50,
        max: 70,
        min: 0,
        unit: "°c",
        show: true
      },
      tempTwo: {
        title: "Temperature 2",
        value: 27,
        low: 0,
        high: 50,
        max: 70,
        min: 0,
        unit: "°c",
        show: true
      },
      ah: {
        title: "Amp Hours Used",
        value: 4,
        low: 0,
        high: 25,
        max: 34,
        min: 0,
        unit: "Ah",
        show: true
      },
      brake: {
        title: "Brake",
        value: 0,
        low: 0,
        high: 0,
        max: 1,
        min: 0,
        unit: "",
        show: true
      },
      lap: {
        title: "Lap Number",
        value: 2,
        low: 0,
        high: 70,
        max: 70,
        min: 0,
        unit: "",
        show: true
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
    getData: function () {
      let url = "https://data.echook.uk/api/get/Demo";
      $.get(url, function (data, status) {
        if (status === "success") {

          //         //Convert incoming m/s speed to MPH
          //         data.speed = data.speed * 2.23694;
          //
          //         this.vTotal.value = data.voltage;
          //         this.vLower.value = data.voltsLower;
          //         this.latest.vUpper.value = data.voltage - data.voltsLower;
          //         this.latest.current.value = data.current;
          //         this.latest.ah.value = data.ampH;
          //         this.latest.rpm.value = data.rpm;
          //         this.latest.speed.value = data.speed.toFixed(1);
          //         this.latest.lat.value = data.lat;
          //         this.latest.lon.value = data.lon;
          //         this.latest.throttle.value = data.throttle;
          //         this.latest.tempOne.value = data.temp1;
          //         this.latest.tempTwo.value = data.temp2;
          //         this.latest.brake.value = data.brake == 1 ? "ON" : "OFF";
          //         // if (data.track != currTrack) {
          //         //   currTrack = data.track;
          //         //   if (data.track != "") {
          //         //     $('#MapTitle').text(`Map - ${data.track}`);
          //         //   } else {
          //         //     $('#MapTitle').text(`Map`);
          //         //   }
          //         // }
          //         //
          //         // if (currLap != data.currLap) {
          //         //   $('#LapNumber').text(data.currLap.toFixed(0));
          //         //   $('#LLLap').text(currLap.toFixed(0));
          //         //   $('#LLTime').text(data.LL_Time);
          //         //   $('#LLVolts').text(data.LL_V);
          //         //   $('#LLCurrent').text(data.LL_I);
          //         //   $('#LLSpeed').text(data.LL_Spd);
          //         //   $('#LLRPM').text(data.LL_RPM);
          //         //   $('#LLAH').text(data.LL_Ah);
          //         //   currLap = data.currLap;
          //         //   jasc
        } else {
          console.log('Get Data returned status: ' + status);
        }
        //
      });
    }
  }
})