var webpack = require("webpack");
var path = require("path");
var boltStandardNodeModules = path.join(__dirname, "../../", "node_modules");
var boltNodeModules = path.join(__dirname, "../../../electrode-bolt", "node_modules");
var CleanPlugin = require("clean-webpack-plugin");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var autoprefixer = require("autoprefixer-stylus");

module.exports = {
  cache: true,
  context: path.join(process.cwd(), "client"),
  entry: "./app.jsx",
  output: {
    path: path.join(process.cwd(), "dist/js"),
    filename: "bundle.[hash].js"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, include: path.join(process.cwd(), "client"),
        loaders: ["babel-loader?optional=runtime"] },
      { test: /\.styl$/,
        loader: "style-loader!css-loader!stylus-loader" },
      { test: /\.woff(2)?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg|png)$/,
        loader: "file-loader" }
    ]
  },
  stylus: {
    use: [autoprefixer({ browsers: ["last 2 versions"] })]
  },
  resolve: {
    root: [boltStandardNodeModules, boltNodeModules, process.cwd()],
    modulesDirectories: ["node_modules", "client", "node_modules/@walmart"],
    extensions: ["", ".js", ".jsx"]
  },
  resolveLoader: {
    root: [boltNodeModules, process.cwd()]
  },
  plugins: [
    // Clean
    new CleanPlugin(["dist"]),
    // Optimize
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        // Signal production mode for React JS libs.
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.SourceMapDevToolPlugin(
      "../map/bundle.[hash].js.map",
      "\n//# sourceMappingURL=http://127.0.0.1:3001/dist/map/[url]"
    ),
    new StatsWriterPlugin({
      filename: "../server/stats.json"
    })
  ]
};
