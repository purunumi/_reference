//ES6 문법으로 클래스 선언 및 상속
class People {
    constructor(_name) {
        this.name = _name;
    }
    setName(_name) {
        this.name = _name;
    }
    eat() {
        console.log(this.name+"이 먹는다.");
    }
}
//상속은 extends 이용
class Student extends People {
    constructor(_name, _age) {
        super(_name);
        this.age = _age;
    }
}

//let p1 = new Student('길동', 30);
//p1.eat();
//console.log(p1.age);

module.exports = Student;