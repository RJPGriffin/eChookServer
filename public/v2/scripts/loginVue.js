var loginApp = new Vue({
  el: '#login-app',
  data: {
    active: true,
    teamCode: "",
    validCode: 0,
    pastLogins: [],
    snippets: {
      loginMessage: "Enter Team Code",
      clearText: "Clear History",
      title: "Live Data Login",
      codeReq: "Enter Team and Car Details"
    },
    screens: {
      login: 1,
      register: 0
    },
    register: {
      car: "",
      team: "",
      valid: 0
    }
  },
  mounted() {
    if(localStorage.currentStatus){
      let status = JSON.parse(localStorage.currentStatus);
      if(status.loggedIn === true){
        this.loginWithCode(status.code);
      }
    }
    if (localStorage.logins) {
      this.pastLogins = JSON.parse(localStorage.logins);
      console.log(`Logins found: ${JSON.stringify(this.pastLogins)}`);
    }

  },
  watch: {
    teamCode: function() {

    }
  },
  computed: {
    loginButtonText: function() {
      let check = 1;
      let text = '';
      if (this.teamCode.length === 0) {
        text = "Enter Team Code";
        check = 0;
      }
      if (this.teamCode.length < 8 && this.teamCode.length > 0) {
        check = 0;
        text = "Too Short"
      }
      regexp = /^[A-Za-z0-9]+$/;
      if (this.teamCode.length > 0 && !regexp.test(this.teamCode)) {
        check = 0;
        text = "Invalid Characters (A-Z, 1-9 only)"
      }

      if (this.teamCode.toLowerCase() === "teamcode") {
        check = 0;
        text = "Smartass :)"
      }

      if (check) {
        text = "Go!";
      }
      this.validCode = check
      return (text);

    },
    regButtonText: function() {
      let text = '';
      if (this.register.car.length > 0 && this.register.team.length > 0) {
        text = "Get Code";
        this.register.valid = 1;
      } else {
        text = "Enter Team and Car Details";
        this.register.valid = 0;
      }
      return (text);
    }

  },
  methods: {
    newLogin: function() {
      if (this.validCode) {
        console.log(`Loging in with code ${this.teamCode}`);
        let matched = 0;
        for (const login of this.pastLogins) {
          if (login.code === this.teamCode) {
            matched = 1;
          }
        }
        if (!matched) {
          let obfuscated = this.teamCode.charAt(0) + "******" + this.teamCode.charAt(7);
          this.pastLogins.push({
            car: "Test Car",
            code: this.teamCode,
            codeObs: obfuscated,
            team: "team"
          })
          localStorage.logins = JSON.stringify(this.pastLogins);
          this.loginWithCode(this.teamCode);
        }
      }
    },
    prevLogin: function(i) {
      let code = this.pastLogins[i].code;
      this.loginWithCode(code);
    },
    loginWithCode: function(code){
      localStorage.currentStatus = JSON.stringify({ loggedIn: true, code: code });
      console.log(`Login with code: ${code}`);
      dataApp.carCode = code;
      this.active = false;
      navVue.loggedIn = true;
      dataApp.active = true;
    },
    clearHistory: function() {
      if (this.snippets.clearText === "Clear History") {
        this.snippets.clearText = "Definitely Clear History?";
      } else {
        this.snippets.clearText = "Clear History"
        this.pastLogins = [];
        localStorage.logins = [];
      }
    },
    toRegistration: function() {
      this.snippets.title = "Get your codes here!"
      this.screens.login = 0;
      this.screens.register = 1;
    },
    toLogin: function() {
      this.snippets.title = "Live Data Login"
      this.screens.login = 1;
      this.screens.register = 0;
    }
    /*,
        updateRegText: function() {
          console.log(`updated`);
          if (this.register.car.length > 0 && this.register.team.length > 0) {
            this.snippets.codeReq = "Get Code";
            this.register.valid = 1;
          } else {
            this.snippets.codeReq = "Enter Team and Car Details";
            this.register.valid = 0;
          }

        }*/
  }
})