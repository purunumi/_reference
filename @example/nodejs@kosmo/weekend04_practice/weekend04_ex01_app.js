// weekend_ex01_app.js
// Node.js 서버 기본 구성

// http, express, static, cors
var http = require('http');
var express = require('express');
var app = express();
var static = require('serve-static');
var cors = require('cors');
var path = require('path');
var router = express.Router();

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use('/public', static( path.join(__dirname, 'public') ));

router.route('/home').get(function(req, res) {
    console.log("/home으로 접속 됨.");
    
    res.writeHead('200', {'Content-Type':'text/html;charset=utf-8'});
    res.write('<h1>즐거운 NodeJS 프로그래밍 ㅋㅋㅋ</h1>');
    res.end();
});

app.use('/', router);
var server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log("http://localhost:%d", app.get('port'));
});
