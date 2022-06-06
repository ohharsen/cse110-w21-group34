import { lang } from './language_tutorial.js';
// Master DOManipulator v2 ------------------------------------------------------------
const items = document.querySelectorAll('.item');
const controls = document.querySelectorAll('.control');
const headerItems = document.querySelectorAll('.item-header');
const descriptionItems = document.querySelectorAll('.item-description');
const activeDelay = 0.76;
const interval = 100000;

let current = 0;

const slider = {
  init: () => {
    controls.forEach(control => control.addEventListener('click', (e) => { slider.clickedControl(e); }));
    document.querySelector('.right').addEventListener('click', slider.nextSlide);
    document.querySelector('.left').addEventListener('click', slider.previousSlide);
    controls[current].classList.add('active');
    items[current].classList.add('active');
  },
  changeText: () => {
    if (current === items.length - 1) {
      document.getElementById('go-back-button').innerHTML = lang.tutorialFocusMsg;
    } else {
      document.getElementById('go-back-button').innerHTML = lang.tutorialBackBtn;
    }
  },
  nextSlide: () => { // Increment current slide and add active class
    slider.reset();
    if (current === items.length - 1) current = -1; // Check if current slide is last in array
    current++;
    controls[current].classList.add('active');
    items[current].classList.add('active');
    slider.changeText();
    slider.transitionDelay(headerItems);
    slider.transitionDelay(descriptionItems);
  },
  previousSlide: () => { // Increment current slide and add active class
    slider.reset();
    if (current === 0) current = items.length; // Check if current slide is first in array
    current--;
    controls[current].classList.add('active');
    items[current].classList.add('active');
    slider.changeText();
    slider.transitionDelay(headerItems);
    slider.transitionDelay(descriptionItems);
  },
  clickedControl: (e) => { // Add active class to clicked control and corresponding slide
    slider.reset();
    clearInterval(intervalF);

    const control = e.target;
    const dataIndex = Number(control.dataset.index);

    control.classList.add('active');
    items.forEach((item, index) => {
      if (index === dataIndex) { // Add active class to corresponding slide
        item.classList.add('active');
      }
    });
    current = dataIndex; // Update current slide
    slider.changeText();
    slider.transitionDelay(headerItems);
    slider.transitionDelay(descriptionItems);
    intervalF = setInterval(slider.nextSlide, interval); // Fire that bad boi back up
  },
  reset: () => { // Remove active classes
    items.forEach(item => item.classList.remove('active'));
    controls.forEach(control => control.classList.remove('active'));
  },
  transitionDelay: (items) => { // Set incrementing css transition-delay for .item-header & .item-description, .vertical-part, b elements
    let seconds;

    items.forEach(item => {
      const children = item.childNodes; // .vertical-part(s)
      let count = 1;
      let delay;

      item.classList.value === 'item-header' ? seconds = 0.015 : seconds = 0.007;

      children.forEach(child => { // iterate through .vertical-part(s) and style b element
        if (child.classList) {
          item.parentNode.classList.contains('active') ? delay = count * seconds + activeDelay : delay = count * seconds;
          child.firstElementChild.style.transitionDelay = `${delay}s`; // b element
          count++;
        }
      });
    });
  }
};

let intervalF = setInterval(slider.nextSlide, interval);
slider.init();
