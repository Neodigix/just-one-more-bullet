class Enemy {
  constructor(x, y, speed, id=null) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.isAlive = true;
    this.danger = 1;
    if (id === null) {
      this.id = (gameVars.nextId++);
    }
    else {
      this.id = id;
    }
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
    if (getRandomInt(0, 100) < gameVars.player.dropChance) {
      const newItem = new Item([this.x, this.y]);
      gameVars.newItems.push(newItem);
    }
  }
  hitByBullet(bullet) {
    this.isAlive = false;
    this.dropItem()
    // Reflect bullet
    const n = normalizeVector([bullet.x - this.x, bullet.y - this.y]);
    const dot = bullet.direction[0] * n[0] + bullet.direction[1] * n[1];
    bullet.direction[0] = bullet.direction[0] - 2 * dot * n[0];
    bullet.direction[1] = bullet.direction[1] - 2 * dot * n[1];
    bullet.direction = normalizeVector(bullet.direction);
    bullet.sleepIterations = 1;
    bullet.bounce();
  }
  isInside(x, y) {
    const xDistance2 = (x-this.x)*(x-this.x)
    const yDistance2 = (y-this.y)*(y-this.y)
    if (Math.sqrt(xDistance2 + yDistance2) < 28) {
      return true;
    }
    return false;
  }
}

class SolidEnemy extends Enemy{
  constructor(x, y, speed) {
    super(x, y, speed)
    this.danger = 2;
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
    ctx.beginPath();
    ctx.strokeStyle = colors.solidEnemy;
    ctx.arc(
      pos[0],  // x
      pos[1],  // y
      20*gameVars.scale,  // radius
      0,  // starting angle
      2 * Math.PI  // ending angle
    )
    ctx.stroke();
  }
  
  hitByBullet(bullet) {
    this.isAlive = false;
    const newEnemy = new Enemy(this.x, this.y, 40, this.id);
    enemiesToAdd.push(newEnemy);
    
    // Reflect bullet
    const n = normalizeVector([bullet.x - this.x, bullet.y - this.y]);
    const dot = bullet.direction[0] * n[0] + bullet.direction[1] * n[1];
    bullet.direction[0] = bullet.direction[0] - 2 * dot * n[0];
    bullet.direction[1] = bullet.direction[1] - 2 * dot * n[1];
    bullet.direction = normalizeVector(bullet.direction);
    bullet.sleepIterations = 1;
    bullet.bounce();
  }
}


class SquareEnemy extends Enemy{
  constructor(x, y, speed) {
    super(x, y, speed)
    this.danger = 2;
  }
  draw(ctx) {
    const pos = convertPosToCanvas(this.x, this.y);
    ctx.fillStyle = colors.enemy;
    ctx.beginPath();
    ctx.rect(
      pos[0] - (25*gameVars.scale),  // x
      pos[1] - (25*gameVars.scale),  // y
      45*gameVars.scale,
      45*gameVars.scale
    )
    ctx.fill();
  }
  
  isInside(x, y) {
    const left = this.x - 25;
    const right = this.x + 25;
    const top = this.y - 25;
    const bottom = this.y + 25;
    if (x < left)
      return false;
    if (x > right)
      return false;
    if (y < top)
      return false;
    if (y > bottom)
      return false;
    return true;
  }
  
  hitByBullet(bullet) {
    this.isAlive = false;
    this.dropItem()
    
    // Reflect bullet
    const prevBulletX = bullet.previousX;
    const prevBulletY = bullet.previousY;
    const left = this.x - 20;
    const right = this.x + 20;
    const top = this.y - 20;
    const bottom = this.y + 20;
    if (prevBulletX < left || prevBulletX > right)
      bullet.direction[0] = -bullet.direction[0]
    if (prevBulletY < top || prevBulletY > bottom)
      bullet.direction[1] = -bullet.direction[1]
    bullet.sleepIterations = 3;
    bullet.lastHitEnemyId = this.id;
    bullet.bounce();
  }
}

class SolidSquareEnemy extends SquareEnemy{
  constructor(x, y, speed) {
    super(x, y, speed)
    this.danger = 5;
  }
  draw(ctx) {
    const pos = convertPosToCanvas(this.x, this.y);
    ctx.fillStyle = colors.enemy;
    ctx.beginPath();
    ctx.rect(
      pos[0] - (25*gameVars.scale),  // x
      pos[1] - (25*gameVars.scale),  // y
      45*gameVars.scale,
      45*gameVars.scale
    )
    ctx.fill();
    ctx.beginPath();
    ctx.strokeStyle = colors.solidEnemy;
    ctx.rect(
      pos[0] - (20*gameVars.scale),  // x
      pos[1] - (20*gameVars.scale),  // y
      35*gameVars.scale,
      35*gameVars.scale
    )
    ctx.stroke();
  }
  
  hitByBullet(bullet) {
    this.isAlive = false;
    const newEnemy = new SquareEnemy(this.x, this.y, 40, this.id);
    enemiesToAdd.push(newEnemy);
    
    // Reflect bullet
    const prevBulletX = bullet.previousX;
    const prevBulletY = bullet.previousY;
    const left = this.x - 20;
    const right = this.x + 20;
    const top = this.y - 20;
    const bottom = this.y + 20;
    if (prevBulletX < left || prevBulletX > right)
      bullet.direction[0] = -bullet.direction[0]
    if (prevBulletY < top || prevBulletY > bottom)
      bullet.direction[1] = -bullet.direction[1]
    bullet.sleepIterations = 3;
    bullet.lastHitEnemyId = this.id;
    bullet.bounce();
  }
}