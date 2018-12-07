var http = require('http');
var path = require('path');
var static = require('serve-static');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var express = require('express');
var MongoClient = require('mongodb').MongoClient;

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

function connectDB(){
    var databaseUrl = 'mongodb://localhost:27017';
    MongoClient.connect(databaseUrl, function(err, client){
        if(err) throw err;
        console.log('데이터베이스 연결: ' + databaseUrl);
        // 변수에 데이터베이스 할당
        // 몽고디비2에서는 URL에 DB명을 적어도 되었으나
        // 몽고디비3에서는 client.db()함수를 이용해서 DB명을 지정해 주어야 한다.
        db = client.db('local');
    });
}

function addUser(database, id, pwd, name, callback){
    console.log('addUser 함수호출: %s, %s, %s', id, pwd, name);

    var users = database.collection('users');
    // insertMary 기능 사용
    users.insertMany([{'id':id, 'password':pwd, 'name':name}], function(err, result){
        if(err){
            callback(err, null);
            return
        }

        if(result.insertedCount > 0){
            console.log('사용자 레코드 추가 됨:', result.insertedCount);
        }else{
            console.log('추가 된 카운트 없음');
        }

        callback(null, result);
    });
}

function authUser(database, id, pwd, callback){
    console.log('authUser 호출');
    //컬렉션 참조

    var user = database.collection('users');
    //아이디와 비밀번호를 사용해서 db검색
    user.find({'id': id, 'password': pwd}).toArray(function(err, docs){
        if(err){
            console.log('ERR: ', err);
            callback(err, null);
            return;
        }
        if(docs.length > 0){
            console.log('아이디 [%s], 비밀번호 [%s]', id, pwd);
            callback(null, docs);
        }else{
            console.log('사용자가 없다');
            callback(null, null);
        }
    });
}

// 회원가입
router.route('/process/join').post(function(req, res){
    console.log('/process/join 호출');

    var paramId = req.body.id || req.query.id;
    var paramPwd = req.body.pwd || req.query.pwd;
    var paramName = req.body.name || req.query.name;

    console.log('요청 파라미터: %s, %s, %s', paramId, paramPwd, paramName);

    if(db){
        addUser(db, paramId, paramPwd, paramName, function(err, result){
            if(err) throw err;

            if(result && result.insertedCount > 0){
                console.dir(result);
                res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
                res.write('<h1>사용자 추가 성공</h1>');
                res.write('<a href="/public/login.html">로그인 페이지</a>');
                res.end();
            }else{
                res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
                res.write('<h1>사용자 추가 실패</h1>');
                res.end();
            }
        });
    }else{
        res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
        res.write('<h1>데이터 베이스 연결 실패</h1>');
        res.end();
    }
});

// 로그인
router.route('/process/login').post(function(req, res){
    console.log('/process/login 요청');

    let paramId = req.body.id || req.query.id;
    let paramPwd = req.body.pwd || req.query.pwd;

    if(req.session.user){
        // 이미 로그인 되어 상품 페이지로 이동
        res.redirect('/public/product.html');
    }else{
        if(db){
            authUser(db, paramId, paramPwd, function(err, docs){
                if(err) throw err;

                console.log('callback 호출');
                if(docs){
                    console.dir(docs);
                    var username = docs[0].name;
                    res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
                    res.write('<h1>로그인 성공</h1>');
                    res.write('<div>ID: ' + paramId + '</div>');
                    res.write('<div>PWD: ' + paramPwd + '</div>');
                    res.write('<a href="/public/product.html">상품 페이지</a>');
                    res.end();

                    // 세션 저장
                    req.session.user= {
                        id: paramId,
                        pwd: paramPwd,
                        authrized: true
                    };
                    // 세션 아이디 제어? > 추가학습 필요
                    // req.session({
                    //     key: 'user'
                    // });
                    // console.log('SESSION\n', req.session);
                }else{
                    res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
                    res.write('<h1>로그인 실패</h1>');
                    res.write('<a href="/public/login.html">다시 로그인 하기</a>');
                    res.end();
                }
            });
        }else{
            res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
            res.write('<h1>데이터 베이스 연결 실패</h1>');
            res.end();
        }
    }
});

// 로그아웃
router.route('/process/logout').get(function(req, res){
    if(req.session.user){
        console.log('로그아웃');
        // req.session.destroy(sid, function(err){ // 세션 아이디 제어? > 추가학습 필요
        req.session.destroy(function(err){
            if(err) throw err;
            res.redirect('/public/login.html');
            // 콜백함수에서는 세션에 접급 불가? > 추가학습 필요
            // console.log('SESSION\n', req.session);
        });
        // console.log('SESSION\n', req.session);
    }else{
        console.log('로그인 상태');
        res.redirect('/public/login.html');
    }
});

// 상품정보
// router.route().get(function(req, res){
//     res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
//     res.write('<h1>상품정보</h1>');
//     res.write('<p>Dolor incididunt dolor ea ullamco quis ea.</p>');
//     res.write('<a href="/process/logout">로그아웃</a>');
//     res.end();
// });





app.use('/', router);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
    console.log('서버시작! %d', app.get('port'));
    connectDB();
});
