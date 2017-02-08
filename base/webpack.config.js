var path = require('path');

var distPath = path.join(__dirname, '/dist');
var appPath = path.join(__dirname, '/app');

module.exports = {
  entry: {
    js: appPath + '/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: distPath
  }
};
