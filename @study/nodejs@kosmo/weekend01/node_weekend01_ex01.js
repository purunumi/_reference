var result = 0;

console.time('time_check');
for(var i=0; i<=100000; i++){
    result += i;
}
console.timeEnd('time_check');
console.log('1~100000까지 더한 결과: %d', result);
console.log('현재 실행한 파일명: %s', __filename);
console.log('현재 실행한 파일패스: %s', __dirname);