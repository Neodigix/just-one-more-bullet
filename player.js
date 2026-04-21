function drawPlayer(ctx) {
  const playerPos = convertPosToCanvas(player.x, player.y);
  
  // Draw circle
  ctx.beginPath();
  ctx.arc(
    playerPos[0],  // x
    playerPos[1],  // y
    25*scale,  // radius
    0,  // starting angle
    2 * Math.PI  // ending angle
  )
  ctx.fillStyle = colors.player;
  ctx.lineWidth = 10 * scale;
  ctx.fill();
  
  const lookingVect = getLookingDirection();
  const angle = Math.atan2(lookingVect[0], lookingVect[1]);
  
  ctx.save()
  // Draw gun
  ctx.translate(playerPos[0], playerPos[1]);
  ctx.rotate(-angle);
  ctx.fillStyle = colors.gun;
  ctx.fillRect(-5*scale, 20*scale, 10 * scale, 20 * scale);
  ctx.restore();
  
  // Draw shield
  // ctx.beginPath();
  // ctx.arc(
  //   playerPos[0],  // x
  //   playerPos[1],  // y
  //   20*scale,  // radius
  //   -angle-(1.0*Math.PI),  // starting angle
  //   -angle+(0.0*Math.PI)  // ending angle
  // )
  // ctx.strokeStyle = 'lightblue';
  // ctx.lineWidth = 10 * scale;
  // ctx.stroke();
}

function getLookingDirection() {
  let dirVector = [mouseX-player.x, mouseY-player.y];
  return normalizeVector(dirVector);
}