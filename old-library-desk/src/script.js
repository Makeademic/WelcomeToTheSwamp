var currentPage = 0;
// Get a reference to an element.
var book = document.querySelector('.book');

// Create an instance of Hammer with the reference.
var hammer = new Hammer(book);

/*
$('.book')
.on('click', '.active', nextPage)
.on('click', '.flipped', prevPage);
*/

//For all instances of hammer, which calls book, on the touch event, execute function
// Options include panleft, panright, tap, press, doubletap, pinch, rotate, swipeleft, swiperight
hammer.on('swipeleft', nextPage);
hammer.on('swiperight', prevPage);

function prevPage() {
  $('.flipped')
    .last()
    .removeClass('flipped')
    .addClass('active')
    .siblings('.page')
    .removeClass('active');
}
function nextPage() {
  $('.active')
    .removeClass('active')
    .addClass('flipped')
    .next('.page')
    .addClass('active')
    .siblings();
}
