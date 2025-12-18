// Tower stats data
const towerData = {
    archer: {
        name: 'Archer Tower Stats',
        description: 'A basic tower that shoots arrows at enemies from a distance.',
        attackSpeed: '1.0s',
        damage: '15',
        range: '120',
        ability: 'None'
    },
    mage: {
        name: 'Mage Tower Stats',
        description: 'A magic tower that casts spells on enemies.',
        attackSpeed: '1.5s',
        damage: '20',
        range: '150',
        ability: 'Chain Lightning'
    },
    engineer: {
        name: 'Engineer Tower Stats',
        description: 'A utility tower that builds defensive structures.',
        attackSpeed: '2.0s',
        damage: '10',
        range: '100',
        ability: 'Deploy Turret'
    },
    'wild-hunter': {
        name: 'Wild Hunter Tower Stats',
        description: 'A fast tower that shoots multiple targets.',
        attackSpeed: '0.8s',
        damage: '12',
        range: '130',
        ability: 'Multi-Shot'
    },
    barracks: {
        name: 'Barracks Stats',
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
    document.getElementById('stats-attack-speed').textContent = 'Attack Speed: ' + stats.attackSpeed;
    document.getElementById('stats-damage').textContent = 'Damage: ' + stats.damage;
    document.getElementById('stats-range').textContent = 'Range: ' + stats.range;
    document.getElementById('stats-ability').textContent = 'Ability: ' + stats.ability;
    
    statsDiv.classList.toggle('hidden');
}

Object.keys(towerData).forEach(towerId => {
    const tower = document.getElementById(towerId);
    if (tower) {
        tower.addEventListener('click', () => showTowerStats(towerId));
    }
});