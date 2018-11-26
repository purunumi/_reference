//버퍼 객체를 크기만 지정하여 만든 후 문자열을 쓰기
var output = "Hello 1!";
var buffer1 = new Buffer(10);
var len = buffer1.write(output, 'utf8');
console.log('첫 번째 버퍼의 문자열 : %s', buffer1.toString());
console.log('len => ', len);

//버퍼 객체를 문자열을 이용해 만들기
var buffer2 = new Buffer('Hello 2!', 'utf8');
console.log('두번째 버퍼의 문자열 : %s', buffer2.toString());
console.log('buffer2.length => ', buffer2.length);

//버퍼객체 타입 확인
console.log('버퍼 객체의 타입: %s', Buffer.isBuffer(buffer1));

//버퍼 객체에 들어있는 문자열 데이터를 문자열 변수로 변환
var byteLen = Buffer.byteLength(output);
var str1 = buffer1.toString('utf8', 0, byteLen);
var str2 = buffer2.toString('utf8');
console.log('byteLen => ', byteLen);
console.log('str1 => ', str1);
console.log('str2 => ', str2);

//첫번째 버퍼 객체의 문자열을 두번째 버퍼 객체로 복사
buffer1.copy(buffer2, 0, 0, len);
console.log('복사 후 buffer2 => ', buffer2.toString('utf8'));

//두개의 버퍼 연결
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log("concat 후 buffer3 => ", buffer3.toString('utf8'))