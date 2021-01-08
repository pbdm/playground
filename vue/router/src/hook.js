(function(history) {
  // hook pushstate
  var pushState = history.pushState;
  history.pushState = function() {
    if (typeof history.onpushstate === 'function') {
      history.onpushstate(arguments);
    }
    return pushState.apply(history, arguments);
  };

  // hook replacestate
  var replaceState = history.replaceState;
  history.replaceState = function() {
    if (typeof history.onreplacestate === 'function') {
      history.onreplacestate(arguments);
    }
    return replaceState.apply(history, arguments);
  };

  // hook addeventlistener
  var addEventListener = window.addEventListener
  window.addEventListener = function() {
    console.log(arguments)
    var action = arguments[0]
    if (action === 'popstate') {
      console.log('popstate')
      // 然而这并不能拆分内部的

      return addEventListener.apply(window, arguments)
    } else {
      return addEventListener.apply(window, arguments)
    }
  }
})(window.history);

history.onpushstate = (e) => {
  console.log('onpushstate', e)
}

history.onreplacestate = (e) => {
  console.log('onreplacestate', e)
}

window.addEventListener('popstate', (e) => {
  console.log('popstate', e)
})