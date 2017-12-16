var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var cssmin = require('gulp-cssmin');
var browserSync = require('browser-sync').create();

var path = {
    images: './src/**/images/*',
    fonts: './src/fonts/**',
    css: './src/*.scss',
    html: {
        pages: './src/pages/**/*.hbs',
        partials: './src/partials/'
    },
    dist: {
        fonts: './dist/fonts/',
        images: './dist/images/',
        css: './dist/',
        html: './dist/'
    },
    watch: {
        css: './src/**/*.scss',
        html: './src/**/*.hbs'
    }
};

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('css', function () {

    return gulp.src(path.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 4 versions']
        }))
        .pipe(sourcemaps.init())
        .pipe(cssmin())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.dist.css));
});

gulp.task('html', function () {
    return gulp.src(path.html.pages)
        .pipe(handlebars({}, {
            ignorePartials: true,
            batch: [path.html.partials]
        }))
        .pipe(rename({
            dirname: '.',
            extname: '.html'
        }))
        .pipe(gulp.dest(path.dist.html));
});

gulp.task('fonts', function () {
    return gulp.src(path.fonts)
        .pipe(gulp.dest(path.dist.fonts));
});

gulp.task('images', function () {
    return gulp.src(path.images)
        .pipe(rename ({dirname: '.'}))
        .pipe(gulp.dest(path.dist.images));
});

gulp.task('build', ['html', 'css', 'fonts', 'images']);

gulp.task('watch', function () {
    gulp.watch(path.watch.html, ['html']);
    gulp.watch(path.watch.css, ['css']);
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: path.dist.html
    }
  });
  gulp.watch('dist/**').on('change', browserSync.reload);
});
