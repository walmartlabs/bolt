var path = require("path");

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["mocha", "sinon-chai", "phantomjs-shim"],
    files: [
      "../../node_modules/@walmart/wmreact-react-demo-shared/phantomjs-shims.js",
      "./entry.js"
    ],
    preprocessors: {
      "./entry.js": ["webpack"]
    },
    webpack: {
      cache: true,
      module: {
        preLoaders: [{
          test: /src\/.*\.jsx?$/,
          exclude: /(test|node_modules)\//,
          loader: "isparta?{ babel: { stage: 1 } }"
        }],
        loaders: [{
          test: /\.(js|jsx)$/,
          exclude: [/node_modules/],
          loader: "babel-loader?stage=1"
        }, {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        }, {
          test: /\.styl$/,
          loader: "style-loader!css-loader!stylus-loader"
        }]
      },
      resolve: {
        root: [process.cwd()],
        modulesDirectories: ["node_modules", "src"],
        extensions: ["", ".js", ".jsx"],
        alias: {
          // Allow root import of `src/FOO` from ROOT/src.
          src: path.join(process.cwd(), "src"),
          test: path.join(process.cwd(), "test")
        }
      }
    },
    webpackServer: {
      quiet: true,
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
      require("karma-sinon-chai"),
      require("karma-webpack"),
      require("@walmart/karma-phantomjs-shim"),
      require("karma-spec-reporter")
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
