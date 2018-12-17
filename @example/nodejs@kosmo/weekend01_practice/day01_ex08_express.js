//day01_ex08_express.js
//express 모듈 설치
//serve-static 모듈 설치
var http = require('http');
var express = require('express');
var app = express(); //express 객체
var static = require('serve-static');

//html페이지를 서비스 하기 위한 static 설정
app.use('/public', static(__dirname + "/public"));

//request-uri를 사용
app.get('/hello', function(req, res) {
   console.log('/hello 요청이 들어옴');
    
    res.writeHead(200, {'Content-Type':"text/html;charset=utf-8"});
    res.end('<h1>/hello 요청이 들어왔습니다!</h1>');
});

//express 모듈 사용법 : 
//app 객체를 createServer()의 인자로 사용.
var server = http.createServer(app);
server.listen(3000, function() {
    console.log('http://localhot:3000');
});