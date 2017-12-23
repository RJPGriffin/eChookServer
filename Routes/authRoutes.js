const express = require('express');
const router = express.Router();
const passport = require('passport');
const bodyParser = require('body-parser');


var urlEncodedParser = bodyParser.urlencoded({
  extended: false
});


router.get('/login', function(req, res) {

  // render the page and pass in any flash data if it exists
  res.render('login.ejs');

});

router.get('/register', function(req, res) {

  // render the page and pass in any flash data if it exists
  res.render('addCar.ejs');

});


router.post('/register', urlEncodedParser, passport.authenticate('local-signup', {
  successRedirect: '/', // redirect to the secure profile section
  failureRedirect: '/auth/register', // redirect back to the signup page if there is an error
  session: true,
  failureFlash: true // allow flash messages
}));

router.get('/signup', function(req, res) {

  // render the page and pass in any flash data if it exists
  res.render('signup.ejs', {
    message: req.flash('signupMessage')
  });
});


router.post('/signup', urlEncodedParser, passport.authenticate('local-signup', {
  successRedirect: '/', // redirect to the secure profile section
  failureRedirect: '/auth/signup', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));

router.post('/login', urlEncodedParser, passport.authenticate('local-login', {
  successRedirect: '/', // redirect to the secure profile section
  failureRedirect: '/', // redirect back to the signup page if there is an error
  failureFlash: false // allow flash messages
}));

module.exports = router;