class Tile {
  constructor(x, y, value) {
    this.colors = {
      2: "#FCF4D9", 4: "yellow", 8: "orange", 16: "red", 32: "red", 64: "red",
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
