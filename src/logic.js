import Bullet from "./bullet.js";
import Powerup from "./powerups.js";
import Layout from "./layout.js";
import Zombie from "./zombie.js";
import Ammo from "./ammo.js";
import Life from "./life.js";

//function to handle zombies
export function handleZombies(zombies, ammo, gun, lifeLine, context) {
  //loop over array of active zombies
  for (var i = 0; i < zombies.length; i++) {
    if (zombies[i].collidesWithWall()) {
      //if zombie hits the border we delete it from the array
      zombies.splice(i, 1);
    } else if (zombies[i].collidesWithRect(ammo) || zombies[i].collidesWithRect(gun)) {
      //if zombie hits the ammoBox or the gun we reduce life and delete it from the array
      lifeLine.reduceLife();
      zombies.splice(i, 1);
    } else {
      //all other cases means nothing happens and the zombie just moves, so we draw him
      zombies[i].draw(context);
    }
  }
}

//function to handle powerups
export function handlePowerups(powerups, ammo, gun, context) {
  //loop over array of active powerups
  for (var i = 0; i < powerups.length; i++) {
    if (powerups[i].collidesWithWall()) {
      //if powerup hits the border we delete it from the array
      powerups.splice(i, 1);
    } else if (powerups[i].collidesWithRect(ammo) || powerups[i].collidesWithRect(gun)) {
      //if powerups hits the ammoBox or the gun it disappears, means cutting out of the array
      powerups.splice(i, 1);
    } else {
      //all other cases means nothing happens and the powerup just moves, so we draw it
      powerups[i].draw(context);
    }
  }
}

//function to handle bullets
export function handleBullets(bullets, context) {
  //loop over bullet array
  for (var i = 0; i < bullets.length; i++) {
    if (bullets[i].collidesWithWall()) {
      //if bullets hits the border we delete it from the array
      bullets.splice(i, 1);
    } else {
      //all other cases means we move the bullet by drawing it
      bullets[i].draw(context);
    }
  }
}

//function to handle bullet/powerup collision
export function handleBulletPowerupCollision(bullets, powerups, lifeLine) {
  //loop over bullet array and over powerup array to compare each bullet with each powerup
  for (var i = 0; i < bullets.length; i++) {
    for (var k = 0; k < powerups.length; k++) {
      if (bullets[i].collidesWithPowerup(powerups[k])) {
        //if bullets collides with powerup we delete both of them out of their array
        //and exit the inner for loop, because bullets[i] for this specific i no longer exists
        powerups.splice(k, 1);
        bullets.splice(i, 1);
        lifeLine.increaseLife(); //increase lifeLine because powerup was shot
        break;
      }
    }
  }
}

//function to handle bullet/zombie collision.
export function handleBulletZombieCollision(bullets, zombies, highscore) {
  //loop over bullet array and over zombie array to compare each bullet with each zombie
  for (var i = 0; i < bullets.length; i++) {
    for (var k = 0; k < zombies.length; k++) {
      if (bullets[i].collidesWithZombie(zombies[k])) {
        //if bullets collides with zombie we delete both of them out of their array
        //and exit the inner for-loop, because bullets[i] for this specific i no longer exists
        zombies.splice(k, 1);
        bullets.splice(i, 1);
        highscore.c += 1; //increase highscore by 1
        break;
      }
    }
  }
}

//function that we call when we are shooting
export function shoot(ammo, gun, bullets, layout, ammoLine, ctx) {
  if (ammoLine.isEmpty()) {
    //if ammo is empty we play corresponding sound
    layout.playSound("emptyAmmo.mp3");
  } else {
    //Ammo is not empty means we shoot. Creating our bullet and add it to the bullet array
    let bullet = new Bullet(gun.getX(), gun.getY(), ammo.getX(), ammo.getY(), ctx);
    bullets.push(bullet);
    //we play our sound and reduce the ammo
    layout.playSound("lazer.mp3");
    ammoLine.reduceAmmoCount();
  }
}
