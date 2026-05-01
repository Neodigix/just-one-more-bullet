class UpgradeView{
  constructor() {
    const buttonOne = new MenuButton(
      600-250+100, 500, 500, 100,
      'Upgrade Shotgun',
      function () {
        gameVars.transferDelay = 20;
        gameVars.gameState = 'menu';
      }
    );
    const buttonTwo = new MenuButton(
      600-250+100, 300, 500, 100,
      'Buy HP',
      function () {
        gameVars.player.hp += 1;
        gameVars.transferDelay = 20;
        gameVars.gameState = 'game';
      }
    );
    const buttonThree = new MenuButton(
      600-250+100, 700, 500, 100,
      'Skip',
      function () {
        gameVars.transferDelay = 20;
        gameVars.gameState = 'game';
      }
    );
    this.buttons = [buttonOne, buttonTwo, buttonThree];
    this.buttonOne = buttonOne;
    this.buttonTwo = buttonTwo;
    this.buttonThree = buttonThree;
  }
  drawView(ctx) {
    draw();
    drawUI(ctx);
    for (let i = 0; i < this.buttons.length; i++){
      this.buttons[i].draw(ctx);
    }
  }
}
