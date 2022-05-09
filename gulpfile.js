const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const { src, parallel, dest } = require('gulp');

const jsPath1 = 'build/bundled/main.js';
const jsPath2 = 'build/bundled/timeWorker.js';
const cssPath = 'source/styles/*.css';


function copyHtml() {
  return src('source/*.html').pipe(gulp.dest('build'));
}

function imgTask() {
  return src('source/images/*').pipe(imagemin()).pipe(gulp.dest('build/images'));
}

function jsTask1() {
  return src(jsPath1)
    .pipe(concat('main.js'))
    .pipe(terser())
    .pipe(dest('build/scripts'));
}

function jsTask2() {
  return src(jsPath2)
    .pipe(concat('timeWorker.js'))
    .pipe(terser())
    .pipe(dest('build/scripts'));
}


function cssTask() {
  return src(cssPath)
    .pipe(concat('main.css'))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('build/styles'));
}


exports.cssTask = cssTask;
exports.jsTask1 = jsTask1;
exports.jsTask2 = jsTask2;
exports.imgTask = imgTask;
exports.copyHtml = copyHtml;
exports.default = parallel(copyHtml, imgTask, cssTask);