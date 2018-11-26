/***
[외장모듈 사용하기]
외장모듈을 불러올때는 상대경로 대신 모듈명을 바로 사용
require('모듈명');

npm(Node Package Manager)를 이용해서 모듈 설치
    > npm install -g nconf --save
        nconf : 시스템 환경변수에 접근 가능한 모듈
        -g : 글로벌로 모듈 설치
        --save : package.json 파일에 기록

npm을 이용해서 모듈 제거
    > npm uninstall nconf

package.json 파일 생성은 npm init 명령으로 생성 가능.
패키지의 내용을 한꺼번에 설치
    > npm install
    
[npm 명령 사용시 방화벽이 막혀 있을 경우 해결방법]
프록시 서버 유무 확인
    > netstat
    
호스트:포트 프록시 사용 설정
    > npm config set proxy http://호스트명:포트
    > npm config set https-proxy http://호스트명:포트
    > npm config set strict-ssl false
*/

var nconf = require('nconf');
nconf.env();

console.log('os 환경 변수의 값: %s', nconf.get('OS'));