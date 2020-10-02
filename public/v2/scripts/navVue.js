var navVue = new Vue({
  el: '#navVue',
  data: {
    scrolled: 0,
    loggedIn: 0,
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
    }],
    login:{
    }
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 50;
    },
    logOut: function() {
      this.loggedIn = false;
      dataApp.active = false;
      loginApp.active = true;
      let status = JSON.parse(localStorage.currentStatus);
      status.loggedIn = false;
      localStorage.currentStatus = JSON.stringify(status);
    },
  },
  watch: {
    scrolled: function() {
      if (this.scrolled) {
        this.logoText = "eC"
      } else {
        this.logoText = "eChook"
      }
    },
    loggedIn: function(){
      if(this.loggedIn){
        this.login.text = "Log Out";
      }else{
        this.login.text = "Log In";
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