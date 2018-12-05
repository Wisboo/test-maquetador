var localConfig = {
  scssWatchedFiles: 'src/**/*.scss',
  jadeWatchedFiles: 'src/**/*.jade',
  cleanHtml: 'build/**/*.html',
  cleanCss: 'build/css/all.css',
  buildSrc: 'build',
  jadeSrc: 'src/**/*.jade',
  sassSrc: 'src/scss/styles.scss'
};

var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var browserSync = require('browser-sync').create();
var del = require('del');
var runSequence = require('run-sequence');

// clean
gulp.task('clean:html', function () {
  return del([localConfig.cleanHtml]);
});

gulp.task('clean:css', function() {
  return del(localConfig.cleanCss);
})

// jade
gulp.task('jade', ['clean:html'], function () {
  return gulp.src(localConfig.jadeSrc)
    .pipe(jade({ pretty : true }))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// sass
gulp.task('sass', ['clean:css'], function(){
  return gulp.src(localConfig.sassSrc)
    .pipe(sass())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// server
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: localConfig.buildSrc
    },
  })
})

// watch
gulp.task('watch', function (){
  gulp.watch(localConfig.scssWatchedFiles, ['sass']);
  gulp.watch(localConfig.jadeWatchedFiles, ['jade']);
})

gulp.task('default', function (callback) {
  runSequence(['sass', 'jade'],
    'browserSync',
    'watch',
    callback
  )
})
