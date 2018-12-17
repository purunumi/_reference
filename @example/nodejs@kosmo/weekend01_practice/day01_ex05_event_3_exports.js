var util = require('util');
var EventEmitter = require('events').EventEmitter;

/*function MyClass() {
    this.on('stop', function() {
        console.log('MyClass에 stop이벤트 전달');
    });
}

//상속
util.inherits(MyClass, EventEmitter);*/

class MyClass extends EventEmitter{
    constructor() {
        super(); //부모의 생성자 호출 필수.
        this.on('stop', function() {
            console.log('EC6 MyClass에 stop이벤트 전달');
        });
    }
}

module.exports = MyClass;