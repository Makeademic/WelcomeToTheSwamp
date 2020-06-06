// =============
// == Globals ==
// =============

var redLiquid= document.querySelector(".cls-6");

var yellowLiquid= document.querySelector(".cls-7");

var clearLiquid= document.querySelector(".cls-2");

var magentaLiquid= document.querySelector(".cls-5");


var hammer1 = new Hammer(redLiquid);
hammer1.on("tap", heatRtoY);

var hammer2 = new Hammer(yellowLiquid);
hammer2.on("tap", coolYtoG);

var hammer3 = new Hammer(clearLiquid);
hammer3.on("tap", coolCtoB);

var hammer4 = new Hammer(magentaLiquid);
hammer4.on("tap", coolMtoP);


const state = {
  mousedown: false
};

// ===================
// == Configuration ==
// ===================

// =====================
// == Event Listeners ==
// =====================



// ====================
// == Event Handlers ==
// ====================



// ======================
// == Helper Functions ==
// ======================

function heatRtoY(){
  redLiquid.classList = "redLiquid colorchange3";
}

function coolYtoG(){
  yellowLiquid.classList = "yellowLiquid colorchange4";
}

function coolCtoB(){
  clearLiquid.classList = "clearLiquid colorchange1";
}

function coolMtoP(){
  magentaLiquid.classList = "magentaLiquid colorchange2";
}

function goBack() {
  window.history.back();
}