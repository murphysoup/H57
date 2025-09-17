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
p.wallboxes = [];

 
    p.loaded = [];
    p.mapjson = [];
    p.mapset = [];


p.preload = () => {

 

 
    let li = []

    let mjson = ['https://res.cloudinary.com/dkjgmeufk/raw/upload/v1757924661/f1_wjph4e.json'];
    let mset = ['https://res.cloudinary.com/dkjgmeufk/image/upload/v1758104854/nivgrass_equf8e.png'];
 


   for (let i = 0; i < mjson.length; i++) {
    p.mapjson[i] = p.loadJSON(mjson[i]);

   }
 
   for (let i = 0; i < mset.length; i++) {
    p.mapset[i] = p.loadImage(mset[i]);

   }
 
   for (let i = 0; i < li.length; i++) {
    file = p.loadImage(li[i]);
    p.loaded[file.split(".")[0]]=file

    
   }

 
//  p.tree1 = p.loadImage('https://res.cloudinary.com/dkjgmeufk/image/upload/v1756021194/nivtree1_jrfdun.png');


 p.tree1 = p.loadImage('assets/images/nivtree.png');

 
  p.map1s = p.loadImage('https://res.cloudinary.com/dkjgmeufk/image/upload/v1754468817/firstmap_zuxfed.png');
  p.texturesmap = p.loadImage('https://res.cloudinary.com/dkjgmeufk/image/upload/v1754468817/download_33_1_usl3ii.jpg');
  p.trizzler = p.loadImage('https://res.cloudinary.com/dkjgmeufk/image/upload/v1756879191/raw_kcoxql.webp');
};



 
p.drawMap = (mapData,tilesetImg,gfx) =>  {
  let tileWidth = mapData.tilewidth;
  let tileHeight = mapData.tileheight;
  let columns = mapData.width;

   console.log(gfx)
 
  let layer = mapData.layers[0];
  for (let i = 0; i < layer.data.length; i++) {
    let tileIndex = layer.data[i] - 1;
    if (tileIndex < 0) continue;

    let sx = (tileIndex % (tilesetImg.width / tileWidth)) * tileWidth;
    let sy = Math.floor(tileIndex / (tilesetImg.width / tileWidth)) * tileHeight;

    let dx = (i % columns) * tileWidth;
    let dy = Math.floor(i / columns) * tileHeight;

    gfx.image(tilesetImg, dx, dy, tileWidth, tileHeight, sx, sy, tileWidth, tileHeight);
  }
}



p.buildthing = (wallsahh, obahh, otype, size, hitboxd, textures, coords) => {
let hitx = hitboxd[0]
let hity = hitboxd[1]
let xoff = hitboxd[2]
let yoff = hitboxd[3]
coords.forEach((value) => {


obahh.push(new MovingSquare(value[0], value[1], size, textures, otype, p));

p.addbox(wallsahh,value[0]-hitx+xoff,value[1]-hity+yoff,value[0]+hitx+xoff,value[1]+hity+yoff)



 
});











}
 
p.addbox = (g,x1,y1,x2,y2) => {
 g.push([[x1,y1],[x2,y2],Math.sqrt(((x1-x2)**2)+((y1-y2)**2))+100])
 
}

p.buildlevel = (lvl,sx,sy) => {


  p.mapData = p.mapjson[lvl-1]
  p.tileImg = p.mapset[lvl-1]
  p.movingSquares = [];
  p.wallboxes = [];
  let spawnx = sx+p.width / 2;
  let spawny = sy+p.height / 2;
  p.inventoryopen = false
  p.globx = spawnx;
  p.globy = spawny;



  p.map = p.createGraphics(p.mapjson[lvl-1].width * p.mapjson[lvl-1].tilewidth, p.mapjson[lvl-1].height * p.mapjson[lvl-1].tileheight);
  p.drawMap(p.mapData,p.tileImg,p.map)
  //p.mapg = new p.Group().add(p.map)

 
  if (lvl == 1) {
//  p.maxgridoffset = -2000;
 // collisionGrid = Array.from({ length: 10 }, () =>
  //Array.from({ length: 10 }, () => [])
  //);
 // p.addbox(p.wallboxes,100,100,200,300)
//  console.log(p.wallboxes[0])
  
//  let map=new MovingSquare(0, 0, 4096, 0, 'map', p);


   
  p.addbox(p.wallboxes,-2048,2048,2058,2058)
  p.addbox(p.wallboxes,2048,-2048,2058,2058)
  p.addbox(p.wallboxes,-2058,-2058,2048,-2048)
  p.addbox(p.wallboxes,-2058,-2058,-2048,2048)
//  p.movingSquares.push(new MovingSquare(100, 100, 100, p.texturesmap, 'wall', p));

  
///  for (let i = 0; i < 20; i++) {
//    let x = p.random(-1000-spawnx, 1000-spawny);
//    let y = p.random(-1000-spawnx, 1000-spawny);
//    let sqsize = 100;
//    let tex = p.texturesmap;
//    p.movingSquares.push(new MovingSquare(x+50, y+50, sqsize, tex, 'map', p));
//    p.addbox(p.wallboxes,x,y,x+100,y+100)
//  }

  p.buildthing(p.wallboxes, p.movingSquares, 'tree', 300, [150, 150, 40, 150], p.tree1,[[400,-600],[607,1503],[138,999],[2030,-130],[-623,900],[-500,-1039],[-1000,1000],[1000,-1000],[1048,-1948],[-442,1390]]);

  
  }
}

 
p.OpenInventory = () => {
if (p.inventoryopen) {p.inventoryopen = false} else {p.inventoryopen = true}
};

 
p.setup = () => {
  p.topsprites = new p.Group();
  p.backsprites = new p.Group();
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
  if (p.keyIsDown(16)) {speed = 10; p.hunger -= 0.01}
  let dx2 = 0;
  let dy2 = 0;
  let dx = 0;
  let dy = 0;
  if (p.keyIsDown(87)) dy += speed;
  if (p.keyIsDown(83)) dy -= speed;
  if (p.keyIsDown(65)) dx += speed;
  if (p.keyIsDown(68)) dx -= speed;



  p.hunger = Number(p.hunger.toFixed(5))


 if (p.hunger > 0 || p.hp > 0) {
  if (p.hunger < 0) {p.hunger = 0.1; p.hp -= 0.1 }
  if (p.hunger < 0) {p.hp = 0.1; p.hunger -= 0.1 }

};
  if (p.keyIsDown(84) && p.keyIsDown(16)) {p.m5t = p.millis()-30000};

  if (p.m5t < p.millis()-30000) {
  p.m5t = p.millis()
  if (p.hp < 9) {
  p.hp += 1
  } else if (p.hp < 10) {p.hp = 10};
  p.hunger -= 0.5;
  p.movingSquares.push(new MovingSquare(p.random(-1000,1000), p.random(-1000,1000), 20, p.texturesmap, 'food', p));
  if (Math.random() < 10) {
     p.movingSquares.push(new MovingSquare(p.random(-2000,2000), p.random(-2000,2000), 60, p.trizzler, 'creature', p, 'rizzler'));
  }
  }

  p.wallboxes.forEach((wall) => { 
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

 

 // console.log(p.wallboxes)
  tickUpdate(p.movingSquares, dx, dy, p);

//  for (let sq of movingSquares) {
  //  sq.display(p);
 // };



 
//  p.map.position.x = 0-p.globx+p.width / 2;;
 // p.map.position.y = 0-p.globy+p.height / 2;;
  p.image(p.map,0-p.globx+p.width / 2,0-p.globy+p.height / 2)
  p.drawSprites(p.backsprites);
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

  p.drawSprites(p.topsprites);


 
} 

};


setTimeout(() => {
  new p5(sketch);
}, 300);
