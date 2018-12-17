var http = require('http');
var express = require('express');
var app = express();

var server = http.createServer(app);
server.listen(3000, function() {
    console.log("http://localhost:3000");
});

var io = require('socket.io').listen(server);

//client_socket_ex04_event.html 요청이 들어올 것이다.
io.sockets.on('connection', function(socket) {
    console.log('connected ...');
    
    //io.socket.emit()은 모든 접속자에게 메세지를 보낸다.
    io.sockets.emit('this', {msg:'server messages'});
    
    socket.on('disconnect', function() {
        io.sockets.emit('user connected');
    });
    
    socket.on('private msg', function(data, message) {
        console.log(data, message);
    });
    
});