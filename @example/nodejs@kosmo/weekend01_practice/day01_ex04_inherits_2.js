//node_day01_ex04_inherits.js
var util = require('util');

function People(_name) {
    this.name = _name;
}
People.prototype.setName = function(_name) {
    this.name = _name;             
};
People.prototype.eat = function() {
    console.log(this.name+"이 먹는다.");
}

//기존 JS에서 상속
function Student(_name) {
    this.name = _name;
}

//util을 이용한 상속
util.inherits(Student, People);

var st1 = new Student('Gilja');
//st1.setName("Gildong");
st1.eat();