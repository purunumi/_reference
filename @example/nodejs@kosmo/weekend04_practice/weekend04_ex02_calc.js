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

app.get("/plus/:a/:b",function(req, resp) {
    resp.end(String(parseInt(req.params.a) + parseInt(req.params.b)));
});
app.get("/minus/:a/:b",function(req, resp) {
    resp.end(String(Number(req.params.a) - Number(req.params.b)));
});
app.get("/mult/:a/:b",function(req, resp) {
    resp.end(String(Number(req.params.a) * parseInt(req.params.b)));
});
app.get("/div/:a/:b",function(req, resp) {
    resp.end(String(Number(req.params.a) / Number(req.params.b)));
});

app.use('/', router);
var server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log("http://localhost:%d", app.get('port'));
});
