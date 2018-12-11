//기본 모듈 불러들이기
var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var router = express.Router();
var static = require('serve-static');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var crypto = require('crypto');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use('/public', static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

// 모듈 불러들이기
var mongodb = require('mongodb');
var mongoose = require('mongoose');

// 데이터 베이스 연결
var database;
var UserSchema;
var UserModel;

// /router/user.js 파일 불러오기
var user = require('./router/user');

// 데이터베이스에 연결하고 응답 객체의 속성으로 db 객체 추가
function connectDB() {
    var databaseUrl = 'mongodb://localhost:27017/local';
    
    // 데이터베이스 연결
    mongoose.connect(databaseUrl);
    database = mongoose.connection;
    
    database.on('error', console.error.bind(console, 'mongoose connection error.'));
    database.on('open', function() {
        console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);
        
        // user 스키마 및 모델 객체 생성
        createUserSchema();
        
        // test 진행함
        //doTest();
    });
    
    database.on('disconnected', connectDB);
}

// user 스키마 및 모델 객체 생성
function createUserSchema() {
    // user_schema.js 모듈 불러오기
    var Schema = require('./database/user_schema');
    UserSchema = Schema.createSchema(mongoose);
    
    // UserModel 모델 정의
    UserModel = mongoose.model("users4", UserSchema);
    console.log('UserModel 정의함.');
    
    user.init(database, UserSchema, UserModel);
}

function doTest() {
    // UserModel 인스턴스
    // id, name 속성은 할당하지 않고 info 속성만 할당함
    var user = new UserModel({"info":'test04 김구'});
    
    // save()로 저장
    user.save(function(err) {
        if(err) { throw err; } 
        
        console.log("사용자 데이터 추가함.");
        
        findAll();
    });
    
    console.log('info 속성에 값 할당 함.');
    console.log('id:%s, name:%s', user.id, user.name);
}

function findAll() {
    console.log('findAll() ....');
    UserModel.find({}, function(err, results) {
        if(err) { throw err; }
        
        if(results) {
            console.log('조회된 user 문서 객체 #0 -> id:%s, name:%s', 
                        results[0]._doc.id, results[1]._doc.name);
        }
    });
}


// 로그인 라우팅 함수 - 데이터베이스의 정보와 비교
router.route('/process/login').post(user.login);

// 사용자 추가 라우팅 함수 - 클라이언트에서 보내오는 데이터를 이용해 데이터베이스에 추가
router.route('/process/adduser').post(user.adduser);

// 라우터 객체 등록
app.use('/', router);

var server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('서버가 실행 되었습니다. : ', app.get('port'));
    connectDB();
});