'use strict';

function calculateAge(birthYear) {
  const age = 2022 - birthYear;
  function printAge() {
    const output = `${firstName}, You are ${age}, born in ${birthYear}`;
    console.log(output);
  }

  if (true) {
    var millenial = true;
  }
  printAge();
  console.log(millenial);
  return age;
}
const firstName = 'Chandan';
calculateAge(1975);

const object1 = {
  firstName: 'Chandan',
  lastName: 'Patil',
  age: 27,
  family: ['Anuradha', 'Ananya'],
};
const object2 = Object.assign({}, object1);
object2.age = 31;
object1.family.push('Freya');
object1.firstName = 'Atharva';

console.log(object1);
console.log(object2);
