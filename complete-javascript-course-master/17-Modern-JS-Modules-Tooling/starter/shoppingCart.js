// exporting a module
console.log('Exporting module');

const shippingCost = 10;
const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart`);
};

const totalPrice = 237;
const totalQuantity = 49;

export { totalPrice, totalQuantity as quantity };

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart`);
}
