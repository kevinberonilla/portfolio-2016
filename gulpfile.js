var gulp = require('gulp');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');

gulp.task('init:browserSync', () => {
    browserSync({
        open: true,
        notify: false,
        once: true,
        port: 8080,
        files: ['./css/**/*.css', './js/**/*.js', './**/*.html', './images/**/*.{jpg,jpeg,png,gif,svg}'],
        reloadDebounce: 1000,
        server: {
            baseDir: './'
        }
    });
});

gulp.task('minify:css', () => {
    return gulp.src(['./css/**/*.css', '!./css/**/*.min.css'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./css'))
});

gulp.task('minify:js', () => {
    return gulp.src(['./js/**/*.js', '!./js/**/*.min.js'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('./js'))
});

gulp.task('init:watch', () => {
    gulp.watch(['./css/**/*.css', '!./css/**/*.min.css'], ['minify:css']);
    gulp.watch(['./js/**/*.js', '!./js/**/*.min.js'], ['minify:js']);
});

gulp.task('default', () => {
    return runSequence(['minify:css', 'minify:js'], ['init:browserSync', 'init:watch']);
});