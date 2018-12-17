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

//몽고디비 관련 모듈
var MongoClient = require('mongodb').MongoClient;

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
var db;

function connectDB() {
    var dbUrl = "mongodb://localhost";
    MongoClient.connect(dbUrl, function (err, client) {
        db = client.db('local');
        console.log('DB 연결 성공:%s', dbUrl);
    });
}

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

var authUser = function (database, id, password, callback) {
    console.log('authUser 호출됨.', id, password);

    //컬렉션 참조
    var users = database.collection('users');
    console.log(users);

    //아이디와 비밀번호를 사용해서 db 검색
    users.find({
        "id": id,
        "password": password
    }).toArray(function (err, docs) {
        if (err) {
            callback(err, null);
            return;
        }
        if (docs.length > 0) {
            console.log('아이디 [%s], 비밀번호 [%s]가 있다.', id, password);
            callback(null, docs);
        } else {
            console.log('사용자가 없다');
            callback(null, null);
        }
    });
}


router.route('/process/login').post(function (req, res) {
    console.log('/process/login 요청 들어 옴...');

    var paramId = req.body.id;
    var paramPassword = req.body.password;

    if (req.session.user) {
        console.log('이미 로그인 되어 상품 페이지로 이동 함.');
        res.redirect('/public/product.html');
    } else {
        if (db) {
            authUser(db, paramId, paramPassword, function (err, docs) {
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

    }
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
