//기본 모듈 불러오기
var http = require('http');
var express = require('express');
var app = express();

var router = express.Router();

app.set('port', process.env.PORT || 3000);

//라우터를 이용한 패스 요청 처리
router.route('/').get(function(req, res) {
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
    res.write('<h2>노드js 서버 실행 중 ...</h2>');
    res.end();
});

router.route('/test').get(function(req, res) {
    console.log('/test 요청 들어 옴...');
    
    let paramUser = req.query.user;
    
    console.log("paramUser: %s", paramUser);
    
    res.send({user:paramUser});
});

//라우터 미들웨어 등록
app.use('/', router);

var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log('http://localhost:%d', app.get('port'));
});
