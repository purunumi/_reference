var http = require('http');
var path = require('path');
var static = require('serve-static');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var express = require('express');

var app = express();
var router = express.Router();

app.set('port', process.env.PORT || 3000);
app.use('/public', static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));



// 로그인
router.route('/process/login').post(function(req, res){
    console.log('/process/login 요청');

    let paramId = req.body.id || req.query.id;
    let paramPwd = req.body.pwd || req.query.pwd;

    console.log(req.session);

    if(req.session.user){
        // 이미 로그인 되어 상품 페이지로 이동
        res.redirect('/public/product.html');
    }else{
        // 세션 저장
        req.session.user= {
            id: paramId,
            pwd: paramPwd,
            authrized: true
        };

        res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
        res.write('<h1>로그인 성공</h1>');
        res.write('<div>ID: ' + paramId + '</div>');
        res.write('<div>PWD: ' + paramPwd + '</div>');
        res.write('<a href="/process/product">상품 페이지</a>');
        res.end();
    }
});

// 로그아웃
router.route('/process/logout').get(function(req, res){
    if(req.session.user){
        console.log('로그아웃');
    }else{}
});





app.use('/', router);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
    console.log('서버시작! %d', app.get('port'));
});
