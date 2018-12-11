var http = require('http');
var static = require('serve-static');
var path = require('path');
var express = require('express');

var app = express();
var router = express.Router();

app.set('port', process.env.PORT || 3000);
app.use('/public', static(path.join(__dirname, 'public')));




var server = http.createServer(app);
server.listen(app.get('port'), function(){
    console.log('서버시작!: %d', app.get('port'));
});
