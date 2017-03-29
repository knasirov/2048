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
    
  }
}

module.exports = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Tile {
  constructor(x, y, value) {
    this.tile = document.createElement('div');
    this.tile.className = "tile";
    document.getElementById('board').appendChild(this.tile);
    this.tile.innerHTML = value;
    this.setPos(x, y);
  }

  setPos(x, y) {
    this.tile.style.left = `${x}px`;
    this.tile.style.top = `${y}px`;
  }

  move(direction) {
    switch (direction) {
      case "right":
        this.moveHorizontal(1);
        break;
      case "left":
        this.moveHorizontal(-1);
        break;
      case "down":
        this.moveVertical(1);
        break;
      case "up":
        this.moveVertical(-1);
        break;
    }
  }

  moveHorizontal(multiplier) {
    let i = 0;
    let id = setInterval(() => {
      if (i >= 25) {
        clearInterval(id);
      } else {
        i++;
        this.tile.style.left = `${this.tile.offsetLeft - 5 + 4*multiplier}px`;
      }
    }, 1);
  }

  moveVertical(multiplier) {
    let i = 0;
    let id = setInterval(() => {
      if (i >= 25) {
        clearInterval(id);
      } else {
        i++;
        this.tile.style.top = `${this.tile.offsetTop - 5 + 4*multiplier}px`;
      }
    }, 1);
  }
}

module.exports = Tile;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  window.addEventListener("keydown", e => game.getMove(e));
});


/***/ })
/******/ ]);