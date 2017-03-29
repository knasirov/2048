const Tile = require('./tile.js');

class Game {
  constructor() {
    this.restart();
  }

  restart() {
    this.board = [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']];
    for (let i = 0; i < 2; i++) {
      this.generateRandomTile();
    }
  }

  generateRandomTile() {
    let emptyTiles = [];
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        if (this.board[i][j] === '') { emptyTiles.push([i, j]); }
      }
    }

    let newPos = emptyTiles[Math.floor(Math.random()*emptyTiles.length)];
    let value = Math.random() < 0.9 ? "2" : "4";
    this.board[newPos[0]][newPos[1]] = new Tile(newPos[0]*100, newPos[1]*100, value);
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
    let tiles = [];
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        if (!!this.board[i][j]) { tiles.push(this.board[i][j]); }
      }
    }

    tiles.forEach( tile => tile.move(direction));
  }

}


module.exports = Game;
