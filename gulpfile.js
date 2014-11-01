'use strict';

var fs = require('fs');
var gulp = require('gulp');
var del = require('del');
var plugins = require('gulp-load-plugins')();

var paths = {
  gulpfile: 'gulpfile.js',
  src: 'index.js',
  test: 'test/**/*_test.ts',
  testDest: '.tmp/',
  packageJson: 'package.json',
  testPackageDir: 'node_modules/typescript-services-api',
  typescriptFiles: 'test/**/*.ts'
};

var tsProject = plugins.typescript.createProject({
  target: 'ES5',
  module: 'commonjs',
  noImplicitAny: true
});

var mochaOptions = {
  reporter: 'spec'
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
  return gulp.src(paths.typescriptFiles)
    .pipe(plugins.plumber({errorHandler: function() {
      if (!watching) { process.exit(1); }
    }}))
    .pipe(plugins.changed(paths.testDest, {extension: '.js', hasChanged: hasChangedForTest}))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.typescript(tsProject)).js
    .pipe(plugins.espower())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(paths.testDest))
    .pipe(plugins.spawnMocha(mochaOptions));
}

function hasChangedForTest(stream, callback, sourceFile, destPath) {
  if (!fs.existsSync(destPath)) {
    stream.push(sourceFile);
    return callback();
  }

  var destStat = fs.statSync(destPath);

  if (sourceFile.stat.mtime > destStat.mtime) {
    stream.push(sourceFile);
  } else if (/_test.ts$/.test(sourceFile.path)) {
    var testTargetPath = sourceFile.path
      .replace(/_test.ts$/, '.ts')
      .replace(process.cwd() + '/test', process.cwd());
    var testTargetStat = fs.statSync(testTargetPath);

    if (testTargetStat.mtime > destStat.mtime) {
      stream.push(sourceFile);
    }
  }

  callback();
}
