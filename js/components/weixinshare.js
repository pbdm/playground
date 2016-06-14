var md5 = require('blueimp-md5');

function encrypt(params) {
    params._sm = "md5";
    var s = "", keys = [];
    for (var k in params) {
        keys.push(k);
    }
    keys.sort();
    for (var i = 0; i < keys.length; i++) {
        s = s + keys[i] + "=" + params[keys[i]];
    }
    s += 'jk.pingan.com';
    params._sig = md5(s);
    return params;
}

function serialize(obj, prefix) {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

function request(params, success) {

  var xhr = new XMLHttpRequest();

  xhr.open('POST', 'http://api.jk.cn/m.api', true);

  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 400) {

      var data = JSON.parse(xhr.responseText);

      if (data && data.stat && data.stat.code >= 0) {
        success(data);
      }
    }
  }

  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  params = encrypt(params);
  var data = serialize(params);
  xhr.send(data);
}

const script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js';
script.async = true;
script.addEventListener('load', init, false);
document.body.appendChild(script);
function init() {
  request({
    _mt: 'healthcenter.getTicket',
    url: location.href.split('#')[0]
  }, function(data) {
    var info = data.content[0]
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'wx2b179889f9fc1297', // 必填，公众号的唯一标识
      timestamp: info.timestamp, // 必填，生成签名的时间戳
      nonceStr: info.nonceStr, // 必填，生成签名的随机串
      signature: info.signature,// 必填，签名，见附录1
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function () {
      var shareData = {
        title: '微信JS-SDK Demo',
        desc: '微信JS-SDK,帮助第三方为用户提供更优质的移动web服务',
        link: location.href,
        trigger: function (res) {
          alert('用户点击分享到QQ');
        },
        cancel: function (res) {
          alert('已取消');
        },
        imgUrl: 'http://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRt8Qia4lv7k3M9J1SKqKCImxJCt7j9rHYicKDI45jRPBxdzdyREWnk0ia0N5TMnMfth7SdxtzMvVgXg/0'
      };
      wx.onMenuShareAppMessage(shareData);
      wx.onMenuShareTimeline(shareData);
    });
    wx.error(function (res) {
      alert(res.errMsg);
    });

  })
}
