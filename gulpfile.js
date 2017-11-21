const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const templateCache = require('gulp-angular-templatecache');
const htmlmin = require('gulp-htmlmin');

gulp.task('angular', () => {
  return gulp.src([
    'public/app.js',
    'public/js/**/*.js'
  ])
    .pipe(concat('application.js'))
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['angularjs-annotate']
    }))
    //.pipe(uglify())
    .pipe(gulp.dest('public/dist'));
});

gulp.task('template', () => {
  return gulp.src([
    'public/templates/**/*html'
  ])
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(templateCache({ root: 'components', module: 'mufcg' }))
    // .pipe(uglify())
    .pipe(gulp.dest('public/dist'));
});

gulp.task('vendor', () => {
  return gulp.src([
    'public/node_modules/angular/angular.min.js',
    'public/node_modules/angular-animate/angular-animate.min.js',
    'public/node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
    'public/node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
    'public/node_modules/jquery/dist/jquery.min.js',
    'public/node_modules/bootstrap/dist/js/bootstrap.min.js',
    'public/node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
    'public/node_modules/bootbox/bootbox.js',
    'public/node_modules/ngmap/build/scripts/ng-map.min.js'
  ])
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest('public/dist'));
});

gulp.task('watch', function () {
     watch ('public/js/**/*.js', function() { gulp.start('angular')});
});

gulp.task('default', ['angular', 'template', 'vendor']);
