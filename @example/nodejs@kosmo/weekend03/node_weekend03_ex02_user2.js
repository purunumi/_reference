// node_weekend03_ex02_user2.js
// exports에 속성 추가 - 모듈에서 접근.
// exprots를 새로운 객체로 지정 - JS에서 새 변수로 처리.
exports = {
    getUser : function() {
        return {id : 'test01', name:'방탄소년단'}
    },
    group : {id : 'group01', name : '친구'}
}