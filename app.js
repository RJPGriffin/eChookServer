const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport'); //I think this is superceded by the line above... maybe
const pptSetup = require('./Config/passport-setup.js'); //just to run the passport setup
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const routes = require('./Routes/routes');
const authRoutes = require('./Routes/authRoutes');
const Cars = require('./models/Cars');
const db = require('./Private/database.js')



//Connect to Database
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${db.user}:${db.password}@${db.url}`).then(() => console.log('connection succesful')).catch((err) => console.error(err));

process.on('unhandledRejection', error => {
  // Prints "unhandledRejection woops!"
  console.log('unhandledRejection', error);
});

// App setup
var app = express();


app.use(morgan('dev')); // log every request to the console


//required for passport
app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser()); //doesn't seem to like being called like this
app.set('view engine', 'ejs');
app.use(session({
  secret: '29526276372102',
  resave: false,
  saveUninitialized: true,
  maxAge: 60 * 60 * 1000,
  cookie: {
    secure: false
  }
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/', routes);
app.use('/auth', authRoutes);



//Send Stylesheets
app.use(express.static('public'));

//error handling middleware
app.use(function(error, rew, res, next) {
  console.log('error handling middleware');
  if (error) {
    console.log(error);
    res.status(422).send({ //TODO Flesh this out
      message: err.message,
      error: error
    })
  }

});


var server = app.listen(3000, function() {
  console.log('listening for requests on port 3000,');
});