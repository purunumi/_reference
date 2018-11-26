var fs = require('fs');

var msg = 'Hello World!';

//파일에 데이터를 쓴다.
fs.writeFile('./output.txt', msg, function(err) {
    if(err) {
        console.log('Error : ' + err);
    }
    console.log('output.txt 파일에 데이터 쓰기 완료!');
});