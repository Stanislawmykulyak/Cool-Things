let coins = 500;
let hearts = 10;

const stats = {
        tower_stats: {
        archer: {
            LVL1: {
                NAME: '<br> Archer',
                COST: 100,
                DAMAGE: 10,
                RANGE: 250,
                COOLDOWN: 0.5,
                SELL_VALUE: 50,
            }
        },
        mage: {
            LVL1: {
                NAME: '<br> Mage',
                COST: 170,
                DAMAGE: 40,
                RANGE: 200,
                COOLDOWN: 1,
                SELL_VALUE: 85,
            }
        },
        barracks: {
            LVL1: { NAME: 'Barracks', COST: 100, DAMAGE: 0, RANGE: 0, COOLDOWN: 0, SELL_VALUE: 50, }
        },
        WILD_HUNTER: {
            LVL1: { NAME: 'Wild Hunter', COST: 310, DAMAGE: 50, RANGE: 400, COOLDOWN: 80, SELL_VALUE: 155, }
        },
        ENGINEER: {
            LVL1: { NAME: 'Engineer', COST: 230, DAMAGE: 20, RANGE: 150, COOLDOWN: 60, SELL_VALUE: 115, }
        }
    },
    enemies: {
        Enemy: {
            HEALTH: 120,
            ARMOR: 1,
            SPEED: 1,
            reward:7,
        },
        Wolf: {
            HEALTH: 75,
            ARMOR: 0.7,
            SPEED: 2.5,
            reward: 7,
        },
        Knight: {
            HEALTH: 125,
            ARMOR: 3.5,
            SPEED: 0.7,
            reward: 15,
        },
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
    sell_value: {
        lvl1: {
            archer: 65,
            mage: 100,
            barracks: 65,
            wild_hunter: 200,
            engineer: 150,
        }
    },
    tower_cost: {
        lvl1: {
            archer: 100,
            mage: 170,
            barracks: 100,
            wild_hunter: 310,
            engineer: 260,
        }
    },
    tower_stats: {
        archer_lvl1:{
            cost:100,
            cooldown:0.5,
        }
    },
};