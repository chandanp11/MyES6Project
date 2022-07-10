'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const weekdays = ['sun', 'mon', 'tue', 'thu', 'fri', 'sat'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 0, mainIndex = 1, time = '11:00', address }) {
    console.log(
      `Order received: ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your past with ${ing1}, ${ing2} and ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...otherIngredient) {
    console.log(mainIngredient);
    console.log(otherIngredient);
  },
};

console.log(restaurant);

//////////////// DESTRUCTURING OBJECTS //////////////////////////////////////////
console.log(
  '------------- DESTRUCTURING OBJECTS-------------------------------'
);
restaurant.orderDelivery({
  time: '22:30',
  address: 'Kurla',
  starterIndex: 1,
  mainIndex: 2,
});

restaurant.orderDelivery({
  address: 'Bandra',
});

// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables of object
let t = 111;
let s = 999;
const obj = { t: 23, s: 7, u: 14 };

({ t, s } = obj);
console.log(t, s);

// nested objects
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);
//////////////// DESTRUCTURING ARRAYS //////////////////////////////////////////
console.log(
  '------------- DESTRUCTURING ARRAYS-------------------------------'
);
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

const temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary);

[secondary, main] = [main, secondary];
console.log(main, secondary);

console.log(restaurant.order(2, 0));
const [starter, mainMenu] = restaurant.order(2, 0);
console.log(starter, mainMenu);

// nested destructuring
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
console.log(i, j, k);

// default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

//////////////// SPREAD OPERATOR works on Iterables : Arrays, Maps, Sets, Strings but not objects //////////////////////
console.log('------------- SPREAD OPERATOR-------------------------------');
const arr1 = [7, 8, 9];
const badNewArray = [1, 2, arr1[0], arr1[1], arr1[2]];
console.log(badNewArray);

const newGoodArray = [1, 2, ...arr1];
console.log(newGoodArray);
console.log(...newGoodArray);

const newMenu = [...restaurant.mainMenu, 'Varan Bhat'];
console.log(newMenu);

// const ingredients = [
//   prompt("let's make pasta, Ingredient 1?"),
//   prompt("let's make pasta, Ingredient 2?"),
//   prompt("let's make pasta, Ingredient 3?"),
// ];
// console.log(ingredients);
// restaurant.orderPasta(...ingredients);

const restaurantCopy1 = { founded: 1990, ...restaurant, owner: 'chandan' };
console.log(restaurantCopy1);

const restaurantCopy2 = { ...restaurant };
restaurantCopy2.name = 'Visava';
console.log(restaurantCopy2.name, restaurant.name);

/// Logical assignment operators
console.log(
  '============== LOGICAL ASSIGNMENT OPERATOR========================'
);
const restaurant1 = { name: 'Hotel 1', numberOfGuest: 0 };
const restaurant2 = { name: 'Hotel 2', owner: 'Chandan' };

// restaurant1.numberOfGuest = restaurant1.numberOfGuest || 10;
// restaurant2.numberOfGuest = restaurant2.numberOfGuest || 10;

// This is replacement for above
// restaurant1.numberOfGuest ||= 10;
// restaurant2.numberOfGuest ||= 10;

// However will not work if value = 0, so we use nullish operator
restaurant1.numberOfGuest ??= 10;
restaurant2.numberOfGuest ??= 10;

restaurant1.owner &&= '<ANONYMOUS>';
restaurant2.owner &&= '<ANONYMOUS>';

console.log(restaurant1);
console.log(restaurant2);

// CHALLENGE
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const [team1Players, team2Players] = game.players;
console.log(team1Players, team2Players);

const [gk1, ...otherPlayers] = team1Players;
console.log(gk1, otherPlayers);

const allPlayers = [...team1Players, ...team2Players];
console.log(allPlayers);

const player1Final = [...team1Players, 'Thiago', 'lsjdf', 'lsjdf'];
console.log(player1Final);

const {
  odds: { team1, team2, x: draw },
} = game;

console.log(team1, team2, draw);

// FOR OF LOOP
console.log('============== FOR OF LOOP ========================');
const fullMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(fullMenu);
for (const item of fullMenu) {
  console.log('item', item);
}

// OR
console.log(...fullMenu.entries());
for (const item of fullMenu.entries()) {
  console.log(`${item[0] + 1}: ${item[1]}`);
}

console.log(...fullMenu.entries());
for (const [i, element] of fullMenu.entries()) {
  console.log(`${i + 1}: ${element}`);
}

// OPTIONAL CHAINING
console.log('============OPTIONAL CHAINING =======================');
restaurant.openingHours.fri?.open && console.log('Friday Exists');

for (const day of weekdays) {
  // console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'Closed';
  console.log(`On ${day}, we open at ${open}`);
}

const keys = Object.keys(restaurant);
console.log(keys);

const values = Object.values(restaurant);
console.log(values);

const entries = Object.entries(restaurant);
console.log(entries);

/////////////////////////// CODING CHALLENGE 2 ////////////////////////////////
console.log(
  '=================== CODING CHALLENGE 2 ============================'
);
/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

console.log('Printing average odd');
const OddsArray = Object.values(game.odds);
let avgOdds = 0;
for (const odds of OddsArray) {
  avgOdds += odds;
}
avgOdds = avgOdds / OddsArray.length;
console.log(avgOdds);

const oddEntries = Object.entries(game.odds);

for (const [team, odd] of oddEntries) {
  const teamStr = team === 'x' ? 'Draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${odd}`);
}

const scores = {};

for (const player of game.scored) {
  scores[player] ? scores[player]++ : (scores[player] = 1);
}

console.log(scores);

////// SETS ////////////////////
console.log('==================== SETS ==========================');
const nameSet = new Set([
  'chandan',
  'chandan',
  'prasad',
  'prasad',
  'atharva',
  'atharva',
]);
console.log(nameSet);
console.log(nameSet.size);
console.log(nameSet.has('chandan'));
console.log(nameSet.has('aarya'));
nameSet.add('ananya');
nameSet.add('ananya');
nameSet.delete('prasad');
// nameSet.clear();
console.log(nameSet);

for (const name of nameSet) {
  console.log('name', name);
}

/// Convert Arrays with duplicate in unique array
const duplicateArray = ['abc', 'abce', 'cde', 'cde'];
console.log(new Set(duplicateArray));
const uniqueArray = [...new Set(duplicateArray)];
console.log('unique Array', uniqueArray);

//////////////////// MAPS ////////////////////////
console.log('================== MAPS ========================');
const schoolMap = new Map();
schoolMap.set('name', 'RSV');
console.log(schoolMap.set('mediums', '["Hindi", "Marathi", "Engligh"]'));
schoolMap.set('studentsNumber', 100).set('standards', 10).set('divisions', 5);
console.log(schoolMap.get('mediums'));
console.log(schoolMap.has('name'));
console.log(schoolMap);
console.log(schoolMap.delete('mediums'));
console.log(schoolMap);
console.log(schoolMap.size);
// console.log(schoolMap.clear());
console.log(schoolMap);

// Another way of creating Map
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 👍'],
  [false, 'Try Again 👎'],
]);

console.log(question);

console.log(question.get('question'));
// Iteration
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}
const answer = 3; //Number(prompt('Your Answer'));
console.log(answer);

console.log(question.get(question.get('correct') === answer));

// converting Object to Map
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// converting map to an array
const questionArray = [...question];
console.log(questionArray);

// CODING CHALLENGE 3
console.log(
  '=============== CODING CHALLENGE 3 =============================='
);
/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// #1
const uniqueEvents = [...new Set(gameEvents.values())];
console.log(uniqueEvents);

// #2
gameEvents.delete(64);
console.log(gameEvents);

// #4
for (const [minute, eventDescription] of gameEvents) {
  const halfDesc = minute <= 45 ? 'FIRST HALF' : 'SECOND HALF';
  console.log(`[${halfDesc}] ${minute}: ${eventDescription}`);
}
