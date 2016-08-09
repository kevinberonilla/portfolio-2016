var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename');

gulp.task('minify-css', function() {
    return gulp.src(['css/**/*.css', '!css/**/*.min.css'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifyCss({ compatibility: 'ie8' }))
        .pipe(gulp.dest('css'))
});

gulp.task('uglify', function() {
    return gulp.src(['js/**/*.js', '!js/**/*.min.js'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('js'))
});

gulp.task('watch', function() {
    gulp.watch(['css/**/*.css', '!css/**/*.min.css'], ['minify-css']);
    gulp.watch(['js/**/*.js', '!js/**/*.min.js'], ['uglify']);
});

gulp.task('default', ['minify-css', 'uglify', 'watch']);