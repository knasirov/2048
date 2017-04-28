const Game = require('./game.js');

const game = new Game();

const handleKeydown = e => {
  window.removeEventListener("keydown", handleKeydown);
  game.slide(e.keyCode);
  setTimeout( () => window.addEventListener("keydown", handleKeydown), 100);
};

document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < 16; i++) {
    $("#board").append('<div class="empty-tile"></div>');
  }
  $('button').click(game.restart);
  window.addEventListener("keydown", handleKeydown);
});
