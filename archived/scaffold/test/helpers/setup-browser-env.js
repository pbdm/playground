global.document = require('jsdom').jsdom('<body></body>');
global.window = document.defaultView;
global.localStorage = global.window.localStorage = {
  getItem: function (key) {
    return this[key];
  },
  setItem: function (key, value) {
    this[key] = value;
  }
};
global.self = document.defaultView;
global.location = global.window.location;
global.screen = global.window.screen
global.navigator = global.window.navigator
global.history = global.window.history
global.Util = require('../../common/js/lib/util');
