// tickUpdate.js
let rizz=300;


export default function tickUpdate(movingSquares, dx, dy) {
  for (let sq of movingSquares) {
    sq.update(dx, dy);
  }
}
