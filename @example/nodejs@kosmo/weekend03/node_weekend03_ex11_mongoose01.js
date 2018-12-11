var http = require('http');
var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

// mongoose 모듈 불러들이기
var mongoose = require('mongoose');

// 데이터베이스 객체를 위한 변수 선언
var database;

// 데이터베이스 스키마 객체를 위한 변수 선언
var UserSchema;

// 데이터베이스 모델 객체를 위한 변수 선언
var UserModel;


// 데이터베이스에 연결
function connectDB() {
    var databaseUrl = 'mongodb://localhost:27017/local';
    
    // 데이터베이스 연결
    console.log('데이터베이스 연결을 시도합니다.');
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl);
    database = mongoose.connection;
    
    database.on('error', console.error.bind(console, 'mongoose connection error.'));
    database.on('open', function() {
       console.log('데이터베이스에 연결되었습니다. : %s', databaseUrl);
        
    });
    
    //연결이 끊어졌을 때 5초후 재 연결
    database.on('disconnected', function() {
        console.log('연결이 꾾어졌습니다. 5초 후 다시 연결합니다.');
        setInterval(connectDB, 5000);
    });
}


var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('서버 실행 >>> %d', app.get('port'));
    connectDB();
});