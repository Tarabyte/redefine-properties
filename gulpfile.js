/*jslint node:true*/
'use strict';
var gulp = require('gulp'),
  karma = require('karma'),
  path = require('path'),
  mocha = require('gulp-mocha'),
  lint = require('gulp-jshint');

var src = './lib/**/*.js',
  test = './test/**/[^_]*.js';

/**
 * Run nodejs tests.
 */
gulp.task('test', function() {
  return gulp
    .src(test)
    .pipe(mocha({
      ui: 'bdd',
      reporter: 'nyan'
    }));
});

/**
 * Lint sources
 */
gulp.task('lint', function() {
  return gulp
    .src(src)
    .pipe(lint())
    .pipe(lint.reporter('jshint-stylish'))
})

/**
 * Launch karma test runner for in browser tests.
 */
gulp.task('test:browsers', function() {
    karma.server.start({
      configFile: path.join(__dirname, 'karma.conf.js')
    });
});

/**
 * Warch src and test and launch tests.
 */
gulp.task('watch', function() {
  gulp.watch(src, ['lint']);
  gulp.watch([src, test], ['test']);
});


gulp.task('default', ['lint', 'test', 'watch']);