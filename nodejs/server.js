require('http').createServer(function(req, res) {
  if (req.url.indexOf('favicon') === -1) {
    // console.log(req)
    // console.log('url', req.url)
    // console.log(req.rawHeaders)
  }
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // res.setHeader('Access-Control-Allow-Credentials', true);
  // console.log(req.method);
  // res.setHeader(
  //   "Set-Cookie", 'a=b'
  // )
  // console.log(req.headers.cookie);
  // res.setHeader('Access-Control-Allow-Methods', 'GET');
  if (req.method === 'OPTIONS') {
    res.end('I got your cookie: ' + req.headers.cookie);
  } else {
    let body = '';
    req.on('data', chunk => {
      console.log('ondata')
      console.log(chunk);
      body += chunk.toString();
    });
    req.on('end', () => {
      console.log('headers', req.headers)
      const params = {
        body: body,
        method: req.method,
        headers: req.headers,
        url: req.url
      }
      // console.log(params)
      res.end(
        JSON.stringify(params)
      );
    });
  }
// }).listen(5556);
}).listen(3001);
