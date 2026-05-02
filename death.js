const deathButton = new MenuButton(
  600-250, 500, 500, 100,
  'Menu',
  function () {
    gameVars.transferDelay = 20;
    gameVars.gameState = 'menu';
  }
);

function drawDeath(ctx) {
  ctx.clearRect(0, 0,gameCanvas.width,gameCanvas.height);
  ctx.fillStyle = colors.deathBackground;
  const topLeft = convertPosToCanvas(-200, 0);
  ctx.fillRect(topLeft[0], topLeft[1], convertDimToCanvas(1200), convertDimToCanvas(1000));
  
  ctx.textAlign = 'center';
  ctx.font = (40*gameVars.scale)+ 'px Arial';
  ctx.fillStyle = colors.deathText;
  ctx.fillText(
    'You are dead!',
    gameVars.uiOffsetX + (600*gameVars.scale),
    gameVars.offsetY + (200*gameVars.scale)
  );
  ctx.fillText(
    'Waves survived: ' + (gameVars.wave-1),
    gameVars.uiOffsetX + (600*gameVars.scale),
    gameVars.offsetY + (200*gameVars.scale) + (40*gameVars.scale)
  );
  
  deathButton.draw(ctx);
}