'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const images = document.querySelector('.images');

///////////////////////////////////////

const renderCountry = function (data, className) {
  const flag = data.flag;
  const html = `
    <article class="country ${className}">
        <img class="country__img" src="${flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
        </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = function (countryISOCode) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/alpha/${countryISOCode}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const data = JSON.parse(this.responseText);
//     console.log(data);

//     // render country 1
//     renderCountry(data);

//     // get neighbour country
//     const [neighbour] = data.borders;
//     console.log(neighbour);
//     if (!neighbour) return;

//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('IND');

// const request = fetch('https://restcountries.com/v2/alpha/ind');
// console.log(request);

// const getCountryData = function (countryISOCode) {
//   fetch(`https://restcountries.com/v2/alpha/${countryISOCode}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data);
//     });
// };

const renderError = function (message) {
  console.error(`${message} 💥💥💥`);
  countriesContainer.insertAdjacentText('beforeend', message);
  countriesContainer.style.opacity = 1;
};

const getCountryURL = function (countryISOCode) {
  return `https://restcountries.com/v2/alpha/${countryISOCode}`;
};

const getJSON = function (url, errorMessage = 'Something went wrong') {
  return fetch(url).then(response => {
    console.log(response);
    if (!response.ok) throw new Error(`${errorMessage} ${response.status}`);
    return response.json();
  });
};

// const getCountryData = function (countryISOCode) {
//   fetch(getCountryURL(countryISOCode))
//     .then(response => {
//       if (!response.ok) throw new Error(`Country ${countryISOCode} not found`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data);
//       const [neighbour] = data.borders;
//       if (!neighbour) return;
//       return fetch(getCountryURL(neighbour));
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => renderError(err.message))
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// const getCountryData = function (countryISOCode) {
//   getJSON(getCountryURL(countryISOCode), `Country ${countryISOCode} not found`)
//     .then(data => {
//       renderCountry(data);
//       const [neighbour] = data.borders;
//       //   const neighbour = '12312';
//       if (!neighbour) throw new Error('Neighbour is empty');
//       console.log(getCountryURL(neighbour));
//       return getJSON(
//         getCountryURL(neighbour),
//         `Country ${neighbour} not found`
//       );
//     })
//     .then(data => {
//       console.log(data);
//       renderCountry(data, 'neighbour');
//     })
//     .catch(err => renderError(err.message))
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('IND');
// });

//////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// const whereAmI = function (lat, lng) {
//   console.log(lat, lng);
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=JSON`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok)
//         throw new Error(`Unable to find the country ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);
//       getCountryData(data.prov);
//     })
//     .catch(err => console.log(err));
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// console.log('Test Start');
// setTimeout(() => console.log('0 second timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise.resolve('Resolved Promise 2').then(res => {
//   for (let i = 0; i < 1000000; i++) {}
//   console.log(res);
// });

// console.log('Test End');

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('lottery draw is happening');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You won the lottery💰');
//     } else {
//       reject(new Error('You lost your money 💩'));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// const wait = function (seconds) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(resolve, 1000 * seconds);
//   });
// };

// wait(2)
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(5);
//   })
//   .then(() => console.log('I waited for 5 seconds)'));

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem !!!')).catch(x => console.error(x));

// console.log('getting position');

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.log(err)
// );
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition().then(pos => console.log(pos));

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       console.log(pos.coords);
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=JSON`);
//     })
//     .then(res => {
//       console.log(res);
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.com/v2/alpha/${data.prov}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found ${res.status}`);
//       return res.json();
//     })
//     .then(data => renderCountry(data))
//     .catch(err => console.error(`${err.message} 💥`));
// };

// btn.addEventListener('click', whereAmI);

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const imgElement = document.createElement('img');
//     imgElement.src = imgPath;

//     imgElement.addEventListener('load', function () {
//       images.append(imgElement);
//       resolve(imgElement);
//     });

//     imgElement.addEventListener('error', function () {
//       reject(new Error('image not found'));
//     });
//   });
// };

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, 1000 * seconds);
//   });
// };

// let currentImage;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImage = img;
//     console.log('image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImage = img;
//     console.log('image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//   })
//   .catch(err => console.log(err));

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// const whereAmI = async function () {
//   try {
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=JSON`);

//     if (!resGeo.ok) throw new Error('Problem getting country Data');

//     console.log(resGeo);
//     const dataGeo = await resGeo.json();
//     console.log(dataGeo);

//     const res = await fetch(
//       `https://restcountries.com/v2/alpha/${dataGeo.prov}`
//     );
//     if (!res.ok) throw new Error('Country not found');
//     console.log(res);
//     const data = await res.json();
//     console.log(data);
//     renderCountry(data);
//     return `you are in ${dataGeo.city}, ${dataGeo.country}`;
//   } catch (err) {
//     console.error(err);
//     renderError('Something went wrong', err.message);
//     throw err;
//   }
// };
// console.log('1. will get Location');
// const city = whereAmI();
// console.log(city);
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2. ${err.message}`))
//   .finally(() => console.log('3. finished getting location'));

// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(`2. ${err.message}`);
//   } finally {
//     console.log('3. finished getting location');
//   }
// })();

// try {
//   let y = 3;
//   const x = 2;
//   y = 1;
// } catch (err) {
//   console.error(err.message);
// }

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // following code will run one after another
//     // const data1 = await getJSON(getCountryURL(c1), `Country ${c1} not found`);
//     // const data2 = await getJSON(getCountryURL(c2), `Country ${c2} not found`);
//     // const data3 = await getJSON(getCountryURL(c3), `Country ${c3} not found`);
//     // console.log([data1.capital, data2.capital, data3.capital]);

//     // following code will run Promises in parallel
//     const data = await Promise.all([
//       getJSON(getCountryURL(c1), `Country ${c1} not found`),
//       getJSON(getCountryURL(c2), `Country ${c2} not found`),
//       getJSON(getCountryURL(c3), `Country ${c3} not found`),
//     ]);
//     console.log(data.map(d => d.capital));
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries('IND', 'DEU', 'PAK');

// Promise.race: returns when any 1st Promise fulfills, resolved or rejected
(async function () {
  const data = await Promise.race([
    getJSON(getCountryURL('IND'), `Country IND not found`),
    getJSON(getCountryURL('DEU'), `Country DEU not found`),
    getJSON(getCountryURL('PAK'), `Country PAK not found`),
  ]);

  console.log(data);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject('request took too long to finish');
    }, sec * 1000);
  });
};

(async function () {
  try {
    const data = await Promise.race([
      getJSON(getCountryURL('IND'), `Country IND not found`),
      timeout(1),
    ]);
    console.log('from IIF', data);
  } catch (err) {
    console.error('from IIF', err);
  }
})();

// Promise.allSettled([]) will return all fulfilled promises, irrespective of resolve or reject
Promise.allSettled([
  Promise.resolve('SUCCESS'),
  Promise.reject('ERROR'),
  Promise.resolve('SUCCESS'),
]).then(res => console.log(res));

// returns first promise that returns success, a rejected promise is ignored
Promise.any([
  Promise.resolve('SUCCESS'),
  Promise.reject('ERROR'),
  Promise.resolve('SUCCESS'),
]).then(res => console.log(res));

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const imgElement = document.createElement('img');
    imgElement.src = imgPath;

    imgElement.addEventListener('load', function () {
      images.append(imgElement);
      resolve(imgElement);
    });

    imgElement.addEventListener('error', function () {
      reject(new Error('image not found'));
    });
  });
};

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, 1000 * seconds);
  });
};

const loadNPause = async function () {
  let currentImage;
  try {
    currentImage = await createImage('img/img-1.jpg');
    await wait(2);
    currentImage.style.display = 'none';
    currentImage = await createImage('img/img-2.jpg');
    await wait(2);
    currentImage.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

// loadNPause();

const loadAll = async function (imgArr) {
  let currentImage;

  const imgs = imgArr.map(async img => await createImage(img));
  console.log('loadAll', imgs);
  const imageEl = await Promise.all(imgs);
  console.log('loadAll', imageEl);
  imageEl.forEach(img => img.classList.add('parallel'));
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImage = img;
//     console.log('image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImage = img;
//     console.log('image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//   })
//   .catch(err => console.log(err));
