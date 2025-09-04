// MovingSquare.js

let xrizz = 40;



export default class MovingSquare {
  constructor(x, y, sqsize, img, objtype, p, sectype=0) {
    this.x = x;
    this.y = y;
    this.type = objtype;
    this.sqsize = sqsize;
    this.sectype = sectype;
   // this.img = img;
    this.objectsprite = p.createSprite(x, y, sqsize, sqsize);
    this.objectsprite.addImage(img);
    this.objectsprite.scale = sqsize / img.width;
    if (objtype='tree'){
     p.topsprites.add(this);
    } else {p.backsprites.add(this);}
  }


delete(p) {
    const index = p.movingSquares.indexOf(this);
    this.objectsprite.remove()
    this.objectsprite = null
    if (index !== -1) {
      p.movingSquares.splice(index, 1);
    }
  }


  
  update(dx, dy,p) {

  //  this.x += dx;
  //  this.y += dy;
    this.objectsprite.position.x = this.x-p.globx+p.width / 2;;
    this.objectsprite.position.y = this.y-p.globy+p.height / 2;;
  //  if (this.type == 'food') {console.log(p.dist(this.x,this.y,p.globx,p.globy))
   // }
    if (this.type == 'food') {


    this.x += Math.round(10*Math.random()-5)
    this.y += Math.round(10*Math.random()-5)


    }
    if (this.type == 'food' && p.dist(this.x,this.y,p.globx,p.globy) < 30){
    if (p.hunger < 9) {




      
    p.hunger += 1;

    } else if (p.hunger < 10) {


    p.hunger = 10;
    }  

      
    this.delete(p);


    
    };
    if (this.type == 'creature'){
    if (this.sectype == 'rizzler'){


    let dx = p.globx - this.x;
    let dy = p.globy - this.y;
    let dist = Math.sqrt(dx*dx + dy*dy);
    if (dist > 6) { 
      
    this.x += (dx / dist) * 2.5; 
    this.y += (dy / dist) * 2.5; 
                  
    this.x += (6*Math.random()-3);
    this.y += (6*Math.random()-3);             
                  
                  
                  
                  }    else { 
    
    p.hp -= 1  
    this.x += (200*Math.random()-100);
    this.y += (200*Math.random()-100);     
                            
                            
                            
                            
                }
    }

//other creatures here

      
    }
  };
  

  
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
