var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

gulp.task('minify:css', function() {
    return gulp.src(['./css/**/*.css', '!./css/**/*.min.css'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifyCss({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./css'))
});

gulp.task('minify:js', function() {
    return gulp.src(['./js/**/*.js', '!./js/**/*.min.js'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('./js'))
});

gulp.task('init:watch', function() {
    gulp.watch(['./css/**/*.css', '!./css/**/*.min.css'], ['minify:css']);
    gulp.watch(['./js/**/*.js', '!./js/**/*.min.js'], ['minify:js']);
});

gulp.task('default', ['minify:css', 'minify:js', 'init:watch']);