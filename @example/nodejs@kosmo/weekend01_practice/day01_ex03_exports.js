// 사용자 정의 모듈 선언
// 모듈명 ./node_day01_ex03_exports
// require('./node_day01_ex03_exports');

var calc = {};

calc.plus = function(a, b) {
    return a + b;
}
calc.minus = function(a, b) {
    return a - b;
}

module.exports = calc;