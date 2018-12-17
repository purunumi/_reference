var io = require('socket.io').listen(3000);

io.sockets.on('connection', function(socket) {
    socket.on('msg', function(data) {
        console.log(data);
        setTimeout(function() {
            socket.emit('msg_by_server', "Server got youre message: " + data); 
        }, 1000);
    });
});