process.on('kosmo', function() {
   console.log('kosmo이벤트 발생');
});

setTimeout(function() {
    process.emit('kosmo');
},2000);

console.log('2초후에 kosmo이벤트 발생 시킴')