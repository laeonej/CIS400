// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);


app.set('port', 5000);
app.use('/', express.static(__dirname + '/static'));

// Starts the server.
server.listen(5000, function () {
    console.log('Starting server on port 5000');
});

// Add the WebSocket handlers
io.on('connection', function (socket) {
});

setInterval(function () {
    io.sockets.emit('message', 'hi!');
}, 1000);

// hi

