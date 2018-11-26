//사용자가 직접 만든 이벤트 처리
process.on('tick', function(count) {
   console.log('tick 이벤트 발생함: %s', count); 
});

setTimeout(function() {
    console.log('2초 후에 tick이벤트 호출');
    process.emit('tick', 555);
}, 2000);