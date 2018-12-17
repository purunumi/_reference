//weekend03_ex02_exports.js

//exports에 직접 객체를 넣으면 Error!
//module에서 제공하는 exports객체가 유실된다.
//module의 exports를 직접 지정 한다.
module.exports = {
    getUser: function() {
        return {id:'user01', name:'방탄소년단'}
    },
    group: {
        id:'friend01', name:'친구'
    }
}