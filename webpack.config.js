const webpack = require('webpack');
const multi = require("multi-loader");

module.exports = {
  context: __dirname + '/public',

  entry: {
    app: [
      './index.html',
      './src/vendor.imports.js',
      './src/app.js'
    ]
  },

  output: {
    path: __dirname + '/public/dist',
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: multi('style-loader!css-loader!sass-loader')
      },
      {
        test: /\.html$/,
        loader: multi('file-loader?name=[path][name].[ext]!extract-loader!html-loader')
      }
    ]
  }
};