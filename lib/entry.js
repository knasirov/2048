const Game = require('./game.js');

document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < 16; i++) {
    $("#board").append('<div class="empty-tile"></div>');
  }
  const game = new Game();
  $('button').click(game.restart);
  window.addEventListener("keyup", e => game.slide(e.keyCode));
});
