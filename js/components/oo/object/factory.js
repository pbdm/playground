/**
 * 工厂模式
 */
console.log('---工厂模式---')
function createPerson(name, age, job) {
  return {
    name: name,
    age: age,
    job: job,
    sayName: function() {
      console.log(this.name)
    }
  }
}
var person1 = createPerson('Peter', 29, 'it');
