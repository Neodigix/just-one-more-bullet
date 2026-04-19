function convertPosFromCanvas(x, y) {
  const xNoOffset = x - offsetX;
  const yNoOffset = y - offsetY;
  return [xNoOffset / scale, yNoOffset / scale];
}

function convertPosToCanvas(x, y) {
  const noOffsetX = x * scale;
  const noOffsetY = y * scale;
  return [noOffsetX + offsetX, noOffsetY + offsetY];
}

function convertDimToCanvas(dimension) {
  return dimension * scale;
}

function normalizeVector(vector) {
  const length =  Math.sqrt((vector[0] * vector[0]) + (vector[1] * vector[1]));
  return [vector[0] / length, vector[1] / length];
}

function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)));
}

function getRandomElementFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}