"use strict";

const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {

  mode: "development",

  // Set debugging source maps to be "inline" for
  // simplicity and ease of use
  // devtool: "inline-source-map",

  devtool: "cheap-source-map",

  // The application entry point
  entry: {
    index: "./src/index.tsx"
  },

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  // Where to compile the bundle
  // By default the output directory is `dist`
  //output: {
  //  filename: "bundle.js" // Not compatible with optimizations
  //},

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
    new BundleAnalyzerPlugin({
      analyzerMode: "disable",
      openAnalyzer: "false"
    }),
    new HtmlWebpackPlugin({
      template: "index.ejs",
      minify: false
    })
  ]
};