let cols,
  rows,
  sqWidth = 10,
  grid = [],
  generations = 0,
  randomButton,
  startStop,
  started = false;

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

function setup() {
  createCanvas(900, 900);
  frameRate(15);
  cols = width / sqWidth;
  rows = height / sqWidth;
  grid = matrix(rows, cols);
  randomButton = createButton("randomise");
  randomButton.mousePressed(createBoard);
  gliderButton = createButton("createPattern");
  gliderButton.mousePressed(createPattern);
  startStop = createButton("start");
  startStop.mousePressed(start);
  createPattern();
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
// function mousePressed() {
//   for (var j = 0; j < rows; j++) {
//     for (var i = 0; i < cols; i++) {
//       var dis = dist(mouseX, mouseY, grid[i], y[j]);
//       console.log(dis);
//       if (dis < sqWidth / 2) col[j * 10 + i] = !col[j * 10 + i];
//     }
//   }
// }
function drawGen() {
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
        fill(255);
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
  drawGen();
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
