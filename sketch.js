let player;
let movingSquares = [];
let speed = 2;
let numSquares = 1000;
let textures = [];

function preload() {
  // Load textures here
  textures.push(loadImage('assets/objectimages/p.jpg'));
  textures.push(loadImage('assets/maps/map1.jpg'));
}

function setup() {
  createCanvas(800, 600);
  player = {
    x: width / 2,
    y: height / 2,
    sqsize: 30,
  };

  for (let i = 0; i < numSquares; i++) {
    let x = random(-2000, 2000);
    let y = random(-2000, 2000);
    let sqsize = 20;
    let tex = random(textures);
    movingSquares.push(new MovingSquare(x, y, sqsize, tex));
  }
}

function draw() {
  background(240);

  let dx = 0;
  let dy = 0;
  if (keyIsDown(87)) dy += speed; // W
  if (keyIsDown(83)) dy -= speed; // S
  if (keyIsDown(65)) dx += speed; // A
  if (keyIsDown(68)) dx -= speed; // D

  tickUpdate(movingSquares, dx, dy);

  for (let sq of movingSquares) {
    sq.display();
  }

  fill(255, 50, 50);
  noStroke();
  rectMode(CENTER);
  rect(player.x, player.y, player.sqsize, player.sqsize);
}

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

function tickUpdate(movingSquares, dx, dy) {
  for (let sq of movingSquares) {
    sq.update(dx, dy);
  }
}
