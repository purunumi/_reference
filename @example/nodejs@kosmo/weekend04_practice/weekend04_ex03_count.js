// weekend_ex01_app.js
// Node.js 서버 기본 구성

// http, express, static, cors
var http = require('http');
var express = require('express');
var app = express();
var static = require('serve-static');
var cors = require('cors');
var path = require('path');
var router = express.Router();

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use('/public', static( path.join(__dirname, 'public') ));

var cnt = 0;
app.get("/count", function(req, resp) {
    cnt++;
    var date = new Date();
    var response = {
        "dateStr":date.getFullYear()+"-"
	+(date.getMonth()+1)+"-"+(date.getDate())+" "+(date.getHours())+":"
	+(date.getMinutes()),
        "count":cnt
    }
    resp.end(JSON.stringify(response));
});

app.use('/', router);
var server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log("http://localhost:%d", app.get('port'));
});
