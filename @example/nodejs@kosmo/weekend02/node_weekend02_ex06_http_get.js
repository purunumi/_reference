//서버에서 다른 웹사이트의 데이터 가져오기
//http.get() 메소드 사용

var http = require('http');

var options = {
    host : 'www.google.com',
    port : 80,
    path : '/'
}

var req = http.get(options, function(res) {
    //응답처리
    var resData = '';
    res.on('data', function(chunk) {
        resData += chunk; 
    });
    
    res.on('end', function() {
        console.log(resData);
    });
});

req.on('error', function(err) {
    console.log("오류 발생 : " + err.message);
});