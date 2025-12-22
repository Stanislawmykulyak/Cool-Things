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


canvas.addEventListener("click", (event) => {
  if (!activeTile || activeTile.isOccupied) return

  selectedTile = activeTile

  const menu = document.getElementById("tower-menu")


  const rect = canvas.getBoundingClientRect()

  const tileScreenX = rect.left + activeTile.position.x + activeTile.size / 2
  const tileScreenY = rect.top + activeTile.position.y + activeTile.size / 2


  menu.style.left = `${tileScreenX}px`
  menu.style.top = `${tileScreenY}px`

  menu.style.display = "block"
  arrangeButtonsInCircle()

  const archerButton = document.getElementById("archer-tower")
  const mageButton = document.getElementById("mage-tower")
  const closeButton = document.getElementById("close-tower-menu")

  menu.addEventListener("click", (e) => e.stopPropagation())

  archerButton.onclick = (e) => {
      e.stopPropagation()
      if (!selectedTile) return;

      buildings.push(new ArcherTower({ position: selectedTile.position }))
      selectedTile.isOccupied = true
      menu.style.display = "none"
  }

  mageButton.onclick = (e) => {
      e.stopPropagation()
      if (!selectedTile) return;

      buildings.push(new MageTower({ position: selectedTile.position }))
      selectedTile.isOccupied = true
      menu.style.display = "none"
  }

  closeButton.onclick = (e) => {
      e.stopPropagation()
      menu.style.display = "none"
      selectedTile = null
  }
  })


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



// Hide old menu (when clicking outside) — keep default hidden until tile click
window.addEventListener('click', (event) => {
  const menu = document.querySelector('.tower-choice');
  const statsDiv = document.getElementById('tower-stats');
  if (menu && !menu.contains(event.target) && event.target !== canvas && (!statsDiv || !statsDiv.contains(event.target))) {
    // only hide when clicking outside menu/stats/canvas
    menu.style.display = 'none';
    selectedTile = null;
  }
});

// Show on canvas click (when active tile clicked)
canvas.addEventListener('click', (event) => {
  if (!activeTile || activeTile.isOccupied) return;
  showTowerChoiceAtTile(activeTile);
});

// Center menu on tile and use translate(-50%,-50%) so border/padding don't affect centering
function showTowerChoiceAtTile(tile) {
  const menu = document.querySelector('.tower-choice');
  if (!menu || !tile) return;
  const rect = canvas.getBoundingClientRect();
  const centerX = rect.left + tile.position.x + tile.size / 2;
  const centerY = rect.top + tile.position.y + tile.size / 2;
  menu.style.display = 'block';
  menu.style.position = 'fixed';
  menu.style.left = `${centerX}px`;
  menu.style.top = `${centerY}px`;
  menu.style.transform = 'translate(-50%, -50%)';
  menu.style.zIndex = '1000';
  selectedTile = tile;
  requestAnimationFrame(() => arrangeTowerOptionsInCircle(menu));
}

function hideTowerChoice() {
  const menu = document.querySelector('.tower-choice');
  if (menu) menu.style.display = 'none';
  const statsDiv = document.getElementById('tower-stats');
  if (statsDiv) statsDiv.classList.add('hidden');
  const btnPlace = document.getElementById('place-tower-btn');
  if (btnPlace) btnPlace.remove();
  selectedTowerId = null;
  selectedTile = null;
}

// Arrange options on top-half of circle based on actual menu size
function arrangeTowerOptionsInCircle(menu) {
  if (!menu) return;
  const buttons = menu.querySelectorAll('.tower-option');
  const count = buttons.length;
  if (count === 0) return;

  const menuRect = menu.getBoundingClientRect();
  const centerX = menu.clientWidth / 2;
  const centerY = menu.clientHeight / 2;
  const buttonHalf = (buttons[0].offsetWidth || 80) / 2;
  const radius = Math.min(centerX, centerY) - buttonHalf - 8; // safe padding

  buttons.forEach((btn, i) => {
    let angle;
    if (count === 1) angle = -Math.PI / 2;
    else angle = -Math.PI / 2 + (i / (count - 1)) * Math.PI; // -90 to +90

    const x = centerX + Math.cos(angle) * radius - buttonHalf;
    const y = centerY + Math.sin(angle) * radius - buttonHalf;

    btn.style.position = 'absolute';
    btn.style.left = `${Math.round(x)}px`;
    btn.style.top = `${Math.round(y)}px`;

    // Setup click to show stats and place button
    btn.onclick = (e) => {
      e.stopPropagation();
      const towerId = btn.id;
      selectedTowerId = towerId;
      const stats = towerData[towerId];
      const statsDiv = document.getElementById('tower-stats');
      document.getElementById('stats-title').textContent = stats.name;
      document.getElementById('stats-description').textContent = stats.description;
      document.getElementById('stats-attack-speed').innerHTML = 'Attack Speed <img src="media/wind.png" height="40" width="40"></img>: ' + stats.attackSpeed;
      document.getElementById('stats-damage').innerHTML = 'Damage <img src="media/sword.png" height="40" width="40"></img>: ' + stats.damage;
      document.getElementById('stats-range').innerHTML = 'Range <img src="media/bullseye.png" height="50" width="50"></img>: ' + stats.range;
      document.getElementById('stats-ability').textContent = 'Special Ability: ' + stats.ability;
      statsDiv.classList.remove('hidden');

      let btnPlace = document.getElementById('place-tower-btn');
      if (!btnPlace) {
        btnPlace = document.createElement('button');
        btnPlace.id = 'place-tower-btn';
        btnPlace.textContent = 'Place tower';
        btnPlace.style.marginTop = '20px';
        btnPlace.style.fontSize = '18px';
        document.querySelector('.stats-container').appendChild(btnPlace);
      }

      btnPlace.onclick = (ev) => {
        ev.stopPropagation();
        if (!selectedTile || !selectedTowerId) return;
        placeTowerOnTile(selectedTile, selectedTowerId);
        statsDiv.classList.add('hidden');
        btnPlace.remove();
        selectedTowerId = null;
        hideTowerChoice();
      };
    };
  });
}
