console.log('design pattern');

// 通用的惰性单例
// https://github.com/alexreardon/memoize-one 这里有一个类似的库?!
var getSingle = function(fn) {
  var result;
  return function() {
    return result || ( result = fn.apply(this, arguments));
  }
};

// 策略模式:  将方法写到配置项中...


// 创建缓存代理工厂
var createProxyFactory = function(fn){
  var cache = {};
  return function() {
    var args = Array.prototype.join.call(arguments, ',' );
    if (args in cache) {
      return cache[ args ]; 
    }
    return cache[ args ] = fn.apply(this, arguments); 
  }
};
// example
var proxyMult = createProxyFactory(mult);
alert(proxyMult( 1, 2, 3, 4 ));

// 发布订阅模式
var event = {
  clientList: [],
  listen: function(key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push[fn]; // 订阅的消息添加进缓存列表 
  },
  trigger: function() {
    var key = Array.prototype.shift.call(arguments), // (1);
      fns = this.clientList[key];
    if (!fns || fns.length === 0) { // 如果没有绑定对应的消息 return false;
    }
    for (var i = 0; i < fns.length; i++) {
      fns[i].apply(this, arguments); // (2) // arguments 是 trigger 时带上的参数
    }
  },
  remove: function(key, fn) {
    var fns = this.clientList[key];
    if (!fns) { // 如果 key 对应的消息没有被人订阅，则直接返回
      return false;
    }
    if (!fn) { // 如果没有传入具体的回调函数，表示需要取消 key 对应消息的所有订阅
      fns && (fns.length = 0);
    } else {
      for (var l = fns.length - 1; l >= 0; l--) { // 反向遍历订阅的回调函数列表 
        var _fn = fns[l];
        if (_fn === fn) {
          fns.splice(l, 1);
        }
      }
    }
    return true;
  }
};

var installEvent = function(obj) {
  for (var i in event) {
    obj[i] = event[i];
  }
};


/**
 * 用AOP装饰函数
 *
 */
// before and after for function
Function.prototype.before = function(beforefn) {
  var __self = this; // 保存原函数的引用
  return function() { // 返回包含了原函数和新函数的"代理"函数
    beforefn.apply(this, arguments); // 执行新函数，且保证 this 不被劫持，新函数接受的参数也会被原封不动地传入原函数，新函数在原函数之前执行
    return __self.apply(this, arguments); // 执行原函数并返回原函数的执行结果， 并且保证 this 不被劫持
  }
}

Function.prototype.after = function(afterfn) {
  var __self = this;
  return function() {
    var ret = __self.apply(this, arguments);
    afterfn.apply(this, arguments);
    return ret;
  }
};

//example 
document.getElementById = document.getElementById.before(function() {
  alert(1);
});

// 感悟: 使用设计模式就是少用if else 嵌套......


// 单一职责(别干太多)
// 最小知识(别知道太多)
// 开放封闭(可扩展不可修改, 少些if else)

