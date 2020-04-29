let cellCounter = [],
  genCounter,
  base = 0;
class Board {
  constructor() {
    this.sqWidth = 10;
    this.cols = width / sqWidth;
    this.rows = height / sqWidth;
    this.grid = matrix(rows, cols);
  }

  // clearBoard() {
  //   this.started = false;
  //   this.copied = false;
  //   this.copiedSection = [];
  //   this.generations = 0;
  //   for (let i = 0; i < rows; i++) {
  //     for (let j = 0; j < cols; j++) {
  //       grid[i][j] = 0;
  //     }
  //   }
  // }
  // createBoard() {
  //   clearBoard();
  //   for (let i = 0; i < rows; i++) {
  //     for (let j = 0; j < cols; j++) {
  //       grid[i][j] = floor(random(1.5));
  //       if (grid[i][j] == 1) {
  //       }
  //     }
  //   }
  // }

  show() {
    if (started) base++;
    if (base > 360) base = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let x = i * this.sqWidth;
        let y = j * this.sqWidth;
        if (grid[i][j] == 1) {
          rectMode(CORNER);
          colorMode(HSB);
          fill(base + i, 255, 255);
          rect(x, y, sqWidth, 10);
        }
        if (strokeBool) {
          stroke(0);
        } else {
          noStroke();
        }
      }
    }
  }
}

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
