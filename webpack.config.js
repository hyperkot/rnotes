"use strict";

const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  // Set debugging source maps to be "inline" for
  // simplicity and ease of use
  devtool: "inline-source-map",

  // The application entry point
  entry: "./src/index.tsx",

  // Where to compile the bundle
  // By default the output directory is `dist`
  output: {
    filename: "bundle.js"
  },

  // Supported file loaders
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ]
  },

  // File extensions to support resolving
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".png", ".jpg", ".jpeg", ".gif"],
    plugins: [
      new TsConfigPathsPlugin({
        extensions: [".ts", ".tsx", ".js", ".jsx"]
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.ejs",
      minify: false
    })
  ]
};