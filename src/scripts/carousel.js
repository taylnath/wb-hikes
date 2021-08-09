// simple slideshow

// get list of slides, slidebuttons, and next/previous buttons
let slides = Array.from(document.getElementsByClassName('slide'));
let slidebuttons = Array.from(document.getElementsByClassName('slidebutton'));
let nextPrevButtons = ['nextButton', 'prevButton'].map(x => document.getElementById(x));

// index starts at 0
let slideIndex = 0;

// calcuate m mod n
function mod(m,n){
  return ((m % n) + n ) % n;
}

// get the current slide and slidebutton elements
function currentSlideComponents(){
  return [slides, slidebuttons].map(x => x[slideIndex]);
}

// update slide components for new index
function updateSlideComponents(newIndex){
  let oldElts = currentSlideComponents();
  slideIndex = newIndex;
  let newElts = currentSlideComponents();
  oldElts.forEach(x => x.classList.remove('active'));
  newElts.forEach(x => x.classList.add('active'));
}

// move to the next slide
function transitionSlides(){
  let newIndex = mod(slideIndex + 1, slides.length);
  updateSlideComponents(newIndex);
}

// run the slideshow
let interval = setInterval(transitionSlides, 8000);

// make each button link to the corresponding slide
slidebuttons.forEach((button, i) => {
  button.addEventListener('click', () => {
    updateSlideComponents(i);
  })
})

// make the next button and previous button link to next/previous slide
nextPrevButtons.forEach((button, i) => {
  button.addEventListener('click', () => {
    // -2i+1 transforms index 0 => 1 (next), index 1 => -1 (previous)
    let newIndex = mod(slideIndex - 2 * i + 1, slides.length);
    updateSlideComponents(newIndex);
  })
})