var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.listen('3000', function(){
    console.log('start! 3000');
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.sendFile(__dirname + "/public/index.html");
});
app.get('/main', function(req, res){
    res.sendFile(__dirname + "/public/index.html");
});
app.post('/email_post', function(req, res){
    res.render('email.ejs', {
        'email': req.body.email
    });
});
app.post('/ajax_send_email', function(req, res){
    // console.log(req.body.email);
    var responseData = {
        'resulte' : 'ok',
        'email' : req.body.email
    };
    res.json(responseData);
});




//////////////////////////////////////////////////////
var watch = require('watch');
var reload = require('reload');
var reloadServer = reload(app);
watch.watchTree(__dirname + '/', function(f, curr, prev){
    reloadServer.reload();
});