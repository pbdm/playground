var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var packPath = path.join(__dirname, '/dist');

module.exports = {
  entry: {
    js: './app.js'
  },
  output: {
    filename: 'bundle-[chunkhash].js',
    path: packPath
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
