let cols,
  rows,
  sqWidth = 10,
  grid = [],
  generations = 0,
  started = false,
  firstPos = [],
  copying = false,
  copiedSection = [];

function matrix(h, w) {
  let arr = [];
  for (var y = 0; y < h; y++) {
    arr[y] = [];
    for (var x = 0; x < w; x++) {
      arr[y][x] = 0;
    }
  }
  return arr;
}
function clearState(){
  copying = false,
  copiedSection = [];
}
function setup() {
  createCanvas(900, 900);
  frameRate(15);
  cols = width / sqWidth;
  rows = height / sqWidth;
  grid = matrix(rows, cols);
  createPattern();
  start();
}
function start() {
  if (started == false) {
    started = true;
  } else {
    started = false;
  }
}
function clearBoard() {
  started = false;
  copied = false;
  copiedSection = [];
  generations = 0;
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
  let arr = [];
  if (copying && copiedSection.length >= 1) {
    copiedSection = [];
  }
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    let x1 = Math.floor(firstPos[0] / sqWidth),
      y1 = Math.floor(firstPos[1] / sqWidth),
      x2 = Math.round(mouseX / sqWidth),
      y2 = Math.round(mouseY / sqWidth);
    firstPos.push(mouseX);
    firstPos.push(mouseY);
    console.log("c", "x: ", x1, x2, "y:", y1, y2);
    if (copiedSection.length < 1) {
      for (let i = Math.min(y1, y2); i < Math.max(y1, y2); i++) {
        for (let j = Math.min(x1, x2); j < Math.max(x1, x2); j++) {
          console.log(i, j);
          copiedSection.push(grid[j][i]);
          arr = chunk(copiedSection, Math.abs(x1 - x2));
        }
      }
    }
    console.log(copiedSection);
    copiedSection = arr;
    if (copiedSection.length >= 1) copying = false;
    // console.log(x1, y1, x2, y2);
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
//try select cells maybe
function pasteSection(minX, minY) {
  let startX = Math.floor(minX / sqWidth),
    startY = Math.floor(minY / sqWidth),
    maxX = startX + copiedSection[0].length;
  maxY = startY + copiedSection.length;
  console.log("length: ", copiedSection.length, copiedSection[0].length);
  if (
    maxY <= height / sqWidth &&
    startY >= 0 &&
    maxX <= width / sqWidth &&
    startX >= 0
  ) {
    for (let i = 0; i < copiedSection.length; i++) {
      for (let j = 0; j < copiedSection[0].length; j++) {
        // console.log(copiedSection[i][j]);
        grid[startX + j][startY + i] = copiedSection[i][j];
      }
    }
  }
  console.log(copiedSection);
}
function keyPressed() {
  if (keyCode == 32) start();
  if (keyCode == 82) clearBoard();
  if (keyCode == 86) pasteSection(mouseX, mouseY);
  if(keyCode == ESCAPE) clearState()
}
function drawText() {
  fill(255, 0, 0);
  textSize(sqWidth * 3);
  textAlign(LEFT);
  text(generations, sqWidth / 2, sqWidth * 3);
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
function draw() {
  background(0);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = i * sqWidth;
      let y = j * sqWidth;
      if (grid[i][j] == 1) {
        rectMode(CORNER);
        fill(0, 255, 0);
        stroke(0);
        rect(x, y, sqWidth);
      }
    }
  }
  if (started) {
    generations++;
    let nextGen = matrix(rows, cols);
    for (let i = 0; i < rows - 1; i++) {
      for (let j = 0; j < cols - 1; j++) {
        let liveCount = 0;
        if (j < cols && grid[i][j + 1] == 1) liveCount++;
        if (j > 0 && grid[i][j - 1] == 1) liveCount++;
        // top/bottom
        if (i < rows && grid[i + 1][j] == 1) liveCount++;
        if (i > 0 && grid[i - 1][j] == 1) liveCount++;
        //diagonal top-left/top-right
        if (i > 0 && j > 0 && grid[i - 1][j - 1] == 1) liveCount++;
        if (i > 0 && j < cols && grid[i - 1][j + 1] == 1) liveCount++;
        //diagonal bottom-left/bottom-right
        if (i < rows && j > 0 && grid[i + 1][j - 1] == 1) liveCount++;
        if (i < rows && j < cols && grid[i + 1][j + 1] == 1) liveCount++;
        if (grid[i][j] == 1) {
          if (liveCount < 2 || liveCount > 3) {
            nextGen[i][j] = 0;
          } else {
            nextGen[i][j] = grid[i][j];
          }
        } else if (grid[i][j] == 0) {
          if (liveCount == 3) {
            nextGen[i][j] = 1;
          } else {
            nextGen[i][j] = grid[i][j];
          }
        }
      }
    }
    grid = nextGen;
  }
  drawText();
  rectMode(CORNERS);
  // console.log(firstPos, firstPos[0], firstPos[1], mouseX, mouseY);
  rect(firstPos[0], firstPos[1], mouseX, mouseY);
  noFill();
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
