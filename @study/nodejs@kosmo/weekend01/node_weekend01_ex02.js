

/*
+ process 객체의 주요 속성/메소드
    - argv: 프로세스를 실행할 때 전달되는 파라미터(매개변수) 정보 / 단, node명령어와 프로그램의 이름(경로) 정보까지 포함하여 추가되는 매개변수는 2부터 시작
    - env: 환경 변수 정보
*/
console.log(process.argv.length);
console.log(process.argv);
if(process.argv.length > 2){
    console.log('세 번째 파라미터의 값: %s', process.argv[2]);
}
process.argv.forEach(function(item, index){
    console.log(index, ' : ', item);
});


/*
+ console.log와 console.dir의 차이점
    - https://developer.mozilla.org/ko/docs/Web/API/Console/log
    - console.log는 요소를 HTML과 같은 트리 구조로 출력
    - console.dir은 요소를 JSON과 같은 트리 구조로 출력
    - console.log는 DOM요소에 대해 특별한 처리를 제공하지만 console.dir은 그렇지 않음
*/
// console.log(process.env);
// console.dir(process.env);
console.log('os환경변수의 값: ', process.env['os']);