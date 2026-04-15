const deathButton = new MenuButton(
  200, 500, 500, 100,
  'Menu',
  function () {
    transferDelay = 20;
    gameState = 'menu';
  }
);

function drawDeath(ctx) {
  ctx.clearRect(0, 0,gameCanvas.width,gameCanvas.height);
  ctx.fillStyle = 'black';
  const topLeft = convertPosToCanvas(-200, 0);
  ctx.fillRect(topLeft[0], topLeft[1], convertDimToCanvas(1200), convertDimToCanvas(1000));
  
  ctx.font = (40*scale)+ 'px Arial';
  ctx.fillStyle = 'yellow';
  ctx.fillText(
    'You are dead!',
    uiOffsetX + (100*scale),
    offsetY + (200*scale)
  );
  ctx.fillText(
    'Waves survived: ' + (wave-1),
    uiOffsetX + (100*scale),
    offsetY + (200*scale) + (40*scale)
  );
  
  deathButton.draw(ctx);
}