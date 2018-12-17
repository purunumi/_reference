
console.log('Hello node world!');

console.log("당신은 %d세입니다.", 45);

console.log("당신의 이름은 %s입니다.", "홍길동");

console.log("JSON객체>>> %j", {"name":"HONG","age":"gildong"});

var res = 0;

console.time("timechk");
for(var i=0; i<10000; i++) {
    res += i;
}
console.timeEnd("timechk");

console.log("res >>> %d", res);
console.log("res ==> " + res);


console.log("실행한 파일명 >>> %s", __filename);
console.log("디렉토리명 >>> %s", __dirname);
