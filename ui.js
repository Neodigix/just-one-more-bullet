function drawUI(ctx) {
  ctx.fillStyle = colors.uiBackground;
  ctx.fillRect(
    gameVars.uiOffsetX,
    gameVars.offsetY,
    200 * gameVars.scale,
    1000 * gameVars.scale,
  );
  
  ctx.fillStyle = colors.uiHp;
  for (let i = 0; i < player.hp; i++){
    ctx.beginPath();
    ctx.arc(
      gameVars.uiOffsetX + 10*gameVars.scale + (i*50*gameVars.scale),
      gameVars.offsetY + (50*gameVars.scale),
      10*gameVars.scale,
      1 * Math.PI,
      2 * Math.PI
    )
    ctx.arc(
      gameVars.uiOffsetX + 10*gameVars.scale + (i*50*gameVars.scale)+(20*gameVars.scale),
      gameVars.offsetY + (50*gameVars.scale),
      10*gameVars.scale,
      1 * Math.PI,
      2 * Math.PI
    )
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(
      gameVars.uiOffsetX + (i*50*gameVars.scale),
      gameVars.offsetY + (50*gameVars.scale) - gameVars.scale,
    )
    ctx.lineTo(
      gameVars.uiOffsetX + (i*50*gameVars.scale) + (40*gameVars.scale),
      gameVars.offsetY + (50*gameVars.scale) - gameVars.scale,
    )
    ctx.lineTo(
      gameVars.uiOffsetX + (i*50*gameVars.scale) + (20*gameVars.scale),
      gameVars.offsetY + (50*gameVars.scale) + (20*gameVars.scale) - gameVars.scale,
    )
    ctx.closePath();
    ctx.fill();
  }
  
  ctx.font = (40*gameVars.scale)+ 'px Arial';
  ctx.fillStyle = colors.uiWaveText;
  ctx.fillText('Wave: '+gameVars.wave, gameVars.uiOffsetX+(5*gameVars.scale), gameVars.offsetY + (150 * gameVars.scale));
}
