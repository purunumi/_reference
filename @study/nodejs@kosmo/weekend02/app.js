var http = require('http');
var path = require('path');
var static = require('serve-static');
var express = require('express');

var app = express();
var router = express.Router();

app.set('port', process.env.PORT || 3000);
app.use('/public', static(path.join(__dirname, 'public')));




router.route('/process/login').post(function(req, res){
    console.log('/process/login 요청');

    // let paramId =
});






app.use('/', router);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
    console.log('서버시작! %d', app.get('port'));
});
