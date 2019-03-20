var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ManifestPlugin = require('webpack-manifest-plugin');
var argv = require('yargs').argv;
var env;

if (argv.e === 'prod') {
  env = 'production';
} else {
  env = 'developement';
}

var distPath = path.join(__dirname, '/dist');
var appPath = path.join(__dirname, '/app');

module.exports = {
  entry: {
    app: path.join(appPath, 'index.js'),
  },
  output: {
    filename: '[name]-[chunkhash].js',
    path: distPath
  },
  devtool: 'cheap-source-map',
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: "eslint",
      exclude: /node_modules/
    }],
    loaders:[{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel'
    }, {
      test: /\.scss$/,
      exclude: /(node_modules)/,
      loader: ExtractTextPlugin.extract('style','css!postcss!sass')
    }, {
      test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
      exclude: /(node_modules)/,
      loader: "url"
    }]
  },
  postcss: [ autoprefixer({ browsers: ['> 5%', 'last 2 versions'] }) ],
  eslint: {
    configFile: '.eslintrc',
    emitWarning: false,
    formatter: require("eslint-friendly-formatter"),
    quiet: true
  },
  plugins: [
    new CleanWebpackPlugin(distPath, {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new webpack.DefinePlugin({
      "process.env": {
         NODE_ENV: JSON.stringify(env)
       }
    }),
    new ExtractTextPlugin("style-[contenthash].css", {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(appPath, 'index.html'),
      filename: 'index.html'
    }),
    new ManifestPlugin({
      fileName: 'rev.json'
    })
  ]
};
