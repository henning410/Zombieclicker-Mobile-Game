export default class Bullet {
  //for each bullet the position of the gun and the ammo is relevant, to calculate the linear slope for each bullet
  constructor(gunX, gunY, ammoX, ammoY, ctx) {
    this.gunX = gunX;
    this.gunY = gunY;
    this.posX = gunX; //position x of the bullet, starts in the center of the gun
    this.posY = gunY; //position y of the bullet, starts in the center of the gun
    this.ammoX = ammoX;
    this.ammoY = ammoY;
    this.canvasHeight = ctx.height;
    this.canvasWidth = ctx.width;
    this.lineVec = this.getLineNormal();
  }

  //method that draw our bullet and move it
  draw(context) {
    context.beginPath();
    context.fillStyle = "red";
    context.arc(this.posX, this.posY, this.canvasWidth * 0.05, 0, Math.PI * 2);
    context.fill();
    this.moveBullet(this.canvasWidth * 0.01);
  }

  //method that moves the bullet. The param "speed" is the speed in pixels. We use our normalized vector to move the bullet with constant speed
  moveBullet(speed) {
    this.posX += this.lineVec.x * speed;
    this.posY += this.lineVec.y * speed;
  }

  //with this method we calculate the line's unit vector to let the bullet move at the same speed.
  getLineNormal() {
    //get the line vector between gun and ammo
    const vx = this.gunX - this.ammoX;
    const vy = this.gunY - this.ammoY;

    //get the line length
    const len = Math.hypot(vx, vy);

    //if the line has length
    if (len > 0) {
      //calculate normal vector
      return { x: vx / len, y: vy / len };
    }
    return { x: 0, y: 0 };
  }

  //method to check if bullet collides with zombie.
  collidesWithZombie(zombie) {
    //calculating the distance between the two middle points of bullet/zombie
    let d = Math.sqrt((this.posX - zombie.getX()) * (this.posX - zombie.getX()) + (this.posY - zombie.getY()) * (this.posY - zombie.getY()));
    let sumradius = this.canvasWidth * 0.05 * 2;

    //if the distance is smaller than the two radii added we know they collide
    if (d < sumradius) {
      var audio = new Audio("./sounds/zombieDestroyed.wav");
      audio.volume = 0.2;
      audio.play();
      return true;
    }
    return false;
  }

  //method to check if bullet collides with powerup
  collidesWithPowerup(powerup) {
    //calculating the distance between the two middle points of bullet/powerup
    let d = Math.sqrt((this.posX - powerup.getX()) * (this.posX - powerup.getX()) + (this.posY - powerup.getY()) * (this.posY - powerup.getY()));
    let sumradius = this.canvasWidth * 0.05 * 2;

    //if the distance is smaller than the two radii added we know they collide
    if (d < sumradius) {
      var audio = new Audio("./sounds/powerup_life.wav");
      audio.volume = 0.2;
      audio.play();
      return true;
    }
    return false;
  }

  //method to check if bullets collides with the border of our canvas
  collidesWithWall() {
    if (this.collisionTop() || this.collisionBottom() || this.collisionRight() || this.collisionLeft()) {
      return true;
    }
    return false;
  }

  //method to check for collision with the top border of the canvas
  collisionTop() {
    if (this.posY + this.canvasWidth * 0.05 <= 0) {
      return true;
    }
  }

  //method to check for collision with the bottom border of the canvas
  collisionBottom() {
    if (this.posY - this.canvasWidth * 0.05 >= this.canvasHeight) {
      return true;
    }
  }

  //method to check for collision with the right border of the canvas
  collisionRight() {
    if (this.posX - this.canvasWidth * 0.05 >= this.canvasWidth) {
      return true;
    }
  }

  //method to check for collision with the left border of the canvas
  collisionLeft() {
    if (this.posX + this.canvasWidth * 0.05 <= 0) {
      return true;
    }
  }
}
