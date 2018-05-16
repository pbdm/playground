var fs = require('fs');

require('http')
  .createServer(function(req, res) {
    console.log(req.headers['content-type']);
    if (req.headers['content-type'].indexOf('multipart/form-data') !== -1) {
      var chunks = [];
      var size = 0;
      // 接收 body,  可能触发很多次
      req.on('data', chunk => {
        chunks.push(chunk);
        size += chunk.length;
      });
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
        var path = picmsg.match(/filename=".*"/g)[0].split('"')[1];

        //图片数据
        var nbuf = buffer.slice(rems[3] + 2, rems[rems.length - 2]);

        fs.writeFileSync(path, nbuf);
        res.end('{"errMsg":"ok"}');
      });
    } else {
      // console.log(req.method);
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3002');
      res.setHeader('Access-Control-Allow-Credentials', true);
      // res.setHeader(
      //   "Set-Cookie", 'a=b'
      // )
      // console.log(req.headers.cookie);
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      if (req.method === 'OPTIONS') {
        res.end('I got your cookie: ' + req.headers.cookie);
      } else {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          // console.log(body);
          res.end(
            JSON.stringify({
              body: body,
              method: req.method,
              headers: req.headers,
              url: req.url
            })
          );
        });
      }
    }
  })
  .listen(5556);
