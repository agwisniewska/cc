'use strict';
import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";
import del from "del";
import concatCss from "gulp-concat-css";
import sass from "gulp-sass";

gulp.task('default', ['clean'], () => {
    gulp.start('build-js', 'copy-css', 'copy-html', 'copy-otherHtml', 'fonts');
});

gulp.task('clean', () => {
    return del('dist/*');
});

gulp.task('build-js', () => {
    return browserify("src/app.module.js")
        .transform("babelify")
        .bundle()
        .pipe(source("app.js"))
        .pipe(gulp.dest("dist"));
});


gulp.task('copy-css', function () {
    return gulp.src('src/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss("app.css"))
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy-otherHtml', () => {
    return gulp.src('./src/components/**/*.html')
        .pipe(gulp.dest('dist/views'));

});

gulp.task('fonts', function () {
    return gulp.src('node_modules/font-awesome/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('copy-html', () => {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist/'));

});




