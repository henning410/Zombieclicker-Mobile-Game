export default class Life {
  constructor(life, ctx) {
    this.life = life;
    this.posX = ctx.width * 0.15;
    this.posY = ctx.height * 0.85;
    this.canvasHeight = ctx.height;
    this.canvasWidth = ctx.width;
  }

  //draw our current lifelife with specific length
  draw(context) {
    context.fillStyle = "green";
    context.fillRect(this.posX, this.posY, this.life, this.canvasWidth * 0.05);
  }

  //Method that returns true and play game over sound if life is empty
  isEmpty() {
    if (this.life <= 0) {
      this.playSound("gameOver.wav");
      return true;
    }
    return false;
  }

  //method that reduces life by 50 and plays sound that the player lost life
  reduceLife() {
    this.life = this.life - 50;
    this.playSound("gettingHit.mp3");
  }

  //method that increases the life
  increaseLife() {
    if (this.life < this.canvasWidth * 0.6) {
      this.life = this.life + 50;
    }
  }

  //method to load and play a sound
  playSound(sound) {
    var audio = new Audio("./sounds/" + sound);
    audio.volume = 0.2;
    audio.play();
  }
}
