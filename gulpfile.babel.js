'use strict';
import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";
import templateCache from 'gulp-angular-templatecache';
import ngAnnotate from 'browserify-ngannotate';
import concatCss from "gulp-concat-css";
import sass from "gulp-sass";
import notify from 'gulp-notify';
import rename from 'gulp-rename';
import merge from 'gulp-merge';
import browserSync from 'browser-sync';

let interceptErrors = function(error) {
    let args = Array.prototype.slice.call(arguments);

    // Send error to notification center with gulp-notify
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);

    // Keep gulp from hanging on this task
    this.emit('end');
};


gulp.task('browserify', ['views'], function() {
    return browserify("src/app.module.js")
        .transform("babelify")
        .transform(ngAnnotate)
        .bundle()
        .pipe(source("app.js"))
        .pipe(gulp.dest('./build/'));
});

gulp.task('html', () => {
    return gulp.src('src/index.html')
        .on('error', interceptErrors)
        .pipe(gulp.dest('./build/'));

});

gulp.task('build', ['html', 'browserify'], function() {
    var html = gulp.src("build/index.html")
        .pipe(gulp.dest('./dist/'));

    var js = gulp.src("build/app.js")
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));

    return merge(html,js);
});


gulp.task('views', function() {
    return gulp.src('./src/components/**/*.html')
        .pipe(templateCache({
            standalone: true
        }))
        .on('error', interceptErrors)
        .pipe(rename("app.templates.js"))
        .pipe(gulp.dest('./src/'));
});

gulp.task('fonts', function () {
    return gulp.src('node_modules/font-awesome/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'))
});



gulp.task('copy-css', function () {
    return gulp.src('src/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss("app.css"))
        .pipe(gulp.dest('build/'));
});

gulp.task('default', ['browserify', 'html', 'copy-css', 'fonts'], function() {

    browserSync.init(['./build/**/**.**'], {
        server: "./build",
        port: 4000,
        notify: false,
        ui: {
            port: 4001
        }
    });

    gulp.watch("src/index.html", ['html']);
});






