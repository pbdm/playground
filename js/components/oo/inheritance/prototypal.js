// 原型式继承
console.log('--原型式继承--')

function object(o) {
  function F(){}
  F.prototype = o;
  return new F();
}

var person = {
  name: 'Nicloas',
  friends: ['Shelby', 'Court', 'Van']
}

var anotherPerson = object(person);
anotherPerson.name = 'Greg';
anotherPerson.friends.push('Bob')

var yetAnotherPerson = object(person);
yetAnotherPerson.name = 'Linda'
yetAnotherPerson.friends.push('Barbie');
console.log(person.friends);

var thirdPerson = Object.create(person,{ // 与上面的object方法实现相同的功能
  address: {
    value: 'shanghai',
    enumerable: true,
    configurable: true,
    writable: true
  }
});
console.log(thirdPerson)
thirdPerson.name = 'Peter';
thirdPerson.friends.push('Amy')
