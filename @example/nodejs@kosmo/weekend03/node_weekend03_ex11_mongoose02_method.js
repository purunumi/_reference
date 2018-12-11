var http = require('http');
var express = require('express');
var app = express();
var path = require('path');

var static = require('serve-static'); 

// 세션, 쿠키, 로그인 관련 모듈
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

// 에러처리 관련 모듈
var errorHandler = require('errorhandler');
var expressErrorHandler = require('express-error-handler');

// 라우팅 매핑을 위한 모듈
var router = express.Router();

app.set('port', process.env.PORT || 3000);

// 요청 파라미터 처리를 위한 body-parser 모듈
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// /public 폴더를 static으로 지정
app.use('/public', static(path.join(__dirname, 'public')));

// 쿠키와 세션 기본 설정
app.use(cookieParser());
app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));

// mongoose 모듈 불러들이기
var mongoose = require('mongoose');

// 데이터베이스 객체를 위한 변수 선언
var database;

// 데이터베이스 스키마 객체를 위한 변수 선언
var UserSchema;

// 데이터베이스 모델 객체를 위한 변수 선언
var UserModel;


// 데이터베이스에 연결
function connectDB() {
    var databaseUrl = 'mongodb://localhost:27017/local';
    
    // 데이터베이스 연결
    console.log('데이터베이스 연결을 시도합니다.');
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl);
    database = mongoose.connection;
    
    database.on('error', console.error.bind(console, 'mongoose connection error!'));
    database.on('open', function() {
       console.log('데이터베이스에 연결되었습니다. : %s', databaseUrl);
        
        // 스키마 정의 
        UserSchema = mongoose.Schema({
            id: {type:String, required:true, unique:true},
            password: {type:String, required:true},
            name: {type:String, index:'hashed'},
            age:{type: Number, 'default':-1},
            created_at:{type:Date, index:{unique:false}, 'default':Date.now},
            updated_at:{type:Date, index:{unique:false}, 'default':Date.now}
        });
        
        // 스키마에 static 메소드 추가
        UserSchema.static('findById', function(id, callback){
            return this.find({id : id}, callback); 
        });
        
        UserSchema.static('findAll', function(callback) {
            return this.find({}, callback);
        });
        
        console.log('UserSchema 정의함.');
        
        
        // UserModel 모델 정의
        UserModel = mongoose.model('users2', UserSchema);
        console.log('UserModel 정의함.');
    });
    
    //연결이 끊어졌을 때 5초후 재 연결
    database.on('disconnected', function() {
        console.log('연결이 꾾어졌습니다. 5초 후 다시 연결합니다.');
        setInterval(connectDB, 5000);
    });
} // end of connectDB

// 사용자를 인증하는 함수
var authUser = function(database, id, password, callback) {
    console.log('authUser 호출 됨 : %s, %s', id, password);
    
    // 아이디를 사용해 검색
    UserModel.findById(id, function(err, results){
        if(err) {
            callback(err, null);
            return;
        }
        
        console.log('아이디 [%s] 검색 결과', id);
        console.dir(results);
        
        if(results.length > 0) {
            console.log('일치하는 사용자 찾음.', id);
            
            // 비밀번호 확인
            if(results[0]._doc.password === password) {
                console.log('비밀번호 일치함');
                callback(null, results);
            } else {
                console.log('비밀번호 불일치');
                callback(null, null);
            }
        } else {
            console.log('일치하는 사용자 찾지 못함.');
            callback(null, null);
        }
    }); //end of find
}; // end of authUser

// 사용자를 등록하는 함수
var addUser = function(database, id, password, name, age, callback) {
    console.log('addUser 호출 됨 : %s, %s, %s', id, password, age);
    
    // UserModel의 인스턴스 생성
    var user = new UserModel({"id":id, "password":password, "name":name, "age":parseInt(age)});
    
    // UserModel 인스턴스로 save()
    user.save(function(err) {
        if(err) {
            callback(err, null);
            return;
        }
        console.log("사용자 데이터 추가함.");
        callback(null, user);
    });
} //end of addUser

// 로그인 처리 라우팅 함수
router.route('/process/login').post(function(req,res){
    console.log('/process/login 호출.');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    
    if(database) {
        authUser(database, paramId, paramPassword, function(err, docs){
            if(err) { throw err; }
            
            if(docs) {
                console.dir(docs);
                var username = docs[0].name;
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>로그인 성공</h1>');
                res.write('<p>'+username+' / '+paramId+'</p>');
                res.write('<a href="/public/login2.html">다시 로그인 하기</a>');
                res.end();
            } else {
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>로그인 실패</h1>');
                res.write('<a href="/public/login2.html">다시 로그인 하기</a>');
                res.end();
            }
        });
    } else {
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>데이터 베이스 연결 실패</h1>');
        res.end();
    }
});

// 사용자 추가 라우팅 함수
router.route('/process/adduser').post(function(req,res){
    console.log('/process/adduser 호출 됨');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    var paramAge = req.body.age || req.query.age;
    
    console.log('요청 파라미터 : %s, %s, %s, %s', paramId, paramPassword, paramName, paramAge);
    
    if(database) {
        addUser(database, paramId, paramPassword, paramName, paramAge, function(err, user){
            if(err) { throw err; }
            
            if(user) {
                console.dir(user);
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>사용자 추가 성공</h1>');
                res.end();
            } else {
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h1>사용자 추가 실패</h1>');
                res.end();
            }
        });
    } else {
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>데이터 베이스 연결 실패</h1>');
        res.end();
    }
});

// 사용자 리스트 요청 라우팅 함수
router.route('/process/listuser').post(function(req, res) {
    console.log('/process/listuser 라우팅 함수 호출 됨');
    
    // 데이터베이스 객체가 초기화된 경우, 모델 객체의 findAll 메소드 호출
    if(database) {
        UserModel.findAll(function(err, results) {
            if(err) { // 에러 발생 체크
                console.error('사용자 리스트 조회중 오류 발생 : ' + err.stack);
                res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
                res.write('<h2>사용자 리스트 조회 중 오류 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();
                return;
            }
            if(results) { // 결과가 있다면 목록 보여주기
                console.dir(results);
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 리스트</h2>');
                res.write('<div></div>');
                for(var i=0; i<results.length; i++) {
                    var curId = results[i]._doc.id;
                    var curName = results[i]._doc.name;
                    res.write('    <li>#'+i+':'+curId+','+curName+'</li>');
                }
                res.write('</ul></div>');
                res.end();
            } else { // 결과 객체가 없으면 응답 전송
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 조회 실패</h2>');
                res.end();
            }
        });
    } else {
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }
});

app.use('/', router);

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('서버 실행 >>> %d', app.get('port'));
    connectDB();
});