/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Tile = __webpack_require__(2);

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  window.addEventListener("keydown", e => game.getMove(e));
});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Tile {
  constructor(x, y, value) {
    this.node = document.createElement('div');
    this.node.className = "tile";
    document.getElementById('board').appendChild(this.node);
    this.node.innerHTML = value;
    this.value = value;
    this.setPos(x, y);
  }

  setPos(x, y) {
    if (x) { this.node.style.top = `${x}px`; }
    if (y) { this.node.style.left = `${y}px`; }
  }

  move(direction, multiplier, callback) {
    switch (direction) {
      case "right":
        this.moveHorizontal(multiplier, callback);
        break;
      case "left":
        this.moveHorizontal(-multiplier, callback);
        break;
      case "down":
        this.moveVertical(multiplier, callback);
        break;
      case "up":
        this.moveVertical(-multiplier, callback);
        break;
    }
  }

  moveHorizontal(multiplier, callback) {
    let i = 0;
    let id = setInterval(() => {
      if (i >= 25) {
        clearInterval(id);
        if (callback) { callback(); }
      } else {
        i++;
        this.node.style.left = `${this.node.offsetLeft + 4*multiplier}px`;
      }
    }, 1);
  }

  moveVertical(multiplier, callback) {
    let i = 0;
    let id = setInterval(() => {
      if (i >= 25) {
        clearInterval(id);
        if (callback) { callback(); }
      } else {
        i++;
        this.node.style.top = `${this.node.offsetTop + 4*multiplier}px`;
      }
    }, 1);
  }

  remove() {
    document.getElementById('board').removeChild(this.node);
  }
}

module.exports = Tile;


/***/ })
/******/ ]);