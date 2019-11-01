class Student {
  fullName: string;
  constructor(public firstName: string, public middleInitial: string, public lastName: string) {
    this.fullName = firstName + " " + middleInitial + " " + lastName 
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

// let user = "Jane User";
// let user = [0, 1, 2];
// let user = {
//   firstName: "Jane",
//   lastName: "User"
// }
let user = new Student("Jane","M.", "User" )

document.body.innerHTML = greeter(user);