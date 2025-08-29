// sketch.js

let player;
let numSquares = 1000;
let textures = [];
let texturesmap;

let skibidi = 40


import tickUpdate from './tickUpdate.js';
import MovingSquare from './MovingSquare.js';


 

const sketch = (p) => {

let player;
let walls = [];
let inventorybutton;
let wallboxes = []


p.preload = () => {
  p.tree1 = p.loadImage('https://res.cloudinary.com/dkjgmeufk/image/upload/v1756021194/nivtree1_jrfdun.png')
  p.map1s = p.loadImage('https://res.cloudinary.com/dkjgmeufk/image/upload/v1754468817/firstmap_zuxfed.png')
  p.texturesmap = p.loadImage('https://res.cloudinary.com/dkjgmeufk/image/upload/v1754468817/download_33_1_usl3ii.jpg');
};

p.addbox = (g,x1,y1,x2,y2) => {
 g.push([[x1,y1],[x2,y2],Math.sqrt(((x1-x2)**2)+((y1-y2)**2))+100])
 
}

p.buildlevel = (lvl,sx,sy) => {
  p.movingSquares = [];
  wallboxes = [];
  let spawnx = sx+p.width / 2;
  let spawny = sy+p.height / 2;
  p.inventoryopen = false
  p.globx = spawnx;
  p.globy = spawny;
  
  if (lvl == 1) {
//  p.maxgridoffset = -2000;
 // collisionGrid = Array.from({ length: 10 }, () =>
  //Array.from({ length: 10 }, () => [])
  //);
 // p.addbox(wallboxes,100,100,200,300)
//  console.log(wallboxes[0])
  
  p.movingSquares.push(new MovingSquare(0, 0, 4096, p.map1s, 'map', p));

  p.addbox(wallboxes,-2048,2048,2058,2058)
  p.addbox(wallboxes,2048,-2048,2058,2058)
  p.addbox(wallboxes,-2058,-2058,2048,-2048)
  p.addbox(wallboxes,-2058,-2058,-2048,2048)
//  p.movingSquares.push(new MovingSquare(100, 100, 100, p.texturesmap, 'wall', p));

  
  for (let i = 0; i < 20; i++) {
    let x = p.random(-1000-spawnx, 1000-spawny);
    let y = p.random(-1000-spawnx, 1000-spawny);
    let sqsize = 100;
    let tex = p.texturesmap;
    p.movingSquares.push(new MovingSquare(x+50, y+50, sqsize, tex, 'map', p));
    p.addbox(wallboxes,x,y,x+100,y+100)
  }
}
}

 
p.OpenInventory = () => {
if (p.inventoryopen) {p.inventoryopen = false} else {p.inventoryopen = true}
};

 
p.setup = () => {
  p.movingSquares = [];
  p.createCanvas(p.windowWidth, p.windowHeight);
  p.m5t = 0
  p.createSprite = p5.prototype.createSprite;
  p.hp = 10
  p.hunger = 10
  p.globx = p.width / 2;
  p.globy = p.height / 2;
  p.player = {
    x: p.width / 2,
    y: p.height / 2,
    sqsize: 32,
  };
  inventorybutton = p.createButton('Open Inventory');
  inventorybutton.position(250, 50);
  inventorybutton.mousePressed(p.OpenInventory());
  p.textSize(32);
  p.fill(0); 
//  p.createSprite = window.createSprite;
  p.buildlevel(1,0,0);  
  };



p.draw = () => {
  p.background(240);
  let speed = 2;
  if (p.keyIsDown(16)) speed = 10;
  let dx2 = 0;
  let dy2 = 0;
  let dx = 0;
  let dy = 0;
  if (p.keyIsDown(87)) dy += speed;
  if (p.keyIsDown(83)) dy -= speed;
  if (p.keyIsDown(65)) dx += speed;
  if (p.keyIsDown(68)) dx -= speed;

  if (p.m5t < p.millis()-30000) {
  p.m5t = p.millis()
  if (p.hp < 10) {
  p.hp += 1
  };
  p.hunger -= 1;
  p.movingSquares.push(new MovingSquare(p.random(-1000,1000), p.random(-1000,1000), 20, p.texturesmap, 'food', p));
  if (Math.random() < 0.1) {
     p.movingSquares.push(new MovingSquare(p.random(-2000,2000), p.random(-2000,2000), 20, p.texturesmap, 'creature', p, 'rizzler'));
  }
  }

  wallboxes.forEach((wall) => { 
 // console.log(p.dist(wall[0][0], wall[0][1], p.globx, p.globy))
  if (p.dist(wall[0][0], wall[0][1], p.globx, p.globy) < wall[2]) { 
 //  console.log('soup1')

   
  //  if (p.globx+dx+1 < wall[1][0] &&
  //      p.globx+dx + 31 > wall[0][0] &&
      //  p.globy+dy+1 < wall[1][1] &&
   //     p.globy+dy + 31 > wall[0][1]) {
  //   console.log('soup');


     
  // collisiondetected = 1;
//  dx = 0;
 // dy = 0;
//  p.globx = globxold;
//  p.globy = globyold;


          if (p.globx -dx + 1 < wall[1][0] &&
            p.globx -dx + 31 > wall[0][0] &&
            p.globy + 1 < wall[1][1] &&
            p.globy + 31 > wall[0][1]) {
            dx = 0 // stop horizontal movement
         //   p.globxn=p.globx
        }

        // --- Handle Y movement ---
        if (p.globx + 1 < wall[1][0] &&
            p.globx + 31 > wall[0][0] &&
            p.globy -dy + 1 < wall[1][1] &&
            p.globy -dy + 31 > wall[0][1]) {
            dy = 0 // stop vertical movement
        //    p.globyn=p.globy

        }

     
  }
  });


  p.globx -= dx;
  p.globy -= dy;

 


  tickUpdate(p.movingSquares, dx, dy, p);

//  for (let sq of movingSquares) {
  //  sq.display(p);
 // };
  p.drawSprites();
  let g = p.text("coords: " + p.globx + "," + p.globy, 50, 200);
  g.textSize(20)
  let hp = p.text("HP: " + p.hp, 50, 50);
  hp.textSize(20)
  let hunger = p.text("Hunger Level: " + p.hunger, 50, 100);
  hunger.textSize(20)



 
  p.fill(255, 50, 50);
  p.noStroke();
  p.rectMode(p.CENTER);
  p.rect(p.player.x, p.player.y, p.player.sqsize, p.player.sqsize);
} 

};


setTimeout(() => {
  new p5(sketch);
}, 300);
