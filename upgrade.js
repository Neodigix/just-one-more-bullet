class UpgradeView{
  constructor() {
    const buttonOne = new MenuButton(
      600-250+100, 500, 500, 100,
      'Upgrade gun speed',
      function () {
        gameVars.player.gun.setBps(
          Math.round(100 * (gameVars.player.gun.bps + 0.05))
          /
          100
        );
        gameVars.transferDelay = 20;
        gameVars.gameState = 'game';
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
      'Green chance += 5',
      function () {
        gameVars.player.gun.greenChance += 5;
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

const upgradeGreen = function () {
  gameVars.player.gun.greenChance += 1;
};