// Tower stats data
const towerData = {
    archer: {
        name: 'Archer Tower',
        description: '"A basic tower which shoots arrows at enemies from a great distance."',
        attackSpeed: '1.0s',
        damage: '15',
        range: '120',
        ability: 'None'
    },
    mage: {
        name: 'Mage Tower',
        description: 'A magic tower that casts spells on enemies.',
        attackSpeed: '1.5s',
        damage: '20',
        range: '150',
        ability: 'Chain Lightning'
    },
    engineer: {
        name: 'Engineer Tower',
        description: 'A utility tower that builds defensive structures.',
        attackSpeed: '2.0s',
        damage: '10',
        range: '100',
        ability: 'Deploy Turret'
    },
    'wild-hunter': {
        name: 'Wild Hunter Tower',
        description: 'A fast tower that shoots multiple targets.',
        attackSpeed: '0.8s',
        damage: '12',
        range: '130',
        ability: 'Multi-Shot'
    },
    barracks: {
        name: 'Barracks',
        description: 'A support tower that trains units.',
        attackSpeed: '3.0s',
        damage: '8',
        range: '80',
        ability: 'Summon Unit'
    }
};

function showTowerStats(towerId) {
    const stats = towerData[towerId];
    const statsDiv = document.getElementById('tower-stats');
    
    document.getElementById('stats-title').textContent = stats.name;
    document.getElementById('stats-description').textContent = stats.description;
    document.getElementById('stats-attack-speed').innerHTML = 'Attack Speed <img src="media/wind.png" height="40" width="40"></img>: ' + stats.attackSpeed;
    document.getElementById('stats-damage').innerHTML = 'Damage <img src="media/sword.png" height="40" width="40"></img>: ' + stats.damage;
    document.getElementById('stats-range').innerHTML = 'Range <img src="media/bullseye.png" height="50" width="50"></img>: ' + stats.range;
    document.getElementById('stats-ability').textContent = 'Special Ability: ' + stats.ability;
    
    statsDiv.classList.toggle('hidden');
}

Object.keys(towerData).forEach(towerId => {
    const tower = document.getElementById(towerId);
    if (tower) {
        tower.addEventListener('click', () => showTowerStats(towerId));
    }
});