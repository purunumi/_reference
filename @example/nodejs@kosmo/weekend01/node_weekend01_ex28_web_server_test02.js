var http = require('http');

// 웹 서버 객체를 만든다.
var server = http.createServer();

//웹 서버를 시작하여 host와 port 지정 설정
var host = "172.30.1.2";
var port = 3000;
server.listen(port, host, '50000', function() {
   console.log('웹 서버가 시작 되었습니다. %s:%d', host, port); 
});