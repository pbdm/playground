console.log('app.js');
if (location.hash === '#oo') {
  require.ensure([], function(require) {
    require('./components/oo')
  });
} else if (location.hash === '#promise') {
  require.ensure([], function(require) {
    require('./components/promise')
  });
} else if (location.hash === '#weixinshare') {
  require.ensure([], function(require) {
    require('./components/weixinshare')
  });
  // design pattern
} else if (location.hash === '#dp') {
  require.ensure([], function(require) {
    require('./components/dp')
  });
}
