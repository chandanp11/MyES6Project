'use strict';

const Person = function (fullName, birthYear) {
  // instance properties
  this.fullName = fullName;
  this.birthYear = birthYear;

  // never do this, use prototypes
  //   this.calcAge = function () {
  //     console.log(2022 - this.birthYear);
  //   };
};

// new {} is created
//function is called, this = {}
// {} linked to prototype
// function automatically return {}

const chandan = new Person('Chandan', 1975);
const prasad = new Person('Prasad', 1974);

// console.log(  chandan instanceof Person);
// console.log(Person.prototype);
// console.log(chandan.__proto__);
// console.log(chandan.prototype); // undefined

// below is true
// console.log(Person.prototype.isPrototypeOf(chandan));
// console.log(Person.prototype.isPrototypeOf(prasad));

// this is false
// console.log(Person.prototype.isPrototypeOf(Person));
//this cannot be done
// console.log(chandan.prototype.isPrototypeOf(prasad));

// prototypes
Person.prototype.calculateAge = function () {
  console.log(2022 - this.birthYear);
};

// static method
Person.hey = function () {
  console.log('Hey there');
};

// Person.hey();
// chandan.hey();

Person.prototype.species = 'Homo Sapien';

// chandan.calculateAge();
// prasad.calculateAge();
// console.log(chandan, prasad);
// console.log(chandan.species, prasad.species);

// console.log(chandan.hasOwnProperty('fullName'));
// console.log(chandan.hasOwnProperty('species')); // false

// prototypal Inheritance
// console.log(chandan.__proto__);
// console.log(chandan.__proto__.__proto__);
// console.log(chandan.__proto__.__proto__.__proto__);

// console.dir(Person.prototype.constructor);

const arr = [1, 2, 3, 4];
// console.log(arr.__proto__);

const h1 = document.querySelector('h1');
// console.dir(h1.__proto__);

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.logSpeed = function () {
  console.log(`'${this.make}' going at ${this.speed} km/h`);
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  this.logSpeed();
};

Car.prototype.brake = function () {
  this.speed -= 5;
  this.logSpeed();
};

const BMW = new Car('BMW', 120);
const Mercedes = new Car('Mercedes', 95);

// console.log(BMW);
// console.log(Mercedes);

// BMW.accelerate();
// BMW.accelerate();

// Mercedes.accelerate();
// Mercedes.accelerate();
// Mercedes.accelerate();

// BMW.brake();
// Mercedes.brake();

//ES6 Classes

// Class Expression
// const PersonCl = class {};

// Class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // method will be added to prototype
  calculateAge() {
    console.log(2022 - this.birthYear);
  }

  // GETTER and SETTER
  get age() {
    return 2022 - this.birthYear;
  }

  set age(birthYear) {
    this.birthYear = birthYear;
  }

  set fullName(fullName) {
    if (fullName.includes(' ')) {
      this._fullName = fullName;
    } else {
      alert('Enter Full Name');
    }
  }

  get fullName() {
    return this._fullName;
  }

  /// static methods. not added to prototype and instances
  static hey() {
    console.log('Hey There');
  }
}

const ananya = new PersonCl('Ananya Patil', 2012);
// console.log(ananya);
// ananya.calculateAge();

// console.log(ananya.__proto__ === PersonCl.prototype);

// console.log(ananya.age);
ananya.age = 1980;
// console.log(ananya.age);

// PersonCl.hey();
// ananya.hey();

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

class CarNew {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  logSpeed() {
    console.log(`'${this.make}' going at ${this.speed} km/h`);
  }

  logSpeedUS() {
    console.log(`'${this.make}' going at ${this.speedUS} mi/h`);
  }

  accelerate() {
    this.speed += 10;
    // this.logSpeed();
  }

  brake() {
    this.speed -= 5;
    // this.logSpeed();
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

// const Ford = new CarNew('Ford', 120);
// Ford.speedUS = 150;
// Ford.logSpeed();
// Ford.logSpeedUS();

// Ford.accelerate();
// Ford.accelerate();
// Ford.accelerate();

// Ford.logSpeed();
// Ford.logSpeedUS();

// Ford.brake();
// Ford.brake();

// Ford.logSpeed();
// Ford.logSpeedUS();

// INHERITENCE BETWEEN "CLASSES": CONSTRUCTOR FUNCTIONS
const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.fullName} and I study ${this.course}`);
};

const anu = new Student('Anu', 1975, 'HR System');
// console.log(anu);
// anu.introduce();
// anu.calculateAge();

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.logSpeed = function () {
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  this.logSpeed();
};

const tesla = new EV('Telsa', 120, 23);
console.log(tesla);
tesla.chargeBattery(90);
console.log(tesla);
tesla.logSpeed();
tesla.accelerate();

//INHERITENCE BETWEEN "CLASSES": ES6 Classes
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
}

const martha = new StudentCl('Martha Jones', 2002, 'Computer Sciencce');
martha.introduce();
martha.calculateAge();

// OBJECT.CREATE
const PersonProto = {
  calculateAge() {
    console.log(2022 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const Aarya = Object.create(PersonProto);
// console.log(Aarya);
Aarya.name = 'Aarya';
Aarya.birthYear = 2005;
// Aarya.calculateAge();

// Better way with object.create
const arnav = Object.create(PersonProto);
arnav.init('Arnav', 2011);
// arnav.calculateAge();

//INHERITENCE BETWEEN "CLASSES": Objecct.create
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2000, 'Botony');
console.log(jay);
jay.introduce();
jay.calculateAge();

// Another class = Encapsulation: privacy
class Account {
  // public fields not available on prototype
  branch = 'Mumbai';
  address = 'Bandra';

  // private fields
  #movements = [];

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.locale = navigator.language;

    console.log(`Thank you for opening the account, ${owner}`);
  }

  deposit(val) {
    this.#movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  getMovements() {
    return this.#movements;
  }

  #approveLoan() {
    console.log('Loan Approved');
  }

  requestLoan() {
    this.#approveLoan();
  }
}

const chandanAccount = new Account('Chandan', 'INR', 1111);
chandanAccount.deposit(100);
chandanAccount.deposit(200);
chandanAccount.withdraw(50);
// console.log(chandanAccount.#movement); will not work
console.log(chandanAccount.getMovements());
console.log(chandanAccount);

chandanAccount.requestLoan();

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class EVCL extends CarNew {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  logSpeed() {
    console.log(
      `${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    this.logSpeed();
    return this;
  }

  brake() {
    this.speed -= 5;
    this.#charge--;

    this.logSpeed();
    return this;
  }
}

const rivian = new EVCL('Rivian', 120, 23);
console.log(rivian);
rivian.chargeBattery(90).accelerate().accelerate().brake().brake().brake();
