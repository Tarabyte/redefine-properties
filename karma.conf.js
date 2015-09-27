/*jslint node:true*/
'use strict';

module.exports = function(karma) {
  karma.set({
    basePath: '',

    frameworks: [ 'mocha', 'chai' ],

    files: [
      'test/**/[^_]*.js',
      {
        pattern: 'lib/**/*.js',
        watch: true,
        served: false,
        included: false
      }
    ],

    reporters: [ 'nyan' ],

    preprocessors: {
      './test/**/[^_]*.js': ['webpack']
    },

    browsers: [ 'Chrome' ],

    logLevel: karma.LOG_INFO,

    singleRun: false,
    autoWatch: true,
    colors: true,

    webpack: {
      resolve: {
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules']
      }
    },

    webpackMiddleware: {
      stats: {
        // With console colors
        colors: true,
        // add the hash of the compilation
        hash: false,
        // add webpack version information
        version: false,
        // add timing information
        timings: true,
        // add assets information
        assets: false,
        // add chunk information
        chunks: false,
        // add built modules information to chunk information
        chunkModules: false,
        // add built modules information
        modules: false,
        // add also information about cached (not built) modules
        cached: false,
        // add information about the reasons why modules are included
        reasons: true,
        // add the source code of modules
        source: true,
        // add details to errors (like resolving log)
        errorDetails: true,
        // add the origins of chunks and chunk merging info
        chunkOrigins: true,
        // Add messages from child loaders
        children: false
      }
    },

    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-chrome-launcher'),
      require('karma-nyan-reporter')
    ]
  });
};
