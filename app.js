const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./Routes/routes');
const Cars = require('./models/Cars');


//Connect to Database
mongoose.connect('mongodb://echookServer:echookdatabasepassword@ds259855.mlab.com:59855/echook-cars')
mongoose.Promise = global.Promise;

// App setup
var app = express();
app.use(routes);
app.set('view engine', 'ejs');
//Send Stylesheets
app.use(express.static('public'));


var server = app.listen(3000, function() {
  console.log('listening for requests on port 4000,');
});
