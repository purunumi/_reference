var express = require('express');
var http = require('http');
var path = require('path');

var bodyParser = require('body-parser');
var static = require('serve-static');

var app = express();
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use('/public', static(path.join(__dirname, 'public')));

var router = express.Router();
router.route('/process/login/:name').post(function(req, res) {
    console.log('/process/login/:name 처리함');
    
    var paramName = req.params.name;
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답</h1>');
    res.write('<div><p>Param name : '+ paramName +'</p></div>');
    res.write('<div><p>Param ID : '+ paramId +'</p></div>');
    res.write('<div><p>Param Password : '+ paramPassword +'</p></div>');
    res.write("<br><br><a href='/public/login2.html'>로그인 페이지</a>");
    res.end();
});


//오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

//모든 라우터 처리 후 404 오류 페이지 처리
var errorHandler = expressErrorHandler({
    static : {
        '404':'./public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404) );
app.use(errorHandler );


app.use('/', router);

var server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('서버가 실행 되었습니다. %d', app.get('port'));
});