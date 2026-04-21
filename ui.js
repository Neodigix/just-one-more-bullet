function drawUI(ctx) {
  ctx.fillStyle = colors.uiBackground;
  ctx.fillRect(
    uiOffsetX,
    offsetY,
    200 * scale,
    1000 * scale,
  );
  
  ctx.fillStyle = colors.uiHp;
  for (let i = 0; i < player.hp; i++){
    ctx.beginPath();
    ctx.arc(
      uiOffsetX + 10*scale + (i*50*scale),
      offsetY + (50*scale),
      10*scale,
      1 * Math.PI,
      2 * Math.PI
    )
    ctx.arc(
      uiOffsetX + 10*scale + (i*50*scale)+(20*scale),
      offsetY + (50*scale),
      10*scale,
      1 * Math.PI,
      2 * Math.PI
    )
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(
      uiOffsetX + (i*50*scale),
      offsetY + (50*scale) - scale,
    )
    ctx.lineTo(
      uiOffsetX + (i*50*scale) + (40*scale),
      offsetY + (50*scale) - scale,
    )
    ctx.lineTo(
      uiOffsetX + (i*50*scale) + (20*scale),
      offsetY + (50*scale) + (20*scale) - scale,
    )
    ctx.closePath();
    ctx.fill();
  }
  
  ctx.font = (40*scale)+ 'px Arial';
  ctx.fillStyle = colors.uiWaveText;
  ctx.fillText('Wave: '+gameVars.wave, uiOffsetX+(5*scale), offsetY + (150 * scale));
}
