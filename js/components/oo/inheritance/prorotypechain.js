// 原型链
console.log('--原型链--')
function SubperType() {
  this.property = true;
}

SubperType.prototype.getSuperValue = function() {
  return this.property
}

function SubType() {
  this.subproperty = false
}

SubType.prototype = new SubperType()

SubType.prototype.getSubValue = function() {
  return this.subproperty
}


var instance = new SubType()
console.log(instance.getSuperValue()) // true

console.log(instance instanceof Object) // true
console.log(instance instanceof SubperType) //true
console.log(instance instanceof SubType) // true

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
