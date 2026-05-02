class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.isAlive = true;
    this.danger = 1;
  }
  updatePosition(deltaTime) {
    const direction = [
      gameVars.player.x-this.x,
      gameVars.player.y-this.y,
    ];
    const speedVector = normalizeVector(direction);
    this.x += speedVector[0] * this.speed * deltaTime;
    this.y += speedVector[1] * this.speed * deltaTime;
    this.checkCollision();
  }
  draw(ctx) {
    const pos = convertPosToCanvas(this.x, this.y);
    ctx.fillStyle = colors.enemy;
    ctx.beginPath();
    ctx.arc(
      pos[0],  // x
      pos[1],  // y
      25*gameVars.scale,  // radius
      0,  // starting angle
      2 * Math.PI  // ending angle
    )
    ctx.fill();
  }
  isDead() {
    return !this.isAlive;
  }
  getPlayerDistance() {
    const xDistance2 = (this.x-gameVars.player.x)*(this.x-gameVars.player.x)
    const yDistance2 = (this.y-gameVars.player.y)*(this.y-gameVars.player.y)
    return Math.sqrt(xDistance2 + yDistance2);
  }
  checkCollision() {
    if (this.getPlayerDistance() <= 48) {
      if(gameVars.player.immortalityTime <= 0){
        gameVars.soundPlayer.playClick();
        gameVars.player.hp -= 1;
        this.isAlive = false;
        gameVars.player.immortalityTime = 1000;
      }
    }
  }
  dropItem() {
    if (getRandomInt(0, 20) == 0) {
      const newItem = new Item([this.x, this.y]);
      gameVars.newItems.push(newItem);
    }
  }
  hitByBullet(bullet) {
    this.isAlive = false;
    bullet.isAlive = false;
    this.dropItem()
  }
}

class SolidEnemy extends Enemy{
  constructor(x, y, speed) {
    super(x, y, speed)
    this.danger = 2;
  }
  draw(ctx) {
    const pos = convertPosToCanvas(this.x, this.y);
    ctx.fillStyle = colors.solidEnemy;
    ctx.beginPath();
    ctx.arc(
      pos[0],  // x
      pos[1],  // y
      25*gameVars.scale,  // radius
      0,  // starting angle
      2 * Math.PI  // ending angle
    )
    ctx.fill();
  }
  
  hitByBullet(bullet) {
    this.isAlive = false;
    const newEnemy = new Enemy(this.x, this.y, 40);
    enemiesToAdd.push(newEnemy);
    
    // Reflect bullet
    const n = normalizeVector([bullet.x - this.x, bullet.y - this.y]);
    const dot = bullet.direction[0] * n[0] + bullet.direction[1] * n[1];
    bullet.direction[0] = bullet.direction[0] - 2 * dot * n[0];
    bullet.direction[1] = bullet.direction[1] - 2 * dot * n[1];
    bullet.direction = normalizeVector(bullet.direction);
    bullet.sleepIterations = 1;
    bullet.bounces -= 1;
  }
}
