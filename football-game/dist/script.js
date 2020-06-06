var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

//var mc = new Hammer(canvas);

//mc.get("pan").set({ direction: Hammer.DIRECTION_ALL });

var img = new Image();
img.src = "http://emilyfbrooks.com/welcometotheswamp/images/WelcometotheSwampDigitalBlank-03.jpg";

var out = document.getElementById("out");
window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

var init = requestAnimationFrame(start);
var player1 = new Player(100, 250);
var player2 = new Player(600, 250);
var ball = new Ball(350, 250);
var wDown = false;
var sDown = false;
var aDown = false;
var dDown = false;
//var panUp = false;
//var panDown = false;
//var panLeft = false;
//var panRight = false;
function start() {
  clear();
  renderBackground();
  renderGates();
  checkKeyboardStatus();
  //checkTouchStatus();
  checkPlayersBounds();
  checkBallBounds();
  checkPlayers_BallCollision();
  movePlayers();
  moveBall();
  renderPlayers();
  renderBall();

  out.innerHTML = "Field Goals: " + player1.score;
  requestAnimationFrame(start);
}

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.xVel = 0;
  this.yVel = 0;
  this.decel = 0.1;
  this.size = 5;
}

function Player(x, y) {
  this.x = x;
  this.y = y;
  this.size = 20;
  this.xVel = 0;
  this.yVel = 0;
  this.score = 0;
  this.accel = 0.55;
  this.decel = 0.55;
  this.maxSpeed = 3;
}

function reset() {
  var score1 = player1.score;
  player1 = new Player(100, 250);
  player1.score = score1;
  ball = new Ball(350, 250);
  wDown = false;
  sDown = false;
  aDown = false;
  dDown = false;
  //panUp = false;
  //panDown = false;
 // panLeft = false;
 // panRight = false;
}

function movePlayers() {
  player1.x += player1.xVel;
  player1.y += player1.yVel;
}

function checkPlayers_BallCollision() {
  var p1_ball_distance =
    getDistance(player1.x, player1.y, ball.x, ball.y) -
    player1.size -
    ball.size;
  if (p1_ball_distance < 0) {
    collide(ball, player1);
  }
}

function collide(cir1, cir2) {
  var dx = (cir1.x - cir2.x) / cir1.size;
  var dy = (cir1.y - cir2.y) / cir1.size;
  cir2.xVel = -dx;
  cir2.yVel = -dy;
  cir1.xVel = dx;
  cir1.yVel = dy;
}

function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function moveBall() {
  if (ball.xVel !== 0) {
    if (ball.xVel > 0) {
      ball.xVel -= ball.decel;
      if (ball.xVel < 0) ball.xVel = 0;
    } else {
      ball.xVel += ball.decel;
      if (ball.xVel > 0) ball.xVel = 0;
    }
  }
  if (ball.yVel !== 0) {
    if (ball.yVel > 0) {
      ball.yVel -= ball.decel;
      if (ball.yVel < 0) ball.yVel = 0;
    } else {
      ball.yVel += ball.decel;
      if (ball.yVel > 0) ball.yVel = 0;
    }
  }
  ball.x += ball.xVel;
  ball.y += ball.yVel;
}

function checkBallBounds() {
  if (ball.x + ball.size > canvas.width) {
    if (ball.y > 150 && ball.y < 350) {
      player1.score++;
      reset();
      return;
    }
    ball.x = canvas.width - ball.size;
    ball.xVel *= -1.5;
  }

  if (ball.y + ball.size > canvas.height) {
    ball.y = canvas.height - ball.size;
    ball.yVel *= -1.5;
  }
  if (ball.y - ball.size < 0) {
    ball.y = 0 + ball.size;
    ball.yVel *= -1.5;
  }
}

function checkPlayersBounds() {
  if (player1.x + player1.size > canvas.width) {
    player1.x = canvas.width - player1.size;
    player1.xVel *= -0.5;
  }
  if (player1.x - player1.size < 0) {
    player1.x = 0 + player1.size;
    player1.xVel *= -0.5;
  }
  if (player1.y + player1.size > canvas.height) {
    player1.y = canvas.height - player1.size;
    player1.yVel *= -0.5;
  }
  if (player1.y - player1.size < 0) {
    player1.y = 0 + player1.size;
    player1.yVel *= -0.5;
  }
}

/*function checkTouchStatus() {
  if (panUp) {
    if (player1.yVel > -player1.maxSpeed) {
      player1.yVel -= player1.accel;
    } else {
      player1.yVel = -player1.maxSpeed;
    }
  } else {
    if (player1.yVel < 0) {
      player1.yVel += player1.decel;
      if (player1.yVel > 0) player1.yVel = 0;
    }
  }
  if (panDown) {
    if (player1.yVel < player1.maxSpeed) {
      player1.yVel += player1.accel;
    } else {
      player1.yVel = player1.maxSpeed;
    }
  } else {
    if (player1.yVel > 0) {
      player1.yVel -= player1.decel;
      if (player1.yVel < 0) player1.yVel = 0;
    }
  }
  if (panLeft) {
    if (player1.xVel > -player1.maxSpeed) {
      player1.xVel -= player1.accel;
    } else {
      player1.xVel = -player1.maxSpeed;
    }
  } else {
    if (player1.xVel < 0) {
      player1.xVel += player1.decel;
      if (player1.xVel > 0) player1.xVel = 0;
    }
  }
  if (panRight) {
    if (player1.xVel < player1.maxSpeed) {
      player1.xVel += player1.accel;
    } else {
      player1.xVel = player1.maxSpeed;
    }
  } else {
    if (player1.xVel > 0) {
      player1.xVel -= player1.decel;
      if (player1.xVel < 0) player1.xVel = 0;
    }
  }
}


mc.on("panleft", function(panLeft) {
});

mc.on("panright", function(panRight) {
});

mc.on("panup", function(panUp) {
});

mc.on("pandown", function(panDown) {
});

*/

function checkKeyboardStatus() {
  if (wDown) {
    if (player1.yVel > -player1.maxSpeed) {
      player1.yVel -= player1.accel;
    } else {
      player1.yVel = -player1.maxSpeed;
    }
  } else {
    if (player1.yVel < 0) {
      player1.yVel += player1.decel;
      if (player1.yVel > 0) player1.yVel = 0;
    }
  }
  if (sDown) {
    if (player1.yVel < player1.maxSpeed) {
      player1.yVel += player1.accel;
    } else {
      player1.yVel = player1.maxSpeed;
    }
  } else {
    if (player1.yVel > 0) {
      player1.yVel -= player1.decel;
      if (player1.yVel < 0) player1.yVel = 0;
    }
  }
  if (aDown) {
    if (player1.xVel > -player1.maxSpeed) {
      player1.xVel -= player1.accel;
    } else {
      player1.xVel = -player1.maxSpeed;
    }
  } else {
    if (player1.xVel < 0) {
      player1.xVel += player1.decel;
      if (player1.xVel > 0) player1.xVel = 0;
    }
  }
  if (dDown) {
    if (player1.xVel < player1.maxSpeed) {
      player1.xVel += player1.accel;
    } else {
      player1.xVel = player1.maxSpeed;
    }
  } else {
    if (player1.xVel > 0) {
      player1.xVel -= player1.decel;
      if (player1.xVel < 0) player1.xVel = 0;
    }
  }
}

document.onkeyup = function (e) {
  if (e.keyCode === 87) {
    wDown = false;
  }
  if (e.keyCode === 65) {
    aDown = false;
  }
  if (e.keyCode === 68) {
    dDown = false;
  }
  if (e.keyCode === 83) {
    sDown = false;
  }
};

document.onkeydown = function (e) {
  if (e.keyCode === 87) {
    wDown = true;
  }
  if (e.keyCode === 65) {
    aDown = true;
  }
  if (e.keyCode === 68) {
    dDown = true;
  }
  if (e.keyCode === 83) {
    sDown = true;
  }
};

function renderBall() {
  c.save();
  c.beginPath();
  c.fillStyle = "brown";

  c.arc(ball.x, ball.y - 30, 50, 0.2 * Math.PI, 0.8 * Math.PI); //bottom half football
  c.arc(ball.x, ball.y + 30, 50, 1.2 * Math.PI, 1.8 * Math.PI); //top half football
  c.fill();
  c.closePath();
  c.restore();
}

function renderPlayers() {
  c.save();
  c.fillStyle = "#0021A5"; //blue
  c.beginPath();
  c.arc(player1.x, player1.y, player1.size, 0, Math.PI * 2);
  c.fill();
  c.closePath();
  c.beginPath();
  c.fillStyle = "#FA4616"; //orange
}

function renderGates() {
  c.save();
  c.beginPath();
  c.moveTo(451, 157);
  c.lineTo(451, 324);
  c.strokeStyle = "#fedc18"; //yellow
  c.lineWidth = 10;
  c.stroke();
  c.closePath();
  c.restore();
}

function renderBackground() {
  c.save();

  var pattern = c.createPattern(img, "no-repeat");
  c.fillStyle = pattern;

  c.fillRect(0, 0, canvas.width, canvas.height);
  //c.strokeStyle = "rgba(255,255,255,0.6)";
  c.beginPath();
}

function clear() {
  c.clearRect(0, 0, canvas.width, canvas.height);
}

function goBack() {
  window.history.back();
}