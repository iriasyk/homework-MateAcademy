// 'use strict';
var gulp = require('gulp'); // Подключаем Gulp
var sass = require('gulp-sass'); // Подключаем Sass пакет
var watch = require('gulp-watch');
// var csso = require('gulp-csso');
const nunjucksRender = require('gulp-nunjucks-render');
let cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('autoprefixer', () =>
    gulp.src('dist/css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
);

gulp.task('minify-css', () => {
    return gulp.src('dist/css/main.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});

const htmlMain = gulp.task('html', () =>
    gulp.src("./src/core/index.html")
        .pipe(nunjucksRender())
        .pipe(gulp.dest("./dist"))
);

gulp.task('sass', function() { // Создаем таск "sass"
    return gulp.src(['src/core/scss/**/*.scss']) // Берем источник
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('dist/css')) // Выгружаем результата в папку css
});

gulp.task('watch', function() {
    gulp.watch(['src/core/scss/**/*.scss'], ['sass']); // Наблюдение за sass файлами в папке sass
});

// gulp.task('default', ['watch'], function () {
//     return gulp.src('dist/css/main.css')
//         .pipe(csso())
//         .pipe(gulp.dest('dist/css'));
// });
