console.log('---寄生构造函数模式---')
function Person(name, age, job) {
  return {
    name: name,
    age: age,
    job: job,
    sayName: function() {
      console.log(this.name)
    }
  }
}
// 就比工厂模式多了一个new.....
var friendr = new Person('Peter', 29, 'It')

function SpecialArray() {
  var values = [];
  values.push.apply(values, arguments);
  values.toPipedString = function() {
    return this.join('|')
  }
  return values;
}
// 当代码 new foo(...) 执行时：
// 一个新对象被创建。它继承自foo.prototype.
// 构造函数 foo 被执行。执行的时候，相应的传参会被传入，同时上下文(this)会被指定为这个新实例。new foo 等同于 new foo(), 只能用在不传递任何参数的情况。
// 如果构造函数返回了一个“对象”，那么这个对象会取代整个new出来的结果。如果构造函数没有返回对象，那么new出来的结果为步骤1创建的对象，ps：一般情况下构造函数不返回任何值，不过用户如果想覆盖这个返回值，可以自己选择返回一个普通对象来覆盖。当然，返回数组也会覆盖，因为数组也是对象。

var colors = new SpecialArray('red', 'blue');
// var colorsbis = SpecialArray('red', 'blue');
console.log(colors.toPipedString());


console.log('---稳妥构造函数模式---')
// 保护私有变量
function Personw(name, age, job) {
  var o = {};
  o.sayName = function() {
    console.log(name);
  }
  return o;
}
var friendr = Personw('Peter', 29, 'It')
