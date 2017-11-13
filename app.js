const http = require('http');
const express = require('express');



var app = express(); //Create express app
app.set('view engine', 'ejs');
app.listen(3000);

app.get('/', function(req, res) {
  res.render('cars.ejs');
});

app.get('/post/:id', function(req, res) {
  res.send('Read dynamic route ' + req.params.id);

});
