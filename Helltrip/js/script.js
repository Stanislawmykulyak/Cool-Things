const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1280
canvas.height = 768

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

const placementTilesData2D = []

const waveDisplay = document.querySelector('.wave-display')
function WaveUpdate() {
  waveDisplay.textContent = `Wave: ${waveCount} / ${waves}`
}

for (let i = 0; i < placementTilesData.length; i += 20) {
  placementTilesData2D.push(placementTilesData.slice(i, i + 20))
}

const tileImage = new Image()
tileImage.src = 'media/Free-Spot.png'
const placementTiles = []

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
      )
    }
  })
})

const image = new Image()

image.onload = () => {
  animate()
}
image.src = 'media/map.png'

const enemies = []

function spawnEnemies(enemyCount) {
  for (let i = 1; i < enemyCount + 1; i++) {
    const xOffset = i * 100
    enemies.push(
      new Enemy({
        position: { x: waypoints[0].x - xOffset, y: waypoints[0].y }
      })
    )
  }
}

const buildings = []
let activeTile = undefined
let enemyCount = 3
let waveCount = 1
let waves = 50
let hearts = 10
let selectedTile = null

spawnEnemies(3)

function animate() {
  const animationID = requestAnimationFrame(animate)

  c.drawImage(image, 0, 0)

  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i]
    enemy.update()

    if (enemy.position.x > canvas.width) {
      hearts -= 1
      enemies.splice(i, 1)

      if (hearts === 0) {
        console.log('game over')
        cancelAnimationFrame(animationID)
      }
    }
  }

  if (enemies.length === 0) {
    enemyCount += 2
    spawnEnemies(enemyCount)
    waveCount += 1
  }

  placementTiles.forEach((tile) => {
    tile.update(mouse)
  })

  buildings.forEach((building) => {
    building.update()
    building.target = null

    const validEnemies = enemies.filter(enemy => {
      const xDifference = enemy.center.x - building.center.x
      const yDifference = enemy.center.y - building.center.y
      const distance = Math.hypot(xDifference, yDifference)
      return distance < enemy.radius + building.radius
    })

    building.target = validEnemies[0]

    for (let i = building.projectiles.length - 1; i >= 0; i--) {
      const projectile = building.projectiles[i]

      projectile.update()

      const xDifference = projectile.enemy.center.x - projectile.position.x
      const yDifference = projectile.enemy.center.y - projectile.position.y
      const distance = Math.hypot(xDifference, yDifference)

      if (distance < projectile.enemy.radius + projectile.radius) {
        projectile.enemy.health -= projectile.damage

        if (projectile.enemy.health <= 0) {
          const enemyIndex = enemies.findIndex(enemy => projectile.enemy === enemy)
          if (enemyIndex > -1) enemies.splice(enemyIndex, 1)
        }

        building.projectiles.splice(i, 1)
      }
    }
  })

  WaveUpdate()
}

const mouse = {
  x: undefined,
  y: undefined
}
const towerOptionsMenu = document.getElementById("tower-options-menu");
const sellBtn = document.getElementById("sell-tower");
const upgradeBtn = document.getElementById("upgrade-tower");
const infoBtn = document.getElementById("info-tower");
const infoText = document.getElementById("tower-info-text");
const closeOptionsBtn = document.getElementById("close-tower-options");
let selectedTower = null;

canvas.addEventListener("click", (event) => {
  towerOptionsMenu.style.display = "none";
  const menu = document.getElementById("tower-menu");
  menu.style.display = "none";

  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  let clickedTile = null;
  for (let i = 0; i < placementTiles.length; i++) {
    const tile = placementTiles[i];
    if (
      mouseX >= tile.position.x &&
      mouseX <= tile.position.x + tile.size &&
      mouseY >= tile.position.y &&
      mouseY <= tile.position.y + tile.size &&
      !tile.isOccupied
    ) {
      clickedTile = tile;
      break;
    }
  }
  if (clickedTile) {
    selectedTile = clickedTile;
    const rect = canvas.getBoundingClientRect();
    const tileScreenX = rect.left + clickedTile.position.x + clickedTile.size / 2;
    const tileScreenY = rect.top + clickedTile.position.y + clickedTile.size / 2;
    menu.style.left = `${tileScreenX}px`;
    menu.style.top = `${tileScreenY}px`;
    menu.style.display = "block";
    arrangeButtonsInCircle();
    return;
  }


  let foundTower = null;
  buildings.forEach((tower) => {
    if (!tower.position || !tower.width || !tower.height) return;
    if (
      mouseX >= tower.position.x &&
      mouseX <= tower.position.x + tower.width &&
      mouseY >= tower.position.y &&
      mouseY <= tower.position.y + tower.height
    ) {
      foundTower = tower;
    }
  });
  if (foundTower) {
    selectedTower = foundTower;

    const rect = canvas.getBoundingClientRect();
    towerOptionsMenu.style.left = (rect.left + foundTower.center.x + 40) + "px";
    towerOptionsMenu.style.top = (rect.top + foundTower.center.y - 20) + "px";
    towerOptionsMenu.style.display = "block";
    infoText.style.display = "none";

    sellBtn.onclick = () => {
      if (!selectedTower) return;
      const idx = buildings.indexOf(selectedTower);
      if (idx > -1) {
        // Odblokuj tile pod wieżą
        placementTiles.forEach(tile => {
          if (
            selectedTower.position.x === tile.position.x &&
            selectedTower.position.y === tile.position.y
          ) {
            tile.isOccupied = false;
          }
        });
        buildings.splice(idx, 1);
      }
      towerOptionsMenu.style.display = "none";
      selectedTower = null;
    };
    upgradeBtn.onclick = () => {
      if (!selectedTower) return;
      if (selectedTower.towerDamage !== undefined) selectedTower.towerDamage += 10;
      towerOptionsMenu.style.display = "none";
      selectedTower = null;
    };
    infoBtn.onclick = () => {
      if (!selectedTower) return;
      infoText.style.display = "block";
      infoText.textContent = `Typ: ${selectedTower.constructor.name}\nDamage: ${selectedTower.towerDamage || "?"}`;
    };
    closeOptionsBtn.onclick = () => {
      towerOptionsMenu.style.display = "none";
      selectedTower = null;
    };
    return;
  }

  // Jeśli kliknięcie nie jest na wieżę ani tile, nie pokazuj żadnego menu
  selectedTile = null;
  selectedTower = null;
});

// Dodaj obsługę zamykania menu wyboru wieży
const closeTowerMenuBtn = document.getElementById("close-tower-menu");
if (closeTowerMenuBtn) {
  closeTowerMenuBtn.onclick = () => {
    const menu = document.getElementById("tower-menu");
    menu.style.display = "none";
    selectedTile = null;
  };
}

// Dodaj obsługę stawiania wież
const archerButton = document.getElementById("archer-tower");
if (archerButton) {
  archerButton.onclick = (e) => {
    e.stopPropagation();
    if (!selectedTile) return;
    buildings.push(new ArcherTower({ position: selectedTile.position }));
    selectedTile.isOccupied = true;
    const menu = document.getElementById("tower-menu");
    menu.style.display = "none";
  };
}
const mageButton = document.getElementById("mage-tower");
if (mageButton) {
  mageButton.onclick = (e) => {
    e.stopPropagation();
    if (!selectedTile) return;
    buildings.push(new MageTower({ position: selectedTile.position }));
    selectedTile.isOccupied = true;
    const menu = document.getElementById("tower-menu");
    menu.style.display = "none";
  };
}

// ...istniejący kod...

window.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect()

  mouse.x = event.clientX - rect.left
  mouse.y = event.clientY - rect.top

  activeTile = null
  for (let i = 0; i < placementTiles.length; i++) {
    const tile = placementTiles[i]
    if (
      mouse.x > tile.position.x &&
      mouse.x < tile.position.x + tile.size &&
      mouse.y > tile.position.y &&
      mouse.y < tile.position.y + tile.size
    ) {
      activeTile = tile
      break
    }
  }
})




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