/* eslint-disable */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var mqpacker = require('css-mqpacker');
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var run = require('run-sequence');
var del = require('del');
var pug = require('gulp-pug');
var htmlbeautify = require('gulp-html-beautify');


gulp.task('style', function () {
  gulp.src('sass/style.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(postcss([
        autoprefixer({browsers: [
          'last 1 version',
          'last 2 Chrome versions',
          'last 2 Firefox versions',
          'last 2 Opera versions',
          'last 2 Edge versions'
        ]}),
        mqpacker({
          sort: true
        })
      ]))
      .pipe(gulp.dest('build/css'))
      .pipe(minify())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('build/css'))
      .pipe(server.stream());
});

gulp.task('style-project', function () {
  gulp.src('sass/style.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(postcss([
        autoprefixer({browsers: [
          'last 1 version',
          'last 2 Chrome versions',
          'last 2 Firefox versions',
          'last 2 Opera versions',
          'last 2 Edge versions'
        ]}),
        mqpacker({
          sort: true
        })
      ]))
      .pipe(gulp.dest('css'))
      .pipe(minify())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('css'))
      .pipe(server.stream());
});

gulp.task('images', function () {
  return gulp.src('build/img/**/*.{png,jpg,gif}')
      .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.jpegtran({progressive: true})
      ]))
      .pipe(gulp.dest('build/img'));
});

gulp.task('images-test', function () {
  return gulp.src('img/**/*.{png,jpg,gif}')
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true })
    ]))
    .pipe(gulp.dest('img/optimized'));
});

gulp.task('icon-sprite', function () {
  return gulp.src('build/img/**/icon-*.svg')
      .pipe(svgmin())
      .pipe(svgstore({
        inlineSvg: true
      }))
      .pipe(rename('icons.svg'))
      .pipe(gulp.dest('build/img'));
});

gulp.task('pug', function buildHTML() {
  return gulp.src('pug/*.pug')
    .pipe(pug())
    .pipe(htmlbeautify())
    .pipe(gulp.dest('./'));
});

gulp.task('serve', function () {
  server.init({
    server: '.',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('sass/**/*.{scss,sass}', ['style-project']);
  gulp.watch('*.html').on('change', server.reload);
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('copy', function () {
  return gulp.src([
    'fonts/**/*.{woff,woff2}',
    'img/**',
    'js/**',
    '*.html'
  ], {
    base: '.'
  })
      .pipe(gulp.dest('build'));
});

gulp.task('build', function (fn) {
  run(
      'clean',
      'copy',
      'style',
      'images',
      'icon-sprite',
      fn
  );
});
