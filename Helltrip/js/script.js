const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1280;
canvas.height = 768;

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);

const placementTilesData2D = [];

const waveDisplay = document.querySelector('.wave-display');
function WaveUpdate() {
  waveDisplay.textContent = `Wave: ${waveCount} / ${waves}`;
}

for (let i = 0; i < placementTilesData.length; i += 20) {
  placementTilesData2D.push(placementTilesData.slice(i, i + 20));
}

const tileImage = new Image();
tileImage.src = 'media/Free-Spot.png';
const placementTiles = [];

placementTilesData2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 288) {
      placementTiles.push(
        new PlacementTile({
          position: {
            x: x * 64,
            y: y * 64
          }
        })
      );
    }
  });
});

const image = new Image();
const play = document.querySelector('.play');
const switcher = document.querySelector('.off')

play.addEventListener('click', () => {
  switcher.classList.toggle('off')
  if (!switcher.classList.contains('off')) {
    spawnEnemies(currentWave);
    
    play.style.display = 'none'
  }
})
image.onload = () => {
  animate();
};



image.src = 'media/map.png';

let currentWave = 1;

const enemies = [];
const enemyClasses = {
  goblin: Goblin,
  orc: Orc,
  bat: Bat,
  giantBat: GiantBat
}

const tracks = {
  1: waypoints,
  2: waypoints2
};


function spawnEnemies(waveNumber) {
  const wave = stats.waves[waveNumber];
  if (!wave) {
    console.log(`Wave ${waveNumber} completed or not defined. No more enemies.`);
    return;
  }

  let totalEnemiesSpawned = 0;
  wave.forEach(enemyGroup => {
    const { type, count, track , offset } = enemyGroup;
    const EnemyClass = enemyClasses[type];
    const waypoints = tracks[track];

    if (EnemyClass && waypoints) {
      for (let i = 1; i < count + 1; i++) {
        const xOffset = (totalEnemiesSpawned + i) * offset;
        const enemy = new EnemyClass({
          position: { x: waypoints[0].x - xOffset, y: waypoints[0].y },
          waypoints: waypoints,
          enemyType: type
        });
        enemy.healthCost = stats.enemies[type].healthCost;
        enemies.push(enemy);
      }
      totalEnemiesSpawned += count;
    }
  });
}

const buildings = [];
let activeTile = undefined;
let waveCount = 1;
let waves = 20
let selectedTile = null;

function updateCoins () {
  document.querySelector('.coins').innerHTML = 'Coins: ' + coins + '<img src="media/coin.png" class="stats-img">';
}
function updateHearts () {
  document.querySelector('.hearts').innerHTML = 'Hearts: ' + hearts + '<img src="media/hearts.png" class="stats-img">';
}let lastTime = 0;

function animate(timestamp = 0) {
    const animationID = requestAnimationFrame(animate);
    
    // Calculate Delta Time in seconds
    const deltaTime = (timestamp - lastTime) / 1000;
    lastTime = timestamp;
    
    // Cap dt to 0.1s to prevent massive "teleporting" after lag or tab switching
    const dt = Math.min(deltaTime, 0.1);

    // Update dynamic state passing 'dt'
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.update(dt);

        if (enemy.position.x > canvas.width) {
            hearts -= enemy.healthCost;
            enemies.splice(i, 1);
            if (hearts <= 0) {
                cancelAnimationFrame(animationID);
                document.querySelector('.game-over').style.display = 'flex';
            }
        }
    }

    if (!switcher.classList.contains('off')) {
        if (enemies.length === 0) {
            currentWave += 1;
            spawnEnemies(currentWave);
            waveCount += 1;
            // (Keep your existing wave reward logic here...)
            updateCoins();
        }
    }

    placementTiles.forEach((tile) => tile.update(mouse));

    buildings.forEach((building) => {
        building.update(dt);
        building.target = null;
        const validEnemies = enemies.filter(enemy => {
            const xDifference = enemy.center.x - building.center.x;
            const yDifference = enemy.center.y - building.center.y;
            const distance = Math.hypot(xDifference, yDifference);
            return distance < enemy.radius + building.radius;
        });
        building.target = validEnemies[0];

        for (let i = building.projectiles.length - 1; i >= 0; i--) {
            const projectile = building.projectiles[i];
            projectile.update(dt);
            const xDifference = projectile.enemy.center.x - projectile.position.x;
            const yDifference = projectile.enemy.center.y - projectile.position.y;
            const distance = Math.hypot(xDifference, yDifference);

            if (distance < projectile.enemy.radius + projectile.radius) {
                projectile.enemy.health -= projectile.damage;
                if (projectile.enemy.health <= 0) {
                    const enemyIndex = enemies.findIndex(enemy => projectile.enemy === enemy);
                    if (enemyIndex > -1) {
                        enemies.splice(enemyIndex, 1);
                        coins += projectile.enemy.reward;
                        updateCoins();
                    }
                }
                building.projectiles.splice(i, 1);
            }
        }
    });

    // Draw Map
    c.drawImage(image, 0, 0);
    
    // Sort and Draw
    const drawableObjects = [...placementTiles, ...buildings, ...enemies];
    buildings.forEach(b => drawableObjects.push(...b.projectiles));
    drawableObjects.sort((a, b) => a.position.y - b.position.y);
    drawableObjects.forEach(obj => obj.draw());

    updateCoins();
    WaveUpdate();
    updateHearts();
}

const mouse = {
  x: undefined,
  y: undefined
};

canvas.addEventListener("click", (event) => {
  const menu = document.getElementById("tower-menu");
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  let clickedTile = null;
  for (const tile of placementTiles) {
    if (
      mouseX >= tile.position.x && mouseX <= tile.position.x + tile.size &&
      mouseY >= tile.position.y && mouseY <= tile.position.y + tile.size &&
      !tile.isOccupied
    ) {
      clickedTile = tile;
      break;
    }
  }

  if (clickedTile) {
    selectedTile = clickedTile;
    const rect = canvas.getBoundingClientRect();
    menu.style.left = `${rect.left + clickedTile.position.x + clickedTile.size / 2}px`;
    menu.style.top = `${rect.top + clickedTile.position.y + clickedTile.size / 2}px`;
    menu.style.display = "block";
    arrangeButtonsInCircle();
  } else {
    menu.style.display = "none";
    selectedTile = null;
  }
});

const closeTowerMenuBtn = document.getElementById("close-tower-menu");
if (closeTowerMenuBtn) {
  closeTowerMenuBtn.onclick = () => {
    document.getElementById("tower-menu").style.display = "none";
    selectedTile = null;
  };
}

document.getElementById("archer-tower").onclick = (e) => {
    e.stopPropagation();
    if (!selectedTile) return;
      if (coins - stats.towers.archer.lvl1.cost < 0) return;
    coins -= stats.towers.archer.lvl1.cost;
    buildings.push(new ArcherTower({ position: selectedTile.position }));
    selectedTile.isOccupied = true;
    document.getElementById("tower-menu").style.display = "none";
    selectedTile = null
};

document.getElementById("mage-tower").onclick = (e) => {
    e.stopPropagation();
    if (!selectedTile) return;
    if (coins - stats.towers.mage.lvl1.cost < 0) return;
    coins -=  stats.towers.mage.lvl1.cost;
    buildings.push(new MageTower({ position: selectedTile.position }));
    selectedTile.isOccupied = true;
    document.getElementById("tower-menu").style.display = "none";
    selectedTile = null
};
document.getElementById("barracks").onclick = (e) => {
    e.stopPropagation();
    if (!selectedTile) return;
    if (coins - stats.towers.barracks.lvl1.cost < 0) return;
    coins -= stats.towers.barracks.lvl1.cost;
    buildings.push(new Barracks({ position: selectedTile.position }));
    selectedTile.isOccupied = true;
    document.getElementById("tower-menu").style.display = "none";
    selectedTile = null
};



window.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = event.clientX - rect.left;
  mouse.y = event.clientY - rect.top;

  activeTile = null;
  for (let i = 0; i < placementTiles.length; i++) {
    const tile = placementTiles[i];
    if (
      mouse.x > tile.position.x && mouse.x < tile.position.x + tile.size &&
      mouse.y > tile.position.y && mouse.y < tile.position.y + tile.size
    ) {
      activeTile = tile;
      break;
    }
  }
});

function arrangeButtonsInCircle() {
    const menu = document.getElementById("tower-menu");
    const buttons = menu.querySelectorAll(".tower-options");
    const count = buttons.length;
    const menuRadius = 80;
    const buttonSize = 80;
    const buttonHalfSize = buttonSize / 2;
    const outerRadius = menuRadius + buttonHalfSize;
    const centerX = 125;
    const centerY = 125;

    buttons.forEach((btn, i) => {
        const angle = (i / count) * (2 * Math.PI) - Math.PI / 2;
        const buttonCenterX = centerX + Math.cos(angle) * outerRadius;
        const buttonCenterY = centerY + Math.sin(angle) * outerRadius;
        const x = buttonCenterX - buttonHalfSize;
        const y = buttonCenterY - buttonHalfSize;
        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;
    });
}