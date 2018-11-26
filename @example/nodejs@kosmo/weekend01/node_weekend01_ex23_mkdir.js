var fs = require('fs');

fs.exists('./docs', function(exists) {
    if(exists) {
        fs.rmdir('./docs', function(err) {
            if(err) throw err;
            console.log('docs 폴더를 삭제 했습니다')
        });
    } else {
        fs.mkdir('./docs', 0666, function(err) {
            if(err) throw err;
            console.log('새로운 docs 폴더를 만들었습니다.');
        });
    }
});