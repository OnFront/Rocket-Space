const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();


// compile scss into css
function compileCSS() {
    // 1. find CSS file
    return gulp.src('./scss/style.scss')
    // 2. pass that file through compiler
    .pipe(sass())
    // 3. save the compiled  CSS
    .pipe(gulp.dest('./css'))
    // 4. send changes to all browsers
    .pipe(browserSync.stream());
}



function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./scss/**/*.scss', compileCSS)
    gulp.watch('./*.html').on('change', browserSync.reload)
    gulp.watch('./js/**/*.js').on('change', browserSync.reload );
}

exports.compileCSS = compileCSS;
exports.watch = watch;