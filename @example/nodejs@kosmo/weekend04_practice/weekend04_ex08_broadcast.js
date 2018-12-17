//브로드캐스트 - 요청한 소켓 외에 모든 소켓에 전달

var io = require('socket.io').listen(3000);

io.sockets.on('connection', function(socket){
    socket.on('ferret', function(name, callback) {
        console.log(name);
        name.age = 30;
        callback(name, 'hehehe');
    });
    
    socket.broadcast.emit('user connected');
});