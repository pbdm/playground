// 组合继承
console.log('--组合继承--')

function SuperType(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}

SuperType.prototype.sayName = function () {
  console.log(this.name)
}

// 在子类构造函数中执行了一遍父类构造函数
function SubType(name, age) {
  SuperType.call(this, name)
  this.age = age;
}

// 在实现子类原型的类式继承时又调用了一遍父类构造函数
SubType.prototype = new SuperType();

SubType.prototype.sayAge = function() {
  console.log(this.age)
}

var instance1 = new SubType('Nicolas', 29)
console.log(instance1);
instance1.colors.push('black')
console.log(instance1.colors)
instance1.sayName();
instance1.sayAge();

var instance2 = new SubType('Greg', 27)
console.log(instance2.colors)
instance2.sayName();
instance2.sayAge();
