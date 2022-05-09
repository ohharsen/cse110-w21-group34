const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const { src, series, parallel, dest, watch } = require('gulp');

const jsPath = 'source/scripts/**/*.js';


function copyHtml() {
  return src('source/*.html').pipe(gulp.dest('build'));
}

function imgTask() {
  return src('source/images/*').pipe(imagemin()).pipe(gulp.dest('build/images'));
}

function jsTask() {
  return src(jsPath)
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/scripts'));
}

exports.jsTask = jsTask;
exports.imgTask = imgTask;
exports.copyHtml = copyHtml;
exports.default = parallel(copyHtml, imgTask);