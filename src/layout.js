export default class Layout {
  //important is here the Width and the Height to get reponsive layout. we also set here the tutCounter
  constructor(ctx) {
    this.canvasHeight = ctx.height;
    this.canvasWidth = ctx.width;
    this.tutorialCounter = 1;
  }

  draw(context) {
    //little Ammo image
    var ammoIcon = new Image();
    ammoIcon.src = "./images/ammo.png";
    context.drawImage(ammoIcon, this.canvasWidth * 0.05, this.canvasHeight * 0.9, this.canvasWidth * 0.07, this.canvasWidth * 0.07);
    //little Life image
    var lifeIcon = new Image();
    lifeIcon.src = "./images/life.png";
    context.drawImage(lifeIcon, this.canvasWidth * 0.05, this.canvasHeight * 0.85, this.canvasWidth * 0.07, this.canvasWidth * 0.07);
    //Refresh image
    var refreshIcon = new Image();
    refreshIcon.src = "./images/refresh.png";
    context.drawImage(refreshIcon, this.canvasWidth * 0.8, this.canvasHeight * 0.85, this.canvasWidth * 0.15, this.canvasWidth * 0.15);
    //frame for life and ammo status bar
    context.fillStyle = "black";
    context.fillRect(this.canvasWidth * 0.15, this.canvasHeight * 0.85, this.canvasWidth * 0.6, this.canvasWidth * 0.05); //ammo
    context.fillRect(this.canvasWidth * 0.15, this.canvasHeight * 0.9, this.canvasWidth * 0.6, this.canvasWidth * 0.05); //life
  }

  //method to draw the current score in the upper left corner
  drawScore(context, score) {
    context.fillStyle = "white";
    context.font = this.canvasWidth * 0.05 + "px Arial";
    context.fillText("Score: " + score, this.canvasWidth * 0.1, this.canvasHeight * 0.05);
    context.strokeStyle = "red";
    context.lineWidth = 0.3;
    context.strokeText("Score: " + score, this.canvasWidth * 0.1, this.canvasHeight * 0.05);
  }

  //method to draw play Button on our start page
  drawPlayButton(context) {
    var gradient = context.createLinearGradient(0, 0, 0, 170);
    gradient.addColorStop(0, "#0051a8");
    gradient.addColorStop(1, "#4298f5");
    context.fillStyle = gradient;
    context.fillRect(this.canvasWidth * 0.07, this.canvasHeight * 0.85, this.canvasWidth * 0.85, this.canvasHeight * 0.15);
    context.fillStyle = "white";
    context.font = this.canvasWidth * 0.06 + "px Arial";
    context.fillText("Tap to start the game", this.canvasWidth * 0.22, this.canvasHeight * 0.94);
    context.strokeStyle = "black";
    context.strokeRect(this.canvasWidth * 0.07, this.canvasHeight * 0.85, this.canvasWidth * 0.85, this.canvasHeight * 0.15);
  }

  //method that checks if the play button is pressed and if so returns true
  playIsPressed(touchedX, touchedY) {
    if (touchedX > this.canvasWidth * 0.07 && touchedX < this.canvasWidth * 0.92 && touchedY > this.canvasHeight * 0.85 && touchedY < this.canvasHeight) {
      return true;
    }
    return false;
  }

  //method to draw the pause button on our game screen
  drawPauseButton(context) {
    var pauseIcon = new Image();
    pauseIcon.src = "./images/pause.png";
    var gradient = context.createLinearGradient(0, 0, 0, 170);
    gradient.addColorStop(0, "#0051a8");
    gradient.addColorStop(1, "#4298f5");
    context.fillStyle = gradient;
    context.fillRect(this.canvasWidth * 0.8, 0, this.canvasWidth * 0.3, this.canvasHeight * 0.1);
    context.strokeStyle = "black";
    context.lineWidth = 1.0;
    context.strokeRect(this.canvasWidth * 0.8, 0, this.canvasWidth * 0.3, this.canvasHeight * 0.1);
    context.drawImage(pauseIcon, this.canvasWidth * 0.83, this.canvasHeight * 0.005, this.canvasWidth * 0.15, this.canvasWidth * 0.15);
  }

  //method to check if pause button is pressed
  pauseIsPressed(touchedX, touchedY) {
    if (touchedX > this.canvasWidth * 0.8 && touchedX < this.canvasWidth && touchedY > 0 && touchedY < this.canvasHeight * 0.1) {
      return true;
    }
    return false;
  }

  //method to draw continue button on the screen
  drawContinueButton(context) {
    var continueIcon = new Image();
    continueIcon.src = "./images/play-button.png";
    var gradient = context.createLinearGradient(0, 0, 0, 170);
    gradient.addColorStop(0, "#0051a8");
    gradient.addColorStop(1, "#4298f5");
    context.fillStyle = gradient;
    context.fillRect(this.canvasWidth * 0.35, this.canvasHeight * 0.27, this.canvasWidth * 0.35, this.canvasHeight * 0.15);
    context.strokeStyle = "black";
    context.strokeRect(this.canvasWidth * 0.35, this.canvasHeight * 0.27, this.canvasWidth * 0.35, this.canvasHeight * 0.15);
    context.drawImage(continueIcon, this.canvasWidth * 0.45, this.canvasHeight * 0.3, this.canvasWidth * 0.15, this.canvasWidth * 0.15);
    context.fillStyle = "black";
    context.font = this.canvasWidth * 0.06 + "px Arial";
    context.fillText("Pause", this.canvasWidth * 0.44, this.canvasHeight * 0.41);
  }

  //method to check if continue button is pressed
  continueIsPressed(touchedX, touchedY) {
    if (touchedX > this.canvasWidth * 0.35 && touchedX < this.canvasWidth * 0.7 && touchedY > this.canvasHeight * 0.27 && touchedY < this.canvasHeight * 0.42) {
      return true;
    }
    return false;
  }

  //method to draw the start screen
  drawStartScreen(context, gameOver, highscore) {
    //if game is over we draw the game over text to our layout
    var tutImage = new Image();
    tutImage.src = "./images/screen.png";
    if (gameOver) {
      //when game over is true we draw the score reached
      context.fillStyle = "red";
      context.font = this.canvasWidth * 0.1 + "px Arial";
      context.fillText("Game Over", this.canvasWidth * 0.22, this.canvasHeight * 0.6);
      this.drawHighscore(context, highscore);
    } else {
      //if game over is false means player plays for the first time this browser session and we draw the tutorial
      this.drawNextButton(context);
      this.drawBackButton(context);
      if (this.tutorialCounter == 1) {
        this.drawTutOne(context);
      } else if (this.tutorialCounter != 10) {
        //if tutCounter is not ten we always draw our screen image
        context.drawImage(tutImage, this.canvasWidth * 0.1, this.canvasHeight * 0.01, this.canvasWidth * 0.8, this.canvasHeight * 0.74);
        context.strokeStyle = "white";
        context.strokeRect(this.canvasWidth * 0.1, this.canvasHeight * 0.01, this.canvasWidth * 0.8, this.canvasHeight * 0.74);
        //switch case to draw the correct tutorial screen depending on the tutCounter
        switch (this.tutorialCounter) {
          case 2:
            this.drawTutTwo(context);
            break;
          case 3:
            this.drawTutThree(context);
            break;
          case 4:
            this.drawTutFour(context);
            break;
          case 5:
            this.drawTutFive(context);
            break;
          case 6:
            this.drawTutSix(context);
            break;
          case 7:
            this.drawTutSeven(context);
            break;
          case 8:
            this.drawTutEight(context);
            break;
          case 9:
            this.drawTutNine(context);
            break;
        }
      } else {
        this.drawTutTen(context);
      }
    }
    //also call the draw play Button function to draw the play button on start screen, no matter if game over is true or not
    this.drawPlayButton(context);
  }

  //method to draw next button on start page to jump between tuutorial screens
  drawNextButton(context) {
    var gradient = context.createLinearGradient(0, 0, 0, 170);
    gradient.addColorStop(0, "#0051a8");
    gradient.addColorStop(1, "#4298f5");
    context.fillStyle = gradient;
    context.fillRect(this.canvasWidth * 0.6, this.canvasHeight * 0.751, this.canvasWidth * 0.32, this.canvasHeight * 0.05);
    context.fillStyle = "white";
    context.font = this.canvasWidth * 0.06 + "px Arial";
    context.fillText("Next", this.canvasWidth * 0.7, this.canvasHeight * 0.79);
    context.strokeStyle = "black";
    context.strokeRect(this.canvasWidth * 0.6, this.canvasHeight * 0.751, this.canvasWidth * 0.32, this.canvasHeight * 0.05);
  }

  //method to check if next Button was pressed and if so return true
  nextIsPressed(touchedX, touchedY) {
    if (touchedX > this.canvasWidth * 0.6 && touchedX < this.canvasWidth * 0.92 && touchedY > this.canvasHeight * 0.751 && touchedY < this.canvasHeight * 0.801) {
      return true;
    }
    return false;
  }

  //method to drack back button on start page to jump between tutorial screens
  drawBackButton(context) {
    var gradient = context.createLinearGradient(0, 0, 0, 170);
    gradient.addColorStop(0, "#0051a8");
    gradient.addColorStop(1, "#4298f5");
    context.fillStyle = gradient;
    context.fillRect(this.canvasWidth * 0.07, this.canvasHeight * 0.751, this.canvasWidth * 0.32, this.canvasHeight * 0.05);
    context.fillStyle = "white";
    context.font = this.canvasWidth * 0.06 + "px Arial";
    context.fillText("Back", this.canvasWidth * 0.17, this.canvasHeight * 0.79);
    context.strokeStyle = "black";
    context.strokeRect(this.canvasWidth * 0.07, this.canvasHeight * 0.751, this.canvasWidth * 0.32, this.canvasHeight * 0.05);
  }

  //method to check if back was pressed and if so return true
  backIsPressed(touchedX, touchedY) {
    if (touchedX > this.canvasWidth * 0.07 && touchedX < this.canvasWidth * 0.39 && touchedY > this.canvasHeight * 0.751 && touchedY < this.canvasHeight * 0.801) {
      return true;
    }
    return false;
  }

  //big method block to draw our tutorial screens
  drawTutOne(context) {
    var gradient = context.createLinearGradient(0, 0, 0, 170);
    gradient.addColorStop(0, "#0051a8");
    gradient.addColorStop(1, "#4298f5");
    context.fillStyle = gradient;
    context.fillRect(this.canvasWidth * 0.07, this.canvasHeight * 0.3, this.canvasWidth * 0.85, this.canvasHeight * 0.4);
    context.fillStyle = "white";
    context.font = this.canvasWidth * 0.06 + "px Arial";
    context.fillText("Tutorial:", this.canvasWidth * 0.4, this.canvasHeight * 0.35);
    context.strokeStyle = "black";
    context.font = this.canvasWidth * 0.05 + "px Arial";
    context.fillText("The goal of the game is, to shoot", this.canvasWidth * 0.1, this.canvasHeight * 0.4);
    context.fillText("all zombies and don't let them hit", this.canvasWidth * 0.1, this.canvasHeight * 0.43);
    context.fillText("you. You can move your weapon", this.canvasWidth * 0.1, this.canvasHeight * 0.46);
    context.fillText("and the ammunationbox", this.canvasWidth * 0.1, this.canvasHeight * 0.49);
    context.strokeStyle = "black";
    context.strokeRect(this.canvasWidth * 0.07, this.canvasHeight * 0.85, this.canvasWidth * 0.85, this.canvasHeight * 0.45);
  }
  drawTutTwo(context) {
    this.drawArrow(context, this.canvasWidth * 0.2, this.canvasHeight * 0.1, this.canvasWidth * 0.3, this.canvasHeight * 0.06);
    context.fillStyle = "red";
    context.font = this.canvasWidth * 0.04 + "px Arial";
    context.fillText("This is your score", this.canvasWidth * 0.1, this.canvasHeight * 0.12);
  }
  drawTutThree(context) {
    this.drawArrow(context, this.canvasWidth * 0.5, this.canvasHeight * 0.1, this.canvasWidth * 0.7, this.canvasHeight * 0.05);
    context.fillStyle = "red";
    context.font = this.canvasWidth * 0.04 + "px Arial";
    context.fillText("Press here to pause the game", this.canvasWidth * 0.3, this.canvasHeight * 0.13);
  }
  drawTutFour(context) {
    this.drawArrow(context, this.canvasWidth * 0.7, this.canvasHeight * 0.41, this.canvasWidth * 0.6, this.canvasHeight * 0.45);
    this.drawArrow(context, this.canvasWidth * 0.7, this.canvasHeight * 0.34, this.canvasWidth * 0.6, this.canvasHeight * 0.3);
    context.fillStyle = "red";
    context.font = this.canvasWidth * 0.04 + "px Arial";
    context.fillText("You can move", this.canvasWidth * 0.6, this.canvasHeight * 0.36);
    context.fillText("the gun/ammo", this.canvasWidth * 0.6, this.canvasHeight * 0.38);
    context.fillText("by touching it", this.canvasWidth * 0.6, this.canvasHeight * 0.4);
  }
  drawTutFive(context) {
    this.drawArrow(context, this.canvasWidth * 0.6, this.canvasHeight * 0.55, this.canvasWidth * 0.8, this.canvasHeight * 0.4);
    this.drawArrow(context, this.canvasWidth * 0.4, this.canvasHeight * 0.55, this.canvasWidth * 0.3, this.canvasHeight * 0.5);
    context.fillStyle = "red";
    context.font = this.canvasWidth * 0.04 + "px Arial";
    context.fillText("Press anywhere to shoot ", this.canvasWidth * 0.4, this.canvasHeight * 0.58);
  }
  drawTutSix(context) {
    this.drawArrow(context, this.canvasWidth * 0.78, this.canvasHeight * 0.41, this.canvasWidth * 0.78, this.canvasHeight * 0.25);
    context.fillStyle = "red";
    context.font = this.canvasWidth * 0.04 + "px Arial";
    context.fillText("Shoot the ", this.canvasWidth * 0.65, this.canvasHeight * 0.43);
    context.fillText("powerup", this.canvasWidth * 0.65, this.canvasHeight * 0.45);
    context.fillText("to pick it up", this.canvasWidth * 0.65, this.canvasHeight * 0.47);
  }
  drawTutSeven(context) {
    this.drawArrow(context, this.canvasWidth * 0.6, this.canvasHeight * 0.6, this.canvasWidth * 0.7, this.canvasHeight * 0.62);
    context.fillStyle = "red";
    context.font = this.canvasWidth * 0.04 + "px Arial";
    context.fillText("Hold here to reload ", this.canvasWidth * 0.4, this.canvasHeight * 0.58);
  }
  drawTutEight(context) {
    this.drawArrow(context, this.canvasWidth * 0.6, this.canvasHeight * 0.59, this.canvasWidth * 0.6, this.canvasHeight * 0.65);
    context.fillStyle = "red";
    context.font = this.canvasWidth * 0.04 + "px Arial";
    context.fillText("This is your life line", this.canvasWidth * 0.4, this.canvasHeight * 0.58);
  }
  drawTutNine(context) {
    this.drawArrow(context, this.canvasWidth * 0.6, this.canvasHeight * 0.59, this.canvasWidth * 0.6, this.canvasHeight * 0.68);
    context.fillStyle = "red";
    context.font = this.canvasWidth * 0.04 + "px Arial";
    context.fillText("This is your ammo status.", this.canvasWidth * 0.2, this.canvasHeight * 0.54);
    context.fillText("Make sure it's not empty", this.canvasWidth * 0.2, this.canvasHeight * 0.57);
  }
  drawTutTen(context) {
    var gradient = context.createLinearGradient(0, 0, 0, 170);
    gradient.addColorStop(0, "#0051a8");
    gradient.addColorStop(1, "#4298f5");
    context.fillStyle = gradient;
    context.fillRect(this.canvasWidth * 0.07, this.canvasHeight * 0.3, this.canvasWidth * 0.85, this.canvasHeight * 0.4);
    context.fillStyle = "white";
    context.font = this.canvasWidth * 0.06 + "px Arial";
    context.fillText("And now...", this.canvasWidth * 0.35, this.canvasHeight * 0.45);
    context.fillText("...Have fun", this.canvasWidth * 0.35, this.canvasHeight * 0.5);
    context.strokeStyle = "black";
    context.strokeRect(this.canvasWidth * 0.07, this.canvasHeight * 0.85, this.canvasWidth * 0.85, this.canvasHeight * 0.45);
  }

  //method to draw the score which the player reached
  drawHighscore(context, highscore) {
    context.fillStyle = "white";
    context.font = this.canvasWidth * 0.06 + "px Arial";
    context.fillText("Your score: " + highscore, this.canvasWidth * 0.3, this.canvasHeight * 0.65);
  }

  //load image of ammoBox and draw it into ammoBox rectangle
  drawAmmoBox(context, ammoRect) {
    var ammoBoxIcon = new Image();
    ammoBoxIcon.src = "./images/ammoBox.png";
    context.drawImage(ammoBoxIcon, ammoRect.getX() - this.canvasWidth * 0.1, ammoRect.getY() - this.canvasWidth * 0.1, this.canvasWidth * 0.2, this.canvasWidth * 0.2);
  }

  //load image of gun and draw it into gun rectangle and rotate it correctly
  drawGun(context, gun, ammo) {
    var gunIcon = new Image();
    gunIcon.src = "./images/machine-gun.png";
    context.save();
    context.translate(gun.getX(), gun.getY()); //setting rotation point to the middle od the gun rectangle
    context.rotate((Math.PI / 180) * this.calcDegree(ammo, gun) + 1.56);
    context.drawImage(gunIcon, -30, -35, this.canvasWidth * 0.16, this.canvasWidth * 0.16);
    context.resetTransform();
    context.restore();
  }

  //method to load and play a sound
  playSound(sound) {
    var audio = new Audio("./sounds/" + sound);
    audio.play();
  }

  //method to calculate the correct rotation angle by using the tangens in the triangle between line, rectangle gun and rectangle ammo
  calcDegree(rect1, rect2) {
    let rotateDegree = 0;
    if (rect1.getY() < rect2.getY() && rect1.getX() > rect2.getX()) {
      //1. Quadrand
      rotateDegree = this.radiantToDegree(Math.atan(Math.abs(rect1.getX() - rect2.getX()) / Math.abs(rect1.getY() - rect2.getY())));
    } else if (rect1.getY() > rect2.getY() && rect1.getX() > rect2.getX()) {
      //2. Quadrand
      rotateDegree = 180 - this.radiantToDegree(Math.atan(Math.abs(rect1.getX() - rect2.getX()) / Math.abs(rect1.getY() - rect2.getY())));
    } else if (rect1.getY() < rect2.getY() && rect1.getX() < rect2.getX()) {
      //4. Quadrand
      rotateDegree = 360 - this.radiantToDegree(Math.atan(Math.abs(rect1.getX() - rect2.getX()) / Math.abs(rect1.getY() - rect2.getY())));
    } else {
      //3. Quadrand
      rotateDegree = 180 + this.radiantToDegree(Math.atan(Math.abs(rect1.getX() - rect2.getX()) / Math.abs(rect1.getY() - rect2.getY())));
    }
    return rotateDegree;
  }

  //method to calculate radiant to degree
  radiantToDegree(radiant) {
    var pi = Math.PI;
    return radiant * (180 / pi);
  }

  drawArrow(context, fromx, fromy, tox, toy) {
    context.beginPath();
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    context.strokeStyle = "red";
    context.stroke();
  }

  //method to increase the TutCount variable to jump later back and forward between the tutorial screens
  increaseTutCount() {
    if (this.tutorialCounter < 10) {
      this.tutorialCounter += 1;
    }
  }

  //method to decrease the TutCount variable to jump later back and forward between the tutorial screens
  decreaseTutCount() {
    if (this.tutorialCounter >= 2) {
      this.tutorialCounter -= 1;
    }
  }
}
