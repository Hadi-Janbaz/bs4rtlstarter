const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const { parallel, watch } = require('gulp');
// Compile Sass & Inject Into CSS File
function scss() {
    gulp.src(['node_modules/bootstrap-v4-rtl/scss/bootstrap-rtl.scss','src/scss/*.scss'])
        .pipe(sass({style: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest('src/css/'))
        .pipe(browserSync.stream());
}

// Watch For SCSS File Change
watch(['src/scss/*.scss'], function(){
    scss();
});
//Init Server and Parse to Browser
function serve() {
    browserSync.init({
        server: "./src"  
    });
    gulp.watch("./src/*.html").on('change', browserSync.reload);
};

// Move JS Files to src/js
function js() {
    gulp.src(['node_modules/bootstrap-v4-rtl/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
}
// Move Fonts to src/fonts
function fonts() {
    gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'));
}
// Move Font Awesome CSS to src/css
function fa() {
    gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('src/css'))
}

  
// exports.default = defaultTask;
exports.default = parallel(serve, scss, js, fonts, fa);
