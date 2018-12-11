// module.exports와 exports.속성을 함께 사용 할수 없다.
var user = require('./node_weekend03_ex03_user3');

console.log(user);

function showUser() {
    return user.getUser().name + ', '+user.group.name;
}
console.log('사용자 정보 : %s', showUser());