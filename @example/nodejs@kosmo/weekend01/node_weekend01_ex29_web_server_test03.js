 var http = require('http');
var server = http.createServer();
server.on('request', function(request, response) {
    server.close();
    response.end('Hello');
});
server.on('connection', function(request, response) {
	console.log('connection event');
});
server.on('close', function() {
	console.log('close event');
});
server.listen(3000);



