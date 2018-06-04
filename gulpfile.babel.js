'use strict';
import gulp from "gulp";
import del from 'del';
import clean from 'gulp-clean';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import browserify from "browserify";
import source from "vinyl-source-stream";
import buffer from 'vinyl-buffer';
import templateCache from 'gulp-angular-templatecache';
import ngAnnotate from 'browserify-ngannotate';
import concatCss from "gulp-concat-css";
import sass from "gulp-sass";
import notify from 'gulp-notify';
import merge from 'gulp-merge';
import browserSync from 'browser-sync';
browserSync.create();
import pollyfil from 'babel-polyfill';
import request from "request";
import size from 'gulp-size'
import streamify from 'gulp-streamify';

let interceptErrors = function (error) {
  let args = Array.prototype.slice.call(arguments);

  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};


gulp.task('default', ['clean', 'scripts', 'sass', 'html', 'watch'], function () {
  browserSync.init(['./build/**/**.**'], {
    server: "./build",
    port: 4000,
    notify: true,
  });

})

gulp.task('html', function () {
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./build'))
})

gulp.task('views', function () {
  return gulp.src('./src/components/**/*.html')
    .pipe(templateCache({
      standalone: true
    }))
    .on('error', interceptErrors)
    .pipe(rename("app.templates.js"))
    .pipe(gulp.dest('./src'))
});

gulp.task('clean', function () {
  return del(['./build/*', './src/app.templates.js']);
});

gulp.task('scripts', ['views'], function () {
  return browserify({
      entries: './src/app.module.js',
      debug: true
    })
    .transform("babelify", {
      presets: ["es2015"]
    })
    .transform(ngAnnotate)
    .bundle()
    .pipe(source('app.min.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./build'));
});

gulp.task('sass', function () {
  return gulp.src('./src/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['scripts:watch', 'sass:watch', 'templates:watch', 'html:watch'], function () {});

gulp.task('html:watch', function () {
  gulp.watch('./src/*.html', ['html']).on('change', browserSync.reload);
})
gulp.task('templates:watch', function () {
  gulp.watch('./src/components/**/*.html', ['views']);
})

gulp.task('scripts:watch', function () {
  gulp.watch('./src/**/**/*.js', ['scripts']).on('change', browserSync.reload);
})
