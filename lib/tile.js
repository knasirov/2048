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

  move(direction, multiplier) {
    switch (direction) {
      case "right":
        this.moveHorizontal(multiplier);
        break;
      case "left":
        this.moveHorizontal(-multiplier);
        break;
      case "down":
        this.moveVertical(multiplier);
        break;
      case "up":
        this.moveVertical(-multiplier);
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
        this.node.style.left = `${this.node.offsetLeft + 4*multiplier}px`;
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
        this.node.style.top = `${this.node.offsetTop + 4*multiplier}px`;
      }
    }, 1);
  }
}

module.exports = Tile;
