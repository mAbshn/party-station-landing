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
const fs = require('fs')

function images() {
  return src(['src/assets/images/*', 'src/assets/icons/*'])
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

function fontsStyle() {
  const FILE_PATH = 'src/sass/fonts.sass'
  const cb = () => {}

  fs.writeFile(FILE_PATH, '', cb)
    return fs.readdir('dist/fonts', function (_err, items) {
      if (items) {
        let c_fontname;
        for (let i = 0; i < items.length; i++) {
          let fontname = items[i].split('.')[0];
          if (c_fontname !== fontname) {
            fs.appendFile(FILE_PATH, '@include font("' + fontname + '", "' + fontname + '", "400", "normal")\r\n', cb)
          }
          c_fontname = fontname;
        }
      }
    })
}

function pages() {
  return src('src/pages/*.html')
    .pipe(include({
      includePaths: 'src/components'
    }))
    .pipe(dest('./dist/pages'))
}

function styles() {
  return src(['src/sass/*.sass', '!src/sass/nullstyle.sass', '!src/sass/fonts.sass'])
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
exports.fontsStyle = fontsStyle
exports.styles = styles
exports.scripts = scripts
exports.pages = pages
exports.watching = watching

exports.default = series(cleanDist, parallel(images, series(fonts, fontsStyle), styles, scripts, pages, watching))