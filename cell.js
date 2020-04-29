class Cell {
  constructor() {
    this.started = true;
    this.generations = 0;
  }
  nextGeneration() {
    this.generations++;
      let nextGen = matrix(rows, cols);
      for (let i = 0; i < rows - 1; i++) {
        for (let j = 0; j < cols - 1; j++) {
          this.liveCount = 0;
          //left/right
          if (j < cols && grid[i][j + 1] == 1) this.liveCount++;
          if (j > 0 && grid[i][j - 1] == 1) this.liveCount++;
          // top/bottom
          if (i < rows && grid[i + 1][j] == 1) this.liveCount++;
          if (i > 0 && grid[i - 1][j] == 1) this.liveCount++;
          //diagonal top-left/top-right
          if (i > 0 && j > 0 && grid[i - 1][j - 1] == 1) this.liveCount++;
          if (i > 0 && j < cols && grid[i - 1][j + 1] == 1) this.liveCount++;
          //diagonal bottom-left/bottom-right
          if (i < rows && j > 0 && grid[i + 1][j - 1] == 1) this.liveCount++;
          if (i < rows && j < cols && grid[i + 1][j + 1] == 1) this.liveCount++;
          if (grid[i][j] == 1) {
            if (this.liveCount < 2 || this.liveCount > 3) {
              nextGen[i][j] = 0;
            } else {
              nextGen[i][j] = grid[i][j];
            }
          } else if (grid[i][j] == 0) {
            if (this.liveCount == 3) {
              nextGen[i][j] = 1;
            } else {
              nextGen[i][j] = grid[i][j];
            }
          }
        }
      }
      grid = nextGen;
  }
}
