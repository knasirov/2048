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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Tile = __webpack_require__(1);

class Game {
  constructor() {
    this.restart();
    this.generateRandomTile = this.generateRandomTile.bind(this);
    this.restart = this.restart.bind(this);
    this.moveMade = false;
  }

  restart() {
    $(".tile").each(function() { $(this).remove(); });
    $(".game-over").remove();
    this.board = [[], [], [], []];
    for (let i = 0; i < 2; i++) {
      this.generateRandomTile();
    }
    $("#current-score").text(0);
    if (!localStorage.bestScore) {
      localStorage.setItem('bestScore', 0);
    }
    $("#best-score").text(localStorage.bestScore);
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
              this.move("right", row, col, 0);
            }
          }
        }
        break;
      case 37:
        for (let col = 0; col < this.board.length; col++) {
          for (let row = 0; row < this.board.length; row++) {
            if (!!this.board[row][col]) {
              this.move("left", row, col, 0);
            }
          }
        }
        break;
      case 40:
        for (let row = this.board.length - 1; row >= 0; row--) {
          for (let col = 0; col < this.board.length; col++) {
            if (!!this.board[row][col]) {
              this.move("down", row, col, 0);
            }
          }
        }
        break;
      case 38:
        for (let row = 0; row < this.board.length; row++) {
          for (let col = 0; col < this.board.length; col++) {
            if (!!this.board[row][col]) {
              this.move("up", row, col, 0);
            }
          }
        }
        break;
    }

    if (this.moveMade) {
      setTimeout(() => {
        this.generateRandomTile();
        this.moveMade = false;
        if (this.checkGameOver()) { this.gameOver(); }
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

  addToScore(value) {
    let newCurrentScore = parseInt($("#current-score").text()) + value;
    $("#current-score").text(newCurrentScore);
    if (parseInt(localStorage.bestScore) < newCurrentScore) {
      localStorage.setItem('bestScore', newCurrentScore);
      $("#best-score").text(newCurrentScore);
    }

    $("#current-score").append(`<span class='new-score'>+${value}</span>`);
    $(".new-score").animate(
      {opacity: 0, top: '-50px'},
      1000,
      'easeOutCirc',
      () => { $(".new-score").remove();
    });
  }

  inBounds(row, col) {
    return ((row >= 0) && (row < this.board.length) && (col >= 0) && (col < this.board.length));
  }

  move(direction, row, col, count) {
    // let count = 0; recursive call, not sure if this would work
    let tile = this.board[row][col];
    let nextRow = row;
    let nextCol = col;
    switch (direction) {
      case "right":
        nextCol = col + 1;
        break;
      case "left":
        nextCol = col - 1;
        break;
      case "up":
        nextRow = row - 1;
        break;
      case "down":
        nextRow = row + 1;
        break;
    }

    if ( this.inBounds(nextRow, nextCol) && !this.board[nextRow][nextCol]) {
      this.board[nextRow][nextCol] = tile;
      this.board[row][col] = undefined;
      count++;
      this.move(direction, nextRow, nextCol, count);
    } else if (this.inBounds(nextRow, nextCol) && this.tilesCanMerge(tile, this.board[nextRow][nextCol])) {
      let tile2 = this.board[nextRow][nextCol];
      tile.canMerge = false;
      tile2.canMerge = false;
      this.board[row][col] = undefined;
      count++;
      this.moveMade = true;
      tile.move(direction, count, () => this.merge(tile, tile2, nextRow, nextCol));
    } else if (count > 0) {
      this.moveMade = true;
      tile.move(direction, count);
    }
  }

  checkGameOver() {
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

  gameOver() {
    $('<div/>', {
      class: 'game-over',
      text: 'Game over!'
    }).hide().appendTo('#board').fadeIn(1000);
  }
}


module.exports = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Tile {
  constructor(x, y, value) {
    this.colors = {
      2: "#FCF4D9", 4: "orange", 8: "red", 16: "red", 32: "red", 64: "red",
      128: "red", 256: "red", 512: "red", 1024: "red", 2048: "red"
    };

    this.value = value;
    this.node = $(`<div class='tile'>${value}</div>`)[0];
    $(this.node).appendTo("#board");
    $(this.node).css('background-color', `${this.colors[this.value]}`);

    this.canMerge = true;
    $(this.node).css({ top: x, left: y});
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
        $(this.node).css({left: `${$(this.node).position().left + 4*multiplier}px`});
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
        $(this.node).css({top: `${$(this.node).position().top + 4*multiplier}px`});
      }
    }, 1);
  }

  removeNode() {
    $(this.node).remove();
  }
}

module.exports = Tile;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < 16; i++) {
    $("#board").append('<div class="empty-tile"></div>');
  }
  const game = new Game();
  $('button').click(game.restart);
  window.addEventListener("keyup", e => game.slide(e.keyCode));
});


/***/ })
/******/ ]);