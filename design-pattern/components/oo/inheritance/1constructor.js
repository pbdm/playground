// 借用构造函数
// 但是创建出来的每个实例都会单独拥有一份而不能公用
console.log('--借用构造函数--')
function SuperType() {
  this.colors = ['red', 'blue', 'green']
}
function SubType() {
  SuperType.call(this)
}
var instance1 = new SubType()
instance1.colors.push('black')
console.log(instance1.colors)

function SuperType2(name) {
  this.name = name;
}

function SubType2() {
  SuperType2.call(this, 'Nicholas');
  this.age = 29
}

var instance = new SubType2();
console.log(instance);
