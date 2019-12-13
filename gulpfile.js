const { task, series, parallel, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const notify = require('gulp-notify');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const csscomb = require('gulp-csscomb');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const sortCSSmq = require('sort-css-media-queries');

const PATH = {
    scssFile: './assets/scss/style.scss',
    scssFiles: '/assets/scss/**/*.scss',
    cssFiles: './assets/scss/**/*.scss',
    cssFolder: './assets/css',
    scssFolder: './assets/scss',
    htmlFiles: './*.html'
};

const plugins = [
    autoprefixer({
        overrideBrowserslist: ['last 5 versions', '> 1%'], 
        cascade: true, 
    }),
    mqpacker({ sort: sortCSSmq }),
];

function scss() {
    return src(PATH.scssFile, {sourcemaps: true})
    .pipe(sass({outputStyle: 'expanded'})
    .on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(dest(PATH.cssFolder), {sourcemaps: true})
    .pipe(browserSync.reload({ stream: true }));
}

function scssMin() {
    const extendedPlugins = plugins.concat([cssnano({ preset: 'default' })]);

    return src(PATH.cssFile)
    .pipe(postcss(extendedPlugins))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(PATH.cssFolder));
}

function comb() {
    return src(PATH.scssFiles)
        .pipe(csscomb())
        .on('error', notify.onError(err => 'File: ${err.message}'))
        .pipe(dest(PATH.scssFolder));
}

function syncInit() {
    browserSync({
        server: {
            baseDir: './',
        },
        notify: false,
      });
}

async function sync() {
    browserSync.reload();
}

function watchFiles() {
    syncInit();
    watch(PATH.cssFiles, series(scss));
    watch(PATH.htmlFiles, series(sync));
}


task('min', scssMin);
task('comb', comb);
task('scss', scss);
task('watch', watchFiles);