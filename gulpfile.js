// Required to use gulp config
const gulp = require('gulp');
const htmlreplace = require('gulp-html-replace');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const clean = require('gulp-clean');
const htmlmin = require('gulp-htmlmin');
const cssnano = require('cssnano');

// Used for running gulp/defining srcs and dests
const { src, parallel, dest, series } = require('gulp');

// Constants defining paths
const BUNDLED_PATH = 'source/bundled/bundled.js';
const BUILD_BUNDLED_PATH = 'build/scripts';
const ZING_CHART_PATH = 'source/3rd_party/zingchart.min.js';
const BUILD_ZING_CHART_PATH = 'build/3rd_party';
const LOG_ROCKET_PATH = 'source/3rd_party/logRocketInit.js';
const BUILD_LOG_ROCKET_PATH = 'build/3rd_party';
const TIMEWORKER_PATH = 'source/scripts/timeWorker.js';
const BUILD_TIMEWORKER_PATH = 'build/scripts';

const BUILD_ROOT_PATH = 'build';
const BUILD_SOUND_PATH = 'build/sounds';
const BUILD_FONT_PATH = 'build/fonts';
const BUILD_IMG_PATH = 'build/images';
const BUILD_POMO_CSS_PATH = 'build/styles';
const BUILD_TUT_CSS_PATH = 'build/tutorial-styles';
const BUILD_TUT_JS_PATH = 'build/tutorial-scripts';


const FAVICON_PATH = 'source/*ico';
const SOUND_PATH = 'source/sounds/*.mp3';
const FONT_PATH = 'source/fonts/*';
const IMG_PATH = 'source/images/*';
const POMO_CSS_PATH = 'source/styles/*.css';
const TUT_CSS_PATH = 'source/tutorial-styles/*.css';
const TUT_JS_PATH = 'source/tutorial-scripts/*.js';
const POMO_HTML_PATH = 'source/index.html';
const TUT_HTML_PATH = 'source/tutorial_page.html';
const SW_JS_PATH = 'source/sw.js';
const MANIFEST_PATH = 'source/manifest.json';
const SET_BG_JS_PATH = 'source/scripts/setBackground.js';
const INDEX_JS_PATH = 'source/scripts/index.js'
    // Clear the build directory
function reset() {
    return src(BUILD_ROOT_PATH, { read: false })
        .pipe(clean());
}

// Copy the setbackground
function copySetBG() {
    return src(SET_BG_JS_PATH).pipe(dest(BUILD_BUNDLED_PATH));
}

// Copy the index.js
function copyIndexJS() {
    return src(INDEX_JS_PATH).pipe(dest(BUILD_BUNDLED_PATH));
}

// Copy the serviceworker
function copyServiceWorker() {
    return src(SW_JS_PATH).pipe(dest(BUILD_ROOT_PATH));
}

// Copy the manifest
function copyManifest() {
    return src(MANIFEST_PATH).pipe(dest(BUILD_ROOT_PATH));
}

// Copy the favicon
function copyfavi() {
    return src(FAVICON_PATH).pipe(dest(BUILD_ROOT_PATH));
}

// Copy the sounds
function copySounds() {
    return src(SOUND_PATH).pipe(dest(BUILD_SOUND_PATH));
}

// Copy the fonts
function copyFonts() {
    return src(FONT_PATH).pipe(dest(BUILD_FONT_PATH));
}

// Copy and minify the pomo images
function copyImg() {
    return src(IMG_PATH).pipe(dest(BUILD_IMG_PATH));
}

// Copy zing
function copyZing() {
    return src(ZING_CHART_PATH).pipe(dest(BUILD_ZING_CHART_PATH));
}

// Copy and minify the log rocket part of the JS
function minifyLogRocket() {
    return src(LOG_ROCKET_PATH)
        .pipe(terser())
        .pipe(dest(BUILD_LOG_ROCKET_PATH));
}

// Copy and minify the timeworker
function minifyTimeWorker() {
    return src(TIMEWORKER_PATH)
        .pipe(terser())
        .pipe(dest(BUILD_TIMEWORKER_PATH));
}

// Copy and minify the pomo css
function minifyPomoCSS() {
    return src(POMO_CSS_PATH)
        .pipe(concat('main.css'))
        .pipe(postcss([cssnano()]))
        .pipe(dest(BUILD_POMO_CSS_PATH));
}

// Copy and minify the tutorial css
function minifyTutCSS() {
    return src(TUT_CSS_PATH)
        .pipe(postcss([cssnano()]))
        .pipe(dest(BUILD_TUT_CSS_PATH));
}

// Copy and minify the pomo part of the JS
function minifyPomoJS() {
    return src(BUNDLED_PATH)
        .pipe(terser())
        .pipe(dest(BUILD_BUNDLED_PATH));
}

// Copy and minify the tutorial part of the JS
function minifyTutJS() {
    return src(TUT_JS_PATH)
        .pipe(terser())
        .pipe(dest(BUILD_TUT_JS_PATH));
}

// Copy and minify the HTML
function minifyPomoHTML() {
    return src(POMO_HTML_PATH)
        .pipe(htmlreplace({
            'css': './styles/main.css',
            'js': {
                'src': null,
                'tpl': '<script src=./scripts/bundled.js type="module"></script>'
            }
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest(BUILD_ROOT_PATH));
}

function minifyTutHTML() {
    return src(TUT_HTML_PATH)
        .pipe(dest(BUILD_ROOT_PATH));
}


// Export the tasks into gulp so we can run them
exports.reset = reset;
exports.copySetBG = copySetBG;
exports.copyIndexJS = copyIndexJS;
exports.copyServiceWorker = copyServiceWorker;
exports.copyManifest = copyManifest;
exports.copyfavi = copyfavi;
exports.copySounds = copySounds;
exports.copyFonts = copyFonts;
exports.copyImg = copyImg;
exports.copyZing = copyZing;
exports.minifyLogRocket = minifyLogRocket;
exports.minifyTimeWorker = minifyTimeWorker;
exports.minifyPomoCSS = minifyPomoCSS;
exports.minifyTutCSS = minifyTutCSS;
exports.minifyPomoJS = minifyPomoJS;
exports.minifyTutJS = minifyTutJS;
exports.minifyPomoHTML = minifyPomoHTML;
exports.minifyTutHTML = minifyTutHTML;
exports.default = series(
    reset,
    parallel(
        copySetBG,
        copyIndexJS,
        copyServiceWorker,
        copyManifest,
        copyfavi,
        copySounds,
        copyFonts,
        copyImg,
        copyZing,
        minifyLogRocket,
        minifyTimeWorker,
        minifyPomoCSS,
        minifyTutCSS,
        minifyPomoJS,
        minifyTutJS,
        minifyPomoHTML,
        minifyTutHTML
    ));