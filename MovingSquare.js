// MovingSquare.js

let xrizz = 40;


export default class MovingSquare {
  constructor(x, y, sqsize, img) {
    this.x = x;
    this.y = y;
    this.sqsize = sqsize;
    this.img = img;
  }

  update(dx, dy,p) {
    p.globx += dx;
    p.globy += dy;
    this.x += dx;
    this.y += dy;
  }

  display(p) {
    if (
      this.x + this.sqsize > 0 &&
      this.x < p.width &&
      this.y + this.sqsize > 0 &&
      this.y < p.height
    ) {
      p.image(this.img, this.x, this.y, this.sqsize, this.sqsize);
    }
  }
}
