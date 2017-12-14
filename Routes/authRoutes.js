const express = require('express');
const router = express.Router();
const passport = require('passport');

//Auth Routes. /auth not required
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
  })
);

router.get('/login', function(req, res) {

  // render the page and pass in any flash data if it exists
  res.render('login.ejs');

});

router.get('/register', function(req, res) {

  // render the page and pass in any flash data if it exists
  res.render('addCar.ejs');

});


router.post('/register', passport.authenticate('local-signup', {
  successRedirect: '/', // redirect to the secure profile section
  failureRedirect: '/auth/register', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));

router.get('/signup', function(req, res) {

  // render the page and pass in any flash data if it exists
  res.render('signup.ejs', {
    message: req.flash('signupMessage')
  });
});


router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/', // redirect to the secure profile section
  failureRedirect: '/auth/signup', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));

// router.get('/login',passport.authenticate('local') (req, res)=>{
// //handle local login with passport
//
// })

module.exports = router;