const http = require('http');
console.log('listen')
http.createServer(function(req, res) {
  // res.setHeader('Cache-Control', 'no-cache');
  console.log('9091 header', req.headers);
  res.setHeader('Cache-Control', 'public, max-age=10000');
  // res.setHeader('Cache-Control', 'no-cache');
  // res.setHeader('ETag', 'W/"b4-Qftkqo+MSzK2cbY1zRPhzVkKN1Q"');
  res.end(`
    <a href='http://localhost:9091'>9091</a>
    <script src='http://localhost:9092'></script>
    <script src='http://localhost:9093'></script>
  `);
})
.listen(9091);

http.createServer(function(req, res) {
  console.log('9092 header', req.headers);
  // res.setHeader('Cache-Control', 'public, max-age=10000');
  // res.setHeader('ETag', 'W/"b4-Qftkqo+MSzK2cbY1zRPhzVkKN1Q"');
  res.end('console.log(2)');
})
.listen(9092);

http.createServer(function(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=10000');
  // res.setHeader('ETag', 'W/"b4-Qftkqo+MSzK2cbY1zRPhzVkKN1Q"');
  res.end('console.log(2)');
})
.listen(9093);
