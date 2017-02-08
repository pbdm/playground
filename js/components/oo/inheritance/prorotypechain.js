// 原型链

// 缺陷:
// 如果父类中的共有属性是引用类型, 就会在子类中被所有实例公用
// 因为子类实现的继承是靠其原型 prototype 对父类的实例化实现的, 因此在创建父类的时候, 无法向父类传递参数
console.log('--原型链--')
function SuperType() {
  this.property = true;
}

SuperType.prototype.getSuperValue = function() {
  return this.property
}

function SubType() {
  this.subproperty = false
}

SubType.prototype = new SuperType()

SubType.prototype.getSubValue = function() {
  return this.subproperty
}


var instance = new SubType()
console.log(instance.getSuperValue()) // true


// instanceof可以检测某个对象是否是某个类(对象)的实例
console.log(instance instanceof Object) // true
console.log(instance instanceof SuperType) //true
console.log(instance instanceof SubType) // true
// 并不表示两者的继承
console.log(SubType instanceof SuperType) // false
console.log(SubType.prototype instanceof SuperType) // true


console.log(Object.prototype.isPrototypeOf(instance)) //true
console.log(Object.prototype.isPrototypeOf(instance)) //true
console.log(Object.prototype.isPrototypeOf(instance)) //true

SubType.prototype.getSuperValue = function () {
  return false;
}
console.log(instance)

console.log(instance.getSuperValue()) // false
console.log(instance.getSubValue()) // false

console.log(instance)
