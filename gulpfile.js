// Required to use gulp
const gulp = require('gulp');

// Optimize the images
const imagemin = require('gulp-imagemin');

// Replaces html to different text (Used for bundled files)
const htmlreplace = require('gulp-html-replace');

// Used to minify javascript
const terser = require('gulp-terser');

// Concats files together
const concat = require('gulp-concat');

// Used to minify CSS
const postcss = require('gulp-postcss');

// Wipes out build directory for each build
const clean = require('gulp-clean');

// Used to minify HTML
const htmlmin = require('gulp-htmlmin');

// Used for CSS minification
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

// Used for running gulp/defining srcs and dests
const { src, parallel, dest, series } = require('gulp');

// Constants defining paths
const jsPath = 'source/scripts/**/*.js'
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
    'css': 'styles/main.css',
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('build'));
}

// Copy and minify the Javscript
function jsTask() {
  return src(jsPath)
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
exports.jsTask = jsTask;
exports.imgTask = imgTask;
exports.copyfavi = copyfavi;
exports.copySounds = copySounds;
exports.copyFonts = copyFonts;

exports.default = series(reset ,parallel(htmlTask, copyfavi, copySounds, copyFonts, imgTask, cssTask, jsTask));
