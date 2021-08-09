// Carousel that looks like a deck of cards getting shuffled

// get slide container and first active slide
let container = document.querySelector('.slideshow-container');
let activeSlide = container.querySelector('.active');

// get list of slides, compute slide numbers
let slides = Array.from(container.children); // could use document.getElementsByClassName here
let numSlides = slides.length;
let slideIndex = slides.length - 1;

// get button container, list of buttons, and first active button
let buttonContainer = document.querySelector('.slidebutton-container');
let activeSlideButton = buttonContainer.querySelector('.active');
let slideButtons = Array.from(buttonContainer.children); // could use document.getElementsByClassName here

// define slide duration and transition time
// NOTE: transition time should match --slide-transition-time value in css file.
let slideDuration = 4000;
let slideTransitionTime = 2000;

// calcuate m mod n
function mod(m,n){
  return ((m % n) + n ) % n;
}

// get the computed property value of an element as an integer
function getPropVal(elt, prop){
  let currStyle = getComputedStyle(elt)[prop];
  let styleVal = parseInt(currStyle, 10);
  if (styleVal === NaN){
    return 0;
  } 
  return styleVal
}

// increment a property by some amount
function incProp(elt, prop, amt){
  let styleVal = getPropVal(elt, prop);
  elt.style[prop] = String(styleVal + amt) + 'px';
}

// shift an element left by its width (used for initial slide transition)
function shiftByWidth(elt){
  let width = getPropVal(elt, 'width');
  incProp(elt, 'left', -1 * width);
}

// update the current active button
// these go in reverse order from slides
// shift = -1 for forward
// shift = 1 for reverse
function updateButtons(shift){
  let oldActiveButton = document.getElementById('sf-' + String(slideIndex));
  oldActiveButton.classList.remove('active');
  slideIndex = mod(slideIndex + shift, numSlides);
  let newActiveButton = document.getElementById('sf-' + String(slideIndex));
  newActiveButton.classList.add('active');
}

// move forward in the slide carousel, pausing for the given duration
async function transitionSlides(duration){
  // shift the active slide left
  shiftByWidth(activeSlide, 'left');

  // update the active button
  updateButtons(-1);

  // wait for the duration
  await new Promise(res => setTimeout(res, duration));

  // put the active element at the bottom of the slide deck, 
  // also undo the left shift, and update active element
  activeSlide.classList.remove('active');
  activeSlide.previousElementSibling.classList.add('active');
  container.removeChild(activeSlide);
  container.prepend(activeSlide);
  activeSlide.style.left = "";
  activeSlide = container.querySelector('.active');
}

// go backwards in the slide deck
async function reverseSlides(duration){

  // shift active slide to right
  // this currently is not visible since reverseSlides
  // is only called with duration === 0
  // shiftByWidth(activeSlide, 'right');

  // shift the active button backwards
  updateButtons(1);

  // wait the duration
  await new Promise(res => setTimeout(res, duration));

  // put element at bottom of the deck on top
  // also update active element
  activeSlide.classList.remove('active');
  let newActive = container.firstElementChild;
  newActive.classList.add('active');
  container.removeChild(newActive);
  container.appendChild(newActive);
  activeSlide.style.left = "";
  activeSlide = newActive;
  // alternative way to do the above line:
  // activeSlide = container.querySelector('.active'); 
}

// wait for one slide transition to finish
async function makeSlides(){
  await transitionSlides(slideDuration);
}

// loop through the slides forever
function runSlides(){
  let int = setInterval(makeSlides, slideDuration + slideTransitionTime);
  return int;
}

// start the infinite loop
let interval = runSlides();

// the nextButton stops the slideshow, transitions the slides
// quickly, then starts the slideshow again.
let nextButton = document.getElementById('nextButton');
nextButton.addEventListener('click', () => {
  clearInterval(interval);
  // TODO: make this version of transitionSlides (with duration 0) do a quick fade out
  transitionSlides(0);
  interval = runSlides();
});

// the prevButton stops the slideshow, transitions the slides
// quickly, then starts the slideshow again.
let prevButton = document.getElementById('prevButton');
prevButton.addEventListener('click', () => {
  clearInterval(interval);
  // TODO: make this version of transitionSlides (with duration 0) do a quick fade out
  reverseSlides(0);
  interval = runSlides();
});

// the slide buttons shuffle through the deck until the 
// desired slide is reached
slideButtons.forEach(button => {
  button.addEventListener('click', () => {
    clearInterval(interval);
    while (!Array.from(button.classList).includes('active')){
      transitionSlides(0);
    }
    interval = runSlides();
  })
})
