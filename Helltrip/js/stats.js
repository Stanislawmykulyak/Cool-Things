let coins = 350;
let hearts = 10;

const stats = {
    towers: {
        archer: {
            lvl1: {
                name: 'Archer',
                damage: 15,
                range: 250,
                cooldown: 0.83, // Shoots every 0.83 seconds
                cost: 90,
            },
        },
        mage: {
            lvl1: {
                name: 'Mage',      
                damage: 35,
                range: 150,
                cooldown: 1.2, // Shoots every 1.2 seconds
                cost: 140,
            },
        },
        barracks: {
            lvl1:{
                name: 'Barracks',
                range: 150,
                cost: 90,
            }
        },
        // ... (Keep your other stats as they are, but convert cooldowns to seconds if needed)
    },
    enemies: {
        orc: {
            health: 110,
            armor: 1.7,
            speed: 30, // 30 pixels per second
            reward: 5,
        },
        goblin: {
            health: 70,
            armor: 1,
            speed: 42, // 42 pixels per second
            reward: 3,
        },
        bat: {
            health: 75,
            armor: 1.1,
            speed: 120, // 60 pixels per second
            reward: 5,
            isFlying: true,
        }
    },
    wave_rewards: {
        '1_5': 35,
        '5_11': 45,
        '11_15': 65,
        '15_17': 80,
        '17_20': 100,
        miniboss: 260,
    },
    waves:{
        '1': [
            { type: 'bat', count: 15, track: 1 , offset:150 },
        ],
        '2': [
            { type: 'goblin', count: 12, track: 1,offset:120 },
        ],
        '3': [
            { type: 'goblin', count: 15, track: 1 , offset:120},
            { type: 'orc', count: 5, track: 1 ,offset:120}
        ],
        '4': [
            { type: 'orc', count: 5, track: 2 ,offset:120},
            { type: 'goblin', count: 20, track: 1,offset:120 },
        ],
        '5':[
            {type: 'orc', count: 5, track: 2 ,offset:120},
            {type: 'orc', count: 7, track: 1 ,offset:120},
        ],
        '6':[
            {type: 'goblin', count: 7, track: 1 , offset:80},
            {type: 'goblin', count: 7, track: 2 , offset:80 },
            {type: 'orc', count: 7, track: 1 ,offset:100},
            {type: 'orc', count: 4, track: 2 ,offset:100},

        ],
        '7':[
            {type:'bat', count:1 , track: 1, offset:160, },
        ]
    }
    
}

