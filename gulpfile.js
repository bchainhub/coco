var concat = require('gulp-concat');
var deleteLines = require('gulp-delete-lines');
var ext_replace = require('gulp-ext-replace');
var gulp = require('gulp');
var purge = require('gulp-css-purge');
var sassdoc = require('sassdoc');
var sassExtract = require('gulp-sass-extractvars');
var spawn = require("gulp-spawn");
var streamify = require('gulp-streamify');
var tabify = require('gulp-tabify');

gulp.task('scss', function () {
  return gulp.src('style/**/*.sass', { buffer: false })
    .pipe(
      spawn({
        cmd: 'sass2scss',
        args: ['-p', '-s'],
        opts: { env: { PATH: process.env.PATH } },
        filename: function(base, ext) {
          return base + ext;
        }
      })
    )
    .pipe(ext_replace('.scss'))
    .pipe(gulp.dest('dist/scss/'));
});

gulp.task('scss-vars', function () {
  return gulp.src('style/**/*.sass', { buffer: false })
    .pipe(
      spawn({
        cmd: 'sass2scss',
        args: ['-p', '-s'],
        opts: { env: { PATH: process.env.PATH } },
        filename: function(base, ext) {
          return base + ext;
        }
      })
    )
    .pipe(streamify(sassExtract({
      data: {
        ' undefined': '',
        'undefined': '',
        '$undefined': '',
        ' !default': ''
      }
    })))
    .pipe(streamify(concat('vars.scss')))
    .pipe(gulp.dest('dist/default/'));
});

gulp.task('sass', function () {
  return gulp.src('style/**/*.sass', { buffer: false })
    .pipe(streamify(deleteLines({
      'filters': [/\/\/\/.+/]
    })))
    .pipe(streamify(tabify(2, true)))
    .pipe(gulp.dest('dist/sass/'));
});

gulp.task('scss-docs', function () {
  return gulp.src('style/**/*.sass', { buffer: false })
    .pipe(
      spawn({
        cmd: 'sass2scss',
        args: ['-p', '-k'],
        opts: { env: { PATH: process.env.PATH } },
        filename: function(base, ext) {
          return base + ext;
        }
      })
    )
    .pipe(ext_replace('.scss'))
    .pipe(gulp.dest('dist/docs/scss/'));
});

gulp.task('docs', function () {
  return gulp.src('dist/docs/scss/**/*.scss')
    .pipe(sassdoc({
      dest: 'docs/'
    }));
});
