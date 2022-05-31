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
const bundledPath = 'source/bundled/bundled.js';
const timeWorkerPath = 'source/scripts/timeWorker.js';
const logRocketPath = 'source/3rd_party/logRocketInit.js';
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
function copyImg() {
  return src('source/images/*').pipe(dest('build/images'));
}

// Copy and minify the HTML
function htmlTask() {
  return src('source/index.html')
    .pipe(htmlreplace({
      'css': './styles/main.css',
      'js': {
        'src': null,
        'tpl': '<script defer src=./scripts/bundled.js type="module"></script>'
      }
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('build'));
}

// Copy and minify the main part of the JS
function jsMainTask() {
  return src(bundledPath)
    .pipe(terser())
    .pipe(dest('build/scripts'));
}

// Copy and minify the log rocket part of the JS
function jsLogRocketTask() {
  return src(logRocketPath)
    .pipe(terser())
    .pipe(dest('build/3rd_party'));
}

// Copy and minify the timeworker
function jsTimeWorkerTask() {
  return src(timeWorkerPath)
    .pipe(terser())
    .pipe(dest('build/scripts'));
}

// Copy zing
function copyZing() {
  return src('source/3rd_party/zingchart.min.js').pipe(dest('build/3rd_party'));
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
exports.copyImg = copyImg;
exports.copyfavi = copyfavi;
exports.copySounds = copySounds;
exports.copyFonts = copyFonts;
exports.copyZing = copyZing;
exports.jsLogRocketTask =  jsLogRocketTask;

exports.default = series(reset, parallel(htmlTask, copyfavi, copySounds, copyFonts, copyImg, cssTask, jsMainTask, jsTimeWorkerTask, copyZing, jsLogRocketTask));
