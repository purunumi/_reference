var server = require('http').createServer(handler).listen(3000);
var io = require('socket.io').listen(server);
var fs = require('fs');

var handler = function (req, res) {
    console.log('createServer handler 함수 호출~');
};

io.sockets.on('connection', function (socket) {
    socket.emit('news', {
        hello: 'world'
    });
    socket.on('my', function (data) {
        console.log(data);
        var fileUrl = __dirname + "/public/server_data.json";
        fs.readFile(fileUrl, function (err, file) {
            if (err) {
                return err;
            }
            if (data) {
                socket.emit('file', file);
            }
        });
    });
});
