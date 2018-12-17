//node_day01_ex05_event.js

process.on('exit', function() {
   console.log('exit이벤트 발생!');
});

setTimeout(function() {
    process.exit();
}, 2000);

console.log('2초후에 exit...');
