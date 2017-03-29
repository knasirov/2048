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
