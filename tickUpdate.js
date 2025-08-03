// tickUpdate.js
let rizz=300;


export default function tickUpdate(movingSquares, dx, dy, p) {
  for (let sq of movingSquares) {
    sq.update(dx, dy, p);
  }
}
