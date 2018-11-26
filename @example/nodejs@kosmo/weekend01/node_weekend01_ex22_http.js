//http 모듈을 사용해 사용자 요청 시 파일 읽기
var fs = require('fs');
var http = require('http');

var server = http.createServer(function(req, res) {
    // 파일을 읽어 응답 스트림과 pipe()로 연결
    var instream = fs.createReadStream('./output.txt');
    instream.pipe(res);
});

server.listen(3000);