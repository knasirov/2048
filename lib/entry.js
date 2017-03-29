const Game = require('./game.js');

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  window.addEventListener("keydown", e => game.getMove(e));
});
