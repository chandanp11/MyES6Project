// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const temperatures = [3, -2, -1, -6, 'error', 9, 13, 17, 15, 14, 9, 5];

const calculateTempAmplitude = function (temperatures) {
  let max = temperatures[0];
  let min = temperatures[0];

  for (let i = 0; i < temperatures.length; i++) {
    const currentTemperature = temperatures[i];

    if (typeof currentTemperature !== 'number') {
      continue;
    }

    if (currentTemperature > max) {
      max = currentTemperature;
    }
    if (currentTemperature < min) {
      min = currentTemperature;
    }
  }
  console.log(`max value = ${max}`);
  console.log(`min value = ${min}`);

  return max - min;
};

const amplitude = calculateTempAmplitude(temperatures);
console.log(amplitude);
