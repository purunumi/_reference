// require()로 메소드 함수 반환
var user = require('./node_weekend03_ex04_user4');

// 메소드이므로 직접 메소드를 실행시켜 객체를 얻어온다.
var obj = user();

function showUser() {
    return obj.name;
}

console.log('사용자 정보 : %s', showUser());