//기본 모듈 불러오기
var http = require('http');
var express = require('express');
var app = express();

var router = express.Router();
var bodyParseer = require('body-parser');
var static = require('serve-static');
var path = require('path');

app.set('port', process.env.PORT || 3000);

app.use(bodyParseer());

app.use('/public', static(path.join(__dirname, 'public')))

//라우터를 이용한 패스 요청 처리
router.route('/').get(function(req, res) {
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
    res.write('<h2>노드js 서버 실행 중 ...</h2>');
    res.end();
});

router.route('/process/login/:name').post(function(req, res) {
    console.log('/process/login 요청 들어 옴...');
    
    var paramName = req.params.name;
    
    var paramId = req.body.id || req.query.id;
    var paramPwd = req.body.password || req.query.password;
    
    var obj = {id:paramId, pwd:paramPwd, name:paramName};
    
    console.log(obj);
    
    res.send(obj);
});

// 등록되지 않은 패스에 대한 오류 응답
app.all('*', function(req, res) {
    res.status(404).send('<h1>Error! 페이지를 찾을 수 없습니다!</h1>');
    res.status(500).send('<h1>Error! 서버에 문제가 있습니다!</h1>');
});

//라우터 미들웨어 등록
app.use('/', router);

var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log('http://localhost:%d', app.get('port'));
});
