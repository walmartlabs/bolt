"use strict";
/**
 * Webpack frontend test configuration.
 */
var path = require("path");
var _ = require("lodash");
var prodCfg = require("./webpack.config");

console.log(__dirname);

module.exports = {
  cache: true,
  context: __dirname,
  entry: "../karma/entry",
  output: {
    path: process.cwd(),
    filename: "bundle.js",
    publicPath: "/assets/"
  },
  resolve: _.merge({}, prodCfg.resolve, {
    alias: {
      client: path.join(process.cwd(), "client")
    }
  }),
  resolveLoader: prodCfg.resolveLoader,
  module: {
    loaders: [prodCfg.module.loaders[0]]
  },
  devtool: "#source-map"
};
