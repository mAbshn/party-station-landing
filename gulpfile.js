const { src, dest, watch, parallel, series } = require('gulp')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const autoprefixer = require('gulp-autoprefixer')
const clean = require('gulp-clean')
const sass = require('gulp-sass')(require('sass'))
const imagemin = require('gulp-imagemin')
const ttf2woff2 = require('gulp-ttf2woff2')
const fonter = require('gulp-fonter')
const include = require('gulp-include')

function images() {
  return src('src/assets/images/*')
    .pipe(imagemin())
    .pipe(dest('./dist/images'))
}

function fonts() { 
  return src('src/assets/fonts/*')
    .pipe(fonter({
      formats: ['woff', 'ttf']
    }))
    .pipe(src(['src/assets/fonts/*.ttf']))
    .pipe(ttf2woff2())
    .pipe(dest('./dist/fonts'));
}

function pages() {
  return src('src/pages/*.html')
    .pipe(include({
      includePaths: 'src/components'
    }))
    .pipe(dest('./dist/pages'))
}

function styles() {
  return src('src/sass/*.sass')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concat('style.min.css'))
    .pipe(dest('./dist'))
}

function scripts() {
  return src("src/js/*.js")
  .pipe(uglify())
  .pipe(concat("main.min.js"))
  .pipe(dest("./dist"));
}

function watching() {
  watch(['src/assets/images/*'], images)
  watch(['src/assets/fonts/*'], fonts)
  watch(['src/sass/*.sass'], styles)
  watch(['src/js/*.js'], scripts)
  watch(['src/pages/*', 'src/components/*'], pages)
}

function cleanDist() {
  return src('dist', {"allowEmpty": true})
    .pipe(clean())
}

exports.images = images
exports.fonts = fonts
exports.styles = styles
exports.scripts = scripts
exports.pages = pages
exports.watching = watching

exports.default = series(cleanDist, parallel(images, fonts, styles, scripts, pages, watching))