'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLink = document.querySelectorAll('.nav__link');
const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');

const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

const header = document.querySelector('.header');

const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  // const sect1Corrdinates = section1.getBoundingClientRect();
  // console.log(sect1Corrdinates);
  // console.log(e.target.getBoundingClientRect());

  // // current scroll position
  // console.log('current scroll x/y', window.pageXOffset, window.pageYOffset);

  // viewport
  // console.log(
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // one way
  // window.scrollTo(
  //   sect1Corrdinates.left + window.pageXOffset,
  //   sect1Corrdinates.top + window.pageYOffset
  // );

  // way 2
  // window.scrollTo({
  //   left: sect1Corrdinates.left + window.pageXOffset,
  //   top: sect1Corrdinates.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // Modern way
  console.log(section1);
  section1.scrollIntoView({ behavior: 'smooth' });
});

// navLink.forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const targetElement = document.querySelector(e.target.getAttribute('href'));
//     // console.log('LINK', e.target.getAttribute('href'));
//     targetElement.scrollIntoView({ behavior: 'smooth' });
//   });
// });

// EVENT DELEGATION
navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    console.log('LINK');
    const targetElement = document.querySelector(e.target.getAttribute('href'));
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
});

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// MENU FADE ANIMATION

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
    const logo = e.target.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this; // opacity;
      }
    });
    logo.style.opacity = this; //opacity;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// SICKY NAVIGATION with scroll event
// const initialCoord = section1.getBoundingClientRect();
// // console.log(initialCoord);
// window.addEventListener('scroll', function () {
//   console.log(this.window.scrollY);
//   if (this.window.scrollY > initialCoord.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// STICKY NAVIGATION with Intersection Observer API
// const observerCallbackFn = function (entries, observer) {
//   entries.forEach(entry => console.log(entry));
// };
// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(observerCallbackFn, observerOptions);
// observer.observe(section1);

const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  // console.log(entries);
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// REVEAL SECTIONS
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// LAZY LOADING IMAGES

const loadImg = (entries, observer) => {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  // this will remove class at once, desired effect will not be achived.
  // entry.target.classList.remove('lazy-img');
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// SLIDER

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const sliderButtonLeft = document.querySelector('.slider__btn--left');
const sliderButtonRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');

let currentSlide = 0;
const maxSlide = slides.length;

// slider.style.transform = 'scale(0.2)';
// slider.style.overflow = 'visible';

const createDots = function () {
  slides.forEach((slide, i) => {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

createDots();

const gotoSlide = function (slideNumber) {
  slides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${100 * (i - slideNumber)}%)`)
  );
};

gotoSlide(0);

const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  gotoSlide(currentSlide);
};

const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }

  gotoSlide(currentSlide);
};

sliderButtonRight.addEventListener('click', nextSlide);
sliderButtonLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') previousSlide();
});

dotsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    gotoSlide(slide);
  }
});

// document.querySelectorAll();

// PRACTICE
// SELECTING ELEMENTS
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);
// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// console.log(document.getElementById('section--1'));
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// const navItems = document.getElementsByClassName('nav__item');
// console.log(navItems);

// CREATIGN and INSERTING ELEMENTS
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent = 'we use cookies for improved performance';
// message.innerHTML =
// 'we use cookies for improved performance <button class="btn btn--close-cookie">GOT IT!!!</button>';

// header.prepend(message);
// header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

/// DELETE ELEMENTS
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function (e) {
//     message.remove();
//     // message.parentElement.removeChild(message); // old way
//   });

//STYLES
// message.style.backgroundColor = '#37383d';
// message.style.width = '105%';

// console.log(message.style.backgroundColor); // only can get inline style
// console.log(message.style.height); // cannot read, not inline

// console.log(getComputedStyle(message).height);
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
// console.log(getComputedStyle(message).height);

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// ATTRIBUTES
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.getAttribute('alt')); // to read non-standard attributes

// logo.alt = 'Changed Alt';
// logo.setAttribute('alt', 'Change again');

// data attributes
// console.log(logo.dataset.versionNumber);
// console.log(logo.getAttribute('data-version-number'));
// console.log(logo.dataset);

// classes
// logo.classList.add('c');
// logo.classList.remove('c');
// logo.classList.toggle('c');
// logo.classList.contains('c');

// will override existing
// logo.className = 'chandan';

// btn--scroll-to
// section--1

// console.log(btnScrollTo);
// console.log(section1);

// EVENT LISTENER
// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   console.log('listening to mouseenter event');
//   h1.removeEventListener('mouseenter', alertH1);
// };

// h1.addEventListener('mouseenter', alertH1);

// h1.onmouseenter = function (e) {
//   console.log('listening to mouseenter event from property');
// };

// rgb(255, 255, 255)

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// console.log(randomColor());

// nav.addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('NAV', e.target, e.currentTarget);
//     // e.stopPropagation();
//   },
//   false
// );

// navLinks.addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });

// navLink.addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('LINK', e.target, e.currentTarget);

//     // stopping events from bubbling up
//     // e.stopPropagation();
//   },
//   true
// );

// DOM TREAVERSING
// const h1 = document.querySelector('h1');

// // goind downwards
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // goind upwards
// console.log(h1.parentElement);
// console.log(h1.parentNode);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// /// GOING SIDEWAYS
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);
// console.log(h1.parentElement.children); // all siblings
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) {
//     el.style.transform = 'scale(0.5)';
//   }
// });
