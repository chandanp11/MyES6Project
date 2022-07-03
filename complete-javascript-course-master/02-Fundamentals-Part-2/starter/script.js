const person = [
  "Chandan",
  "Patil",
  2022 - 1975,
  "Teacher",
  ["Nitin", "Prasad", "Gaurav"],
];

for (let i = person.length - 1; i >= 0; i--) {
  console.log(i, person[i]);
}

for (let excercise = 0; excercise < 4; excercise++) {
  console.log(`-------------Started excercise ${excercise}`);
  for (let rep = 0; rep < 3; rep++) {
    console.log(`Lifting weight repetition ${rep} 🏋️‍♂️`);
  }
}

let rep = 1;
while (rep <= 5) {
  console.log(`while loop: Lifting weight repetition ${rep} 🏋️‍♂️`);
  rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) {
    console.log(`Excellent!!! You Rolled a ${dice}`);
  }
}
