// =============
// == Globals ==
// =============
const canvas = document.getElementById('drawing-area');
const canvasContext = canvas.getContext('2d');
const clearButton = document.getElementById('clear-button');
const orangeButton = document.getElementById('orange-button');
const blueButton = document.getElementById('blue-button');
const state = {
  mousedown: false
};

// ===================
// == Configuration ==
// ===================
const lineWidth = 5;
const halfLineWidth = lineWidth / 2;
const fillStyle = '#333';
var strokeStyle = '#333';
const shadowColor = '#333';
const shadowBlur = lineWidth / 4;

// =====================
// == Event Listeners ==
// =====================
canvas.addEventListener('mousedown', handleWritingStart);
canvas.addEventListener('mousemove', handleWritingInProgress);
canvas.addEventListener('mouseup', handleDrawingEnd);
canvas.addEventListener('mouseout', handleDrawingEnd);

canvas.addEventListener('touchstart', handleWritingStart);
canvas.addEventListener('touchmove', handleWritingInProgress);
canvas.addEventListener('touchend', handleDrawingEnd);

clearButton.addEventListener('click', handleClearButtonClick);
orangeButton.addEventListener('click', handleOrangeButtonClick);
blueButton.addEventListener('click', handleBlueButtonClick);

// ====================
// == Event Handlers ==
// ====================
function handleWritingStart(event) {
  event.preventDefault();

  const mousePos = getMousePositionOnCanvas(event);
  
  canvasContext.beginPath();

  canvasContext.moveTo(mousePos.x, mousePos.y);

  canvasContext.lineWidth = lineWidth;
  canvasContext.strokeStyle = strokeStyle;
  canvasContext.shadowColor = null;
  canvasContext.shadowBlur = null;

  canvasContext.fill();
  
  state.mousedown = true;
}

function handleWritingInProgress(event) {
  event.preventDefault();
  
  if (state.mousedown) {
    const mousePos = getMousePositionOnCanvas(event);

    canvasContext.lineTo(mousePos.x, mousePos.y);
    canvasContext.stroke();
  }
}

function handleDrawingEnd(event) {
  event.preventDefault();
  
  if (state.mousedown) {
    canvasContext.shadowColor = shadowColor;
    canvasContext.shadowBlur = shadowBlur;

    canvasContext.stroke();
  }
  
  state.mousedown = false;
}

function handleClearButtonClick(event) {
  event.preventDefault();
  
  clearCanvas();
}

function handleOrangeButtonClick(event) {
  event.preventDefault();
  changeColorOrange();
}

function handleBlueButtonClick(event) {
  event.preventDefault();
  
  changeColorBlue();
}

// ======================
// == Helper Functions ==
// ======================
function getMousePositionOnCanvas(event) {
  const clientX = event.clientX || event.touches[0].clientX;
  const clientY = event.clientY || event.touches[0].clientY;
  const { offsetLeft, offsetTop } = event.target;
  const canvasX = clientX - offsetLeft;
  const canvasY = clientY - offsetTop;

  return { x: canvasX, y: canvasY };
}

function clearCanvas() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}

function changeColorOrange(){
  strokeStyle = "#FA4616";
}

function changeColorBlue(){
  strokeStyle = "#0021A5";
}

function goBack() {
  window.history.back();
}