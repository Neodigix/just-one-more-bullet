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
      player.x-this.x,
      player.y-this.y,
    ];
    const speedVector = normalizeVector(direction);
    this.x += speedVector[0] * this.speed * deltaTime;
    this.y += speedVector[1] * this.speed * deltaTime;
    this.checkCollision();
  }
  draw(ctx) {
    const pos = convertPosToCanvas(this.x, this.y);
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(
      pos[0],  // x
      pos[1],  // y
      25*scale,  // radius
      0,  // starting angle
      2 * Math.PI  // ending angle
    )
    ctx.fill();
  }
  isDead() {
    return !this.isAlive;
  }
  getPlayerDistance() {
    const xDistance2 = (this.x-player.x)*(this.x-player.x)
    const yDistance2 = (this.y-player.y)*(this.y-player.y)
    return Math.sqrt(xDistance2 + yDistance2);
  }
  checkCollision() {
    if (this.getPlayerDistance() <= 48) {
      player.hp -= 1;
      this.isAlive = false;
    }
  }
  hitByBullet(bullet) {
    this.isAlive = false;
    bullet.isAlive = false;
  }
}

class SolidEnemy extends Enemy{
  constructor(x, y, speed) {
    super(x, y, speed)
    this.danger = 2;
  }
  draw(ctx) {
    const pos = convertPosToCanvas(this.x, this.y);
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(
      pos[0],  // x
      pos[1],  // y
      25*scale,  // radius
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
  }
}