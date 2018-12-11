// module_test1.js
// require() 메소드는 exports 객체를 반환 함.
var user1 = require('./node_weekend03_ex01_user1');

function showUser() {
    return user1.getUser().name + ', '+user1.group.name;
}

console.log('사용자 정보 : %s', showUser());