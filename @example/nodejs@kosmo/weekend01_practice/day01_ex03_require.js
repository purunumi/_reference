//require([상대경로로 파일을 지정하고 확장자는 제외한다])
/*
exports에 저장된 객체를 require()함수로 불러온다.
var calc = {};
...
module.exports = calc;
*/
var calc = require('./node_day01_ex03_exports');

var res = calc.plus(30, 20);
console.log("res >>> %d", res);

console.log("calc.minus(30, 20) >>> %d", clac.minus(30,20));