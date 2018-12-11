var http = require('http');
var path = require('path');
var cors = require('cors');
var static = require('serve-static');
var ejs = require('ejs');
var express = require('express');

var app = express();
var router = express.Router();

app.set('port0', 3000);
app.set('port1', 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use('/public', static(path.join(__dirname, 'public')));


router.route('/opener').get(function(req, res){
    req.app.render('opener', {}, function(err, html){
        res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
        res.end(html);
    });
});
router.route('/pop_400x400').get(function(req, res){
    req.app.render('pop_400x400', {}, function(err, html){
        res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
        res.end(html);
    });
});
router.route('/pop_400x400_resize').get(function(req, res){
    req.app.render('pop_400x400_resize', {}, function(err, html){
        res.writeHead('200', {'Content-Type': 'text/html;charset=utf8'});
        res.end(html);
    });
});




app.use('/', router);

var server0 = http.createServer(app);
server0.listen(app.get('port0'), function(){
    console.log('서버오픈: %d', app.get('port0'));
});
var server1 = http.createServer(app);
server1.listen(app.get('port1'), function(){
    console.log('서버오픈: %d', app.get('port1'));
});