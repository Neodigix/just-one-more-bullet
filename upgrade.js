class UpgradeView{
  constructor() {
    this.buttonPositions = [
      [600 - 250 + 100, 500, 500, 100],
      [600 - 250 + 100, 300, 500, 100],
      [600 - 250 + 100, 700, 500, 100],
    ]
    this.buttons = [];
    const upgradeNums = [0, 1, 2, 3, 4];
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
                '+1 GC',
                function () {
                  if (gameVars.transferDelay > 0) {
                    return;
                  }
                  gameVars.player.gun.greenChance += 1;
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
                '+1 DC',
                function () {
                  if (gameVars.transferDelay > 0) {
                    return;
                  }
                  gameVars.player.dropChance += 1;
                  gameVars.transferDelay = 20;
                  gameVars.gameState = 'game';
                }
              )
            );
          break;
          case 4:
            this.buttons.push(
              new MenuButton(
                currPosition[0], currPosition[1], currPosition[2], currPosition[3],
                '+1 FC',
                function () {
                  if (gameVars.transferDelay > 0) {
                    return;
                  }
                  gameVars.player.gun.blueChance += 1;
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
    this.drawHint(ctx);
  }
  drawHint(ctx) {
    const texts = [
      'Hit points left',
      'Which wave are you currently in',
      'How many bullets can you shot',
      'What is the chance that bullet will turn\ngreen after bounce\nGreen bullents can\'t hurt player',
      'What is the chance that bullet will turn\nblue after bounce\nBlue bullents freeze enemies',
      'What is the chance that killed enemy\nwill drop item'
    ]
    
    if (gameVars.mouseX < 0) {
      const hoveredItem = Math.floor(gameVars.mouseY / 50);
      if (hoveredItem < 5) {
        ctx.font = (40*gameVars.scale)+ 'px Arial';
        ctx.fillStyle = colors.uiWaveText;
        ctx.textAlign = 'left';
        const splitText = texts[hoveredItem].split('\n');
        for (let i = 0; i < splitText.length; i++){
          ctx.fillText(
            splitText[i],
            gameVars.uiOffsetX + (300 * gameVars.scale),
            gameVars.offsetY + (50 * gameVars.scale) * (i + 1) 
          );
        }
      }
    }
  }
}
