// 原始时代
var Animal = function(name) {
  this.name = name;
  this.run = function() {
    console.log(this.name + ' is running');
  }
}

var pet = new Animal('pet');
pet.run();
