class Bullet {
  constructor(startPos, initDirection, speed, travelDistance=3000) {
    this.x = startPos[0];
    this.y = startPos[1];
    this.direction = initDirection;
    this.speed = speed;
    this.distanceLeft = travelDistance;
    this.isAlive = true;
  }
  updatePosition(deltaTime) {
    const speedVector = normalizeVector(this.direction);
    this.x += speedVector[0] * this.speed * deltaTime;
    this.y += speedVector[1] * this.speed * deltaTime;
    if (this.x < 0) {
      this.x += 1000;
    }
    else if (this.x > 1000) {
      this.x -= 1000;
    }
    if (this.y < 0) {
      this.y += 1000;
    }
    else if (this.y > 1000) {
      this.y -= 1000;
    }
    this.distanceLeft -= this.speed * deltaTime;
    if (this.distanceLeft <= 0) {
      this.isAlive = false;
    }
    this.checkCollision();
  }
  draw(ctx) {
    const pos = convertPosToCanvas(this.x, this.y);
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(
      pos[0],  // x
      pos[1],  // y
      5*scale,  // radius
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
    if (this.getPlayerDistance() <= 28) {
      player.hp -= 1;
      this.isAlive = false;
    }
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];
      const xDistance2 = (this.x-enemy.x)*(this.x-enemy.x)
      const yDistance2 = (this.y-enemy.y)*(this.y-enemy.y)
      if (Math.sqrt(xDistance2 + yDistance2) < 28) {
        enemy.isAlive = false;
        this.isAlive = false;
      }
    }
  }
}
