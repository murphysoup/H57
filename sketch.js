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
p.preload = () => {
  texturesmap = p.loadImage('assets/maps/map1.jpg');
}
  
p.buildlevel = (lvl,sx,sy) => {
  movingSqares = []
  spawnx = sx+p.width / 2
  spawny = sy+p.height / 2
  p.globx = spawnx
  p.globy = spawny
  
  if (lvl = 1) {
  movingSquares.push(new MovingSquare(-2000-spawnx, -2000-spawny, 4000, texturesmap));

  for (let i = 0; i < numSquares; i++) {
    let x = p.random(2000-spawnx, 2000-spawny);
    let y = p.random(-2000-spawnx, 2000-spawny);
    let sqsize = 20;
    let tex = texturesmap;
    movingSquares.push(new MovingSquare(x, y, sqsize, tex));
  }
}

p.setup = () => {

  p.createCanvas(p.windowWidth, p.windowHeight);
  p.globx = p.width / 2;
  p.globy = p.height / 2;
  player = {
    x: p.width / 2,
    y: p.height / 2,
    sqsize: 32,
  };
  p.textSize(32);
  p.fill(0);  
  p.buildlevel(1,-2000,-2000)  


  }
}



p.draw = () => {
  p.background(240);

  let dx = 0;
  let dy = 0;
  if (p.keyIsDown(87)) dy += speed;
  if (p.keyIsDown(83)) dy -= speed;
  if (p.keyIsDown(65)) dx += speed;
  if (p.keyIsDown(68)) dx -= speed;
  p.globx -= dx;
  p.globy -= dy;
  tickUpdate(movingSquares, dx, dy, p);

  for (let sq of movingSquares) {
    sq.display(p);
  }
  p.text("coords: " + p.globx + "," + p.globy, 50, 100);

  p.fill(255, 50, 50);
  p.noStroke();
  p.rectMode(p.CENTER);
  p.rect(player.x, player.y, player.sqsize, player.sqsize);
}

}

new p5(sketch);
