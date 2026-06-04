class Pistol {
  constructor(bps=1, greenChance=2) {
    this.bps = bps;
    this.shootDelta = 1000 / bps;
    this.lastShoot = 0;
    this.greenChance = greenChance;
  }
  setBps(bps) {
    this.bps = bps;
    this.shootDelta = 1000 / bps;
  }
  draw(ctx) {
    const playerPos = convertPosToCanvas(gameVars.player.x, gameVars.player.y);
    ctx.beginPath();
    const lookingVect = getLookingDirection();
    const angle = Math.atan2(lookingVect[0], lookingVect[1]);
    ctx.translate(playerPos[0], playerPos[1]);
    ctx.rotate(-angle);
    ctx.fillStyle = colors.gun;
    ctx.fillRect(-5*gameVars.scale, 20*gameVars.scale, 10 * gameVars.scale, 20 * gameVars.scale);
    ctx.restore();
  }
  shoot(dirVector){
    // TODO safe add
    if (gameVars.timestamp - this.shootDelta >= this.lastShoot) {
      this.lastShoot = gameVars.timestamp;
      const newBullet = new Bullet([
        gameVars.player.x + dirVector[0] * 30,
        gameVars.player.y + dirVector[1] * 30
      ], dirVector, 400, 4, this.greenChance);
      bullets.push(newBullet);
    }
  }
}
