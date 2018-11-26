/***
[[파일 패스를 다루는 path모듈]]
join() : 여러개의 파일들을 모두 합쳐 하나의 파일 패스로 만들어 준다. 파일 패스를 만들때 구분자 등을 알아서 조정.
dirname() : 파일 패스에서 디렉터리 이름을 반환.
basename() : 파일 패스에서 파일의 확장자를 제외한 이름을 반환.
extname() : 파일 패스에서 파일의 확장자를 반환.
***/

var path = require('path');

//디렉토리 이름 합치기(변환하기)
var directories = ["users","newDir","newDocs"];
var docsDirectory = directories.join(path.sep);
console.log('문서 디렉토리: %s', docsDirectory);

// 디렉토리 이름과 파일명 합치기
var curPath = path.join('/Users/newDir', 'app.exe');
console.log('파일 패스: %s', curPath);

//패스에서 디렉토리, 파일명, 확장자 구별하기
var filename = "C:\\Users\\newDir\\app.exe";
var dirname = path.dirname(filename);
var basename = path.basename(filename);
var extname = path.extname(filename);
console.log(dirname,basename,extname);