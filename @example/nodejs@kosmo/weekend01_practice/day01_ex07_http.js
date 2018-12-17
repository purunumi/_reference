var http = require('http');

var port = 3000;
var server = http.createServer(function(req, res) {
    console.log('요청 들어옴');
    
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    res.write('hello 안녕하세요1^^');
    //res.end();
});

server.on('request', function(req, res) {
    console.log('request 이벤트 발생');
    //res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    res.write('hello 안녕하세요2^^');
    res.end();
});

server.listen(port, function() {
    console.log('http://localhost:%d', port);
});