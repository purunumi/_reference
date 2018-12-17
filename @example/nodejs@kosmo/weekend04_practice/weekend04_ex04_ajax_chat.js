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

var messages = [];
app.get("/recieve", function(req, resp) {
    if(req.query.size >= messages.length){
        resp.end();
    } else {
        var res = {
            total: messages.length,
            messages: messages.slice(req.query.size)
        }
        resp.end(JSON.stringify(res));
    }
});
app.get("/send", function(req, resp) {
    messages.push({
        sender: req.query.sender,
        message: req.query.message
    });
    reps.end()
});

app.use('/', router);
var server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log("http://localhost:%d", app.get('port'));
});
