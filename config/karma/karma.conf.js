var path = require("path");

var webpackCfg = require("../webpack/webpack.config.test");

module.exports = function (config) {
  config.set({
    basePath: process.cwd(),
    frameworks: ["mocha", "sinon-chai", "phantomjs-shim"],
    files: [
      // Sinon has issues with webpack. Do global include.
      "./node_modules/electrode-bolt/node_modules/sinon/pkg/sinon.js",
      "./node_modules/electrode-bolt/config/karma/entry.js"
    ],
    preprocessors: {
      "./node_modules/electrode-bolt/config/karma/entry.js": ["webpack"]
    },
    webpack: webpackCfg,
    webpackServer: {
      port: 3002, // Choose a non-conflicting port (3000 app, 3001 test dev)
      quiet: false,
      noInfo: true,
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
      }
    },
    exclude: [],
    port: 8080,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: false,
    browsers: ["PhantomJS"],
    reporters: ["spec", "coverage"],
    browserNoActivityTimeout: 60000,
    plugins: [
      require("karma-coverage"),
      require("karma-mocha"),
      require("karma-mocha-reporter"),
      require("karma-phantomjs-launcher"),
      require("karma-firefox-launcher"),
      require("karma-sinon-chai"),
      require("karma-webpack"),
      require("karma-spec-reporter"),
      require("karma-phantomjs-shim"),
    ],
    coverageReporter: {
      reporters: [
        { type: "json", file: "coverage.json" },
        { type: "lcov" },
        { type: "text" }
      ],
      dir: path.join(process.cwd(), "coverage/client")
    },
    captureTimeout: 100000,
    singleRun: true
  });
};
