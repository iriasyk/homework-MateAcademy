const
    gulp           = require('gulp'),
    nunjucksRender = require('gulp-nunjucks-render'),
    sass           = require("gulp-sass"),
    cssmin 		 = require('gulp-clean-css'),
    autoprefixer   = require('gulp-autoprefixer');

gulp.task('default', function () {
    gulp.watch('./src/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.html', ['html']);
    gulp.watch('./dist/*.css', ['css']);
});

const htmlMain = gulp.task('html', () =>
    gulp.src("./src/core/index.html")
        .pipe(nunjucksRender())
        .pipe(gulp.dest("./dist"))
);

gulp.task('sass', function () {
    return gulp.src('./src/core/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
});

gulp.task('css', function(){
    return gulp.src('./dist/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('./dist'));
});