// MovingSquare.js

class MovingSquare {
  constructor(x, y, sqsize, img) {
    this.x = x;
    this.y = y;
    this.sqsize = sqsize;
    this.img = img;
  }

  update(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  display() {
    if (
      this.x + this.sqsize > 0 &&
      this.x < width &&
      this.y + this.sqsize > 0 &&
      this.y < height
    ) {
      image(this.img, this.x, this.y, this.sqsize, this.sqsize);
    }
  }
}
