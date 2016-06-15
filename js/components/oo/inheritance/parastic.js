// 寄生式继承
console.log('--寄生式继承--')

function createAnother(original) {
  var clone = Object.create(original)
  clone.sayHi = function() {
    console.log('hi')
  };
  return clone;
}


var person = {
  name: 'Nicloas',
  friends: ['Shelby', 'Court', 'Van']
}

var anotherPerson = createAnother(person);
console.log(anotherPerson)
anotherPerson.sayHi();
