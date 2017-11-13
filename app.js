const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');



var app = express(); //Create express app
var jsonParser = bodyParser.json();
app.set('view engine', 'ejs');
app.listen(3000);

app.post('/post/:id', jsonParser, function(req, res) {
  console.log(req.params.id + ' posted ' + JSON.stringify(req.body));
  res.status(200).end();

});

app.use('/post', function(req, res) {
  //handle post data to /post
});

app.get('/', function(req, res) {
  res.render('cars.ejs');
});

app.get('/post/:id', function(req, res) {
  res.send('Read dynamic route ' + req.params.id);

});
