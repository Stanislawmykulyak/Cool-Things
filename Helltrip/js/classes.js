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
  constructor({ position = { x: 0, y: 0 }, imageSrc = 'media/tower-models/enemies/orc.png', frames = { max: 20 } }) {
    super({ position, imageSrc, frames});
    const enemyStats = stats.enemies.enemy;
    this.position = position;
    this.width = 50;
    this.height = 70;
    this.waypointIndex = 0;
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    };
    this.radius = 30;
    this.health = enemyStats.health;
    this.armor = enemyStats.armor;
    this.speed = enemyStats.speed;
    this.maxHealth = enemyStats.health;
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

      if (Math.abs(rotation) > Math.PI / 8) {
        c.rotate(0);
      } else {
        c.rotate(rotation);
      }
    } else {
      if (Math.abs(angle) > Math.PI / 8) {
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
    super({ position, imageSrc: 'media/tower-models/enemies/wolf.png', frames :{
      max:20,
    } });
    const enemyStats = stats.enemies.wolf;
    this.width = 50;
    this.height = 50;
    this.radius = 25;
    this.health = enemyStats.health;
    this.armor = enemyStats.armor;
    this.speed = enemyStats.speed;
    this.maxHealth = enemyStats.health;
  }
}

class Knight extends Enemy {
  constructor({ position = { x: 0, y: 0 } }) {
    super({ position, imageSrc: 'media/tower-models/enemies/knight.png', frames: { max: 20 } });
    const enemyStats = stats.enemies.knight;
    this.width = 70;
    this.height = 70;
    this.radius = 35;
    this.health = enemyStats.health;
    this.armor = enemyStats.armor;
    this.speed = enemyStats.speed;
    this.maxHealth = enemyStats.health;
  }
}
class Orc extends Enemy {
  constructor({ position = { x: 0, y: 0 } }) {
    super({ position, imageSrc: 'media/tower-models/enemies/orc.png', frames: { max: 20 } });
    const enemyStats = stats.enemies.orc;
    this.width = 50;
    this.height = 70;
    this.radius = 30;
    this.health = enemyStats.health;
    this.armor = enemyStats.armor;
    this.speed = enemyStats.speed;
    this.maxHealth = enemyStats.health;
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