var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');
var ejs = require('ejs');

app.set('port', process.env.PORT || 3000);

//뷰엔진 설정
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
console.log('뷰 엔진이 ejs로 설정되었습니다.');


var router = express.Router();


// 첫번째 EJS 테스트
router.route('/test').get(function(req, res) {
    console.log('test ejs view engine');
    
    //view engine 설정시 /views/ 경로까지 설정 하였으므로 파일명만 사용.
    req.app.render('test', {}, function(err, html){
        if(err) {
            res.end("error!");
            return;
        }
        
        res.end(html);
    });
});

// 두번째 EJS 테스트 
router.route('/test2').get(function(req, res) {
    var cars = [
            {name:'SM5', price:3000, year:1999, company:'SAMSUNG'},
            {name:'SM7', price:5000, year:2013, company:'SAMSUNG'},
            {name:'K7', price:5000, year:2018, company:'KIA'}
        ];
    console.log('test2 ejs');
    req.app.render('test2', {'cars':cars}, function(err, html){
        if(err) {
            res.end("error!");
            return;
        }
        
        res.end(html);
    });
});

router.route('/test3').get(function(req, res) {
    var loginData = {'id':'hong', 'password':'12345'};
    req.app.render('test3', {'loginData':loginData}, function(err, html){
        if(err) {
            res.end("error!");
            return;
        }
        
        res.end(html);
    });
});

app.use('/', router);

var server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('http://localhost:%d', app.get('port'));
})