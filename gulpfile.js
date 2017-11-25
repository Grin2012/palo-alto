var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var path = {
    css:  'src/styles/*.scss',
    html: 'src/templates/*.html',
    ttf:  'src/fonts/*.ttf',
    eot:  'src/fonts/*.eot',
    woff: 'src/fonts/*.woff',
    png:  'src/images/*.png',
    dist: {
        css:  'dist/styles/',
        html: 'dist/',
        ttf:  'dist/fonts/',
        eot:  'dist/fonts/',
        woff: 'dist/fonts/',
        png:  'dist/images/'
    }
};

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('css', function () {

    return gulp.src(path.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(path.dist.css));
});

gulp.task('html', function () {
    return gulp.src(path.html)
        .pipe(nunjucks.compile())
        .pipe(gulp.dest(path.dist.html));
});

gulp.task('ttf', function () {
    return gulp.src(path.ttf)
        .pipe(gulp.dest(path.dist.ttf));
});

gulp.task('eot', function () {
    return gulp.src(path.eot)
        .pipe(gulp.dest(path.dist.eot));
});

gulp.task('woff', function () {
    return gulp.src(path.woff)
        .pipe(gulp.dest(path.dist.woff));
});

gulp.task('png', function () {
    return gulp.src(path.png)
        .pipe(gulp.dest(path.dist.png));
});

gulp.task('build', ['html', 'css', 'ttf', 'eot', 'woff', 'png']);

gulp.task('watch', function () {
    gulp.watch(path.css, ['css']);
    gulp.watch(path.html, ['html']);
    gulp.watch(path.ttf, ['ttf']);
    gulp.watch(path.eot, ['eot']);
    gulp.watch(path.woff, ['woff']);
    gulp.watch(path.png, ['png']);
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: path.dist.html
    }
  });
  gulp.watch('dist/**').on('change', browserSync.reload);
});
