/**
 * 原型模式
 */

console.log('---原型模式---')
console.log('---原型模式理论---')
function Person() {
}
Person.prototype.name = 'Nicholas';
Person.prototype.sayName = function() {
  alert(this.name);
}

console.log(Person.prototype);

var person1 = new Person();
console.log(Object.getPrototypeOf(person1) === Person.prototype) //true
console.log(person1.__proto__ === Person.prototype) // true

var person2 = new Person();
person2.name = 'other';
console.log(person1.sayName === person2.sayName); // true

console.log(person1.hasOwnProperty('name')) // false
console.log(person2.hasOwnProperty('name')) // true
console.log('name' in person1); //true
console.log('name' in person2); //true


function Personb() {
}
var friend = new Personb();
// 这种形式下constructor属性不再指向Personb, 而是 Object
Personb.prototype = {
  name: 'Other',
  sayName: function() {
    alert(this.name)
  }
}
// friend.sayName(); // error
var person3 = new Personb();
console.log(person2.constructor === Person) // true
console.log(person3.constructor === Personb) // false
console.log(person3.constructor === Object) // true


console.log('---组合使用构造函数模式和原型模式---')
// 将不共享的属性放到构造函数里
// 缺点: 构造函数和原型分别独立了
function Personm(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friend = ['Shelby', 'Court'];
}
Personm.prototype = {
  constructor: Personm,
  sayName: function() {
    alert(this.name)
  }
}


console.log('---动态原型模式---')
function Persona(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  // 只在第一次调用 new Persona的时候会执行
  if (typeof this.sayName !== 'function') {
    Persona.prototype.sayName = function() {
      alert(this.name);
    }
    // 注意此处不能写成
    // Persona.prototype = {
    //   sayName = ....
    // }
  }
}
