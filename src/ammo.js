export default class Ammo {
  //An Ammo object has an ammocount, a position and canvas datas
  constructor(ammoCount, ctx) {
    this.ammoCount = ammoCount;
    this.posX = ctx.width * 0.15;
    this.posY = ctx.height * 0.9;
    this.canvasHeight = ctx.height;
    this.canvasWidth = ctx.width;
  }

  //draw our current ammo-count-line with specific length
  draw(context) {
    context.fillStyle = "orange";
    context.fillRect(this.posX, this.posY, this.ammoCount, this.canvasWidth * 0.05);
  }

  //method to check if ammo is empty and return true
  isEmpty() {
    if (this.ammoCount - 25 < 0) {
      return true;
    }
    return false;
  }

  //method that return true if ammo is full. we need this function to check in the reloading
  //process when we reached the max ammo limit
  isFull() {
    if (this.ammoCount >= this.canvasWidth * 0.6) {
      return true;
    }
    return false;
  }

  //method that reduces ammo count. we call this function when we shoot
  reduceAmmoCount() {
    this.ammoCount = this.ammoCount - 25;
  }

  //method to increase ammo count. we call this function when we reload
  increaseAmmoCount() {
    this.ammoCount = this.ammoCount + 1;
  }

  //method to draw the empty ammo text. we call this function when ammo is empty
  drawEmptyAmmo(context) {
    context.fillStyle = "red";
    context.font = "30px Arial";
    context.fillText("Ammo is empty", this.canvasWidth * 0.3, this.canvasHeight * 0.8);
  }
}
