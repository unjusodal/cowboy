const {src, dest, watch, parallel, series} = require('gulp')

//Plagins
const sass          = require('gulp-sass')(require('sass'))
const concat        = require('gulp-concat')
const browserSync   = require('browser-sync').create()
const uglify        = require('gulp-uglify-es').default
const autoprefixer  = require('gulp-autoprefixer')
const imagemin      = require('gulp-imagemin')
const del           = require('del')
const webpack       = require('webpack-stream')
const htmlmin       = require('gulp-htmlmin')

function html() {
    return src('src/index.html')

    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'))
}

function styles() {
    return src('src/scss/styles.scss')

    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(concat('styles.min.css'))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true
    }))
    .pipe(dest('src'))
    .pipe(browserSync.stream())
}

function scripts() {
    return src('src/js/main.js')

    .pipe(webpack({
        mode: 'production'
    }))
    .pipe(uglify())
    .pipe(concat('bundle.js'))
    .pipe(dest('src'))
    .pipe(browserSync.stream())
}

function compressImgs() {
    return src(['src/assets/images/**/*.*', '!src/assets/images/bike.svg'])

    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('dist/assets/images'))
}

function liveServer() {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    })
}

function watching() {
    watch(['src/scss/**/*.scss'], styles)
    watch('src/index.html').on('change', browserSync.reload)
    watch(['src/js/main.js'], scripts),
    watch(['src/js/**/*.js'], scripts)
}

function cleanDist() {
    return del('dist')
}

function build() {
    return src([
        'src/styles.min.css',
        'src/bundle.js'
    ], {base: 'src'})

    .pipe(dest('dist'))
}

exports.watching = watching
exports.liveServer = liveServer
exports.compressImgs = compressImgs

exports.default = parallel(watching, liveServer)

exports.build = series(cleanDist, compressImgs, scripts, styles, html, build)