new Vue({
  el: '#cars-vue',
  data: {
    message: 'Last refreshed: ' + new Date().toLocaleString(),
    cars: [{
      name: 'car1',
      raceNum: '300',
      secure: '0'
    }, {
      name: 'car2',
      raceNum: '20',
      secure: '0'
    }]
  }
});
