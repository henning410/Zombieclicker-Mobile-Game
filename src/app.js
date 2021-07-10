import Bullet from "./bullet.js";
import Ammo from "./ammo.js";
import Life from "./life.js";
import Zombie from "./zombie.js";
import { getCanvas, rect, circle, rectFrame } from "./canvas_lib.js";
import Layout from "./layout.js";
import Powerup from "./powerups.js";
import { handleZombies, handlePowerups, handleBullets, handleBulletPowerupCollision, shoot, handleBulletZombieCollision } from "./logic.js";

// outer function
function Init() {
  let context = getCanvas("canvas01");
  context.canvas.addEventListener("mousemove", onmousemove);
  let alpha = 0;
  let mouseX = 0;
  let mouseY = 0; // local variables
  let canvas = context.canvas;
  let ctx = document.getElementById("canvas01");
  let fingers = [];
  let grabbable = [];
  let bullets = [];
  let powerups = [];
  let zombies = [];
  let reloadIsPressed = false;
  let gunIsTouched;
  let ammoIsTouched;
  let play = false;
  let pause = false;
  let gameOver = false;
  let ammoLine;
  let lifeLine;
  let gun;
  let ammo;
  let reloadFrame;
  let layout = new Layout(ctx);
  let counter;
  var highscore = { c: 0 }; //we need this as object and not as normal variable to outsource our collision logic
  let modulo;
  var audio = new Audio("./sounds/Destiny_Of_The_Chosen.mp3"); //background music
  audio.volume = 0.3;

  //function for reseting the game to later call it when we press play again
  function loadGame() {
    audio.pause();
    //clearing our arrays because when reloading the game we want to start fresh without zombies/bullets/powerups
    zombies = [];
    bullets = [];
    grabbable = [];
    fingers = [];
    powerups = [];

    //create ammoLine and lifeline
    ammoLine = new Ammo(ctx.width * 0.6, ctx);
    lifeLine = new Life(ctx.width * 0.6, ctx);
    //create gun rectangle
    gun = rect(context, ctx.width * 0.05, "rgba(0,0,0,0)");
    gun.move(ctx.width * 0.5, ctx.height * 0.4);
    grabbable.push(gun);
    //create ammo rectangle
    ammo = rect(context, ctx.width * 0.05, "rgba(0,0,0,0)");
    ammo.move(ctx.width * 0.5, ctx.height * 0.6);
    grabbable.push(ammo);
    //create reloadFrame
    reloadFrame = rect(context, ctx.width * 0.05, "black");
    reloadFrame.move(ctx.width * 0.88, ctx.height * 0.89);
    grabbable.push(reloadFrame);
    //reset counter and highscore
    counter = 0;
    highscore.c = 0;
    modulo = 300;
  }

  //First time starting we load the game
  loadGame();

  //main draw function that we are calling again and again
  function draw() {
    //if play is true and pause is false we draw the game
    if (play && !pause) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      //every loop in draw we check if lineline is empty. If so, we set play to false to go back to
      //loading screen and set gameOver to true, to pass it over to the drawTutorial function to
      //draw the highscore
      if (lifeLine.isEmpty()) {
        play = false;
        gameOver = true;
      }

      let identity = new DOMMatrix();
      //playing music when we play the game
      audio.play();
      //Drawing the line between ammo and ammoBox
      drawLine(ammo, gun);
      //draw rectangle around ammoBox
      ammo.draw(identity);
      //draw ammoBox icon itself
      layout.drawAmmoBox(context, ammo);
      //draw rectangle around gun
      gun.draw(identity);
      //draw gun icon itself
      layout.drawGun(context, gun, ammo);
      //draw white frame around reload symbol to make it more clear it's a button
      reloadFrame.draw(identity);
      //draw pause button on top right corner
      layout.drawPauseButton(context);

      let m1 = gun.getMatrix();
      let m2 = ammo.getMatrix();
      gun.rotateRadians(Math.atan2(m2.f - m1.f, m2.e - m1.e));

      //Drawing the Layout of the game, frames, gun, ammo, lifeline etc.
      layout.draw(context);
      layout.drawScore(context, highscore.c);
      ammoLine.draw(context);
      lifeLine.draw(context);

      //logic for spawning zombies and powerups. Here we set the difficulty
      if (counter % modulo == 0) {
        if (modulo - 100 <= 0) {
          modulo = 100;
        } else {
          modulo = modulo - 5;
        }
        createZombie();
      }
      //Here we set when powerups appears
      if (counter % 700 == 0) {
        createPowerup();
      }

      //here we call the function to do the handling of zombies, powerups and bullets
      handleZombies(zombies, ammo, gun, lifeLine, context);
      handlePowerups(powerups, ammo, gun, context);
      handleBullets(bullets, context);
      //handling collision bullet with powerup
      handleBulletPowerupCollision(bullets, powerups, lifeLine);
      //handling collision bullet with zombies
      handleBulletZombieCollision(bullets, zombies, highscore);

      //If ammo is empty we draw info text
      if (ammoLine.isEmpty()) {
        ammoLine.drawEmptyAmmo(context);
      }

      //if reload is pressed and ammo is not full we start the reloading process
      if (reloadIsPressed && !ammoLine.isFull()) {
        reload();
      }

      //increase counter every draw loop by one. When counter reached 1000 reset to 0. We need this for our difficulty
      if (counter == 10000) {
        counter = 0;
      } else {
        counter++;
      }

      context.resetTransform();
      alpha += 0.01;
    } else if (pause) {
      //when pause is pressed we stop drawing the game and draw instead our continue button
      audio.pause();
      layout.drawContinueButton(context);
    } else {
      //when play is false we draw our start page
      context.clearRect(0, 0, canvas.width, canvas.height);
      layout.drawStartScreen(context, gameOver, highscore.c);
      audio.pause(); //stopping our music
      audio.currentTime = 0; //reset music sound to beginning
    }
  }

  //function to draw the line between ammo and gun
  function drawLine(ammo, gun) {
    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 5.0;
    context.moveTo(ammo.getX(), ammo.getY());
    context.lineTo(gun.getX(), gun.getY());
    context.stroke();
  }

  function createZombie() {
    let zombie = new Zombie(ammo.getX(), ammo.getY(), ctx);
    zombies.push(zombie);
  }

  function createPowerup() {
    let powerup = new Powerup(ammo.getX(), ammo.getY(), ctx);
    powerups.push(powerup);
  }

  function reload() {
    playSound("audio_reload");
    ammoLine.increaseAmmoCount();
  }

  function setFingers(touches) {
    for (let t of touches) {
      let f = circle(context, 20, "#f00", "T:" + t.identifier);
      f.move(t.pageX, t.pageY);

      if (!play && !pause && layout.playIsPressed(t.pageX, t.pageY)) {
        //if play is false and layout is pressed we set play to draw to initiate the loading of the game
        loadGame();
        play = true;
        gameOver = false;
      } else if (!play && !pause && layout.nextIsPressed(t.pageX, t.pageY)) {
        //if we are in the start screen and next button is pressed, we increase the tutCounter
        layout.increaseTutCount();
      } else if (!play && !pause && layout.backIsPressed(t.pageX, t.pageY)) {
        //if we are in the start screen and back button is pressed, we decrease the tutCounter
        layout.decreaseTutCount();
      } else if (pause && layout.continueIsPressed(t.pageX, t.pageY)) {
        //if we are in the pause screen and continue is pressed, we set play to true to initiate drawing again
        play = true;
        pause = false;
      } else {
        let i = 0; //with this variable we check which grabbable we touched, so we increase it in the for loop
        let touched = 0; //variable to check if nothing was touched
        for (let g of grabbable) {
          if (g.isTouched(f, t.identifier)) {
            if (i == 0) {
              //if gun is touched
              gunIsTouched = true;
            } else if (i == 1) {
              //if ammo is touched
              ammoIsTouched = true;
              break;
            } else if (i == 2) {
              //if reload is touched
              reloadIsPressed = true;
              break;
            }
          } else {
            touched++;
          }
          //here we check if nothing was touched
          if (touched == 3) {
            if (play && layout.pauseIsPressed(t.pageX, t.pageY) && !pause) {
              //if play is true and pause button is pressed, we set paused to true to freeze drawing
              pause = true;
            } else if (!pause && play) {
              //if nothing was touched we call shoot function
              shoot(ammo, gun, bullets, layout, ammoLine, ctx);
            }
          }
          i++;
        }
      }
      fingers[t.identifier] = f;
    }
  }

  function moveFingers(touches) {
    for (let t of touches) {
      let f = fingers[t.identifier];
      f.move(t.pageX, t.pageY);

      let i = 0; //variable to check which item we grabbed
      for (let g of grabbable) {
        if (i != 2) {
          //making sure that reload is not grabbed
          g.grab(f, t.identifier);
          if (gunIsTouched) {
            //if gun is touched we set the new coordinates for the gun
            gun.setX(t.pageX);
            gun.setY(t.pageY);
          } else if (ammoIsTouched) {
            //if ammo is touched we set the new coordinates for the ammo
            ammo.setX(t.pageX);
            ammo.setY(t.pageY);
          }
        }
        i++;
      }
    }
  }

  function rmFingers(touches) {
    for (let t of touches) {
      fingers[t.identifier] = undefined;
      for (let g of grabbable) {
        g.touchEnd(t.identifier);
        //setting touched bools to false because touch ends
        gunIsTouched = false;
        ammoIsTouched = false;
      }
    }
  }

  canvas.addEventListener(
    "touchstart",
    (evt) => {
      evt.preventDefault();
      setFingers(evt.changedTouches);
    },
    true
  );

  canvas.addEventListener(
    "touchmove",
    (evt) => {
      evt.preventDefault();
      moveFingers(evt.changedTouches);
    },
    true
  );

  canvas.addEventListener(
    "touchend",
    (evt) => {
      evt.preventDefault();
      rmFingers(evt.changedTouches);
      reloadIsPressed = false; //make sure end of touch reload is false, no matter what button is pressed
    },
    true
  );

  // EVENT hier NICHT ZEICHNEN
  function onmousemove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }

  //function to play the reload sound to make sure, it's not overlapping itself
  function playSound(sound) {
    var audio = document.getElementById(sound);
    audio.volume = 0.4;
    audio.play();
  }

  function animate() {
    draw();

    window.requestAnimationFrame(animate);
  }

  animate();
}

window.onload = Init;
