class PlacementTile {
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position;
    this.size = 64;
    this.color = 'rgba(255, 255, 255, 0.25)';
    this.isOccupied = false; // Upewnij się, że to istnieje
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.size, this.size);
    c.drawImage(tileImage, this.position.x, this.position.y, this.size, this.size);
  }

  update(mouse) {
    this.draw();
  
    if (this === selectedTile) {
      this.color = 'rgba(0, 0, 255, 0.5)';
    } else if (
      mouse.x > this.position.x &&
      mouse.x < this.position.x + this.size &&
      mouse.y > this.position.y &&
      mouse.y < this.position.y + this.size
    ) {
      this.color = 'rgba(0, 255, 0, 0.5)'; // Kolor dla kafelka pod myszką
    } else {
      this.color = 'rgba(255, 255, 255, 0.25)'; // Domyślny kolor
    }
  }
}
const enemy_stats = {
  enemy: {
    health: 120,
    armor: 1,
    speed: 1.2,
  },
  wolf: {
    health: 75,
    armor: 0.7,
    speed: 2.5
  },
  knight: {
    health: 125,
    armor: 10.5,
    speed: 0.7
  },
  chunkus: {
    health: 300,
    armor: 15,
    speed: 100.5
  }
}


class Enemy {
  constructor({ position = { x: 0, y: 0 } }) {
    const stats = enemy_stats.enemy
    this.position = position
    this.width = 60
    this.height = 60
    this.waypointIndex = 0
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    }
    this.radius = 30
    this.health = stats.health
    this.armor = stats.armor
    this.speed = stats.speed
    this.maxHealth =stats.health
    this.velocity = {
      x:0,
      y:0
    }
  }

  draw() {
    c.fillStyle = 'red'
    c.beginPath()
    c.arc(this.center.x ,this.center.y ,this.radius ,0 , Math.PI * 2)
    c.fill()

    //health bar
    c.fillStyle= 'red'
    c.fillRect(this.position.x , this.position.y - 15, this.width , 9)

    c.fillStyle= 'rgba(39, 199, 216, 1)'
    c.fillRect(this.position.x , this.position.y - 15, this.width * this.health / this.maxHealth, 9)

  }

  update() {
    this.draw()

    const waypoint = waypoints[this.waypointIndex]
    const yDistance = waypoint.y - this.center.y
    const xDistance = waypoint.x - this.center.x
    const angle = Math.atan2(yDistance, xDistance)

    this.velocity.x = Math.cos(angle)* this.speed
    this.velocity.y = Math.sin(angle)* this.speed
    
    this.position.x += this.velocity.x 
    this.position.y += this.velocity.y 
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    }

    if (
      Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) <
       Math.abs(this.velocity.x )&&
      Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) <
      Math.abs(this.velocity.y )&&
      this.waypointIndex < waypoints.length - 1
    ) {
      this.waypointIndex++
    }
  }
}
class Wolf {
  constructor({ position = { x: 0, y: 0 } }) {
    const stats = enemy_stats.wolf
    this.position = position
    this.width = 50
    this.height = 50
    this.waypointIndex = 0
    this.radius = 25
    this.maxHealth =stats.health
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    }
    this.health = stats.health
    this.armor = stats.armor
    this.speed = stats.speed
    this.velocity = {
      x:0,
      y:0
    }
  }

  draw() {
    c.fillStyle = 'red'
    c.beginPath()
    c.arc(this.center.x ,this.center.y ,this.radius ,0 , Math.PI * 2)
    c.fill()

    //health bar
    c.fillStyle= 'red'
    c.fillRect(this.position.x , this.position.y - 15, this.width , 9)

    c.fillStyle= 'rgba(39, 199, 216, 1)'
    c.fillRect(this.position.x , this.position.y - 15, this.width * this.health / this.maxHealth, 9)

  }

  update() {
    this.draw()

    const waypoint = waypoints[this.waypointIndex]
    const yDistance = waypoint.y - this.center.y
    const xDistance = waypoint.x - this.center.x
    const angle = Math.atan2(yDistance, xDistance)

    this.velocity.x = Math.cos(angle)* this.speed
    this.velocity.y = Math.sin(angle)* this.speed
    
    this.position.x += this.velocity.x 
    this.position.y += this.velocity.y 
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    }

    if (
      Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) <
       Math.abs(this.velocity.x )&&
      Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) <
      Math.abs(this.velocity.y )&&
      this.waypointIndex < waypoints.length - 1
    ) {
      this.waypointIndex++
    }
  }
}
class Knight {
  constructor({ position = { x: 0, y: 0 } }) {
    const stats =enemy_stats.knight
    this.position = position
    this.width = 70
    this.height = 70
    this.waypointIndex = 0
    this.maxHealth =stats.health
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    }
    this.radius = 35
    this.health = stats.health
    this.armor = stats.armor
    this.speed = stats.speed
    this.velocity = {
      x:0,
      y:0
    }
    
  }

  draw() {
    c.fillStyle = 'red'
    c.beginPath()
    c.arc(this.center.x ,this.center.y ,this.radius ,0 , Math.PI * 2)
    c.fill()

    //health bar
    c.fillStyle= 'red'
    c.fillRect(this.position.x , this.position.y - 15, this.width , 9)

    c.fillStyle= 'rgba(39, 199, 216, 1)'
    c.fillRect(this.position.x , this.position.y - 15, this.width * this.health / this.maxHealth, 9)

  }

  update() {
    this.draw()

    const waypoint = waypoints[this.waypointIndex]
    const yDistance = waypoint.y - this.center.y
    const xDistance = waypoint.x - this.center.x
    const angle = Math.atan2(yDistance, xDistance)

    this.velocity.x = Math.cos(angle)* this.speed
    this.velocity.y = Math.sin(angle)* this.speed
    
    this.position.x += this.velocity.x 
    this.position.y += this.velocity.y 
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    }

    if (
      Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) <
       Math.abs(this.velocity.x )&&
      Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) <
      Math.abs(this.velocity.y )&&
      this.waypointIndex < waypoints.length - 1
    ) {
      this.waypointIndex++
    }
  }
}

const tower_stats = {
  mage:{
    radius:250,
    towerDamage:40,
    cooldown:100,
  },
  archer:{
    radius:350,
    towerDamage:10,
    cooldown:40,
  }

}
class ArcherTower {
  constructor({ position = { x: 0, y: 0 }, type = 'archer' }) {
    const stats = tower_stats[type] || tower_stats.archer;
    
    this.position = position;
    this.width = 64 * 2;
    this.height = 64;
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    };
    this.projectiles = [];
    this.radius = stats.radius;
    this.target = null;
    this.frames = 0;
    this.towerDamage = stats.towerDamage;
    this.cooldown = stats.cooldown;
  }

  draw() {
    c.fillStyle = 'blue'
    c.fillRect(this.position.x, this.position.y, this.width, 64)

    c.beginPath()
    c.arc(this.center.x , this.center.y, this.radius, 0 , Math.PI * 2)
    c.fillStyle = 'rgba(0, 179, 255, 0.37)'
    c.fill()
  }
  update(){
    this.draw()
    if (this.frames % this.cooldown ===0 && this.target){
      this.projectiles.push(
        new Projectile({
          position: {
              x: this.center.x,
              y: this.center.y
            },
          enemy : this.target ,
          damage : this.towerDamage/ this.target.armor
        })
      )
    }
    this.frames++
  }
}  
class MageTower {
  constructor({ position = { x: 0, y: 0 }, type = 'mage' }) {
    const stats = tower_stats[type] || tower_stats.mage;
    
    this.position = position;
    this.width = 64 * 2;
    this.height = 64;
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    };
    this.projectiles = [];
    this.radius = stats.radius;
    this.target = null;
    this.frames = 0;
    this.towerDamage = stats.towerDamage;
    this.cooldown = stats.cooldown;
  }

  draw() {
    c.fillStyle = 'purple'
    c.fillRect(this.position.x, this.position.y, this.width, 64)

    c.beginPath()
    c.arc(this.center.x , this.center.y, this.radius, 0 , Math.PI * 2)
    c.fillStyle = 'hsla(273, 53.30%, 47.80%, 0.42)'
    c.fill()
  }
  update(){
    this.draw()
    if (this.frames % this.cooldown ===0 && this.target){
      this.projectiles.push(
        new Projectile({
          position: {
              x: this.center.x,
              y: this.center.y
            },
          enemy : this.target ,
          damage : this.towerDamage/ this.target.armor
        })
      )
    }
    this.frames++
  }
}


class Projectile {
  constructor({ position = { x: 0, y: 0 }, enemy , damage}) {
    this.position = position
    this.velocity = {
      x: 0,
      y: 0
    }
    this.radius = 10
    this.enemy = enemy
    this.damage = damage

  }

  draw() {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    c.fillStyle = 'orange'
    c.fill()
  }

  update() {
    this.draw()

    const angle = Math.atan2(
      this.enemy.center.y - this.position.y,
      this.enemy.center.x - this.position.x
    )

    const power = 5
    this.velocity.x = Math.cos(angle) * power
    this.velocity.y = Math.sin(angle) * power

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}
