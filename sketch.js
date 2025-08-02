// sketch.js

let player;
let movingSquares = [];
let speed = 2;
let numSquares = 1000;
let textures = [];
let texturesmap;

let skibidi = 49


import tickUpdate from './tickUpdate.js';
import MovingSquare from './MovingSquare.js';


function preload() {
  texturesmap = loadImage('assets/maps/map1.jpg');
}

function setup() {
  createCanvas(800, 600);
  player = {
    x: width / 2,
    y: height / 2,
    sqsize: 32,
  };

  movingSquares.push(new MovingSquare(-2000, -2000, 2000, texturesmap));

  for (let i = 0; i < numSquares; i++) {
    let x = random(-2000, 2000);
    let y = random(-2000, 2000);
    let sqsize = 20;
    let tex = texturesmap;
    movingSquares.push(new MovingSquare(x, y, sqsize, tex));
  }
}

function draw() {
  background(240);

  let dx = 0;
  let dy = 0;
  if (keyIsDown(87)) dy += speed;
  if (keyIsDown(83)) dy -= speed;
  if (keyIsDown(65)) dx += speed;
  if (keyIsDown(68)) dx -= speed;

  tickUpdate(movingSquares, dx, dy);

  for (let sq of movingSquares) {
    sq.display();
  }

  fill(255, 50, 50);
  noStroke();
  rectMode(CENTER);
  rect(player.x, player.y, player.sqsize, player.sqsize);
}
