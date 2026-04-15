function drawUI(ctx) {
  ctx.fillStyle = 'grey'; 
  ctx.fillRect(
    uiOffsetX,
    offsetY,
    200 * scale,
    1000 * scale,
  );
  
  ctx.font = (40*scale)+ 'px Arial';
  ctx.fillStyle = 'yellow';
  ctx.fillText('Wave: '+wave, uiOffsetX+(5*scale), offsetY + (50 * scale));
  ctx.fillStyle = 'red';
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
