var calc = {};
calc.minus = function(a, b){
    return a-b;
}

module.exports = calc;
// module.exports = calc와 exports.add=function(){} 문장을 함께 사용 할 수 없음, 따로는 사용 가능
// exports.add = function(a, b){
//     return a+b;
// }