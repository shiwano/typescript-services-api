'use strict';

var gulp = require('gulp');
var del = require('del');
var plugins = require('gulp-load-plugins')();

var paths = {
  gulpfile: 'gulpfile.js',
  src: 'index.js',
  test: 'index_test.ts',
  testDest: '.tmp/',
  packageJson: 'package.json',
  testPackageDir: 'node_modules/typescript-services-api',
  typescriptFiles: ['index_test.ts', 'index.d.ts']
};

var tsProject = plugins.typescript.createProject({
  target: 'ES5',
  module: 'commonjs',
  noImplicitAny: true
});

var mochaOptions = {
  reporter: 'nyan'
};

gulp.task('jshint', function() {
  return gulp.src([paths.gulpfile, paths.src])
    .pipe(plugins.plumber())
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});

gulp.task('tslint', function() {
  return gulp.src(paths.typescriptFiles)
    .pipe(plugins.plumber())
    .pipe(plugins.tslint())
    .pipe(plugins.tslint.report('verbose'));
});

gulp.task('test', ['clean:testDest', 'setUpTestPackage'], function() {
  return test(false);
});

gulp.task('test:watch', ['setUpTestPackage'], function () {
  return test(true);
});

gulp.task('clean:testDest', function(callback) {
  del(paths.testDest, callback);
});

gulp.task('default', ['jshint', 'tslint', 'test']);

gulp.task('watch', function () {
  gulp.watch([paths.src, paths.test], ['test:watch']);
});

gulp.task('setUpTestPackage', function() {
  return gulp.src([paths.src, paths.packageJson])
    .pipe(gulp.dest(paths.testPackageDir));
});

function test(watching) {
  return gulp.src(paths.test)
    .pipe(plugins.plumber({errorHandler: function() {
      if (!watching) { process.exit(1); }
    }}))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.typescript(tsProject)).js
    .pipe(plugins.espower())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(paths.testDest))
    .pipe(plugins.spawnMocha(mochaOptions));
}
