// 参考 https://github.com/xieranmaya/Promise3/blob/master/Promise3.js
// 参考 https://zhuanlan.zhihu.com/p/21834559
// 使用 https://github.com/promises-aplus/promises-tests 测试

const emptyFn = () => {};

function Promise(fn) {
  // pending fulfilled rejected
  this._state = 'pending';
  this._data = undefined;
  this.resolvedCallback = [];
  this.rejectedCallback = []
  const resolve = (value) => {
    // 防止在 then 没赋值之前就执行
    setTimeout(() => {
      if (this._state === 'pending') {
        this._data = value;
        this._state = 'resolved';
        this.resolvedCallback.forEach(cb => {
          cb(value)
        })
      }
    })
  }
  const reject = (reason) => {
    setTimeout(() => {
      if (this._state === 'pending') {
        this._data = reason;
        this._state = 'rejected';
        this.rejectedCallback.forEach(cb => {
          cb(reason)
        })
      }
    })
  }
  // TODO catch when rejected
  fn(resolve, reject)
}

// 返回一个 新的 Promise 对象
Promise.prototype.then = function(onResolved, onRejected) {
  // 光 return this 是不对的, then 方法返回一个新的 promise
  let ret;
  // TODO this._state === resolved 和 和 rejected 的情况
  if (this._state === 'pending') {
    ret = new Promise((resolve, rejcet) => {
      this.resolvedCallback.push((value) => {
        if (typeof onResolved === 'function') {
          let x = onResolved(this._data)
          // TODO 如果要链式调用这里不能简单的 resolve
          resolve(x)
        }
      })
      this.rejectedCallback.push((value) => {
        if (typeof onRejected === 'function') {
          let x = onRejected(this._data)
          resolve(x)
        }
      })
    })
  }
  return ret
}

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}

Promise.prototype.finally = emptyFn

Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    let resolveCount = 0;
    let resolveArray = new Array(promises.length)
    promises.forEach((promise, i) => {
      Promise.resolve(promise).then(value => {
        resolveCount++;
        resolveArray[i] = value;
        if (resolveCount === promises.length) {
          return resolve(resolveArray)
        }
      })
    })
  })
}

// Promise.race = emptyFn

Promise.reject = function(reason) {
  return new Promise(function(resolve, reject) {
    reject(reason)
  })
}

Promise.resolve = function(value) {
  return new Promise(function(resolve, reject) {
    resolve(value)
  })
}


// for test
try {
  // ES 标准已废弃, 但是运行 a+ 测试的时候需要
  Promise.deferred = function() {
    var d = {}
    d.promise = new Promise(function(resolve, reject) {
      d.resolve = resolve
      d.reject = reject
    })
    return d
  }
  module.exports = Promise
} catch (e) {
  // console.warn(e)
}


