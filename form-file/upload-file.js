const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
// const querystring = require('querystring');

const file = fs.createReadStream(path.resolve(__dirname, 'upload-file.html'));
// const file = fs.readFileSync(path.resolve(__dirname, 'upload-file.html'));
console.log('here');
var form = new FormData();
form.append('data', file);
// form.append('a', 'bbb');
(async () => {
  const result = await axios({
    // timeout: 1000,
    url: 'http://localhost:5558',
    headers: form.getHeaders(),
    method: 'post',
    data: form
  })
  console.log(result.data);
})();
