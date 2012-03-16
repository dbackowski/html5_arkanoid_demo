var screenWidth = 640;
var screenHeight = 480;
var x = 250;
var y = 250;
var dx = 2;
var dy = 4;
var paddlex;
var paddleh;
var paddlew;
var rightDown = false;
var leftDown = false;
var canvasMinX;
var canvasMaxX;
var bricks;
var intervalId;
var ctx;

function init() {
  var canvas = document.getElementById('canvas');
  canvas.width = screenWidth;
  canvas.height = screenHeight;
  ctx = canvas.getContext('2d'); 

  intervalId = setInterval(draw, 30);
}

function init_paddle() 
{
  paddlex = screenWidth / 2;
  paddleh = 10;
  paddlew = 75;
}

function circle(x,y,r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}

function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

function clear() {
  ctx.clearRect(0, 0, screenWidth, screenHeight);
}

function init_mouse() {
  canvasMinX = $("#canvas").offset().left;
  canvasMaxX = canvasMinX + screenWidth;
}

function init_bricks()
{
  bricks = Array(5);

  for(i = 0; i < bricks.length; i++)
  {
    bricks[i] = new Array(12);

    for (j = 0;j < bricks[i].length;j++)
    {
      bricks[i][j] = 1;
    }
  }
}

function onMouseMove(evt) {
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    paddlex = evt.pageX - canvasMinX;
  }
}

function onKeyDown(evt) {
  if (evt.keyCode == 39) rightDown = true;
  else if (evt.keyCode == 37) leftDown = true;
}

function onKeyUp(evt) {
  if (evt.keyCode == 39) rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
}

function draw() {
  clear();
  circle(x, y, 10);

  if (rightDown) paddlex += 5;
  else if (leftDown) paddlex -= 5;

  for (i=0;i<bricks.length;i++)
  {
    for (j=0;j<bricks[i].length;j++)
    {
      if (bricks[i][j] == 1)
      {
        rect(j * (45 + 5) + 20, i * (5 + 20) + 20, 45, 20);
      }
    }
  }

  rowheight = 20 + 5;
  colwidth = 45 + 5;
  row = Math.floor((y-20)/rowheight);
  col = Math.floor((x-20)/colwidth);
  
  if ((y - 20) < 5 * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
    dy = -dy;
    bricks[row][col] = 0;
  }

  rect(paddlex, screenHeight - paddleh, paddlew, paddleh);
 
  if (x + dx > screenWidth - 10 || x + dx < 10)
  {
    dx = -dx;
  }
    
  if (y + dy < 10)
  {
    dy = -dy;
  } 
  else if (y + dy > screenHeight - 15 && x > paddlex && x < paddlex + paddlew && y < screenHeight - 15)
  {
      dy = -dy;
  }
  else if (y + dy >= screenHeight)
  {
    ctx.fillStyle = '#f00';
    ctx.font = 'italic 20px sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillText('Game Over', 270, screenHeight/2);
    ctx.fillStyle = '#000';

    clearInterval(intervalId);
  }
      
  x += dx;
  y += dy;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);
$(document).mousemove(onMouseMove);

init();
init_mouse();
init_paddle();
init_bricks();
