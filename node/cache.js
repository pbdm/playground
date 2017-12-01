require('http').createServer(function(req, res) {
  // res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Cache-Control', 'public, max-age=10000');
  res.end(`jjj<script src='http://localhost:9092'></script>`);
})
.listen(9091);

require('http').createServer(function(req, res) {
  console.log('http');
  res.setHeader('Cache-Control', 'public, max-age=10000');
  res.end('ddd');
})
.listen(9092);
