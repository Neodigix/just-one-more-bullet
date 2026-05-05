class Bullet {
  constructor(startPos, initDirection, speed, bounces=4, greenChance=0) {
    this.x = startPos[0];
    this.y = startPos[1];
    this.direction = initDirection;
    this.speed = speed;
    this.isAlive = true;
    this.bounces = bounces;
    this.sleepIterations = 0;
    this.greenChance = greenChance;
    this.bulletType = 'red';
  }
  bounce() {
    this.bounces -= 1;
    if (this.bulletType == 'red') {
      if (getRandomInt(0, 100) < this.greenChance) {
        this.bulletType = 'green';
     }
    }
  }
  updatePosition(deltaTime) {
    const speedVector = normalizeVector(this.direction);
    this.x += speedVector[0] * this.speed * deltaTime;
    this.y += speedVector[1] * this.speed * deltaTime;
    if (this.x < 0) {
      this.direction[0] = Math.abs(this.direction[0]);
      this.bounce();
    }
    else if (this.x > 1000) {
      this.direction[0] = -Math.abs(this.direction[0]);
      this.bounce();
    }
    if (this.y < 0) {
      this.direction[1] = Math.abs(this.direction[1]);
      this.bounce();
    }
    else if (this.y > 1000) {
      this.direction[1] = -Math.abs(this.direction[1]);
      this.bounce();
    }
    if (this.bounces <= 0) {
      this.isAlive = false;
    }
    if (this.sleepIterations > 0) {
      this.sleepIterations -= 1; 
    }
    else {
      this.checkCollision();
    }
  }
  draw(ctx) {
    const pos = convertPosToCanvas(this.x, this.y);
    ctx.fillStyle = colors.bullet;
    if (this.bulletType == 'green') {
      ctx.fillStyle = colors.bulletGreen;
    }
    ctx.beginPath();
    ctx.arc(
      pos[0],  // x
      pos[1],  // y
      5*gameVars.scale,  // radius
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
    if (this.bulletType == 'red') {
      if (this.getPlayerDistance() <= 28) {
        if(gameVars.player.immortalityTime <= 0){
          gameVars.soundPlayer.playClick();
          gameVars.player.hp -= 1;
          this.isAlive = false;
          gameVars.player.immortalityTime = 1000;
        }
      }
    }
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];
      const xDistance2 = (this.x-enemy.x)*(this.x-enemy.x)
      const yDistance2 = (this.y-enemy.y)*(this.y-enemy.y)
      if (Math.sqrt(xDistance2 + yDistance2) < 28) {
        enemy.hitByBullet(this);
      }
    }
  }
}
