'use strict'
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
// 数据属性, 一般都不需要修改默认值
var person = {}
Object.defineProperty(person, 'name', {
  writable: true, // 是否能更改属性的值
  configurable: true, //能否通过delete删除属性或者修改属性,能否将属性修改为访问器属性
  enumerable: true, // 能否通过for in,  Object.keys 循环返回属性
  value: 'Nicholas' // 默认为undefined
})
// 如果writable为 false, 此处在严格模式下会报错
person.name = 'ss'
// 如果configurable为 false, 此处在严格模式下会报错
delete person.name;

// 访问器属性, 不能喝数据属性共用
var book = {
  _year: 2004,
  edition: 1
};
Object.defineProperty(book, 'year', {
  configurable: true, //能否通过delete删除属性或者修改属性,能否将属性修改为访问器属性
  enumerable: true, // 能否通过for in, Object.keys 循环返回属性
  // 在读取属性时调用的函数
  get: function() {
    return this._year;
  },
  // 在写入属性时调用的函数
  set: function(newValue) {
    if (newValue > 2004) {
      this._year = newValue;
      this.edition += newValue - 2004;
    }
  }
})
book.year = 2005;
console.log(book.edition) // 2
