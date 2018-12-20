var gulp = require('gulp');
var sassdoc = require('sassdoc');
var sass2less = require('gulp-sass-to-less');
var spawn = require("gulp-spawn");
var ext_replace = require('gulp-ext-replace');

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

gulp.task('less', function () {
  return gulp.src('dist/scss/**/*.scss')
    .pipe(sass2less())
    .pipe(gulp.dest('dist/less/'));
});

gulp.task('docs', function () {
  return gulp.src('dist/docs/scss/**/*.scss')
    .pipe(sassdoc({
      dest: 'docs/'
    }));
});