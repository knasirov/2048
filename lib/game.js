const Tile = require('./tile.js');

class Game {
  constructor() {
    this.restart();
    this.generateRandomTile = this.generateRandomTile.bind(this);
    this.moveMade = false;
    this.restart = this.restart.bind(this);
  }

  restart() {
    $(".tile").each(function() { $(this).remove(); });
    this.board = [[], [], [], []];
    for (let i = 0; i < 2; i++) {
      this.generateRandomTile();
    }
    $("#current-score").html(0);
    $("#best-score").html(localStorage.bestScore || 0);
  }

  addToScore(value) {
    let newCurrentScore = parseInt($("#current-score").html()) + value;
    $("#current-score").html(newCurrentScore);
    console.log(window.localStorage);
    if (parseInt(window.localStorage.bestScore) < newCurrentScore) {
      console.log('add to local');
      window.localStorage.setItem('bestScore', newCurrentScore);
    }

    $("#current-score").append(`<span class='new-score'>+${value}</span>`);
    $(".new-score").animate(
      {opacity: 0, top: '-30px'},
      1000,
      'linear',
      () => { $(".new-score").remove();
    });
  }

  generateRandomTile() {
    let emptyTiles = [];
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board.length; col++) {
        if (!this.board[row][col]) { emptyTiles.push([row, col]); }
      }
    }

    let newPos = emptyTiles[Math.floor(Math.random()*emptyTiles.length)];
    this.generateTile(newPos[0], newPos[1], (Math.random() < 0.9 ? 2 : 4));
  }

  generateTile(row, col, value) {
    this.board[row][col] = new Tile(row*100, col*100, value);
    return this.board[row][col];
  }

  slide(keyCode) {
    switch (keyCode) {
      case 39:
        for (let col = this.board.length - 1; col >= 0; col--) {
          for (let row = 0; row < this.board.length; row++) {
            if (!!this.board[row][col]) {
              this.moveRight(row, col, this.board[row][col], 0);
            }
          }
        }
        break;
      case 37:
        for (let col = 0; col < this.board.length; col++) {
          for (let row = 0; row < this.board.length; row++) {
            if (!!this.board[row][col]) {
              this.moveLeft(row, col, this.board[row][col], 0);
            }
          }
        }
        break;
      case 40:
        for (let row = this.board.length - 1; row >= 0; row--) {
          for (let col = 0; col < this.board.length; col++) {
            if (!!this.board[row][col]) {
              this.moveDown(row, col, this.board[row][col], 0);
            }
          }
        }
        break;
      case 38:
        for (let row = 0; row < this.board.length; row++) {
          for (let col = 0; col < this.board.length; col++) {
            if (!!this.board[row][col]) {
              this.moveUp(row, col, this.board[row][col], 0);
            }
          }
        }
        break;
    }

    if (this.moveMade) {
      if (this.gameOver()) { console.log('game over');}
      setTimeout(() => {
        this.generateRandomTile();
        this.moveMade = false;
      }, 50);
    }
  }

  tilesCanMerge(tile1, tile2) {
    return (
      tile1.value === tile2.value &&
      tile1.canMerge &&
      tile2.canMerge
    );

  }

  merge(tile, otherTile, row, col) {
    tile.removeNode();
    otherTile.removeNode();
    let newTile = this.generateTile(row, col, tile.value*2);
    $(newTile.node).transition({ scale: 1 + Math.log2(newTile.value)/20 }, 200).transition({ scale: 1 }, 200);
    this.addToScore(tile.value*2);
  }

  moveRight(i, j, tile, count) {
    if (j < this.board.length-1 && !this.board[i][j+1]) {
      this.board[i][j] = undefined;
      this.board[i][j+1] = tile;
      count++;
      this.moveRight(i, j + 1, tile, count);
    } else if (j < this.board.length-1 && this.tilesCanMerge(tile, this.board[i][j+1])) {
      let tile1 = this.board[i][j];
      let tile2 = this.board[i][j+1];
      tile1.canMerge = false;
      tile2.canMerge = false;
      this.board[i][j] = undefined;
      count++;
      this.moveMade = true;
      tile.move('right', count, () => this.merge(tile1, tile2, i, j+1));
    } else if (count > 0) {
      this.moveMade = true;
      tile.move('right', count);
    }
  }

  moveLeft(i, j, tile, count) {
    if (j > 0 && !this.board[i][j-1]) {
      this.board[i][j] = undefined;
      this.board[i][j-1] = tile;
      count++;
      this.moveLeft(i, j - 1, tile, count);
    } else if (j > 0 && this.tilesCanMerge(tile, this.board[i][j-1])) {
      let tile1 = this.board[i][j];
      let tile2 = this.board[i][j-1];
      tile1.canMerge = false;
      tile2.canMerge = false;
      this.board[i][j] = undefined;
      count++;
      this.moveMade = true;
      tile.move('left', count, () => this.merge(tile1, tile2, i, j-1));
    } else if (count > 0) {
      this.moveMade = true;
      tile.move('left', count);
    }
  }

  moveUp(i, j, tile, count) {
    if (i > 0 && !this.board[i-1][j]) {
      this.board[i][j] = undefined;
      this.board[i-1][j] = tile;
      count++;
      this.moveUp(i-1, j, tile, count);
    } else if (i > 0 && this.tilesCanMerge(tile, this.board[i-1][j])) {
      let tile1 = this.board[i][j];
      let tile2 = this.board[i-1][j];
      tile1.canMerge = false;
      tile2.canMerge = false;
      this.board[i][j] = undefined;
      count++;
      this.moveMade = true;
      tile.move('up', count, () => this.merge(tile1, tile2, i-1, j));
    } else if (count > 0) {
      this.moveMade = true;
      tile.move('up', count);
    }
  }

  moveDown(i, j, tile, count) {
    if (i < this.board.length - 1 && !this.board[i+1][j]) {
      this.board[i][j] = undefined;
      this.board[i+1][j] = tile;
      count++;
      this.moveDown(i+1, j, tile, count);
    } else if (i < this.board.length - 1 && this.tilesCanMerge(tile, this.board[i+1][j])) {
      let tile1 = this.board[i][j];
      let tile2 = this.board[i+1][j];
      tile1.canMerge = false;
      tile2.canMerge = false;
      this.board[i][j] = undefined;
      count++;
      this.moveMade = true;
      tile.move('down', count, () => this.merge(tile1, tile2, i+1, j));
    } else if (count > 0) {
      this.moveMade = true;
      tile.move('down', count);
    }
  }

  gameOver() {
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board.length; col++) {
        if (
          !this.board[row][col] ||
          (this.board[row][col+1] && this.board[row][col].value === this.board[row][col+1].value) ||
          (this.board[row+1] && this.board[row+1][col] && this.board[row][col].value === this.board[row+1][col].value)
        ) {
          return false;
        }
      }
    }
    return true;
  }
}


module.exports = Game;
