function drawPlayer(ctx) {
  const playerPos = convertPosToCanvas(player.x, player.y);
  
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
  if(player.immortalityTime > 0){
    ctx.fillStyle = colors.playerImmortal;
  }
  ctx.lineWidth = 10 * gameVars.scale;
  ctx.fill();
  
  const lookingVect = getLookingDirection();
  const angle = Math.atan2(lookingVect[0], lookingVect[1]);
  
  ctx.save()
  player.gun.draw(ctx)
}

function getLookingDirection() {
  let dirVector = [mouseX-player.x, mouseY-player.y];
  return normalizeVector(dirVector);
}