function drawUI(ctx) {
  ctx.fillStyle = colors.uiBackground;
  ctx.fillRect(
    uiOffsetX,
    offsetY,
    200 * scale,
    1000 * scale,
  );
  
  ctx.font = (40*scale)+ 'px Arial';
  ctx.fillStyle = colors.uiWaveText;
  ctx.fillText('Wave: '+gameVars.wave, uiOffsetX+(5*scale), offsetY + (50 * scale));
  ctx.fillStyle = colors.uiHp;
  ctx.fillText('HP: ', uiOffsetX+(5*scale), offsetY + (100 * scale));
  for (let i = 0; i < player.hp; i++){
    ctx.fillRect(
      uiOffsetX + (10*scale) + (i*50*scale),
      offsetY + (150*scale),
      40 * scale,
      40 * scale,
    );
  }
}
