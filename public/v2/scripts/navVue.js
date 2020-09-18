var navVue = new Vue({
  el: '#navVue',
  data: {
    scrolled: 0,
    narrow: 0,
    logoText: "eChook",
    nav: [{
      name: "Documentation",
      link: "http://docs.echook.uk/"
    }, {
      name: "Forum",
      link: "https://echook.boards.net/"
    }, {
      name: "Live Data",
      link: "data.echook.uk"
    }]
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 50;
    }
  },
  watch: {
    scrolled: function() {
      if (this.scrolled) {
        this.logoText = "eC"
      } else {
        this.logoText = "eChook"
      }
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize)
  }
})