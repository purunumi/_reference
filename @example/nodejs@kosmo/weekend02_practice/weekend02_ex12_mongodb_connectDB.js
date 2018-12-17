//기본 모듈 불러오기
var http = require('http');
var express = require('express');
var app = express();

var router = express.Router();
var bodyParseer = require('body-parser');
var static = require('serve-static');
var path = require('path');

var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

//파일 업로드
var multer = require('multer');
var fs = require('fs');
var cors = require('cors'); //크로스도메인 처리

//몽고디비 관련 모듈
var MongoClient = require('mongodb').MongoClient;



app.set('port', process.env.PORT || 3000);

app.use(bodyParseer());
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));

app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

app.use(cors());


// 몽고DB 관련 전역변수
var db;
function connectDB() {
    var dbUrl = "mongodb://localhost";
    MongoClient.connect(dbUrl, function(err, client){
        db = client.db('vehicle');
        console.log('DB 연결 성공:%s', dbUrl);
    });
}




//라우터 미들웨어 등록
app.use('/', router);
//서버 객체 생성
var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log('http://localhost:%d', app.get('port'));
    connectDB();
});
