/**
 * 构造函数模式
 */
'use strict';
console.log('---构造函数模式---')
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() {
    console.log(this.name)
  }
}
var person2 = new Person('Peter', 29 , 'it');
var person3 = new Person('Amy', 29, 'writer');
console.log(person2.sayName === person3.sayName); //false, 创建了两个相同的实例

// 解决构造函数模式创建多个实例, 完全没有封装性
function Personb(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = sayName
}
// 这个全局函数完全没有封装性可言.....
function sayName() {
  console.log(this.name);
}
var person4 = new Personb('Peter', 29 , 'it');
var person5 = new Personb('Amy', 29, 'writer');
console.log(person4.sayName === person5.sayName); // true

/**
 * Javascript 设计模式(张容铭)
 *
 */

// 防止忘记用new 关键字实例化
function Person(name, age, job) {
  if (this instanceof Person) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() {
      console.log(this.name);
    }
  } else {
    return new Person(name, age, job);
  }
}

