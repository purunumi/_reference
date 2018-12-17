//weekend03_ex03_mongoose

var http = require('http');
var express = require('express');

var app = express();
app.set('port', process.env.PORT || 3000);


// 몽구스 모듈 불러오기
var mongoose = require('mongoose');
// 몽구스 사용에 필요한 변수 선언
var database; //몽구스 연결 객체
var UserSchema;
var UserModel;

// 데이터베이스 연결 함수
function connectDB() {
    var dbUrl = "mongodb://localhost:27017/local";
    
    // global에 Promose를 mongoose에 추가
    mongoose.Promise = global.Promise;
    mongoose.connect(dbUrl);
    database = mongoose.connection;
    
    database.on('error', console.error.bind(console, 'db error~'));
    database.on('open', function() {
        console.log('데이터베이스에 연결되었다 :%s', dbUrl);
        // 접속 성공 후에 스키마 선언
        UserSchema = mongoose.Schema({
            id: String,
            name: String,
            password: String
        });
        //console.log('UserSchema 정의함.', UserSchema);
        // 스키마를 이용해서 모델 정의
        UserModel = mongoose.model('users', UserSchema);
        //console.log('UserModel 정의함.', UserModel);
    });
    
    database.on('disconnected', function() {
        console.log('연결이 끊어졌습니다. 5초 후에 다시 실행!');
        setTimeout(connectDB, 5000);
    });
} // end of connectDB()


var server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log('서버 실행 : localhost:%d', app.get('port'));
    connectDB();
});