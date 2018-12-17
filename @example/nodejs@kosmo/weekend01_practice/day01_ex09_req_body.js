//day01_ex09_req_body.js
var http = require('http');
var express = require('express');
var app = express();
var util = require('util');

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
    console.log('/ 요청 됨');
    
    var paramName = req.query.name;
    console.log(paramName);
    var message = util.format("paramName => %s", paramName);
    
    var userAgent = req.header('User-Agent');
    message += ", " + userAgent;
    
    res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
    res.write(message);
    res.end();
});

var server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('http://localhost:%d', app.get('port'));
});