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
