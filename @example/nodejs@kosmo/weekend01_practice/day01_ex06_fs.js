//node_day01_ex06_fs.js
var fs = require('fs');

fs.readFile('./package.json','utf8', function(err, data) {
    if(err) {
        throw err;
        return;
    }
    
    console.log(data); 
});

console.log('비동기 방식의 파일 입출력');