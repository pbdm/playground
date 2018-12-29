var fs = require('fs');
var path = require('path');
var http = require('http');
var formidable = require('formidable');

// 原生版本
// https://www.cnblogs.com/axes/p/4308430.html
http.createServer(function(req, res) {
  // 如果不是表单提交而是 fetch 或 xhrhttprequest 则需要支持跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.headers['content-type'] && req.headers['content-type'].indexOf('multipart/form-data') !== -1) {
    var chunks = [];
    var size = 0;
    // 接收 body,  可能触发很多次
    req.on('data', chunk => {
      chunks.push(chunk);
      size += chunk.length;
    });
    // 在所有数据接收完成后触发
    req.on('end', () => {
      var buffer = Buffer.concat(chunks, size);
      if (!size) {
        res.writeHead(404);
        res.end('');
        return;
      }
      var rems = [];
      //根据\r\n分离数据和报头
      for (var i = 0; i < buffer.length; i++) {
        var v = buffer[i];
        var v2 = buffer[i + 1];
        if (v === 13 && v2 === 10) {
          rems.push(i);
        }
      }
      //图片信息
      var picmsg = buffer.slice(rems[0] + 2, rems[1]).toString();
      var p = picmsg.match(/filename=".*"/g)[0].split('"')[1];
      //图片数据
      var nbuf = buffer.slice(rems[3] + 2, rems[rems.length - 2]);
      fs.writeFileSync(path.join(__dirname, 'temp', p), nbuf);
      res.end('{"errMsg":"ok"}');
    });
  }
}).listen(5557);

// formidable 版本
http.createServer(function(req, res) {
  // 如果不是表单提交而是 fetch 或 xhrhttprequest 则需要支持跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.headers['content-type'] && req.headers['content-type'].indexOf('multipart/form-data') !== -1) {
    const form = new formidable.IncomingForm();
    form.parse(req, function(error, fields, files) {
      console.log("parsing done");
      const filePath = files.data.path;
      const fileName = files.data.name;
      fs.writeFileSync(path.join(__dirname, 'temp', fileName), fs.readFileSync(filePath));
      res.end('{"errMsg":"ok"}');
    });
  } else {
      res.end('{"errMsg":"error"}');
  }
}).listen(5558);
