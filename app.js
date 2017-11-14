const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const socket = require('socket.io');


// App setup
var app = express();
var jsonParser = bodyParser.json();
app.set('view engine', 'ejs');

var server = app.listen(4000, function() {
  console.log('listening for requests on port 4000,');
});

app.use(express.static('public'));

// app.post('/post/:id', jsonParser, function(req, res) {
//   console.log(req.params.id + ' posted ' + JSON.stringify(req.body));
//   res.status(200).end();
//
// });

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

  console.log('made socket connection', socket.id);

});
