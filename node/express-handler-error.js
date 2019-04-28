// nodejs的异步和错误处理 https://cnodejs.org/topic/56aad41a26d02fc6626bb369
// https://jysperm.me/2016/10/nodejs-error-handling/
var express = require('express');
var app = express();

// 个人推荐方式
app.get('/recommend', function (req, res, next) {
  try {
    JSON.parse('dd');
  } catch (e) {
    next(e)
  }
});

app.get('/error', function (req, res) {
  throw new Error('an error')
});

// 走 promise 内的 catch
app.get('/promiseerror', function (req, res, next) {
  function p(params) {
    return new Promise(function(resolve, reject) {
      // next({message: 'c'})
      throw new Error('an promise error')
    })
  }
  p().then((value)=> {
    next({message: 'b'})
    console.log(value)
  }).catch((e)=>{
    console.log(e)
    res.json({
      catchMessage: e.message
    });
  })
});

// 会直接走到通用报错
app.get('/promiseparamserror', function (req, res) {
  function p(params) {
    return new Promise(function(resolve, reject) {
      throw new Error('an promise error')
    })
  }
  function par() {
    throw new Error('error params')
  }
  p(par()).catch((e)=>{
    console.log(e)
    res.json({
      catchMessage: e.message
    });
  })
}); 

// 异步内的异常不能被捕获
app.get('/timeouterror', function (req, res) {
  setTimeout(function() {
    throw new Error('timeouterror')
  }, 1000)
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message || 'error');
});

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});

// 并不推荐, 实际上有一些比较激进的人士认为程序一旦出现事先没有预料到的错误，就应该立刻崩溃，以免造成进一步的不可控状态，也为了提起开发人员足够的重视
// process.on('uncaughtException', (err) => {
//   console.log('uncaughtException')
//   console.error(err);
// });
