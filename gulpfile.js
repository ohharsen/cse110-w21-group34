const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const htmlreplace = require('gulp-html-replace');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const clean = require('gulp-clean');
const htmlmin = require('gulp-htmlmin');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const { src, parallel, dest, series } = require('gulp');

const jsPath = 'source/scripts/**/*.js'
const cssPath = 'source/styles/*.css';

function reset() {
  return gulp.src('build', {read: false})
  .pipe(clean());
}

function copyfavi() {
  return src('source/*.ico').pipe(gulp.dest('build'));
}

function copySounds() {
  return src('source/sounds/*.mp3').pipe(gulp.dest('build/sounds'));
}

function imgTask() {
  return src('source/images/*').pipe(imagemin()).pipe(gulp.dest('build/images'));
}

function htmlTask() {
  return gulp.src('source/index.html')
    .pipe(htmlreplace({
      'css': 'main.css',
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

function jsTask() {
  return src(jsPath)
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
exports.reset = reset;
exports.htmlTask = htmlTask;
exports.jsTask = jsTask;
exports.imgTask = imgTask;
exports.copyfavi = copyfavi;
exports.copySounds = copySounds;

exports.default = series(reset ,parallel(htmlTask, copyfavi, copySounds, imgTask, cssTask, jsTask));
