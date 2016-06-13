console.log('app.js');
if (location.hash === '#inheritance') {
  require('./components/oo')
} else if (location.hash === '#promise') {
  require('./components/promise.js')
}
