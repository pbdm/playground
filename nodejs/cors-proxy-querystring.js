
const querystring = require("querystring");
const http = require("http");
const url = require("url");

// TODO 处理错误逻辑, 支持 https
require('http').createServer(function(req, res) {
  let str = querystring.unescape(req.url.slice(1))
  const u = url.parse(str);
  res.setHeader('Access-Control-Allow-Origin', '*');
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const headers = {...req.headers}
    // 将 host 改为将要请求的目标服务器
    headers.host = u.host
    const options = {
      method: req.method,
      hostname: u.hostname,
      port: u.port,
      path: u.pathname,
      headers: headers
    };
    query(options, body, (result, b) => {
      Object.keys(result.headers).forEach((key) => {
        res.setHeader(key, result.headers[key]);
      })
      res.headers = result.headers
      res.end(b);
    })
  });

}).listen(5222);

function query(options, b, cb) {
  const request = http.request(options, function (result) {
    const chunks = [];
    result.on("data", function (chunk) {
      chunks.push(chunk);
    });
    result.on("end", function () {
      const body = chunks.toString(); 
      cb(result, body);
    });
  });
  request.write(b);
  request.end();
}
