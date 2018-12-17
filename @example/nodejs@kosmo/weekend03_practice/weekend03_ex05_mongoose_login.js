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

app.set('port', process.env.PORT || 3000);

app.use(bodyParseer());
app.use('/public', static(path.join(__dirname, 'public')))
app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

// 몽고DB 관련 전역변수
// 몽구스 모듈 불러오기
var mongoose = require('mongoose');
// 몽구스 사용에 필요한 변수 선언
var database; //몽구스 연결 객체
var UserSchema;
var UserModel;

// 데이터베이스 연결 함수
function connectDB() {
    var dbUrl = "mongodb://localhost:27017/local";
    
    // global에 Promose를 mongoose에 추가
    mongoose.Promise = global.Promise;
    mongoose.connect(dbUrl);
    database = mongoose.connection;
    
    database.on('error', console.error.bind(console, 'db error~'));
    database.on('open', function() {
        console.log('데이터베이스에 연결되었다 :%s', dbUrl);
        // 접속 성공 후에 스키마 선언
        UserSchema = mongoose.Schema({
            id: String,
            name: String,
            password: String
        });
        //console.log('UserSchema 정의함.', UserSchema);
        // 스키마를 이용해서 모델 정의
        UserModel = mongoose.model('users', UserSchema);
        //console.log('UserModel 정의함.', UserModel);
    });
    
    database.on('disconnected', function() {
        console.log('연결이 끊어졌습니다. 5초 후에 다시 실행!');
        setTimeout(connectDB, 5000);
    });
} // end of connectDB()

//라우터를 이용한 패스 요청 처리
router.route('/').get(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf8'
    });
    res.write('<h2>노드js 서버 실행 중 ...</h2>');
    res.end();
});

router.route('/process/product').get(function (req, res) {
    console.log('/process/product 요청 들어 옴...');

    if (req.session.user === undefined) {
        console.log("로그인 안됨");
        res.redirect('/public/login.html');
    } else {
        console.log("로그인 됨");
        res.redirect('/public/product.html');
    }
});

var authUser = function (id, password, callback) {
    console.log('authUser 호출됨.', id, password);

    UserModel.find({'id':id, 'password':password}, function(err, results) {
        if(err) {
            callback(err, null);
            return;
        }
        
        console.log(results);
        if(results.length > 0) {
            console.log('일치하는 사용자 찾음');
            callback(null, results);
        } else {
            console.log('일치하는 사용자 없음');
            callback(null, null);
        }
    }); // end of find
} // end of authUser


router.route('/process/login').post(function (req, res) {
    console.log('/process/login 요청 들어 옴...');

    var paramId = req.body.id;
    var paramPassword = req.body.password;

    if (req.session.user) {
        console.log('이미 로그인 되어 상품 페이지로 이동 함.');
        res.redirect('/public/product.html');
    } else {
        if (database) {
            authUser(paramId, paramPassword, function (err, docs) {
                if (err) {
                    throw err;
                }

                if (docs) {
                    console.dir(docs);
                    var username = docs[0].name;

                    userObj = {
                        id: paramId,
                        name: username,
                        authorized: true
                    }
                    req.session.user = userObj;

                    res.writeHead('200', {
                        'Content-Type': 'text/html;charset=utf8'
                    });
                    res.write('<h1>로그인 성공</h1>');
                    res.write('<p>' + username + ' / ' + paramId + '</p>');
                    res.write('<a href="/public/login.html">다시 로그인 하기</a>');
                    res.end();
                } else {
                    res.writeHead('200', {
                        'Content-Type': 'text/html;charset=utf8'
                    });
                    res.write('<h1>로그인 실패</h1>');
                    res.write('<a href="/public/login.html">다시 로그인 하기</a>');
                    res.end();
                }
            });
        } else {
            res.writeHead('200', {
                'Content-Type': 'text/html;charset=utf8'
            });
            res.write('<h1>데이터 베이스 연결 실패</h1>');
            res.end();
        }

    } // end of if
});

router.route('/process/logout').get(function (req, res) {
    console.log('/process/logout 요청 들어 옴...');
    if (req.session.user) {
        req.session.destroy(function (err) {
            if (err) {
                throw err;
            }
            console.log('로그아웃 되었다.');
        });
    } else {
        console.log('아직 로그인 안됨.');
    }
    res.redirect('/public/login.html');
});

//라우터 미들웨어 등록
app.use('/', router);
//서버 객체 생성
var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log('http://localhost:%d', app.get('port'));
    connectDB();
});
