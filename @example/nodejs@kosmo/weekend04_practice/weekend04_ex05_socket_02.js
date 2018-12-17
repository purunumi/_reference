var io = require('socket.io').listen(3000);

io.sockets.on('connection', function(socket) {
    console.log('connection ...');
    socket.emit('news', {hello:'world'});
    socket.on('my', function(data) {
        console.log(data);
    });
});