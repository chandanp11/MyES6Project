'use strict';

const bookings = [];

const createBooking = function (
  flightNumber,
  numberOfPassengers = 1,
  price = numberOfPassengers * 99
) {
  // ES5
  //   numberOfPassengers = numberOfPassengers || 1;
  //   price = price || 99;

  const booking = {
    flightNumber,
    numberOfPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 198);
createBooking('LH123', 5);
createBooking('LH123', 7);

createBooking('LH123', undefined, 198);

const flight = 'LH234';
const passanger = {
  name: 'Chandan Patil',
  passport: 123456789,
};

const checkIn = function (flightNumber, passanger) {
  flightNumber = 'AH999';
  passanger.name = 'Mr. ' + passanger.name;

  if (passanger.passport === 123456789) {
    // alert('Check In');
  } else {
    // alert('Wrong Passport');
  }
};

checkIn(flight, passanger);
console.log(flight);
console.log(passanger);

// call back functions
const oneWord = function (str) {
  console.log('oneword: ', str);
  return str.replaceAll(' ', '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [firstWord, ...restOfTheString] = str.split(' ');
  return [firstWord.toUpperCase(), ...restOfTheString].join(' ');
};

const tranformer = function (str, fn) {
  console.log(`transformed string = ${fn(str)}`);
  console.log(`transformed by ${fn.name}`);
};

tranformer('javascript is the best!!', upperFirstWord);
tranformer('javascript is the best!!', oneWord);

const high5 = function () {
  console.log('✋');
};

['lsjdf', 'lskdfj'].forEach(high5);

// Function retruning a function
const greet = function (greetings) {
  return function (name) {
    console.log(`${greetings} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Chandan');

// another way
greet('Hi')('Prasad');

const greet1 = greetings => {
  return name => console.log(`${greetings} ${name}`);
};

greet1('Hello')('Atharva');

// call and apply

const luftansa = {
  aireline: 'Luftansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNumber, name) {
    console.log(
      `${name} booked a seat on ${this.aireline} flight ${this.iataCode}${flightNumber}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNumber}`, name });
  },
};

luftansa.book(434, 'Chandan');
luftansa.book(234, 'Prasad');
console.log(luftansa.bookings);

const euroWings = {
  aireline: 'EuroWings',
  iataCode: 'LH',
  bookings: [],
};

const book = luftansa.book;

// this doesn not work
// book(234, 'Anuradha');

book.call(euroWings, 234, 'Anuradha');
console.log(euroWings);

// apply method
const flightData = [123, 'Arnav'];
book.apply(euroWings, flightData);
book.call(euroWings, ...flightData);

// bind methodd
const bookEW = book.bind(euroWings);
bookEW(234, 'Ananya');

const bookEW987 = book.bind(euroWings, 23);
bookEW987('Prabhakar');
bookEW987('Poornima');

// bind with event listners
luftansa.planes = 300;
luftansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

luftansa.buyPlane(); // this will work
document.querySelector('.buy').addEventListener('click', luftansa.buyPlane); // but this won't because 'this' keyword is associated with button element
document
  .querySelector('.buy')
  .addEventListener('click', luftansa.buyPlane.bind(luftansa)); // so we explicitely bind object to function

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );

    console.log(answer);

    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

    this.displayResults('array');
    this.displayResults('string');
  },

  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));
poll.displayResults.call({ answers: [4, 3, 1] }, 'string');

// IIFE = Immediate invoked function expression, functions invoked only once
// wrap in round brackets
(function () {
  console.log('This will run only once');
})();

(() => console.log('This will also run only once'))();

// closures
console.log('=============== CLOSURES ========================');

const secureBooking = function () {
  let passangerCount = 0;

  return function () {
    passangerCount++;
    console.log(`${passangerCount} passangers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

g();
f();

// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
