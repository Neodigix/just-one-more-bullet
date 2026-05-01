function convertPosFromCanvas(x, y) {
  const xNoOffset = x - gameVars.offsetX;
  const yNoOffset = y - gameVars.offsetY;
  return [xNoOffset / gameVars.scale, yNoOffset / gameVars.scale];
}

function convertPosToCanvas(x, y) {
  const noOffsetX = x * gameVars.scale;
  const noOffsetY = y * gameVars.scale;
  return [noOffsetX + gameVars.offsetX, noOffsetY + gameVars.offsetY];
}

function convertDimToCanvas(dimension) {
  return dimension * gameVars.scale;
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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getLookingDirection() {
  let dirVector = [mouseX-gameVars.player.x, mouseY-gameVars.player.y];
  return normalizeVector(dirVector);
}