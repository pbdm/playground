var scrollEventType;
(PBDm.whichBrowser().firefox) ? scrollEventType = "DOMMouseScroll": scrollEventType = "mousewheel";


var jsonp = (url, params) => {
  return new Promise((resolve, reject) => {
    
    window.jsonP = window.jsonP || {};
    
    const callbackId = jsonP.callbackId = jsonP.callbackId ? ++jsonP.callbackId : 1;

    // 存储回调的数据
    let content; 
    
    const callbackName = `callback_${callbackId}`
    
    window.jsonP[callbackName] = (data) => {
      content = data; 
    } 
    
    const data = Object.assign({}, params, {callback: `jsonP.${callbackName}`})
    
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url + this.serialize(data);
    script.async = true; 

    const removeScript = (e) => {
      document.body.removeChild(script);
      delete(jsonP[callbackName]);
      if (e.type === 'load') {
        resolve(content);
      } else {
        reject('error');
      }
    }
  
    script.addEventListener('load', removeScript, false);
    script.addEventListener('error', removeScript, false)
    
    document.body.appendChild(script);
  });
}

var serialize = function(obj, prefix) {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push(typeof v === "object" ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}
