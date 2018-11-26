var fs = require('fs');

// 파일을 비동기식 IO로 읽어 들입니다.
fs.readFile('./package.json', 'utf8', function(err, data) {
    // 읽어 들인 데이터를 출력합니다.
    console.log(data);
});
//비동기로 먼저 실행
console.log('프로젝트 폴더 안의 package.json 파일을 읽도록 요청');