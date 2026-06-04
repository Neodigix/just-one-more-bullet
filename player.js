class Player{
  constructor(x, y, hp, size, speed, gun, dropChance=10) {
    this.x = x;
    this.y = y;
    this.hp = hp;
    this.size = size;
    this.speed = speed;
    this.gun = gun;
    this.immortalityTime = 0;
    this.dropChance = dropChance;
  }
  draw(ctx) {
    const playerPos = convertPosToCanvas(this.x, this.y);
    
    // Draw circle
    ctx.beginPath();
    ctx.arc(
      playerPos[0],  // x
      playerPos[1],  // y
      25*gameVars.scale,  // radius
      0,  // starting angle
      2 * Math.PI  // ending angle
    )
    ctx.fillStyle = colors.player;
    if(this.immortalityTime > 0){
      ctx.fillStyle = colors.playerImmortal;
    }
    ctx.lineWidth = 10 * gameVars.scale;
    ctx.fill();
    
    const lookingVect = getLookingDirection();
    const angle = Math.atan2(lookingVect[0], lookingVect[1]);
    
    ctx.save();
    this.gun.draw(ctx);
  }
}
