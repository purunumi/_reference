// readFileSync - 동기 방식 IO
var fs = require('fs');

var data = fs.readFileSync('package.json','utf8');

console.log(data);