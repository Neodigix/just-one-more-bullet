class SoundPlayer{
  constructor() {
      this.clickSound = new Audio('click.wav');
  }
  playClick() {
    if (this.clickSound !== null) {
      this.clickSound.currentTime = 0;
      this.clickSound.volume = 0.15;
      this.clickSound.play();
    }
  }
}
