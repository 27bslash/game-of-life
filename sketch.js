let cols,
  rows,
  sqWidth = 10,
  grid = [],
  generations = 0,
  gen;

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
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  generations++;
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

  let nextGen = matrix(rows, cols);
  for (let i = 0; i < rows - 1; i++) {
    for (let j = 0; j < cols - 1; j++) {
      let liveCount = 0;
      if (grid[i][j] == 1) {
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
        if (liveCount < 2 || liveCount > 3) {
          nextGen[i][j] = 0;
        } else {
          nextGen[i][j] = grid[i][j];
        }
      } else {
        // left/right
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
