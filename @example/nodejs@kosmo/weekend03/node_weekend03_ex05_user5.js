// node_weekend03_ex05_user5.js
// moduel.exports 에 객체 지정과 exports.속성 함께 사용
module.exports = {
    getUser : function() {
        return {id : 'test01', name:'방탄소년단'}
    },
    group : {id : 'group01', name : '친구'}
}
exports.group = {id:'group2', name:'가족'};