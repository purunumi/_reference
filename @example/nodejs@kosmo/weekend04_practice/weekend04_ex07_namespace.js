var http = require('http');
var express = require('express');
var app = express();
var socketio = require('socket.io');

app.set('port', process.env.PORT || 3000);

var server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log("http://localhost:%d", app.get('port'));
});

var io = socketio.listen(server);

// socoket.io의 네임스페으스 .of()함수 사용
var chat = io.of('/chat').on('connection', function(socket) {
    console.log("chat connection ...");
    socket.emit('conn');
    
    socket.on('hi', function(msg) {
        console.log(msg);
    });
    
    socket.emit('a msg', {name:'chat', age:25});
});

var news = io.of('/news');
news.on('connection', function(socket) {
    console.log("news connection ...");
    socket.emit('conn');
    
    socket.on('hi', function(msg) {
        console.log(msg);
    });
    
    socket.emit('a msg', {name:'news', age:28});
});