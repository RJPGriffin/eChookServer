const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Cars = require('../models/Cars');

console.log('Passport Init');
// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session
// used to serialize the user for the session

passport.serializeUser((car, done) => {
  return done(null, car.id);
});

passport.deserializeUser((id, done) => {
  Cars.findById(id).then((car) => {
    return done(null, car);
  });
});



// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'

passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'car',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  function(req, car, password, done) {
    console.log('Entered local-signup');
    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      console.log('Checking for user in DB');
      Cars.findOne({
        'car': car
      }).then(function(err, user) {
        console.log('Finished DB Lookup. Found: ' + user);
        // if there are any errors, return the error
        if (err)
          done(err);

        // check to see if theres already a user with that car name
        // THis could be rmoved with use of unique in mongoDB... another time!
        if (user) {
          done(null, false, req.flash('signupMessage', 'That car is already registered!'));
        } else {
          // if there is no user with that email
          var newCar = new Cars();

          // set the user's local credentials
          newCar.team = req.body.team;
          newCar.car = car;
          newCar.number = req.body.number;
          newCar.email = req.body.email;
          newCar.password = newCar.generateHash(password);

          // save the user
          newCar.save().then((newCar) => {
            console.log('created new user: ', newCar);
            done(null, newCar);
          });
        }

      });

    });

  }));


passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'car',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) { // callback with email and password from our form

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    Cars.findOne({
      'car': req.body.car
    }, function(err, car) {
      // if there are any errors, return the error before anything else
      if (err)
        return done(err);

      // if no user is found, return the message
      if (!car)
        return done(null, false, req.flash('loginMessage', 'We Couldn\'t find that car!')); // req.flash is the way to set flashdata using connect-flash

      // if the user is found but the password is wrong
      if (!car.validPassword(password))
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

      // all is well, return successful user
      return done(null, car);
    });

  }));