// weekend04_ex10_chat01.js

var http = require('http');
var express = require('express');
var app = express();
var socketio = require('socket.io');
var cors = require('cors');
var static = require('serve-static');
var path = require('path');

app.set('port', process.env.PORT || 3000);

app.use( cors() );
app.use('/public', static(path.join(__dirname,"public")));

var server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log("http://localhost:%d", app.get('port'));
});

var io = socketio.listen(server);
io.sockets.on('connection', function(socket) {
    console.log('connection ...', socket.request.connection._peername);
    //console.dir(socket);
    
    socket.remoteAddress = socket.request.connection._peername.address;
    socket.remotePort = socket.request.connection._peername.port;
    
    //console.log(socket.remoteAddress, socket.remotePort)
    
    socket.on('message', function(message) {
        console.log(message);
        
        if(message.recepient == 'All') {
            console.log("모든 접속자에게 메세지 전달")
            io.sockets.emit('message', message);
        }
    });
});





