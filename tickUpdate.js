// tickUpdate.js

export default function tickUpdate(movingSquares, dx, dy) {
  for (let sq of movingSquares) {
    sq.update(dx, dy);
  }
}
