const { src, dest, parallel, series, watch } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');

function minifyCss() {
    return src(['./css/**/*.css', '!./css/**/*.min.css'])
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest('./css'));
}

function minifyJs() {
    return src(['./js/**/*.js', '!./js/**/*.min.js'])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest('./js'));
}

function initBrowserSync() {
    browserSync({
        files: ['./css/**/*.css', './js/**/*.js', './images/**/*', './**/*.html'],
        server: {
            baseDir: './'
        },
        port: 80,
        open: true,
        notify: false
    });
}

function initWatch() {
    watch(['./css/**/*.css', '!./css/**/*.min.css'], minifyCss);
    watch(['./js/**/*.js', '!./js/**/*.min.js'], minifyJs);
}

exports.default = series(minifyCss, minifyJs, parallel(initBrowserSync, initWatch));