'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 0,
    mainIndex = 1,
    time = '11:00',
    address,
  }) {
    console.log(
      `Order received: ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your past with ${ing1}, ${ing2} and ${ing3}`);
  },
};

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

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

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
