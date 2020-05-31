var bell = document.querySelector('.bell');

// Create an instance of Hammer with the reference.
var hammer = new Hammer(bell);

hammer.on('tap', ringBell);

var audio = document.getElementById("CenturyTowerBells"); 
// add an event listener to the audio element so that when
// it finishes playing, the class on the bell resets.
audio.onended = function () {
  bell.classList = 'bell';
};
function ringBell() {
  // if the audio is already playing, don't do anything
  if (!audio.paused) {
    return;
  }
  // add the `ringing` class to the bell so it starts ringing
  bell.classList = 'bell ringing';
  audio.play();
}
