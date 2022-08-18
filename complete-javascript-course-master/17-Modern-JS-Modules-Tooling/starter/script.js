// importing a module
// import { addToCart, totalPrice as price, quantity } from './shoppingCart.js';

// console.log('Importing module');
// addToCart('bread', 5);

// console.log(price, quantity);

import * as ShoppingCart from './shoppingCart.js';
import add from './shoppingCart.js';

ShoppingCart.addToCart('Banana', 6);
console.log(ShoppingCart.quantity, ShoppingCart.totalPrice);

add('Pizza', 3);

// // top level await
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return { title: data.at(-1).title, text: data.at(-1).body };
};

// const lastPost = await getLastPost();
// console.log(lastPost);

// not very clean
// lastPost.then(last => console.log(last));

const shoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 49;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to the cart`);
  };

  const orderStock = function () {
    console.log(`${quantity} ${product} ordered from Supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

shoppingCart2.addToCart('apple', 4);

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

console.log('testing');
const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;

console.log(stateClone);
console.log(stateDeepClone);

class Person {
  #greeting = 'hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}

const chandan = new Person('chandan');
console.log(shoppingCart2.cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));

import 'core-js/stable';
import 'regenerator-runtime/runtime';
