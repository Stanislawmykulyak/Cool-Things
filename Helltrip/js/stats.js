let coins = 300;
let hearts = 10;

const stats = {
    towers: {
        archer: {
            lvl1: {
                name: 'Archer',
                damage: 15,
                range: 250,
                cooldown: 0.5,
                cost: 90,
            },
        },
        mage: {
            lvl1: {
                name: 'Mage',      
                damage: 35,
                range: 150,
                cooldown: 1.2,
                cost: 140,
            },
        },
        barracks: {
            lvl1:{
                name: 'Barracks',
                range:150,
                cost: 90,
            }
        },
        wild_hunter: {
            lvl1: { name: 'Wild Hunter', cost: 310, damage: 50, range: 400, cooldown: 80, },
        },
        engineer: {
            lvl1: { name: 'Engineer', cost: 230, damage: 20, range: 150, cooldown: 60, },
        }
    },
    enemies: {
        enemy: {
            health: 120,
            armor: 1,
            speed: 1,
            reward: 10
        },
        wolf: {
            health: 75,
            armor: 0.7,
            speed: 2.5,
            reward: 7
        },
        knight: {
            health: 125,
            armor: 3.5,
            speed: 0.7,
            reward: 15
        },
        orc:{
            health:110,
            armor:1.7,
            speed:0.5,
            reward:9,
        },
        goblin:{
            health:70,
            armor:1,
            speed:0.7,
            reward:3,
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
            { type: 'goblin', count: 15, track: 1 , offset:150 },
        ],
        '2': [
            { type: 'goblin', count: 12, track: 1,offset:120 }
        ],
        '3': [
            { type: 'goblin', count: 15, track: 1 , offset:120},
            { type: 'orc', count: 5, track: 1 ,offset:120}
        ],
        '4': [
            { type: 'orc', count: 5, track: 2 ,offset:120},
            { type: 'goblin', count: 20, track: 1,offset:120 }
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

        ]
    }
    
}

