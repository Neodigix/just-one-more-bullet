const version = '0.0.3'
const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');

// ResizegameCanvas to fill screen
function resizeCanvas() {
   gameCanvas.width = window.innerWidth;
   gameCanvas.height = window.innerHeight;
   if (gameCanvas.width > (gameCanvas.height*(1200/1000))) {
     gameVars.scale = gameCanvas.height / 1000;
     const menuSize = 200 * gameVars.scale;
     gameVars.offsetY = 0;
     gameVars.offsetX = ((gameCanvas.width - (1200 * gameVars.scale))/2)+menuSize;
     gameVars.uiOffsetX = gameVars.offsetX-menuSize;
   }
   else {
     gameVars.scale = gameCanvas.width / 1200;
     const menuSize = 200 * gameVars.scale;
     gameVars.offsetX = menuSize;
     gameVars.offsetY = (gameCanvas.height - (1000 * gameVars.scale))/2;
     gameVars.uiOffsetX = gameVars.offsetX-menuSize;
   }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

gameCanvas.addEventListener('click', function(event) {
  const rect = gameCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const pos = convertPosFromCanvas(x, y);
  if (gameVars.gameState == 'game') {
    let dirVector = [pos[0]-gameVars.player.x, pos[1]-gameVars.player.y];
    dirVector = normalizeVector(dirVector);
    // TODO safe add
    gameVars.player.guns[gameVars.player.currentGun].shoot(dirVector);
  }
  else if (gameVars.gameState == 'menu') {
    for (let i = 0; i < menuButtons.length; i++){
      const button = menuButtons[i];
      gameVars.soundPlayer.playClick();
      if (button.isHovered() && button.onClickFunction !== null) {
        button.onClickFunction();
      }
    }
  }
  else if (gameVars.gameState == 'upgrade') {
    for (let i = 0; i < gameVars.view.buttons.length; i++){
      const button = gameVars.view.buttons[i];
      gameVars.soundPlayer.playClick();
      if (button.isHovered() && button.onClickFunction !== null) {
        button.onClickFunction();
      }
    }
  }
  else if (gameVars.gameState == 'death') {
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

let bullets = [];
let enemies = [];
let enemiesToAdd = [];
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
    gameVars.player.x += speedVector[0] * gameVars.player.speed * deltaTime;
    gameVars.player.y += speedVector[1] * gameVars.player.speed * deltaTime;
    if (gameVars.player.x < gameVars.player.size / 2) {
      gameVars.player.x = gameVars.player.size / 2;
    }
    else if (gameVars.player.x > 1000 - (gameVars.player.size / 2)) {
      gameVars.player.x = 1000 - (gameVars.player.size / 2);
    }
    if (gameVars.player.y < gameVars.player.size / 2) {
      gameVars.player.y = gameVars.player.size / 2;
    }
    else if (gameVars.player.y > 1000 - (gameVars.player.size / 2)) {
      gameVars.player.y = 1000 - (gameVars.player.size / 2);
    }
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
  // Add enemies created during current frame
  for (let i = 0; i < enemiesToAdd.length; i++) {
    const enemy = enemiesToAdd[i];
    newEnemies.push(enemy);
  }
  enemiesToAdd = [];
  enemies = newEnemies;
  
  
  for (let i = 0; i < gameVars.items.length; i++) {
    if (gameVars.items[i].checkPickup()) {
      gameVars.items[i].pickUp();
    }
  }
  let items = [];
  for (let i = 0; i < gameVars.items.length; i++) {
    if (!(gameVars.items[i].picked)) {
      items.push(gameVars.items[i]);
    }
  }
  for (let i = 0; i < gameVars.newItems.length; i++) {
    items.push(gameVars.newItems[i]);
  }
  gameVars.items = items;
  gameVars.newItems = [];
}

function draw() {
  ctx.clearRect(0, 0,gameCanvas.width,gameCanvas.height);
  ctx.fillStyle = colors.gameBackground;
  const topLeft = convertPosToCanvas(0, 0);
  ctx.fillRect(topLeft[0], topLeft[1], convertDimToCanvas(1000), convertDimToCanvas(1000));
  
  gameVars.player.draw(ctx);

  for (let i = 0; i < gameVars.items.length; i++){
    gameVars.items[i].draw(ctx);
  }
  for (let i = 0; i < bullets.length; i++){
    bullets[i].draw(ctx);
  }
  for (let i = 0; i < enemies.length; i++){
    enemies[i].draw(ctx);
  }
  ctx.beginPath();
  ctx.strokeStyle = colors.gameBorder;
  ctx.lineWidth = 3 * gameVars.scale;
  ctx.rect(topLeft[0], topLeft[1], convertDimToCanvas(1000), convertDimToCanvas(1000));
  ctx.stroke();
}

function gameLoop(timestamp) {
  if (gameVars.gameState == 'game') {
    const deltaTime = (timestamp - lastUpdate) / 1000;
    if (gameVars.transferDelay > 0) {
      lastUpdate = timestamp;
      gameVars.transferDelay -= deltaTime*1000;
      draw();
      drawUI(ctx);
    }
    else {
      lastUpdate = timestamp;
    
      update(deltaTime);
      
      draw();
    
      gameVars.enemyTime -= deltaTime;
      if (gameVars.enemyTime < 0) {
        gameVars.wave += 1;
        const enemiesCount = gameVars.wave;
        for (let i = 0; i < enemiesCount; i++){
          generateWave(gameVars.wave);
          gameVars.enemyTime = getNextWaveTime(gameVars.wave);
        }
      }
      drawUI(ctx);
      if(gameVars.player.immortalityTime > 0){
        gameVars.player.immortalityTime -= deltaTime * 1000;
      }
    }
  }
  else if (gameVars.gameState == 'menu') {
    const deltaTime = (timestamp - lastUpdate) / 1000;
    if (gameVars.transferDelay > 0) {
      gameVars.transferDelay -= deltaTime * 1000;
      lastUpdate = timestamp;
      drawMenu(ctx, deltaTime);
    }
    else {
      lastUpdate = timestamp;
      drawMenu(ctx, deltaTime);
    }
  }
  else if (gameVars.gameState == 'death') {
    const deltaTime = (timestamp - lastUpdate) / 1000;
    if (gameVars.transferDelay > 0) {
      gameVars.transferDelay -= deltaTime;
    }
    else {
      lastUpdate = timestamp;
      drawDeath(ctx);
    }
  }
  else if (gameVars.gameState == 'upgrade') {
    const deltaTime = (timestamp - lastUpdate) / 1000;
    if (gameVars.transferDelay > 0) {
      gameVars.transferDelay -= deltaTime;
    }
    else {
      lastUpdate = timestamp;
      gameVars.view.drawView(ctx);
    }
  }
  
  if (gameVars.gameState == 'game' && gameVars.player.hp <= 0) {
    gameVars.gameState = 'death';
  }
  requestAnimationFrame(gameLoop);
}

function resetGame() {
  gameVars.player.x = 500;
  gameVars.player.y = 500;
  gameVars.player.hp = 3;
  bullets = [];
  enemies = [];
  gameVars.wave = 0;
}

requestAnimationFrame(gameLoop);
