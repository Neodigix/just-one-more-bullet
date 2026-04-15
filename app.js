const version = '0.0.1'
const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');

// menu, game, death
let gameState = 'menu';
let transferDelay = 20;
let wave = 0;

// ResizegameCanvas to fill screen
let offsetX = 0;
let uiOffsetX;
let offsetY = 0;
let scale = 1;
function resizeCanvas() {
   gameCanvas.width = window.innerWidth;
   gameCanvas.height = window.innerHeight;
   if (gameCanvas.width > (gameCanvas.height*(1200/1000))) {
     scale = gameCanvas.height / 1000;
     const menuSize = 200 * scale;
     offsetY = 0;
     offsetX = ((gameCanvas.width - (1200 * scale))/2)+menuSize;
     uiOffsetX = offsetX-menuSize;
   }
   else {
     scale = gameCanvas.width / 1200;
     const menuSize = 200 * scale;
     offsetX = menuSize;
     offsetY = (gameCanvas.height - (1000 * scale))/2;
     uiOffsetX = offsetX-menuSize;
   }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

gameCanvas.addEventListener('click', function(event) {
  const rect = gameCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const pos = convertPosFromCanvas(x, y);
  if (gameState == 'game') {
    let dirVector = [pos[0]-player.x, pos[1]-player.y];
    dirVector = normalizeVector(dirVector);
    // TODO safe add
    const newBullet = new Bullet([
      player.x + dirVector[0]*30,
      player.y + dirVector[1]*30
    ], dirVector, 400)
     bullets.push(newBullet);
  }
  else if (gameState == 'menu') {
    for (let i = 0; i < menuButtons.length; i++){
      const button = menuButtons[i];
      if (button.isHovered() && button.onClickFunction !== null) {
        button.onClickFunction();
      }
    }
  }
  else if (gameState == 'death') {
    if (deathButton.isHovered()) {
      deathButton.onClickFunction();
    }
  }
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
  hp: 3,
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
  if (gameState == 'game') {
    const deltaTime = (timestamp - lastUpdate) / 1000;
    if (transferDelay > 0) {
      transferDelay -= deltaTime;
    }
    else {
      lastUpdate = timestamp;
    
      update(deltaTime);
      
      draw();
    
      enemyTime -= deltaTime;
      if (enemyTime < 0) {
        wave += 1;
        const enemiesCount = wave;
        for (let i = 0; i < enemiesCount; i++){
          let enemyX = Math.random() * 1000;
          let enemyY = Math.random() * 1000;
          while (getDistance(enemyX, enemyY, player.x, player.y) < 150) {
            enemyX = Math.random() * 1000;
            enemyY = Math.random() * 1000;
          }
          enemies.push(
            new Enemy(
              enemyX,
              enemyY,
              40
            )
          )
          enemyTime = 5;
        }
      }
      drawUI(ctx);
    }
  }
  else if (gameState == 'menu') {
    const deltaTime = (timestamp - lastUpdate) / 1000;
    if (transferDelay > 0) {
      transferDelay -= deltaTime;
    }
    else {
      lastUpdate = timestamp;
      drawMenu(ctx);
    }
  }
  else if (gameState == 'death') {
    const deltaTime = (timestamp - lastUpdate) / 1000;
    if (transferDelay > 0) {
      transferDelay -= deltaTime;
    }
    else {
      lastUpdate = timestamp;
      drawDeath(ctx);
    }
  }
  if (gameState == 'game' && player.hp <= 0) {
    gameState = 'death';
  }
  requestAnimationFrame(gameLoop);
}

function resetGame() {
  player.x = 500;
  player.y = 500;
  player.hp = 3;
  bullets = [];
  enemies = [];
  wave = 0;
}

requestAnimationFrame(gameLoop);
