class Item {
  constructor(pos) {
    this.x = pos[0];
    this.y = pos[1];
    this.picked = false;
  }
  draw(ctx) {
    const pos = convertPosToCanvas(this.x, this.y);
    ctx.beginPath();
    ctx.fillStyle = colors.item;
    ctx.arc(
      pos[0],  // x
      pos[1],  // y
      15 * gameVars.scale,  // radius
      0,  // starting angle
      2 * Math.PI  // ending angle
    )
    ctx.fill();
  }
  pickUp() {
    this.picked = true;
    const newUpgradeView = new UpgradeView();
    gameVars.gameState = 'upgrade';
    gameVars.view = newUpgradeView;
  }
  checkPickup() {
    if (this.getPlayerDistance() <= 35) {
      return true;
    }
    return false;
  }
  getPlayerDistance() {
    const xDistance2 = (this.x-gameVars.player.x)*(this.x-gameVars.player.x)
    const yDistance2 = (this.y-gameVars.player.y)*(this.y-gameVars.player.y)
    return Math.sqrt(xDistance2 + yDistance2);
  }
}