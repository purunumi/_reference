// exports가 직접 새로운 객체로 바뀌었으므로
// require()로 모듈로 불러 올수 없다.
// 빈 {} 객체로 불러 짐
var user = require('./node_weekend03_ex03_user3');

console.log(user);

function showUser() {
    return user.getUser().name + ', '+user.group.name;
}

console.log('사용자 정보 : %s', showUser());