var http = require('http');
var express = require('express');
var app = express();
var fs = require('fs');
var ejs = require('ejs');

app.set('port', process.env.PORT || 3000);

var router = express.Router();


// 첫번째 EJS 테스트
router.route('/test').get(function(req, res) {
    console.log('test ejs');
    fs.readFile('views/test.ejs', 'utf8', function(err, html) {
        res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
        res.end(ejs.render( html ));
    });
});

// 두번째 EJS 테스트 
router.route('/test2').get(function(req, res) {
    var cars = [
            {name:'SM5', price:3000, year:1999, company:'SAMSUNG'},
            {name:'SM7', price:5000, year:2013, company:'SAMSUNG'}
        ];
    
    console.log('test2 ejs');
    fs.readFile('views/test2.ejs', 'utf8', function(err, html) {
        res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
        res.end(ejs.render(html, {'cars':cars} ) );
    });
});

router.route('/test3').get(function(req, res) {
    var loginData = {'id':'hong', 'password':'12345'};
    console.log('test ejs');
    fs.readFile('views/test3.ejs', 'utf8', function(err, html) {
        res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
        res.end( ejs.render(html, {'loginData':loginData}));
    });
});

app.use('/', router);

var server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('http://localhost:%d', app.get('port'));
})