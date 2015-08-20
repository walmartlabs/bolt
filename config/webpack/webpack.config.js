var webpack = require("webpack");
var path = require("path");
var boltNodeModules = path.join(__dirname, "../../node_modules");

module.exports = {
  cache: true,
  debug: false,
  devtool: "source-map",
  entry: path.join(process.cwd(), "src/index.js"),
  output: {
    path: path.join(process.cwd(), "dist"),
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: [/node_modules/],
      loaders: ["babel-loader?stage=0"]
    }, {
      test: /\.css$/,
      loaders: ["style-loader!css-loader"]
    }, {
      test: /\.styl$/,
      loaders: ["style-loader!css-loader!stylus-loader"]
    }, {
      test: /\.(png|jpg)$/,
      loaders: ["url-loader?limit=8192"]
    }]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      // Signal production, so that webpack removes non-production code that
      // is in condtionals like: `if (process.env.NODE_ENV === "production")`
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.SourceMapDevToolPlugin("[file].map")
  ],
  resolve: {
    root: [boltNodeModules, process.cwd()],
    modulesDirectories: ["node_modules"],
    extensions: ["", ".js", ".jsx"]
  },
  resolveLoader: {
      root: [boltNodeModules]
  }
};
