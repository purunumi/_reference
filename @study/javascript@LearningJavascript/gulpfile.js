const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('set', function(){
    // ESLint
    gulp.src(['es6/**/*.js', 'public/es6/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format());
    // 노드 소스
    gulp.src('es6/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
    // 클라이언트 소스
    gulp.src('public/es6/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('public/dist'));
});

gulp.task('watch', function(){
    gulp.watch(
        [],
        ['set']
    );
});



gulp.task('default', ['watch']);