// MovingSquare.js

let xrizz = 40;


export default class MovingSquare {
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

  display(p) {
    if (
      this.x + this.sqsize > 0 &&
      this.x < 1000 &&
      this.y + this.sqsize > 0 &&
      this.y < 1000
    ) {
      p.image(this.img, this.x, this.y, this.sqsize, this.sqsize);
    }
  }
}
