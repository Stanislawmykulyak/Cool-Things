class PlacementTile {
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position;
    this.size = 64;
    this.color = 'rgba(255, 255, 255, 0.25)';
    this.isOccupied = false;
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.size, this.size);
    c.drawImage(tileImage, this.position.x, this.position.y, this.size, this.size);
  }

  update(mouse) {
    this.draw();
  
    if (this === selectedTile) {
      this.color = 'rgba(146, 146, 146, 0.55)';
    } else if (
      mouse.x > this.position.x &&
      mouse.x < this.position.x + this.size &&
      mouse.y > this.position.y &&
      mouse.y < this.position.y + this.size
    ) {
      this.color = 'rgba(15, 245, 15, 0.06)';
    } else {
      this.color = 'rgba(255, 255, 255, 0)';
    }
  }
}

class Enemy extends Sprite{
  constructor({ position = { x: 0, y: 0 }, imageSrc, frames = { max: 20 }, waypoints = [], enemyType }) {
    super({ position, imageSrc, frames });
    const enemyStats = stats.enemies[enemyType];
    this.position = position;
    this.width = 40;
    this.height = 55;
    this.waypointIndex = 0;
    this.waypoints = waypoints;
    if (enemyStats.isFlying ) {
      this.waypoints = this.waypoints.map(waypoint => ({
        x: waypoint.x,
        y: waypoint.y - 60
      }));
    }
    if ( enemyStats.isMiniBoss) {
      this.waypoints = this.waypoints.map(waypoint => ({
        x: waypoint.x,
        y: waypoint.y - 30
      }));
    }
    if ( enemyStats.isBoss) {
      this.waypoints = this.waypoints.map(waypoint => ({
        x: waypoint.x,
        y: waypoint.y - 60
      }));
    }

    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    };
    this.radius = 30;
    if(currentWave > 5){
      this.health = ((1 + currentWave *0.2) * enemyStats.health)
      this.maxHealth = ((1 + currentWave *0.2) * enemyStats.health)
      if(enemyStats.isBoss){
        this.health = enemyStats.health 
      } 
    }
    this.armor = enemyStats.armor;
    this.speed = enemyStats.speed;
    this.reward = enemyStats.reward;
    this.velocity = {
      x:0,
      y:0
    };
  }

  draw() {
    const angle = Math.atan2(this.velocity.y, this.velocity.x);
    c.save();
    c.translate(this.center.x, this.center.y);

    if (Math.abs(angle) > Math.PI / 2) {
      c.scale(-1, 1);
      let rotation = Math.PI - angle;
      while (rotation > Math.PI) rotation -= 2 * Math.PI;
      while (rotation < -Math.PI) rotation += 2 * Math.PI;

      if (Math.abs(rotation) > Math.PI / 12) {
        c.rotate(0);
      } else {
        c.rotate(rotation);
      }
    } else {
      if (Math.abs(angle) > Math.PI / 12) {
        c.rotate(0);
      } else {
        c.rotate(angle);
      }
    }

    const cropWidth = this.image.width / this.frames.max;
    const crop = {
      position: {
        x: cropWidth * this.frames.current,
        y: 0
      },
      width: cropWidth,
      height: this.image.height
    };

    c.drawImage(this.image, crop.position.x, crop.position.y, crop.width, crop.height, -this.width / 2 + this.offset.x, -this.height / 2 + this.offset.y, crop.width, crop.height);
    c.restore();


    //health bar
    c.fillStyle= 'red';
    c.fillRect(this.position.x , this.position.y - 15, this.width , 9);

    c.fillStyle= 'rgba(39, 199, 216, 1)';
    c.fillRect(this.position.x , this.position.y - 15, this.width * this.health / this.maxHealth, 9);

  }

  update(dt) {
    super.update(dt);
    const waypoint = this.waypoints[this.waypointIndex];
    const yDistance = waypoint.y - this.center.y;
    const xDistance = waypoint.x - this.center.x;
    const angle = Math.atan2(yDistance, xDistance);

    this.velocity.x = Math.cos(angle) * this.speed;
    this.velocity.y = Math.sin(angle) * this.speed;
    
    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;

    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    };

    if (
      Math.abs(this.center.x - waypoint.x) < Math.abs(this.velocity.x * dt) + 1 &&
      Math.abs(this.center.y - waypoint.y) < Math.abs(this.velocity.y * dt) + 1 &&
      this.waypointIndex < this.waypoints.length - 1
    ) {
      this.waypointIndex++;
    }
  }
}
class Bat extends Enemy {
  constructor({ position = { x: 0, y: 0 }, waypoints = [] }) {
    super({ 
        position, 
        imageSrc: 'media/tower-models/enemies/bat.png', 
        frames: { max: 18 }, 
        waypoints,
        enemyType: 'bat'
    });
    const enemyStats = stats.enemies.bat;
    this.width = 50;
    this.height = 30;
    this.radius = 25;
  }
}
class GiantBat extends Enemy {
  constructor({ position = { x: 0, y: 0 }, waypoints = [] }) {
    super({ 
        position, 
        imageSrc: 'media/tower-models/enemies/giant-bat.png', 
        frames: { max: 18 }, 
        waypoints,
        enemyType: 'giantBat'
    });
    const enemyStats = stats.enemies.bat;
    this.width = 70;
    this.height = 30;
    this.radius = 25;
    this.health = enemyStats.health;
    this.armor = enemyStats.armor;
    this.speed = enemyStats.speed;
    this.maxHealth = enemyStats.health;
    this.reward = enemyStats.reward;
  }
}
class Orc extends Enemy {
  constructor({ position = { x: 0, y: 0 }, waypoints = [] }) {
    super({ 
        position, 
        imageSrc: 'media/tower-models/enemies/orc.png', 
        frames: { max: 20 }, 
        waypoints,
        enemyType: 'orc'
    });
    const enemyStats = stats.enemies.orc;
    this.width = 50;
    this.height = 70;
    this.radius = 30;
    this.health = enemyStats.health;
    this.armor = enemyStats.armor;
    this.speed = enemyStats.speed;
    this.maxHealth = enemyStats.health;
    this.reward = enemyStats.reward;
  }
}
class GoblinChampion extends Enemy {
  constructor({ position = { x: 0, y: 0 }, waypoints = [] }) {
    super({ 
        position, 
        imageSrc: 'media/tower-models/enemies/goblin-champion.png', 
        frames: { max: 20 }, 
        waypoints,
        enemyType: 'gobChamp'
    });
    const enemyStats = stats.enemies.gobChamp;
    this.width = 95;
    this.height = 150;
    this.health = enemyStats.health;
    this.armor = enemyStats.armor;
    this.speed = enemyStats.speed;
    this.maxHealth = enemyStats.health;
    this.reward = enemyStats.reward;
  }
}
class Goblin extends Enemy {
  constructor({ position = { x: 0, y: 0 }, waypoints = [] }) {
    super({ 
        position, 
        imageSrc: 'media/tower-models/enemies/goblin.png', 
        frames: { max: 20 }, 
        waypoints,
        enemyType: 'goblin'
    });
    const enemyStats = stats.enemies.goblin;
    this.width = 50;
    this.height = 60;
    this.radius = 30;
    this.health = enemyStats.health;
    this.armor = enemyStats.armor;
    this.speed = enemyStats.speed;
    this.maxHealth = enemyStats.health;
    this.reward = enemyStats.reward;
  }
}
class GoblinGiant extends Enemy {
  constructor({ position = { x: 0, y: 0 }, waypoints = [] }) {
    super({ 
        position, 
        imageSrc: 'media/tower-models/enemies/goblin-giant.png', 
        frames: { max: 20 }, 
        waypoints,
        enemyType: 'gobGiant'
    });
    const enemyStats = stats.enemies.gobGiant;
    this.width = 60;
    this.height = 90;
    this.radius = 30;
    this.health = enemyStats.health;
    this.armor = enemyStats.armor;
    this.speed = enemyStats.speed;
    this.maxHealth = enemyStats.health;
    this.reward = enemyStats.reward;
  }
}
class GoblinChief extends Enemy {
  constructor({ position = { x: 0, y: 0 }, waypoints = [] }) {
    super({ 
        position, 
        imageSrc: 'media/tower-models/enemies/goblin-chief.png', 
        frames: { max: 20 }, 
        waypoints,
        enemyType: 'goblinChief'
    });
    const enemyStats = stats.enemies.goblinChief;
    this.width = 150;
    this.height = 190;
    this.radius = 30;
    this.health = enemyStats.health;
    this.armor = enemyStats.armor;
    this.speed = enemyStats.speed;
    this.maxHealth = enemyStats.health;
    this.reward = enemyStats.reward;
  }
}
class Projectile extends Sprite{
  constructor({ position = { x: 0, y: 0 }, enemy , damage , power , imageSrc}) {
    super({position , })
    this.position = position;
    this.velocity = {
      x: 0,
      y: 0
    };
    this.radius = 10;
    this.enemy = enemy;
    this.damage = damage;
    this.power = power
    this.image.src = imageSrc;

  }

  draw(){
    c.save()
    c.translate(this.position.x, this.position.y);
    c.rotate(this.angle);
    c.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
    c.restore()
  }

  update(dt) {
    const angle = Math.atan2(
      this.enemy.center.y - this.position.y,
      this.enemy.center.x - this.position.x
    );
    this.angle = angle;
    this.velocity.x = Math.cos(angle) * (this.power * 7);
    this.velocity.y = Math.sin(angle) * (this.power * 7);

    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
  }
}
class ArcherProjectile extends Projectile{
  constructor({ position = { x: 0, y: 0 }, enemy, damage }) {
    super({ position, enemy, damage, imageSrc: 'media/tower-models/projectiles/arrow.png', power: 100 });
  }
}

class MageProjectile extends Projectile {
  constructor({ position = { x: 0, y: 0 }, enemy, damage }) {
    super({ position, enemy, damage, imageSrc: 'media/tower-models/projectiles/magic_ball.png', power: 50});
  }

}