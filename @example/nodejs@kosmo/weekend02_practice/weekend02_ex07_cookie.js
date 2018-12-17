//기본 모듈 불러오기
var http = require('http');
var express = require('express');
var app = express();

var router = express.Router();
var bodyParseer = require('body-parser');
var static = require('serve-static');
var path = require('path');

var cookieParser = require('cookie-parser');

app.set('port', process.env.PORT || 3000);

app.use(bodyParseer());
app.use('/public', static(path.join(__dirname, 'public')))
app.use(cookieParser());

//라우터를 이용한 패스 요청 처리
router.route('/').get(function(req, res) {
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
    res.write('<h2>노드js 서버 실행 중 ...</h2>');
    res.end();
});

router.route('/process/showCookie').get(function(req, res) {
    console.log('/process/showCookie 요청 들어 옴...');
    
    // 쿠키를 받아 올때는 req로 받아온다.
    
    res.send(req.cookies);
});

router.route('/process/setUserCookie').get(function(req, res) {
    console.log('/process/setUserCookie 요청 들어 옴...');
    
    // 쿠키를 생성할때는 res에 등록.
    res.cookie('user', {
        id: 'KIM',
        name: '방탄소년단',
        authorized: true
    });
    
    res.redirect('/process/showCookie')
});

//라우터 미들웨어 등록
app.use('/', router);
//서버 객체 생성
var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log('http://localhost:%d', app.get('port'));
});
