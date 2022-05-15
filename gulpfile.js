const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const terser = require('gulp-terser');
const postcss = require('gulp-postcss');
const htmlmin = require('gulp-htmlmin');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const { src, parallel, dest, series } = require('gulp');

const jsPath = 'source/scripts/**/*.js'
const cssPath = 'source/styles/*.css';

function copyfavi() {
  return src('source/*.ico').pipe(gulp.dest('build'));
}

function copySounds() {
  return src('source/sounds/*.mp3').pipe(gulp.dest('build/sounds'));
}

function imgTask() {
  return src('source/images/*').pipe(imagemin()).pipe(gulp.dest('build/images'));
}

function minhtml() {
  return gulp.src('source/index.html')
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
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('build/styles'));
}


exports.cssTask = cssTask;
exports.htmlmin = minhtml;
exports.jsTask = jsTask;
exports.imgTask = imgTask;
exports.copyfavi = copyfavi;
exports.copySounds = copySounds;

exports.default = parallel(minhtml, copyfavi, copySounds, imgTask, cssTask, jsTask);
