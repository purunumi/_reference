/***
내장모듈: 노드 설치시 기본 설치
대표적으로 os모듈과 path 모듈이 있다.
내장 모듈보다 외장 모듈이 더 편리한 경우도 있다.
내장 모듈에 대한 정보
    http://nodejs.org/api

***/

var os = require('os');

console.log('os의 호스트 네임: %s', os.hostname());
console.log('시스템의 메모리: %d/%d', os.freemem(), os.totalmem());
console.log('시스템의 CPU 정보: \n', os.cpus());
console.log('시스템의 네트워크 인터페이스 정보\n');
console.dir(os.networkInterfaces());
