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
  constructor({ position = { x: 0, y: 0 } }) {
    super({position , imageSrc:'media/tower-models/enemies/orc.png' , 
      frames:{
        max:7,
      }



    })
    const stats = GAME_STATS.ENEMIES.ENEMY;
    this.position = position;
    this.width = 60;
    this.height = 60;
    this.waypointIndex = 0;
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    };
    this.radius = 30;
    this.health = stats.HEALTH;
    this.armor = stats.ARMOR;
    this.speed = stats.SPEED;
    this.maxHealth = stats.HEALTH;
    this.velocity = {
      x:0,
      y:0
    };
  }

  draw() {
    

    super.draw()

    //health bar
    c.fillStyle= 'red';
    c.fillRect(this.position.x + 20, this.position.y - 15, this.width , 9);

    c.fillStyle= 'rgba(39, 199, 216, 1)';
    c.fillRect(this.position.x + 20, this.position.y - 15, this.width * this.health / this.maxHealth, 9);
  }

  update() {
    super.update()
    const waypoint = waypoints[this.waypointIndex];
    const yDistance = waypoint.y - this.center.y;
    const xDistance = waypoint.x - this.center.x;
    const angle = Math.atan2(yDistance, xDistance);

    this.velocity.x = Math.cos(angle) * this.speed;
    this.velocity.y = Math.sin(angle) * this.speed;
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    };

    if (
      Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) < Math.abs(this.velocity.x) &&
      Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) < Math.abs(this.velocity.y) &&
      this.waypointIndex < waypoints.length - 1
    ) {
      this.waypointIndex++;
    }
  }
}

class Wolf extends Enemy {
  constructor({ position = { x: 0, y: 0 } }) {
    super({ position });
    const stats = GAME_STATS.ENEMIES.WOLF;
    this.width = 50;
    this.height = 50;
    this.radius = 25;
    this.health = stats.HEALTH;
    this.armor = stats.ARMOR;
    this.speed = stats.SPEED;
    this.maxHealth = stats.HEALTH;
  }
}

class Knight extends Enemy {
  constructor({ position = { x: 0, y: 0 } }) {
    super({ position });
    const stats = GAME_STATS.ENEMIES.KNIGHT;
    this.width = 70;
    this.height = 70;
    this.radius = 35;
    this.health = stats.HEALTH;
    this.armor = stats.ARMOR;
    this.speed = stats.SPEED;
    this.maxHealth = stats.HEALTH;
  }
}
class Projectile extends Sprite{
  constructor({ position = { x: 0, y: 0 }, enemy , damage}) {
    super({position , imageSrc : 'media/tower-models/projectiles/projectile.png'})
    this.position = position;
    this.velocity = {
      x: 0,
      y: 0
    };
    this.radius = 10;
    this.enemy = enemy;
    this.damage = damage;
  }


  update() {

    const angle = Math.atan2(
      this.enemy.center.y - this.position.y,
      this.enemy.center.x - this.position.x
    );

    const power = 7;
    this.velocity.x = Math.cos(angle) * power;
    this.velocity.y = Math.sin(angle) * power;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}