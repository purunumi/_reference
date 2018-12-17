// weekend04_ex10_chat01.js

var http = require('http');
var express = require('express');
var app = express();
var socketio = require('socket.io');
var cors = require('cors');
var static = require('serve-static');
var path = require('path');

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use('/public', static(path.join(__dirname, "public")));

var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log("http://localhost:%d", app.get('port'));
});


//로그인 아이디와 소켓을 매핑하는 객체
// {로그인id:소켓id, 로그인id:소켓id ...}
var login_ids = {}

// 응답 메세지 전송 메소드
function sendResponse(socket, command, code, message) {
    var statusObj = {
        command: command,
        code: code,
        message: message
    }
    
    socket.emit('response', statusObj);
}

var io = socketio.listen(server);
io.sockets.on('connection', function (socket) {
    console.log('connection ...', socket.request.connection._peername);
    //console.dir(socket);

    socket.remoteAddress = socket.request.connection._peername.address;
    socket.remotePort = socket.request.connection._peername.port;

    //console.log(socket.remoteAddress, socket.remotePort)

    socket.on('message', function (message) {
        console.log(message);

        if (message.recepient == 'All') {
            console.log("모든 접속자에게 메세지 전달")
            io.sockets.emit('message', message);
        } else {
            console.log("1대1 채팅 상대에게 메세지 전달");
            
            if(login_ids[message.recepient]) {
                var socke_id = login_ids[message.recepient];
                var resSocket = io.sockets.connected[socke_id];
                sendResponse(resSocket, 'message', '200', message);
            } else {
                sendResponse(socket, 'login', '404', '대화상대가 없다.');
            }
        }
    });
    
    // 사용자가 로그인 하면 login_ids에 소켓과 id 저장
    socket.on('login', function(login) {
        console.log('login 이벤트를 받았습니다.');
        
        console.log("접속한 소켓 id >>> ", socket.id);
        login_ids[login.id] = socket.id;
        socket.login_id = login.id;
        
        console.log("현재 접속자 수 >>> ", Object.keys(login_ids).length);
        
        sendResponse(socket, 'login', '200', login.id+'가 로그인 되었습니다.');
    });
});
