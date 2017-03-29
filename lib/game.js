const Tile = require('./tile.js');

class Game {
  constructor() {
    this.restart();
    this.generateRandomTile = this.generateRandomTile.bind(this);
  }

  restart() {
    this.board = [[], [], [], []];
    for (let i = 0; i < 2; i++) {
      this.generateRandomTile();
    }
  }

  generateRandomTile() {
    let emptyTiles = [];
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board.length; col++) {
        if (!this.board[row][col]) { emptyTiles.push([row, col]); }
      }
    }

    if (emptyTiles.length === 0) { return; }
    let newPos = emptyTiles[Math.floor(Math.random()*emptyTiles.length)];
    this.generateTile(newPos[0], newPos[1], (Math.random() < 0.9 ? 2 : 4));
  }

  generateTile(row, col, value) {
    this.board[row][col] = new Tile(row*100, col*100, value);
  }

  getMove(e) {
    switch (e.keyCode) {
      case 38:
        this.move('up');
        break;
      case 40:
        this.move('down');
        break;
      case 37:
        this.move('left');
        break;
      case 39:
        this.move('right');
        break;
    }
  }

  move(direction) {
    switch (direction) {
      case "right":
        for (let col = this.board.length - 1; col >= 0; col--) {
          for (let row = 0; row < this.board.length; row++) {
            if (!!this.board[row][col]) {
              this.moveRight(row, col, this.board[row][col], 0);
            }
          }
        }
        break;
      case "left":
        for (let col = 0; col < this.board.length; col++) {
          for (let row = 0; row < this.board.length; row++) {
            if (!!this.board[row][col]) {
              this.moveLeft(row, col, this.board[row][col], 0);
            }
          }
        }
        break;
      case "down":
        for (let row = this.board.length - 1; row >= 0; row--) {
          for (let col = 0; col < this.board.length; col++) {
            if (!!this.board[row][col]) {
              this.moveDown(row, col, this.board[row][col], 0);
            }
          }
        }
        break;
      case "up":
        for (let row = 0; row < this.board.length; row++) {
          for (let col = 0; col < this.board.length; col++) {
            if (!!this.board[row][col]) {
              this.moveUp(row, col, this.board[row][col], 0);
            }
          }
        }
        break;
    }

    setTimeout(this.generateRandomTile, 50);
  }

  merge(tile, otherTile, row, col) {
    console.log(tile.value);
    console.log(otherTile.value);
    tile.remove();
    otherTile.remove();
    this.generateTile(row, col, tile.value*2);
  }

  moveRight(i, j, tile, count) {
    if (j < this.board.length-1 && !this.board[i][j+1]) {
      this.board[i][j] = undefined;
      this.board[i][j+1] = tile;
      count++;
      this.moveRight(i, j + 1, tile, count);
    } else if (j < this.board.length-1 && tile.value === this.board[i][j+1].value) {
      let tile1 = this.board[i][j];
      let tile2 = this.board[i][j+1];
      this.board[i][j] = undefined;
      count++;
      tile.move('right', count, () => this.merge(tile1, tile2, i, j+1));
    } else {
      tile.move('right', count);
    }
  }

  moveLeft(i, j, tile, count) {
    if (j > 0 && !this.board[i][j-1]) {
      this.board[i][j] = undefined;
      this.board[i][j-1] = tile;
      count++;
      this.moveLeft(i, j - 1, tile, count);
    } else if (j > 0 && tile.value === this.board[i][j-1].value) {
      let tile1 = this.board[i][j];
      let tile2 = this.board[i][j-1];
      this.board[i][j] = undefined;
      count++;
      tile.move('left', count, () => this.merge(tile1, tile2, i, j-1));
    } else {
      tile.move('left', count);
    }
  }

  moveUp(i, j, tile, count) {
    if (i > 0 && !this.board[i-1][j]) {
      this.board[i][j] = undefined;
      this.board[i-1][j] = tile;
      count++;
      this.moveUp(i-1, j, tile, count);
    } else if (i > 0 && tile.value === this.board[i-1][j].value) {
      let tile1 = this.board[i][j];
      let tile2 = this.board[i-1][j];
      this.board[i][j] = undefined;
      count++;
      tile.move('up', count, () => this.merge(tile1, tile2, i-1, j));
    } else {
      tile.move('up', count);
    }
  }

  moveDown(i, j, tile, count) {
    if (i < this.board.length - 1 && !this.board[i+1][j]) {
      this.board[i][j] = undefined;
      this.board[i+1][j] = tile;
      count++;
      this.moveDown(i+1, j, tile, count);
    } else if (i < this.board.length - 1 && tile.value === this.board[i+1][j].value) {
      let tile1 = this.board[i][j];
      let tile2 = this.board[i+1][j];
      this.board[i][j] = undefined;
      count++;
      tile.move('down', count, () => this.merge(tile1, tile2, i+1, j));
    } else {
      tile.move('down', count);
    }
  }
}


module.exports = Game;
