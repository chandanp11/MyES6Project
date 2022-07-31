'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Chandan Patil',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Prasad Patil',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Anuradha Chandan Patil',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Aarya Prasad Patil',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovement = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
          <div class="movements__value">${movement}€</div>
        </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calculateDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.balance}€`;
};

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * (account.interestRate / 100))
    .filter(int => int >= 1)
    .reduce((acc, curr) => acc + curr, 0);

  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${Math.abs(out)}€`;
  labelSumInterest.textContent = `${Math.abs(interest)}€`;
};

const createUserName = function (accs) {
  accs.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserName(accounts); // stw

/// EVENT HANDLERS ////

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('LOGIN');

    labelWelcome.textContent = `WELCOME BACK ${
      currentAccount.owner.split(' ')[0]
    }`;

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    containerApp.style.opacity = 100;
    updateUI(currentAccount);
  }
});

const updateUI = function (account) {
  displayMovement(account.movements);
  calculateDisplayBalance(account);
  calcDisplaySummary(account);
};

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    account => account.userName === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmout = Number(inputLoanAmount.value);
  if (
    loanAmout > 0 &&
    currentAccount.movements.some(mov => mov >= loanAmout * 0.1)
  ) {
    currentAccount.movements.push(loanAmout);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const deleteUser = inputCloseUsername.value;
  const deletePIN = Number(inputClosePin.value);

  if (
    deleteUser === currentAccount.userName &&
    deletePIN === currentAccount.pin
  ) {
    const deleteIdx = accounts.findIndex(
      account => account.userName === deleteUser
    );
    accounts.splice(deleteIdx, 1);
    inputCloseUsername.value = inputClosePin.value = '';
    containerApp.style.opacity = 0;
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovement(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// SOME AND EVERY
console.log(movements.includes(-130));
const anyDeposit = movements.some(mov => mov > 0);
console.log(anyDeposit);

const anyDeposit1 = movements.findIndex(mov => mov === 10000);
console.log(anyDeposit1);

console.log(account4.movements.every(mov => mov > 0));

////// FLAT and FLATMAP ////////////////////////
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[1, [2, 3]], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); // Goes only one level bby default. so provide depth for deeply nested arrays

const overallBankBalance = accounts
  .map(account => account.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBankBalance);

const overallBankBalance1 = accounts
  .flatMap(account => account.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBankBalance1);

//////////// array sorting ///////////////////////
const owners = ['chandan', 'prasad', 'jyotsna', 'anuradha'];
owners.sort();
console.log(owners);

console.log(movements);
console.log(movements.sort()); // sorts as string, so pass a call back function
console.log(movements.sort((a, b) => (a > b ? 1 : -1)));
console.log(movements.sort((a, b) => a - b)); // same as above

/////////////////////////////////////////////////
// let arr = ['a', 'b', 'c', 'd', 'e'];

// // SLICE
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice());
// console.log([...arr]);

// // SPLICE = take out extracted elements from original array
// console.log(arr.splice(2));
// console.log(arr);

// // REVERSE = mutate original array
// console.log(arr.reverse());

// // CONCAT= does not mutate
// const arr2 = ['c', 'd', 'e'];
// console.log(arr.concat(arr2));
// console.log(arr);

// // JOIN
// console.log(arr.join('-'));
// console.log(arr);

// console.log(arr[0]);
// console.log(arr.at(0));

// // getting last element of arr
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1));

// // FOR EACH LOOP
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Entry ${i + 1}: You deposited ${movement}`);
//   } else if (movement < 0) {
//     console.log(`Entry ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log('------------ FOREACH ----------------');
// movements.forEach(function (movement, index, array) {
//   console.log(array);

//   if (movement > 0) {
//     console.log(`Entry ${index + 1}: You deposited ${movement}`);
//   } else if (movement < 0) {
//     console.log(`Entry ${index + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// });

// // FOREACH WITH MAPS AND SETS
// currencies.forEach(function (value, key, map) {
//   console.log(map);
//   console.log(`${key}: ${value}`);
// });

// const currenciesUnique = new Set(['USD', 'EUR', 'GBP']);
// currenciesUnique.forEach((element, index, set) => {
//   console.log(set);
//   console.log(`${index} : ${element}`);
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);

//   const dogs = dogsJuliaCorrected.concat(dogsKate);
//   console.log(dogs);
//   dogs.forEach(function (dog, idx) {
//     dog >= 3 &&
//       console.log(`Dog number ${idx} is an adult, and is ${dog} years old`);
//     dog < 3 && console.log(`Dog number ${idx} is still a puppy 🐶`);
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// // MAP Method
// const eurToUSD = 1.1;
// const movementsUSD = movements.map(function (movement) {
//   return movement * eurToUSD;
// });

// const movementsUSD1 = movements.map(movement => movement * eurToUSD);

// console.log(movements);
// console.log(movementsUSD);
// console.log(movementsUSD1);

// const movementsDescriptions = movements.map(
//   (movement, idx, array) =>
//     `Entry ${idx + 1}: You ${
//       movement > 0 ? 'deposited' : 'withdrew'
//     } ${movement}`
// );

// console.log(movementsDescriptions);

// //// FILTER METHOD ///////////////
// const deposits = movements.filter(movement => movement > 0);
// console.log(`deposits = ${deposits}`);

// const depositsFor = [];
// for (const mov of movements) {
//   if (mov > 0) {
//     depositsFor.push(mov);
//   }
// }
// console.log(`depositsFor = ${depositsFor}`);

// const withdrawals = movements.filter(movement => movement < 0);
// console.log(`withdrawals = ${withdrawals}`);

// ///////// REDUCE Method ////////////////////////
// const balance = movements.reduce(function (accumulator, current, idx, arr) {
//   console.log(`accumulator ${idx}: ${accumulator}`);
//   return accumulator + current;
//   // console.log('current', current);
//   // console.log('idx', idx);
//   // console.log(arr);
// }, 0);

// const balance1 = movements.reduce((acc, curr) => acc + curr, 100);

// console.log(balance);
// console.log(balance1);

// // show max with reduce
// const maxValue = movements.reduce(
//   (acc, curr) => (acc > curr ? acc : curr),
//   movements.at(0)
// );
// console.log(`max = ${maxValue}`);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const testData1 = [5, 2, 4, 1, 15, 8, 3];
// const testData2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function (ages) {
//   const dogsHumanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adultDogs = dogsHumanAges.filter(age => age > 18);
//   const avgAdultDogs = adultDogs.reduce(
//     (acc, curr, idx, arr) => (acc += curr / arr.length),
//     0
//   );
//   console.log(`dogs human ages = ${dogsHumanAges}`);
//   console.log(`adultDogs = ${adultDogs}`);
//   // console.log(`avgAdultDogs = ${avgAdultDogs}`);
//   return avgAdultDogs;
// };

// console.log(calcAverageHumanAge(testData1));
// console.log(calcAverageHumanAge(testData2));

// /// METHOD CHAINING
// const totalDepositUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUSD)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(`totalDepositUSD = ${totalDepositUSD}`);

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// const calcAverageHumanAgeWithChaining = ages =>
//   ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age > 18)
//     .reduce((acc, curr, idx, arr) => (acc += curr / arr.length), 0);

// console.log(calcAverageHumanAgeWithChaining(testData1));
// console.log(calcAverageHumanAgeWithChaining(testData2));

// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(firstWithdrawal);

// console.log(accounts);
// const jessicaAccount = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(jessicaAccount);

// more ways to create Arrays
console.log([1, 2, 3, 4, 5, 6]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

const x = new Array(7);
console.log(x); // enpty array can only be populated with fill method
// x.fill(1); // fill all elements of array
// x.fill(1, 3); // begin index for fill
x.fill(1, 3, 5); // begin and end index to fill
console.log(x);

const y = [1, 2, 3, 4, 5, 6];
const z = new Array(1, 2, 3, 4, 5, 6, 7);

y.fill(23, 4, 7);
z.fill(46, 3, 6);
console.log(y);
console.log(z);

// Array.from
const a = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(a);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => el.textContent.replace('€', '')
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(movementsUI2);
});

let b = 10;
console.log(b++);
console.log(++b);

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// adding recommendedFood property
dogs.forEach(
  dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);
console.log(dogs);

const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(sarahDog);
console.log(
  `Sarah's dog is eating too ${
    sarahDog.curFood > sarahDog.recommendedFood ? 'much' : 'little'
  }`
);

const { ownersEatTooLittle, ownersEatTooMuch } = dogs.reduce(
  (acc, currDog) => {
    if (currDog.curFood > currDog.recommendedFood) {
      acc.ownersEatTooMuch.push(...currDog.owners);
    }
    if (currDog.curFood < currDog.recommendedFood) {
      acc.ownersEatTooLittle.push(...currDog.owners);
    }
    return acc;
  },
  { ownersEatTooMuch: [], ownersEatTooLittle: [] }
);

console.log(ownersEatTooLittle);
console.log(ownersEatTooMuch);

const ownersEatTooMuch1 = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);

const ownersEatToolittle1 = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);

console.log(`${ownersEatTooMuch1.join(' and ')}'s  dogs eat too much!`);
console.log(`${ownersEatToolittle1.join(' and ')}'s  dogs eat too little!`);

console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));
