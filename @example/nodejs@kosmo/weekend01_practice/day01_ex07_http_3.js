var fs = require('fs');
var http = require('http');


var server = http.createServer();

server.on('request', function(req, res) {
    var rfs = fs.createReadStream('./hello.txt',{flag:'r'});
    rfs.pipe(res);
});

var port = 3000;
server.listen(port,function() {
    console.log('http://localhost:%d', port);
});