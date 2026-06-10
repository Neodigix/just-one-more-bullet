function drawUI(ctx) {
  ctx.fillStyle = colors.uiBackground;
  ctx.fillRect(
    gameVars.uiOffsetX,
    gameVars.offsetY,
    200 * gameVars.scale,
    1000 * gameVars.scale,
  );
  
  // TODO: show only taken by upgrades
  ctx.font = (40*gameVars.scale)+ 'px Arial';
  ctx.textAlign = 'left';
  ctx.fillStyle = colors.uiHp;
  ctx.fillText('HP: ' + gameVars.player.hp, gameVars.uiOffsetX+(5*gameVars.scale), gameVars.offsetY + (50 * gameVars.scale));
  ctx.fillStyle = colors.uiWaveText;
  ctx.fillText('Wave: '+gameVars.wave, gameVars.uiOffsetX+(5*gameVars.scale), gameVars.offsetY + (100 * gameVars.scale));
  ctx.fillText('BPS: '+(1000/gameVars.player.gun.shootDelta), gameVars.uiOffsetX+(5*gameVars.scale), gameVars.offsetY + (150 * gameVars.scale));
  ctx.fillText('GC: '+(gameVars.player.gun.greenChance) + '%', gameVars.uiOffsetX+(5*gameVars.scale), gameVars.offsetY + (200 * gameVars.scale));
  ctx.fillText('BC: '+(gameVars.player.gun.blueChance) + '%', gameVars.uiOffsetX+(5*gameVars.scale), gameVars.offsetY + (250 * gameVars.scale));
  ctx.fillText('DC: '+(gameVars.player.dropChance) + '%', gameVars.uiOffsetX+(5*gameVars.scale), gameVars.offsetY + (300 * gameVars.scale));
}
