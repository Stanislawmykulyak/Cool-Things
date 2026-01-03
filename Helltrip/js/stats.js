let coins = 500;
let hearts = 10;

const stats = {
    towers: {
        archer: {
            lvl1: {
                name: 'Archer',
                damage: 10,
                range: 250,
                cooldown: 50,
                cost: 90,
            },
        },
        mage: {
            lvl1: {
                name: 'Mage',      
                damage: 40,
                range: 200,
                cooldown: 100,
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
            health:100,
            armor:1.5,
            speed:1.1,
            reward:9,


        }
    },

    enemy_rewards: {
        knight: 7,
        dark_knight: 18,
        bandit: 5,
        rogue: 3,
        goblin: 2,
        wolf: 1,
    },

    wave_rewards: {
        '1_11': 45,
        '11_21': 75,
        '21_41': 100,
        '41_47': 130,
        '47_50': 145,
        miniboss: 260,
    },
}