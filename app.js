const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');

// ResizegameCanvas to fill screen
let offsetX = 0;
let offsetY = 0;
let scale = 1;
function resizeCanvas() {
   gameCanvas.width = window.innerWidth;
   gameCanvas.height = window.innerHeight;
   let minDim = gameCanvas.width;
   if (minDim > gameCanvas.height) {
     minDim = gameCanvas.height;
     scale = minDim / 1000;
     offsetY = 0;
     offsetX = (gameCanvas.width - (1000 * scale))/2;
   }
   else {
     scale = minDim / 1000;
     offsetX = 0;
     offsetY = (gameCanvas.height - (1000 * scale))/2;
   }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

gameCanvas.addEventListener('click', function(event) {
  const rect = gameCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const pos = convertPosFromCanvas(x, y);

  let dirVector = [pos[0]-player.x, pos[1]-player.y];
  dirVector = normalizeVector(dirVector);
  // TODO safe add
  const newBullet = new Bullet([
    player.x + dirVector[0]*30,
    player.y + dirVector[1]*30
  ], dirVector, 400)
   bullets.push(newBullet);
});

let mouseX = 0;
let mouseY = 0;
gameCanvas.addEventListener("mousemove", (e) => {
  const rect = gameCanvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const mousePos = convertPosFromCanvas(x, y);
  mouseX = mousePos[0];
  mouseY = mousePos[1];
});

let lastUpdate = 0;

const player = {
  x: 500,
  y: 500,
  size: 80,
  speed: 200
};

let bullets = [];
let enemies = [];
let shoot = false;

// Input handling
const keys = {};
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);
function getDirectionVector() {
  let speedVector = [0, 0];
  if (keys['ArrowUp'] || keys['w'] || keys['W']) speedVector[1] -= 1;
  if (keys['ArrowDown'] || keys['s'] || keys['S']) speedVector[1] += 1;
  if (keys['ArrowLeft'] || keys['a'] || keys['A']) speedVector[0] -= 1;
  if (keys['ArrowRight'] || keys['d'] || keys['D']) speedVector[0] += 1;
  return speedVector;
}

function update(deltaTime) {
  let speedVector = getDirectionVector();
  
  if (speedVector[0] != 0 || speedVector[1] != 0) {
    speedVector = normalizeVector(speedVector);
    player.x += speedVector[0] * player.speed * deltaTime;
    player.y += speedVector[1] * player.speed * deltaTime;
  }
  
  let newBullets = [];
  for (let i = 0; i < bullets.length; i++){
    const bullet = bullets[i];
    bullet.updatePosition(deltaTime);
    if (!bullet.isDead()) {
      newBullets.push(bullet);
    }
  }
  bullets = newBullets;
  
  let newEnemies = [];
  for (let i = 0; i < enemies.length; i++){
    const enemy = enemies[i];
    enemy.updatePosition(deltaTime);
    if (!enemy.isDead()) {
      newEnemies.push(enemy);
    }
  }
  enemies = newEnemies;
}

function draw() {
  ctx.clearRect(0, 0,gameCanvas.width,gameCanvas.height);
  ctx.fillStyle = 'black';
  const topLeft = convertPosToCanvas(0, 0);
  ctx.fillRect(topLeft[0], topLeft[1], convertDimToCanvas(1000), convertDimToCanvas(1000));
  
  drawPlayer(ctx);

  for (let i = 0; i < bullets.length; i++){
    bullets[i].draw(ctx);
  }
  for (let i = 0; i < enemies.length; i++){
    enemies[i].draw(ctx);
  }
}

let enemyTime = 3;

function gameLoop(timestamp) {
  const deltaTime = (timestamp - lastUpdate) / 1000;
  lastUpdate = timestamp;

  update(deltaTime);
  
  draw();

  enemyTime -= deltaTime;
  if (enemyTime < 0) {
    const enemiesCount = Math.floor(Math.random() * 10);
    for (let i = 0; i < enemiesCount; i++){
      enemies.push(
        new Enemy(
          Math.random()*1000,
          Math.random()*1000,
          40
        )
      )
      enemyTime = 5;
    }
  }
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
