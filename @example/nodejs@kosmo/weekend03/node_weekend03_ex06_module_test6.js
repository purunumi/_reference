// 가상으로 requir() 함수를 정의 - 내부적 처리 방식 이해
var require = function(path) {
    var exports ={
        getUser : function() {
            return {id : 'test01', name : '소녀시대'};
        },
        group : {id : 'group01', name : '친구'}
    }
    return exports;
};

var user = require('...');

function showUser() {
    return user.getUser().name + ',' + user.group.name;
}

console.log('사용자 정보 : %s', showUser());