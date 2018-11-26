/****
[[프로세스 객체]]
- process 객체 : 프로그램을 실행했을때 만들어지는 프로세스 정보
- process 객체의 주요 속성/메소드
    - argv : 프로세스를 실행할 때 전달되는 파라미터(매개변수) 정보
    - env : 환경 변수 정보
    - exit() : 프로세스 끝내는 메소드
*/

console.log(process.argv.length);
console.log(process.argv);

if(process.argv.length > 2) {
    console.log('세 번째 파라미터의 값 : %s', process.argv[2]);
}

process.argv.forEach(function(item, index) {
   console.log(index + ' : ', item); 
});

//console.dir(process.env);
console.log('os환경변수의 값: ', process.env['os']);