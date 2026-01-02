let coins = 500;
let hearts = 10;

const stats = {
    STAT_LABELS: {
        DAMAGE: 'Damage',
        RANGE: 'Range',
        COOLDOWN: 'Cooldown',
        COST: 'Cost'
    },
    TOWERS: {
        ARCHER: {
            LVL1: {
                NAME: '<br> Archer',
                COST: 100,
                DAMAGE: 10,
                RANGE: 250,
                COOLDOWN: 50,
            },
        },
        MAGE: {
            LVL1: {
                NAME: '<br> Mage',
                COST: 170,
                DAMAGE: 40,
                RANGE: 200,
                COOLDOWN: 100,
            },
        },
        BARRACKS: {
            LVL1: { NAME: 'Barracks', COST: 100, DAMAGE: 0, RANGE: 0, COOLDOWN: 0, },
        },
        WILD_HUNTER: {
            LVL1: { NAME: 'Wild Hunter', COST: 310, DAMAGE: 50, RANGE: 400, COOLDOWN: 80, },
        },
        ENGINEER: {
            LVL1: { NAME: 'Engineer', COST: 230, DAMAGE: 20, RANGE: 150, COOLDOWN: 60, },
        }
    },
    ENEMIES: {
        ENEMY: {
            HEALTH: 120,
            ARMOR: 1,
            SPEED: 1,
            reward: 10
        },
        WOLF: {
            HEALTH: 75,
            ARMOR: 0.7,
            SPEED: 2.5,
            reward: 7
        },
        KNIGHT: {
            HEALTH: 125,
            ARMOR: 3.5,
            SPEED: 0.7,
            reward: 15
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
}