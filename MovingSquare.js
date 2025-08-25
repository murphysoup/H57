// MovingSquare.js

let xrizz = 40;



export default class MovingSquare {
  constructor(x, y, sqsize, img, objtype, p) {
    this.x = x;
    this.y = y;
    this.type = objtype;
    this.sqsize = sqsize;
   // this.img = img;
    this.objectsprite = p.createSprite(x, y, sqsize, sqsize);
    this.objectsprite.addImage(img);
    this.objectsprite.scale = sqsize / img.width;
  }


delete() {
    const index = p.movingSquares.indexOf(this);
    if (index !== -1) {
      p.movingSquares.splice(index, 1);
    }
  }


  
  update(dx, dy,p) {

    this.x += dx;
    this.y += dy;
    this.objectsprite.position.x = this.x;
    this.objectsprite.position.y = this.y;
    if (this.type = 'food' && dist(this.x,this.y,p.globx,p.globy)){
    p.hunger += 1
    this.delete()
    }
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
