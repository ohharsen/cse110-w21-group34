// Required to use gulp config
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

// Used for running gulp/defining srcs and dests
const { src, parallel, dest, series } = require('gulp');

// Constants defining paths
const jsPath = 'source/scripts/bundled.js'
const cssPath = 'source/styles/*.css';

// Clear the build directory
function reset() {
  return src('build', {read: false})
  .pipe(clean());
}

// Copy the favicon
function copyfavi() {
  return src('source/*.ico').pipe(dest('build'));
}

// Copy the sounds
function copySounds() {
  return src('source/sounds/*.mp3').pipe(dest('build/sounds'));
}

// Copy the fonts
function copyFonts() {
  return src('source/fonts/*').pipe(dest('build/fonts'));
}

// Copy and minify images
function imgTask() {
  return src('source/images/*').pipe(imagemin()).pipe(dest('build/images'));
}

// Copy and minify the HTML
function htmlTask() {
  return src('source/index.html')
    .pipe(htmlreplace({
      'css': './styles/main.css',
      'js': {
        'src': null,
        'tpl': '<script src=./scripts/bundled.js type="module"></script>'
      }
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('build'));
}

// Copy and minify the Javscript
function jsMainTask() {
  return src(jsPath)
    .pipe(terser())
    .pipe(dest('build/scripts'));
}

// Copy and minify the Javascript
function jsTimeWorkerTask() {
  return src('source/scripts/timeWorker.js')
    .pipe(terser())
    .pipe(dest('build/scripts'));
}

// Copy and minify the CSS
function cssTask() {
  return src(cssPath)
    .pipe(concat('main.css'))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('build/styles'));
}

// Export the tasks into gulp so we can run them
exports.cssTask = cssTask;
exports.reset = reset;
exports.htmlTask = htmlTask;
exports.jsMainTask = jsMainTask;
exports.jsTimeWorkerTask = jsTimeWorkerTask;
exports.imgTask = imgTask;
exports.copyfavi = copyfavi;
exports.copySounds = copySounds;
exports.copyFonts = copyFonts;

exports.default = series(reset ,parallel(htmlTask, copyfavi, copySounds, copyFonts, imgTask, cssTask, jsMainTask, jsTimeWorkerTask));
