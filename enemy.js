class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.isAlive = true;
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
      console.log('eaten!');
      this.isAlive = false;
    }
  }
}
