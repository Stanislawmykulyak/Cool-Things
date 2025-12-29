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
image.onload = () => {
  animate();
};
image.src = 'media/map.png';

const enemies = [];
function spawnEnemies(enemyCount) {
  for (let i = 1; i < enemyCount + 1; i++) {
    const xOffset = i * 100;
    enemies.push(
      new Knight({
        position: { x: waypoints[0].x - xOffset, y: waypoints[0].y }
      })
    );
  }
}

const buildings = [];
let activeTile = undefined;
let enemyCount = 3;
let waveCount = 1;
let waves = 50;
let hearts = 10;
let coins = 500;
let selectedTile = null;

spawnEnemies(3);
function updateCoins () {
  document.querySelector('.coins').innerHTML = 'Coins: ' + coins + '<img src="media/coin.png" class="stats-img">';
}
function animate() {
  const animationID = requestAnimationFrame(animate);
  c.drawImage(image, 0, 0);

  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i];
    enemy.update();

    if (enemy.position.x > canvas.width) {
      hearts -= 1;
      enemies.splice(i, 1);
      document.querySelector('.hearts').innerHTML = 'Hearts : ' + hearts + '<img src="media/hearts.png" class="stats-img">';


      if (hearts === 0) {

        console.log('game over');
        cancelAnimationFrame(animationID);
        document.querySelector('.game-over').style.display = 'flex';
      }
    }
  }

  if (enemies.length === 0) {
    enemyCount += 2;
    spawnEnemies(enemyCount);
    waveCount += 1;
  }
  placementTiles.forEach((tile) => {
    tile.update(mouse);
  });

  buildings.forEach((building) => {
    building.update();
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
      projectile.update();
      const xDifference = projectile.enemy.center.x - projectile.position.x;
      const yDifference = projectile.enemy.center.y - projectile.position.y;
      const distance = Math.hypot(xDifference, yDifference);

      if (distance < projectile.enemy.radius + projectile.radius) {
        projectile.enemy.health -= projectile.damage;
        if (projectile.enemy.health <= 0) {
          const enemyIndex = enemies.findIndex(enemy => projectile.enemy === enemy);
          if (enemyIndex > -1) {
            enemies.splice(enemyIndex, 1);
            coins += stats.enemy_rewards.knight;
          }
        }
        building.projectiles.splice(i, 1);
      }
    }
  });

  WaveUpdate();
  updateCoins();
}

const mouse = {
  x: undefined,
  y: undefined
};

const towerOptionsMenu = document.getElementById("tower-options-menu");
const sellBtn = document.getElementById("sell-tower");
const upgradeBtn = document.getElementById("upgrade-tower");
const closeOptionsBtn = document.getElementById("close-tower-options");
const currentStatsDiv = document.getElementById("current-stats");
const upgradeStatsDiv = document.getElementById("upgrade-stats");

let selectedTower = null;

function populateTowerStats(div, header, stats) {
    div.innerHTML = `<h4>${header}</h4>`;
    if (!stats) return;

    const labels = GAME_STATS.STAT_LABELS;
    const statConfig = [
        { label: labels.DAMAGE, value: stats.DAMAGE, icon: 'media/sword.png' },
        { label: labels.RANGE, value: stats.RANGE, icon: 'media/bullseye.png' },
        { label: labels.COOLDOWN, value: stats.COOLDOWN, icon: 'media/wind.png' },
        { label: labels.SELL_VALUE, value: stats.SELL_VALUE, icon: 'media/coin.png' }
    ];

    statConfig.forEach(config => {
        if (config.value === undefined) return;
        const p = document.createElement('p');
        
        p.className = 'stat-line'; 
        p.innerHTML = `
            <img src="${config.icon}" class="stat-icon" />
            <span class="stat-label">${config.label}: </span>
            <span class="stat-value">${config.value}</span>`;
        div.appendChild(p);
    });
}


canvas.addEventListener("click", (event) => {
  const menu = document.getElementById("tower-menu");
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;
  let handledClick = false;

  let foundTower = null;
  for (const tower of buildings) {
    if (
      mouseX >= tower.position.x &&
      mouseX <= tower.position.x + tower.width &&
      mouseY >= tower.position.y &&
      mouseY <= tower.position.y + tower.height
    ) {
      foundTower = tower;
      break;
    }
  }

  if (foundTower) {
    selectedTower = foundTower;
    const towerType = selectedTower.constructor.name.replace('Lvl2', '').replace('Tower', '').toUpperCase();
    const currentLvl = selectedTower.level;
    const currentStats = GAME_STATS.TOWERS[towerType][`LVL${currentLvl}`];

    populateTowerStats(currentStatsDiv, `LVL ${currentLvl}: ${currentStats.NAME}`, currentStats);

    const upgradeId = selectedTower.upgradeId;
    if (upgradeId) {
        const upgradeLvl = currentLvl + 1;
        const upgrade_cost = stats.tower_cost.lvl2[towerType.toLowerCase()];
        const upgradeStats = GAME_STATS.TOWERS[towerType][`LVL${upgradeLvl}`];

        populateTowerStats(upgradeStatsDiv, `LVL ${upgradeLvl}: ${upgradeStats.NAME}`, upgradeStats);
        upgradeBtn.textContent = `Upgrade ($${upgrade_cost})`;
        upgradeBtn.disabled = false;
        upgradeStatsDiv.classList.add('has-upgrade');
    } else {
        upgradeStatsDiv.innerHTML = '<h4>MAX LEVEL</h4>';
        upgradeBtn.textContent = 'Max Level';
        upgradeBtn.disabled = true;
        upgradeStatsDiv.classList.remove('has-upgrade');
    }

    sellBtn.textContent = `Sell ($${currentStats.SELL_VALUE})`;

    const rect = canvas.getBoundingClientRect();
    towerOptionsMenu.style.left = (rect.left + foundTower.center.x - towerOptionsMenu.offsetWidth / 2) + "px";
    towerOptionsMenu.style.top = (rect.top + foundTower.position.y - towerOptionsMenu.offsetHeight - 10) + "px";
    towerOptionsMenu.style.display = "block";
    menu.style.display = "none";
    handledClick = true;
  }

  if (!handledClick) {
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
        towerOptionsMenu.style.display = "none";
        handledClick = true;
      }
  }


  if (!handledClick) {
    towerOptionsMenu.style.display = "none";
    menu.style.display = "none";
    selectedTile = null;
    selectedTower = null;
  }
});

sellBtn.onclick = () => {
    if (!selectedTower) return;
    const idx = buildings.indexOf(selectedTower);
    if (idx > -1) {
        const tileX = selectedTower.position.x;
        const tileY = selectedTower.position.y;
        const correspondingTile = placementTiles.find(t => t.position.x === tileX && t.position.y === tileY);
        if (correspondingTile) {
            correspondingTile.isOccupied = false;
        }
        buildings.splice(idx, 1);
    }
    towerOptionsMenu.style.display = "none";
    selectedTower = null;
};

upgradeBtn.onclick = () => {
    if (!selectedTower || !selectedTower.upgradeId) return;

    const towerType = selectedTower.constructor.name.replace('Lvl2', '').replace('Tower', '').toUpperCase();
    const currentLvl = selectedTower.level;
    const currentStats = GAME_STATS.TOWERS[towerType][`LVL${currentLvl}`];
    const upgradeCost = stats.tower_cost.lvl2[towerType.toLowerCase()];

    if (coins < upgradeCost) {
        console.log("Not enough coins to upgrade!");
        return;
    }

    const towerIndex = buildings.indexOf(selectedTower);
    if (towerIndex === -1) return;

    coins -= upgradeCost;
    updateCoins();

    const newTower = towerFactory[selectedTower.upgradeId](selectedTower.position);
    buildings[towerIndex] = newTower;
    
    towerOptionsMenu.style.display = "none";
    selectedTower = null;
};

closeOptionsBtn.onclick = () => {
  towerOptionsMenu.style.display = "none";
  selectedTower = null;
};

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
      if (coins - stats.tower_cost.lvl1.archer < 0) return;
    coins -= stats.tower_cost.lvl1.archer;
    buildings.push(new ArcherTower({ position: selectedTile.position }));
    selectedTile.isOccupied = true;
    document.getElementById("tower-menu").style.display = "none";
};

document.getElementById("mage-tower").onclick = (e) => {
    e.stopPropagation();
    if (!selectedTile) return;
    if (coins - stats.tower_cost.lvl1.mage < 0) return;
    coins -= stats.tower_cost.lvl1.mage;
    buildings.push(new MageTower({ position: selectedTile.position }));
    selectedTile.isOccupied = true;
    document.getElementById("tower-menu").style.display = "none";
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