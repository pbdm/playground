const express = require('express');
const app = express();
const axios = require('axios');
const querystring = require('querystring');

app.use(express.json());
app.use(express.urlencoded());
// app.use(express.urlencoded());

app.all('/:url', function (req, res, next) {
  (async function() {
    try {
      const contentType = req.headers['content-type']; 
      const headers = {...req.headers}
      // 删除 host, 请求将会补上真实的 host
      delete headers.host
      const options = {
        method: req.method,
        headers: headers,
        url: req.params.url,
        params: req.query
      }
      if (contentType === 'application/x-www-form-urlencoded' || contentType === 'application/json') {
        const data = req.headers['content-type'] === 'application/x-www-form-urlencoded' ? querystring.stringify(req.body) : req.body;
        options.data = data;
        const result = await axios(options)
        res.json(result.data)
      } else {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', async () => {
          options.data = body;
          const result = await axios(options)
          res.set(result.headers)
          res.json(result.data)
        });
      }
    } catch (e) {
      next(e);
    }
  })();
});

app.use(function(err, req, res, next) {
  res.json({
    message: err.message
  });
});

app.listen(5200, function () {
  console.log('Example app listening on port 5200!');
});

