(function(history) {
  var pushState = history.pushState;
  var replaceState = history.replaceState;
  history.pushState = function() {
    if (typeof history.onpushstate === 'function') {
      history.onpushstate(arguments);
    }
    return pushState.apply(history, arguments);
  };
  history.replaceState = function() {
    if (typeof history.onreplacestate === 'function') {
      history.onreplacestate(arguments);
    }
    return replaceState.apply(history, arguments);
  };
})(window.history);
