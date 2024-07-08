var webpackConfig = require("./webpack.test.js");

module.exports = function (config) {
  var _config = {
    basePath: "../",
    frameworks: ["jasmine"],
    files: [
      {
        pattern: "./test-config/karma-test-shim.js",
        watched: true,
      },
      {
        pattern: "./src/assets/**/*",
        watched: false,
        included: false,
        served: true,
        nocache: false,
      },
    ],
    proxies: {
      "/assets/": "/base/src/assets/",
    },
    preprocessors: {
      "./test-config/karma-test-shim.js": ["webpack", "sourcemap"],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: "errors-only",
    },
    webpackServer: {
      noInfo: true,
    },
    browserConsoleLogOptions: {
      level: "log",
      format: "%b %T: %m",
      terminal: true,
    },
    coverageIstanbulReporter: {
      reports: ["text-summary", "html", "lcovonly"],
      fixWebpackSourcePaths: true,
      combineBrowserReports: true,
      skipFilesWithNoCoverage: true,
      "report-config": {
        html: {
          subdir: "html",
        },
      },
      thresholds: {
        emitWarning: false,
        global: {
          statements: 85,
          lines: 85,
          branches: 85,
          functions: 85,
        },
        each: {
          statements: 85,
          lines: 85,
          branches: 85,
          functions: 85,
          overrides: {
            "baz/component/**/*.js": {
              statements: 98,
            },
          },
        },
      },
      // output config used by istanbul for debugging
      verbose: true,
    },
    reporters: config.coverage
      ? ["kjhtml", "progress", "coverage-istanbul"]
      : ["kjhtml", "dots"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false,
  };

  config.set(_config);
};
