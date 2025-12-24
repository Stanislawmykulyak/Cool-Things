const GAME_STATS = {
    TOWERS: {
        ARCHER: {
            LVL1: {
                NAME: '<br> Archer',
                COST: 100,
                DAMAGE: 10,
                RANGE: 250,
                COOLDOWN: 40,
                UPGRADE_COST: 70,
                SELL_VALUE: 50,
            },
            LVL2: {
                NAME: 'Marksman',
                COST: 170,
                DAMAGE: 25,
                RANGE: 300,
                COOLDOWN: 35,
                UPGRADE_COST: 0,
                SELL_VALUE: 120,
            }
        },
        MAGE: {
            LVL1: {
                NAME: '<br> Mage',
                COST: 170,
                DAMAGE: 40,
                RANGE: 200,
                COOLDOWN: 100,
                UPGRADE_COST: 120,
                SELL_VALUE: 85,
            },
            LVL2: {
                NAME: 'Archmage',
                COST: 290,
                DAMAGE: 85,
                RANGE: 225,
                COOLDOWN: 90,
                UPGRADE_COST: 0,
                SELL_VALUE: 205,
            }
        },
        BARRACKS: {
            LVL1: { NAME: 'Barracks', COST: 100, DAMAGE: 0, RANGE: 0, COOLDOWN: 0, UPGRADE_COST: 50, SELL_VALUE: 50, },
            LVL2: { NAME: 'Garrison', COST: 150, DAMAGE: 0, RANGE: 0, COOLDOWN: 0, UPGRADE_COST: 0, SELL_VALUE: 100, }
        },
        WILD_HUNTER: {
            LVL1: { NAME: 'Wild Hunter', COST: 310, DAMAGE: 50, RANGE: 400, COOLDOWN: 80, UPGRADE_COST: 150, SELL_VALUE: 155, },
            LVL2: { NAME: 'Beast Hunter', COST: 460, DAMAGE: 90, RANGE: 450, COOLDOWN: 70, UPGRADE_COST: 0, SELL_VALUE: 310, }
        },
        ENGINEER: {
            LVL1: { NAME: 'Engineer', COST: 230, DAMAGE: 20, RANGE: 150, COOLDOWN: 60, UPGRADE_COST: 110, SELL_VALUE: 115, },
            LVL2: { NAME: 'Workshop ', COST: 340, DAMAGE: 45, RANGE: 175, COOLDOWN: 50, UPGRADE_COST: 0, SELL_VALUE: 225, }
        }
    },
    ENEMIES: {
        ENEMY: {
            HEALTH: 120,
            ARMOR: 1,
            SPEED: 1.2,
        },
        WOLF: {
            HEALTH: 75,
            ARMOR: 0.7,
            SPEED: 2.5
        },
        KNIGHT: {
            HEALTH: 125,
            ARMOR: 10.5,
            SPEED: 0.7
        },
    }
};
