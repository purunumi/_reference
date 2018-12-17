//클래스 자체를 모듈로 등록하고 불러오기
var Student = require('./node_day01_ex04_inherits_3');

let p1 = new Student('길동', 30);
p1.eat();
console.log(p1.age);