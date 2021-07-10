export default class Bullet {
  constructor(ammoX, ammoY, ctx) {
    this.img = new Image();
    this.img.src = "./images/zombie.png";
    this.posX = 0;
    this.posY = 0;
    this.canvasHeight = ctx.height;
    this.canvasWidth = ctx.width;
    this.generateRandomPos();
    this.startX = this.posX;
    this.startY = this.posY;
    this.ammoX = ammoX;
    this.ammoY = ammoY;
    this.lineVec = this.getLineNormal();
  }

  //draw the zombie and let it move
  draw(context) {
    context.drawImage(this.img, this.posX, this.posY, this.canvasWidth * 0.09, this.canvasWidth * 0.09);
    this.moveZombie(this.canvasWidth * 0.0015);
  }

  //method to generate a random start position on one of the 4 sides
  generateRandomPos() {
    if (this.generateRandomSite() == 1) {
      //Zombie spawns at top border
      this.posX = Math.floor(Math.random() * this.canvasWidth);
      this.posY = 0;
    } else if (this.generateRandomSite() == 2) {
      //Zombie spawns at right border
      this.posX = this.canvasWidth;
      this.posY = Math.floor(Math.random() * this.canvasHeight);
    } else if (this.generateRandomSite() == 3) {
      //Zombie spawns at bottom border
      this.posX = Math.floor(Math.random() * this.canvasWidth);
      this.posY = this.canvasHeight;
    } else {
      //Zombie spawns at left border
      this.posX = 10;
      this.posY = Math.floor(Math.random() * this.canvasHeight);
    }
  }

  //method that generates a random number between 1 and 4 that stands for the 4 sides
  generateRandomSite() {
    let random = Math.floor(Math.random() * 4) + 1;
    return random;
  }

  //method that moves the zombie with speed in pixels
  moveZombie(speed) {
    this.posX += this.lineVec.x * speed;
    this.posY += this.lineVec.y * speed;
  }

  //with this method we calculate the line's unit vector to let the zombie move at the same speed
  getLineNormal() {
    //get the line vector
    const vx = this.ammoX - this.startX;
    const vy = this.ammoY - this.startY;

    //get the line length
    const len = Math.hypot(vx, vy);

    //if the line has length
    if (len > 0) {
      //calculate normal vector
      return { x: vx / len, y: vy / len };
    }
    return { x: 0, y: 0 };
  }

  //method that return true if collision with one of the borders is detected
  collidesWithWall() {
    if (this.collisionTop() || this.collisionBottom() || this.collisionRight() || this.collisionLeft()) {
      return true;
    }
    return false;
  }

  //method that returns true if zombie collides with rectangle, that is later our ammoBox and Gunbox
  collidesWithRect(rect) {
    var circle = { x: this.posX, y: this.posY, r: 20 };
    var rect = { x: rect.getX() - 60, y: rect.getY() - 60, w: 80, h: 80 };

    //find the vertical and horizontal distances between tzhe circle center and the rectangle center
    var distX = Math.abs(circle.x - rect.x - rect.w / 2);
    var distY = Math.abs(circle.y - rect.y - rect.h / 2);

    //if distance is greater than half circle then they are too far apart to collide
    if (distX > rect.w / 2 + circle.r) {
      return false;
    }
    //if distance is greater than half rectangle then they are too far apart to collide
    if (distY > rect.h / 2 + circle.r) {
      return false;
    }

    //if the distance is less then than half rect width/height they are colliding
    if (distX <= rect.w / 2) {
      return true;
    }
    if (distY <= rect.h / 2) {
      return true;
    }
    //using pythagoras to compare the distance between circle center and rectangle center
    var dx = distX - rect.w / 2;
    var dy = distY - rect.h / 2;
    return dx * dx + dy * dy <= circle.r * circle.r;
  }

  collisionTop() {
    if (this.posY + 20 <= 0) {
      return true;
    }
    return false;
  }

  collisionBottom() {
    if (this.posY - 20 >= this.canvasHeight) {
      return true;
    }
    return false;
  }

  collisionRight() {
    if (this.posX - 20 >= this.canvasWidth) {
      return true;
    }
    return false;
  }
  collisionLeft() {
    if (this.posX + 20 <= 0) {
      return true;
    }
    return false;
  }

  getX() {
    return this.posX;
  }

  getY() {
    return this.posY;
  }
}
