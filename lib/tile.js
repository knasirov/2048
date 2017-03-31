class Tile {
  constructor(x, y, value) {
    this.colors = {
      2: "#FCF4D9", 4: "orange", 8: "red", 16: "red", 32: "red", 64: "red",
      128: "red", 256: "red", 512: "red", 1024: "red", 2048: "red"
    };
    // this.node = $("<div", {'class': 'tile', })
    this.node = document.createElement('div');
    this.node.className = "tile";
    this.node.innerHTML = value;
    this.value = value;
    this.node.style.backgroundColor = this.colors[this.value];
    document.getElementById('board').appendChild(this.node);
    this.canMerge = true;
    this.setPos(x, y);
  }

  setPos(x, y) {
    this.node.style.top = `${x}px`;
    this.node.style.left = `${y}px`;
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

  removeNode() {
    $(this.node).remove();
  }
}

module.exports = Tile;
