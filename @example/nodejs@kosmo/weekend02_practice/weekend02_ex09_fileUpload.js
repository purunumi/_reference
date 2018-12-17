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

//storage와 multer 객체 선언
var storage = multer.diskStorage({
    destination : function(req, file, callback) {
        callback(null, 'uploads');
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname + Date.now() );
    }
});
upload = multer({
    storage: storage,
    limits: {
        files : 10,
        fileSize: 1024 * 1024 * 1024
    }
});

//라우터를 이용한 패스 요청 처리
router.route('/').get(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf8'
    });
    res.write('<h2>노드js 서버 실행 중 ...</h2>');
    res.end();
});

router.route('/process/photo').post(upload.array('photo', 1),function (req, res) {
    console.log('/process/photo 요청 들어 옴...');
    
    try {
        var files = req.files;
        
        console.dir(req.files[0]);
        
        if(Array.isArra(files)) {
            console.log('파일 갯수 : %d', files.length);
            
            for(var i=0; i<files.length; i++) {
                console.log(files[i].originalname);
                console.log(files[i].filename);
                console.log(files[i].mimetype);
                console.log(files[i].size);
            }
        }
    } catch(err) {
        console.dir(err.stack);
    }
    
});


//라우터 미들웨어 등록
app.use('/', router);
//서버 객체 생성
var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log('http://localhost:%d', app.get('port'));
});
