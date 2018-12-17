var socketio = require('socket.io');
var http = require('http');
var express = require('express');
var static = require('serve-static');
var path = require('path');

var app = express();


var server = http.createServer(app).listen(3000, function() {
    console.log("http://localhost:3000");
});

var io = socketio.listen(server);
io.sockets.on('connection', function(socket) {
    console.log('socket connected!');
    socket.emit('news', {hello:"hello"});
    socket.on('mydata', function(data) {
        console.log(data);
    });
});
