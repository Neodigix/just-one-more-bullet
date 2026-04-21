class MenuButton{
  constructor(x, y, width, height, text, onClickFunction=null) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.onClickFunction = onClickFunction;
  }
  draw(ctx) {
    ctx.fillStyle = colors.menuButtonBackground;
    if (this.isHovered()) {
      ctx.fillStyle = colors.menuButtonBackgroundHover;
    }
    ctx.fillRect(
      uiOffsetX+(this.x*scale),
      offsetY+(this.y*scale),
      this.width*scale,
      this.height*scale,
    );
    ctx.font = (40*scale)+ 'px Arial';
    ctx.fillStyle = colors.menuButtonText;
    ctx.textAlign = 'center';
    ctx.fillText(
      this.text,
      uiOffsetX + (this.x*scale) + ((this.width/2)*scale),
      offsetY + (this.y*scale) + ((this.height/2)*scale) + (20*scale)
    );
  }
  isHovered() {
    const mX = mouseX+200;
    const mY = mouseY;
    if (mY < this.y || mY > this.y + this.height) {
      return false;
    }
    if (mX < this.x || mX > this.x + this.width) {
      return false;
    }
    return true;
  }
}

const menuBottonsOffset = 300;
const menuButtons = [
  new MenuButton(
    600-250, 10+menuBottonsOffset, 500, 100,
    'START GAME',
    function () {
      resetGame();
      transferDelay = 20;
      gameVars.gameState = 'game';
    }
  ),
  new MenuButton(
    600-250, 10+150+menuBottonsOffset, 500, 100,
    'CREDITS',
  )
]

function drawMenu(ctx, deltaTime) {
  // Remember that menu is 1200xw1000
  ctx.clearRect(0, 0,gameCanvas.width,gameCanvas.height);
  ctx.fillStyle = colors.menuBackground;
  const topLeft = convertPosToCanvas(-200, 0);
  ctx.fillRect(topLeft[0], topLeft[1], convertDimToCanvas(1200), convertDimToCanvas(1000));
  
  updateAndDrawMenuAnimation(ctx, deltaTime);
  
  // Game title
  ctx.textAlign = 'center';
  ctx.font = (40*scale)+ 'px Arial';
  ctx.fillStyle = colors.menuGameTitle;
  ctx.fillText(
    'Just One More Bullet',
    uiOffsetX + (600*scale),
    offsetY + (60*scale)
  );
  
  // Buttons
  for (let i = 0; i < menuButtons.length; i++){
    const button = menuButtons[i];
    button.draw(ctx);
  }
  
  // Game version
  ctx.textAlign = 'left';
  ctx.font = (40*scale)+ 'px Arial';
  ctx.fillStyle = colors.menuGameVersion;
  ctx.fillText(
    'Game version: ' + version,
    uiOffsetX + (10*scale),
    offsetY + (960*scale)
  );
}