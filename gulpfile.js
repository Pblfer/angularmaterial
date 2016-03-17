var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var cssnano = require('gulp-cssnano');
var typescript = require('gulp-tsc');

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


gulp.task('compile', function(){
  gulp.src('app/tsc/**/*.ts')
    .pipe(typescript())
    .pipe(gulp.dest('app/js/'))
    .pipe(browserSync.reload({
      stream: true
      }))
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(imagemin({
      // Setting interlaced to true
      interlaced: true
    }))
  .pipe(gulp.dest('dist/images'))
});


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
});

gulp.task('watch', ['browserSync', 'sass', 'compile'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/tsc/**/*.ts', ['compile']);    
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('*.html', browserSync.reload);     
});

