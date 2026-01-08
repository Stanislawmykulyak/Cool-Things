let coins = 300;
let hearts = 20;

const stats = {
    towers: {
        archer: {
            lvl1: {
                name: 'Archer',
                damage: 15,
                range: 250,
                cooldown: 0.64,
                cost: 90,
            },
        },
        mage: {
            lvl1: {
                name: 'Mage',      
                damage: 35,
                range: 150,
                cooldown: 0.92,
                cost: 140,
            },
        },
    },
    enemies: {
        orc: {
            health: 110,
            armor: 1.7,
            speed: 60,
            reward: 9,
            healthCost:2,
        },
        goblin: {
            health: 70,
            armor: 1,
            speed: 80,
            reward: 5,
            healthCost:1,
        },
        bat: {
            health: 65,
            armor: 1.1,
            speed: 150,
            reward: 7,
            healthCost:1,
            isFlying: true,
        },
        giantBat: {
            health: 105,
            armor: 1.2,
            speed: 100,
            reward: 11,
            healthCost:2,
            isFlying: true,
        }
    },
    wave_rewards: {
        '1_5': 55,
        '5_11': 75,
        '11_15': 95,
        '15_17': 110,
        '17_20': 135,
        miniboss: 260,
    },
    waves:{
        '1': [
            { type: 'goblin', count: 10, track: 1 , offset:150 },
        ],
        '2': [
            { type: 'goblin', count: 15, track: 1,offset:120 },
        ],
        '3': [
            { type: 'goblin', count: 15, track: 1 , offset:120},
            { type: 'orc', count: 5, track: 2 ,offset:120}
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
            {type:'bat', count:10 , track: 1, offset:180, },
        ],
        '8':[
            {type:'goblin', count:20, track:2, offset:120},
            {type:'orc', count:10, track:2, offset:150},
            {type:'bat', count:10 , track: 1, offset:150, },
        ],
        '9':[
            {type:'goblin', count:25, track:2, offset:100},
            {type:'orc', count:12, track:2, offset:120},
        ]
    }
    
}

