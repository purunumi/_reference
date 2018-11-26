var http = require('http');

// 웹 서버 객체를 만든다.
var server = http.createServer();

//3000번 포트로 요청 대기 포트 지정
var port = 3000;
server.listen(port, function() {
   console.log('웹 서버가 시작 되었습니다.', port); 
});