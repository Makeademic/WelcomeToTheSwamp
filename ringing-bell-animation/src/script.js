var bell = document.querySelector('.bell');

// Create an instance of Hammer with the reference.
var hammer = new Hammer(bell);

hammer.on('tap', ringBell);


var audio = document.getElementById("CenturyTowerBells"); 

function ringBell(){
audio.play()
}