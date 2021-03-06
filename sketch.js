let cols,
  rows,
  sqWidth = 5,
  grid = [],
  board,
  cell,
  started = false,
  firstPos = [],
  copying = false,
  copiedSection = [],
  strokeBool = true,
  fade = true;

function setup() {
  createCanvas(900, 900);
  frameRate(15);
  cols = width / sqWidth;
  rows = height / sqWidth;
  board = new Board();
  cell = new Cell();
  grid = board.grid;
  createPattern();
  start();
}
function start() {
  started = !started;
}
function clearState() {
  firstPos = [];
  copying = false;
  copiedSection = [];
}
function clearBoard() {
  started = false;
  copied = false;
  copiedSection = [];
  cell.generations = 0;
  base = random(150);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0;
    }
  }
}
function createBoard() {
  clearBoard();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = floor(random(1.5));
    }
  }
}
function mouseDragged() {
  let x = Math.floor(mouseX / sqWidth);
  let y = Math.floor(mouseY / sqWidth);
  if (x < cols && y < rows && x >= 0 && y >= 0) {
    grid[x][y] = 1;
  }
}
function mousePressed() {
  if (copying) {
    started = false;
    copySection();
  } else if (copiedSection.length >= 1) {
    pasteSection(mouseX, mouseY);
  } else {
    let x = Math.floor(mouseX / sqWidth);
    let y = Math.floor(mouseY / sqWidth);
    if (x < cols && y < rows && x >= 0 && y >= 0) {
      if (grid[x][y] == 1) {
        grid[x][y] = 0;
      } else {
        grid[x][y] = 1;
      }
    }
  }
}
function copySection() {
  copying = true;
  started = false;
  let arr = [];
  if (copying && copiedSection.length >= 1) {
    copiedSection = [];
  }
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    let x1 = Math.floor(firstPos[0] / sqWidth),
      y1 = Math.floor(firstPos[1] / sqWidth),
      x2 = Math.round(mouseX / sqWidth),
      y2 = Math.round(mouseY / sqWidth);
    firstPos.push(mouseX, mouseY);
    if (copiedSection.length < 1) {
      for (let i = Math.min(y1, y2); i < Math.max(y1, y2); i++) {
        for (let j = Math.min(x1, x2); j < Math.max(x1, x2); j++) {
          copiedSection.push(grid[j][i]);
          arr = chunk(copiedSection, Math.abs(x1 - x2));
        }
      }
    }
    copiedSection = arr;
    if (copiedSection.length >= 1) copying = false;
    if (firstPos.length > 2) firstPos = [];
  }
}
function chunk(arr, w) {
  let temp = [];
  for (let i = 0; i < arr.length; i += w) {
    temp.push(arr.slice(i, w + i));
  }
  return temp;
}
function pasteSection(minX, minY) {
  let startX = Math.floor(minX / sqWidth),
    startY = Math.floor(minY / sqWidth),
    maxX = startX + copiedSection[0].length,
    maxY = startY + copiedSection.length,
    midX = Math.floor((startX + maxX) / 2),
    midY = Math.floor((startY + maxY + 1) / 2);
  for (let i = 0; i < copiedSection.length; i++) {
    for (let j = 0; j < copiedSection[0].length; j++) {
      if (midX - j >= 0 && midX - j < cols && midY - i >= 0) {
        grid[midX - j][midY - i] = copiedSection[i][j];
      }
    }
  }
}

function keyPressed() {
  if (keyCode == 32 || 84) start();
  if (keyCode == 82) clearBoard();
  if (keyCode == ESCAPE) clearState();
  if (keyIsDown(17)) {
    if (keyCode == 67) copySection();
    else if (keyCode == 86) pasteSection(mouseX, mouseY);
  }
}
function drawCopy() {
  colorMode(RGB);
  stroke(255);
  fill(255, 255, 255, 50);
  rectMode(CORNERS);
  rect(firstPos[0], firstPos[1], mouseX, mouseY);
}
function createPattern() {
  clearBoard();
  let pattern = gliderGun;
  for (let i = 0; i < pattern.length; i++) {
    let row = pattern[i][0];
    let col = pattern[i][1];
    grid[col][row] = 1;
  }
  return grid;
}
//very stupid, just toggle everything with one function
function toggleStroke() {
  strokeBool = !strokeBool;
}
function toggleFade() {
  fade = !fade;
}
function draw() {
  if (started) {
    document.getElementById("play-button").className = "fas fa-pause";
    cell.nextGeneration();
  } else {
    document.getElementById("play-button").className = "fas fa-play";
  }
  board.show();
  if (cell.generations > 0) {
    document.getElementById("generation-text").textContent = cell.generations;
  } else {
    document.getElementById("generation-text").textContent = "";
  }
  drawCopy();
}
//patterns
const gliderGun = [
  [5, 1],
  [5, 2],
  [6, 1],
  [6, 2],
  [5, 11],
  [6, 11],
  [7, 11],
  [4, 12],
  [8, 12],
  [3, 13],
  [9, 13],
  [3, 14],
  [9, 14],
  [6, 15],
  [4, 16],
  [8, 16],
  [7, 17],
  [6, 17],
  [5, 17],
  [6, 18],
  [3, 21],
  [4, 21],
  [5, 21],
  [3, 22],
  [4, 22],
  [5, 22],
  [2, 23],
  [6, 23],
  [1, 25],
  [2, 25],
  [6, 25],
  [7, 25],
  [3, 35],
  [4, 35],
  [3, 36],
  [23, 14],
  [24, 13],
  [24, 14],
  [24, 15],
  [25, 13],
  [25, 15],
  [26, 13],
  [26, 14],
  [26, 15],
  [27, 14],
  [4, 16],
  [63, 14],
  [64, 13],
  [64, 14],
  [64, 15],
  [65, 13],
  [65, 15],
  [66, 13],
  [66, 14],
  [66, 15],
  [27, 14],
  [67, 14],
  //penta
  [10, 64],
  [11, 64],
  [12, 63],
  [12, 65],
  [13, 64],
  [14, 64],
  [15, 64],
  [16, 64],
  [17, 63],
  [17, 65],
  [18, 64],
  [19, 64],
  [10, 85],
  [11, 85],
  [12, 84],
  [12, 86],
  [13, 85],
  [14, 85],
  [15, 85],
  [16, 85],
  [17, 84],
  [17, 86],
  [18, 85],
  [19, 85],
];
