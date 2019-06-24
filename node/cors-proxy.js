var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

app.use(
  '/',
  proxy({ 
    target: 'http://www.aaa.bbb', 
    changeOrigin: true,
    onProxyRes: function (proxyRes, req, res) {
      console.log('req')
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
  })
);
app.listen(7800);
