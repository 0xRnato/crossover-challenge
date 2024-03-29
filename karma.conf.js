// Karma configuration
// Generated on Sun Apr 30 2017 04:04:08 GMT-0300 (-03)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './node_modules/angular/angular.js',
      './node_modules/angular-ui-router/release/angular-ui-router.js',
      './client/libs/angular-animate/angular-animate.min.js',
      './client/libs/angular-aria/angular-aria.min.js',
      './client/libs/angular-md5/angular-md5.js',
      './client/libs/angular-material/angular-material.min.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './client/js/*.js',
      './client/js/controllers/*.js',
      './client/js/services/*.js',
      './client/js/directives/*.js',
      './client/tests/**.**.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './client/js/*.js': ['coverage'],
      './client/js/controllers/*.js': ['coverage'],
      './client/js/services/*.js': ['coverage'],
      './client/js/directives/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: './client/coverage/'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    client: {
      captureConsole: true
    },

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
