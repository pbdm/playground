// 寄生组合式继承
console.log('--寄生组合式继承--')

// function SuperType(name) {
//   this.name = name
//   this.colors = ['red', 'blue', 'green']
// }
//
// SuperType.prototype.sayName = function () {
//   console.log(this.name)
// }
//
// function SubType(name, age) {
//   SuperType.call(this, name)
//   this.age = age;
// }
//
// SubType.prototype = new SuperType();
// SubType.prototype.constructor = SubType;
// SubType.prototype.sayAge= function() {
//   console.log(this.age)
// }

function inheritPrototoye(subType, superType) {
  subType.prototype = Object.create(superType.prototype)
  subType.prototype.constructor = subType
}

function SuperType(name) {
  this.name = name;
  this.colors = ['red', 'blue']
}

SuperType.prototype.sayName = function() {
  console.log(this.name)
}

function SubType(name, age) {
  SuperType.call(this.name)
  this.age = age
}

inheritPrototoye(SubType, SuperType)

SubType.prototype.sayAge = function() {
  console.log(this.age)
}

var ins = new SubType('Nicloas', 23)
console.log(ins)
