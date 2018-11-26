/**
[[ 콘솔에 로그 뿌리기 ]]
- 자바스크립트의 전역객체 자료형
    - console : 콘솔창에 결과를 보여주는 객체
    - process : 프로세스의 실행에 대한 정보를 다루는 객체
    - export : 모듈을 다루는 객체
    
- 명령 프롬프트에 입력
    - console.log('숫자 보여주기: %d', 10)
    - console.log('문자 보여주기: %s', '미스터 션샤인')
    - console.log('JSON 객체 보여주기: %j', {"name":"김태리"})
    
- console 객체의 주요 메소드
    - console.log() : 콘솔에 로그를 출력한다.
    - console.dir(object) : 객체의 속성 출력
    - console.time(id) : 실행 시간 측정 시작
    - console.timeEnd(id) : 실행 시간 측정 끝
*/

var result = 0;

console.time('time_check');
for(var i=1; i<=10000; i++) {
    result += i;
}
console.timeEnd('time_check');

console.log('1~10000까지 더한 결과: %d', result);

console.log('현재 실행한 파일 명: %s', __filename);
console.log('현재 실행한 파일 패스: %s', __dirname);