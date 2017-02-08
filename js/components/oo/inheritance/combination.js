// 组合继承
console.log('--组合继承--')

function SuperType(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}

SuperType.prototype.sayName = function () {
  console.log(this.name)
}

// 但是父类的构造函数调用了两遍
function SubType(name, age) {
  SuperType.call(this, name)
  this.age = age;
}

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
