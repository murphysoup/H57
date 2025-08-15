// sketch.js

let player;
let movingSquares = [];
let speed = 2;
let numSquares = 1000;
let textures = [];
let texturesmap;

let skibidi = 40


import tickUpdate from './tickUpdate.js';
import MovingSquare from './MovingSquare.js';


 

const sketch = (p) => {

let player;
let movingSquares = [];
let walls = [];
let inventorybutton;

p.preload = () => {
  p.texturesmap = p.loadImage('https://res.cloudinary.com/dkjgmeufk/image/upload/v1754468817/download_33_1_usl3ii.jpg');
};

p.addbox = (g,x1,y1,x2,y2) => {
 g[Math.floor(x1/128)][Math.floor(y1/128)].push([x1,y1,x2,y2])
 
}
  
p.buildlevel = (lvl,sx,sy) => {
  movingSquares = [];
  walls = [];
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

  movingSquares.push(new MovingSquare(-2000-spawnx, -2000-spawny, 4000, p.texturesmap));
   
  walls.push([2,3])
  
  for (let i = 0; i < numSquares; i++) {
    let x = p.random(-2000-spawnx, 2000-spawny);
    let y = p.random(-2000-spawnx, 2000-spawny);
    let sqsize = 20;
    let tex = p.texturesmap;
    movingSquares.push(new MovingSquare(x, y, sqsize, tex));
  }
}
}

 
p.OpenInventory() = () => {
if (p.inventoryopen) {p.inventoryopen = false} else {p.inventoryopen = true}
};

 
p.setup = () => {
  p.createCanvas(p.windowWidth, p.windowHeight);
  p.globx = p.width / 2;
  p.globy = p.height / 2;
  p.player = {
    x: p.width / 2,
    y: p.height / 2,
    sqsize: 32,
  };
  inventorybutton = createButton('Open Inventory');
  inventorybutton.position(150, 200);
  myButton.mousePressed(OpenInventory());
  p.textSize(32);
  p.fill(0); 
  p.buildlevel(1,0,0)  


  };



p.draw = () => {
  p.background(240);

  let dx2 = 0;
  let dy2 = 0;
  let dx = 0;
  let dy = 0;
  if (p.keyIsDown(87)) dy += speed;
  if (p.keyIsDown(83)) dy -= speed;
  if (p.keyIsDown(65)) dx += speed;
  if (p.keyIsDown(68)) dx -= speed;
  let cells = [];
  let boxes = [];
  let globxold = p.globx;
  let globyold = p.globy;
  p.globx -= dx;
  p.globy -= dy;
  let startX = Math.floor((p.globx +1)/ 128);
  let startY = Math.floor((p.globy +1)/ 128);
  let endX = Math.floor((p.globx + 32-1) / 128);
  let endY = Math.floor((p.globy + 32-1) / 128);
  
  for (let xc = startX; xc <= endX; xc++) {
  for (let yc = startY; yc <= endY; yc++) {
      cells.push([xc, yc]);
    }
  };

  //console.log(collisionGrid);
 // for (let cell of cells) { 
  //  boxes.push(collisionGrid[cell[0]][cell[1]])
  //};
  //console.log(boxes);
  let collisiondetected = 0;
  for (let cell of cells) { 
 // if (p.globx+dx < box[2] &&
  //      p.globx+dx + 32 > box[0] &&
   //     p.globy+dy < box[3] &&
     //   p.globy+dy + 32 > box[1]) {
   // console.log(cell[0]+'fatty'+cell[1]);

 //  if (walls.includes([cell[0],cell[1]])) {
  if (walls.some(wall => wall[0] === cell[0] && wall[1] === cell[1])) {
  collisiondetected = 1
  console.log("freaky");
  dx = 0
  dy = 0
  p.globx = globxold;
  p.globy = globyold;
  }
  };
  console.log(dx2);


  tickUpdate(movingSquares, dx, dy, p);

//  for (let sq of movingSquares) {
  //  sq.display(p);
 // };
  drawSprites();
  p.text("coords: " + p.globx + "," + p.globy, 50, 100);

  p.fill(255, 50, 50);
  p.noStroke();
  p.rectMode(p.CENTER);
  p.rect(p.player.x, p.player.y, p.player.sqsize, p.player.sqsize);
  rect(x, y, width, height);
} 

};


setTimeout(() => {
  new p5(sketch);
}, 300);
