// MovingSquare.js
import PF from "https://cdn.jsdelivr.net/npm/pathfinding@0.4.18/esm/PathFinding.js";
let xrizz = 40;

//import PF from "pathfinding";


export default class MovingSquare {
  constructor(x, y, sqsize, img, objtype, p, sectype=0) {
    this.x = x;
    this.y = y;
    this.type = objtype;
    this.sqsize = sqsize;
    this.sectype = sectype;
    this.finder = new PF.AStarFinder();
   // this.img = img;
    this.objectsprite = p.createSprite(x, y, sqsize, sqsize);
    if (img !== 0) {this.objectsprite.addImage(img)};
    
    this.objectsprite.scale = sqsize / img.width;
    if (objtype==='tree'){
     p.topsprites.add(this.objectsprite);
    } else {p.backsprites.add(this.objectsprite);}
  }


delete(p) {
    const index = p.movingSquares.indexOf(this);
    this.objectsprite.remove()
    this.objectsprite = null
    if (index !== -1) {
      p.movingSquares.splice(index, 1);
    }
  }




  
pathFind(sx,sy,tx,ty,gridData) { 

 const grid = new PF.Grid(gridData);

  // Find path from enemy to player
  const path = this.finder.findPath(
    tx,
    ty,
    tx,
    ty,
    grid
  );
  return path
}

  
 F(node,p) {


p.wallboxes.forEach((wall) => { 
 // console.log(p.dist(wall[0][0], wall[0][1], p.globx, p.globy))
    let rx = node.x
    let ry = node.y
    
    if (p.dist(wall[0][0], wall[0][1], rx, ry) < wall[2]) { 
  
   if (!(rx < wall[1][0] &&
            rx > wall[0][0] &&
            ry < wall[1][1] &&
            ry > wall[0][1])) {
    return False
     
   }


  }})
return True
  
}

neighborsf(node, nodes,p) {
  // Return the 3 closest nodes to the given node
  return nodes
    .filter(n => n !== node) // exclude itself
    .sort((a, b) => {
      const distA = Math.sqrt((a.x - node.x) ** 2 + (a.y - node.y) ** 2);
      const distB = Math.sqrt((b.x - node.x) ** 2 + (b.y - node.y) ** 2);
      return distA - distB;
    })
    .slice(0, 3) // take only the 3 closest
    .filter(n => this.F(n,p)); 



  
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


    
      


    if (typeof this.tpath === "undefined" || this.tpath === []) {
    this.tpath = this.pathFind(this.x,this.y,p.globx,p.globy,p.pgrid)

    }

 //   console.log(this.tpath)

    let dx = this.tpath[0][0]*64 - this.x;
    let dy = this.tpath[0][1]*64 - this.y;
    let dist = Math.sqrt(dx*dx + dy*dy);
   // console.log(dist)
      
    if (dist > 6) { 

    this.x += (dx / dist) * 2.5; 
    this.y += (dy / dist) * 2.5; 

      
  //  this.x += (2*Math.random()-1);
 //   this.y += (2*Math.random()-1);             
                  
                  
                  
                  }    else { 
        
          this.x += (200*Math.random()-100);
    this.y += (200*Math.random()-100);
    this.tpath.shift()
      console.log(this.tpath)
                            
                            
                            
                            
                }
    


      
    let dx2 = p.globx - this.x;
    let dy2 = p.globy - this.y;
    let dist2 = Math.sqrt(dx2*dx2 + dy2*dy2);
      console.log(dist2)
    if (dist2 < 6) { 
         p.hp -= 1  
    this.x += (200*Math.random()-100);
    this.y += (200*Math.random()-100);  
    }

//other creatures here

      
    }
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
