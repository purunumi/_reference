//day01_ex07_http_2.js

var http = require('http');

var server = http.createServer();

//확장기능에 Beautify 설치하면 
//Ctrl+Shift+L 단축키로 자동 줄 맞춤.
server.on('request', function (req, res) {
    console.log('request 요청 받음.');

    res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>국민여러분 안녕하세요.</h1>');
    res.end();
    //약간의 시간이 걸린다.
    server.close();
});

server.on('connection', function(socket) {
    console.log('connection 됨.');
    console.log(socket.timeout);
});

server.on('close', function() {
    console.log('연결이 끊김');
});

var port = 3000;
server.listen(port, function () {
    console.log('http://localhost:%d', port);
});
