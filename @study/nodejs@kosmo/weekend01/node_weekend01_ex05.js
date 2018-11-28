
var nconf = require('nconf');
nconf.env();

// console.log('os환경 변수의 값: %s', nconf.get('OS'));
console.log(nconf.env());