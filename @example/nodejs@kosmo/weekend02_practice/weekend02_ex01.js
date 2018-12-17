//기본 모듈 불러오기
var http = require('http');
var express = require('express');
var app = express();

var router = express.Router();



app.set('port', process.env.PORT || 3000);

/*app.use(function (req, res, next) {
    console.log('/로 미들웨어 요청');
    
    //res.writeHead(200, {'Content-Type': 'text/html;charset=utf8'});
    //res.write('<h2>기본 요청이 들어왔다!</h2>');
    //res.end();
});*/

/*app.get('/', function(req, res) {
    console.log('app.get() 요청으로 /요청 들어왔다!');
});*/

//라우터를 이용한 패스 요청 처리
router.route('/').get(function(req, res) {
    console.log('router.route().get() 요청으로 /요청 들어왔다!');
});


//라우터 미들웨어 등록
app.use('/', router);

var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log('http://localhost:%d', app.get('port'));
});
