class UpgradeView{
  constructor() {
    this.buttonPositions = [
      [600 - 250 + 100, 500, 500, 100],
      [600 - 250 + 100, 300, 500, 100],
      [600 - 250 + 100, 700, 500, 100],
    ]
    const button4 = new MenuButton(
      600-250+100, 700, 500, 100,
      '+2 DC',
      function () {
        if (gameVars.transferDelay > 0) {
          return;
        }
        gameVars.player.dropChance += 5;
        gameVars.transferDelay = 20;
        gameVars.gameState = 'game';
      }
    );
    this.buttons = [];
    const upgradeNums = [0, 1, 2, 3];
    for (let i = 0; i < 3; i++){
      const currPosition = this.buttonPositions[i];
      
      const choice = upgradeNums[Math.floor(Math.random() * upgradeNums.length)];
      upgradeNums.splice(upgradeNums.indexOf(choice), 1);

      switch (choice) {
        case 0:
          this.buttons.push(
            new MenuButton(
              currPosition[0], currPosition[1], currPosition[2], currPosition[3],
              '+0.05 BPS',
              function () {
                if (gameVars.transferDelay > 0) {
                  return;
                }
                gameVars.player.gun.setBps(
                  Math.round(100 * (gameVars.player.gun.bps + 0.05))
                  /
                  100
                );
                gameVars.transferDelay = 20;
                gameVars.gameState = 'game';
              }
            )
          );
          break;
          case 1:
            this.buttons.push(
              new MenuButton(
                currPosition[0], currPosition[1], currPosition[2], currPosition[3],
                '+1 HP',
                function () {
                  if (gameVars.transferDelay > 0) {
                    return;
                  }
                  gameVars.player.hp += 1;
                  gameVars.transferDelay = 20;
                  gameVars.gameState = 'game';
                }
              )
            );
          break;
          case 2:
            this.buttons.push(
              new MenuButton(
                currPosition[0], currPosition[1], currPosition[2], currPosition[3],
                '+5 GC',
                function () {
                  if (gameVars.transferDelay > 0) {
                    return;
                  }
                  gameVars.player.gun.greenChance += 5;
                  gameVars.transferDelay = 20;
                  gameVars.gameState = 'game';
                }
              )
            );
          break;
          case 3:
            this.buttons.push(
              new MenuButton(
                currPosition[0], currPosition[1], currPosition[2], currPosition[3],
                '+2 DC',
                function () {
                  if (gameVars.transferDelay > 0) {
                    return;
                  }
                  gameVars.player.dropChance += 2;
                  gameVars.transferDelay = 20;
                  gameVars.gameState = 'game';
                }
              )
            );
          break;
      }
    }
  }
  drawView(ctx) {
    draw();
    drawUI(ctx);
    for (let i = 0; i < this.buttons.length; i++){
      this.buttons[i].draw(ctx);
    }
  }
}
