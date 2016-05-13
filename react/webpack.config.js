var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var packPath = path.join(__dirname, '/dist');

module.exports = {
  entry: { 
    js: './js/index.js'
  }, 
  output: {
    filename: 'bundle.js',
    path: packPath 
  },
  module:{
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel" }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(packPath, {
      root: __dirname,
      verbose: true, 
      dry: false
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html'
    })
  ]
};
