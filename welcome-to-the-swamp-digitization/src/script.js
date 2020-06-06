var currentPage = 0;
// Get a reference to an element.
var book = document.querySelector('.book');

$('.book')
.on('click', '.active', nextPage)
.on('click', '.flipped', prevPage);

// Create an instance of Hammer with the reference.
var hammer = new Hammer(book);
// For all instances of hammer, which calls book, on the touch event, execute function
// Options include panleft, panright, tap, press, doubletap, pinch, rotate, swipeleft, swiperight
hammer.on('swipeleft', nextPage);
hammer.on('swiperight', prevPage);

var timeout;

function prevPage() {
  // if a page flip is already in process, interrupt the ongoing
  // timeout so it does not hide pages it should not hide
  if (timeout) {
    clearTimeout(timeout);
    timeout = undefined;
  }
  // set previous page to be active
  $('.flipped')
    .removeClass('flipped')
    .addClass('active')
    .siblings('.page')
    .removeClass('active');
  // show page hidden behind old flipped page
  $('.prevFlipped')
    .last()
    .addClass('flipped')
    .removeClass('prevFlipped')
    .removeClass('hidden');
}
function nextPage() {
  // if there are no more pages - don't do anything!
  if ($('.active').length === 0) {
    return;
  }
  // if a page flip is in progress, interrupt the timeout 
  // so we don't hide pages that shouldn't be hidden
  if (timeout) {
    clearTimeout(timeout);
    timeout = undefined;
  }
  // current flipped page needs to be hidden behind next flipped page
  $('.flipped')
    .addClass('prevFlipped')
    .removeClass('flipped');
  // current active page becomes flipped, and its next sibling becomes
  // new active page
  $('.active')
    .removeClass('active')
    .addClass('flipped')
    .next('.page')
    .addClass('active');
  // this is the hacky bit - for some reason firefox on ipad was glitching
  // out and showing the "prevFlipped" page (the page "under" the flipped page)
  // for one frame just as the css transition ended.
  // This adds a timeout so that a few milliseconds before that happens, we hide
  // the "prevFlipped" page so there's no flicker
  timeout = setTimeout(function () {
    $('.prevFlipped').addClass('hidden');
    timeout = undefined;
  }, 1400);
}