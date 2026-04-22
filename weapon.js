class BasicPistol {
  constructor(ammo) {
    this.ammo = null;
  }
  draw(ctx) {
    const playerPos = convertPosToCanvas(player.x, player.y);
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
    const newBullet = new Bullet([
      player.x + dirVector[0]*30,
      player.y + dirVector[1]*30
    ], dirVector, 400)
    bullets.push(newBullet);
  }
}

class ShotGun extends BasicPistol{
  constructor(ammo) {
    this.ammo = ammo;
  }
  draw(ctx) {
    const playerPos = convertPosToCanvas(player.x, player.y);
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
    if(this.ammo > 0){
      ammo -= 1;
      const newBullet = new Bullet([
        player.x + dirVector[0]*30,
        player.y + dirVector[1]*30
      ], dirVector, 400)
      bullets.push(newBullet);
    }
  }
}