require('http').createServer(function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);
  console.log(req.headers['content-type']);
  // console.log(req.method);
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
}).listen(5556);
