//var scrollEventType;
//(PBDm.whichBrowser().firefox) ? scrollEventType = "DOMMouseScroll": scrollEventType = "mousewheel";

// require serialize
export const jsonp = (url, params) => {

  return new Promise((resolve, reject) => {

    window.jsonP = window.jsonP || {};

    const callbackId = window.jsonP.callbackId = window.jsonP.callbackId ? ++window.jsonP.callbackId : 1;

    // 存储回调的数据
    let content;

    const callbackName = `callback_${callbackId}`

    window.jsonP[callbackName] = (data) => {
      content = data;
    }

    const data = Object.assign({}, params, {callback: `jsonP.${callbackName}`})

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url + serialize(data);
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

export const serialize = function(obj, prefix) {
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

export const whichBrowser = function() {
  var sys = {},
    ua = navigator.userAgent.toLowerCase(),
    s;
  (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1]:
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] : //ie11
    (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
  return sys;
}

export const canUseWebP = function() {
  var elem = document.createElement('canvas');

  if ((elem.getContext && elem.getContext('2d'))) {
    // was able or not to get WebP representation
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  } else {
    // very old browser like IE 8, canvas not supported
    return false;
  }
}

export const fetchComputedStyle = function(element, property) {//定义新函数
  if (window.getComputedStyle) {
    var computedStyles = window.getComputedStyle(element);//获取接口
    if (computedStyles) {
      property = property.toLowerCase();
      return computedStyles.getPropertyValue(property);
    }
  }
}
