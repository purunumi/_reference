var http = require('http');
var express = require('express');
var app = express();

//body-parser, router미들웨어 설정
//body-parser 모듈 설치가 필요
var bodyParser = require('body-parser');
var static = require('serve-static');
var router = express.Router();

app.use(bodyParser() );
app.use('/public', static(__dirname + "/public") );


router.route('/process/login').post(function(req, res) {
    var paramId = req.body.id;
    
    console.log('paramId >>> ', paramId);
});

app.use('/', router);
var server = http.createServer(app);
server.listen(3000, function() {
    console.log('http://localhost:%d', 3000);
});