const GAME_STATS = {
    STAT_LABELS: {
        DAMAGE: 'Damage',
        RANGE: 'Range',
        COOLDOWN: 'Cooldown',
        UPGRADE_COST: 'Upgrade',
        SELL_VALUE: 'Sellback',
        COST: 'Cost'
    },
    TOWERS: {
        ARCHER: {
            LVL1: {
                NAME: '<br> Archer',
                COST: 100,
                DAMAGE: 10,
                RANGE: 250,
                COOLDOWN: 40,
                UPGRADE_COST: 0,
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
    }
};
let coins = 500;
let hearts = 10;

const stats = {

    enemy_rewards: {
        knight:7,    
        dark_knight:18,
        bandit:5,
        rogue:3,
        goblin:2,
        wolf:1,
    },
    
    wave_rewards:{
        '1_11':45,
        '11_21':75,
        '21_41':100,
        '41_47':130,
        '47_50':145,
        miniboss:260,
    },

    sell_value:{
        lvl1: {
            archer:65,
            mage:100,
            barracks:65,
            wild_hunter:200,
            engineer:150,
        },
        lvl2: {
            archer:155,
            mage:220,
            barracks:155,
            wild_hunter:350,
            engineer:270,
        }
    },

    tower_cost: {
        
        lvl1: {
            archer:100,
            mage:170,
            barracks:100,
            wild_hunter:310,
            engineer:260,
        },

        lvl2: {
            archer:135,
            mage:190,
            barracks:120,
            wild_hunter:260,
            engineer:170,
        },

        lvl3: {
            archer:185,
            mage:250,
            barracks:180,
            wild_hunter:350,
            engineer:230,
        },

        lvl4:{
            //archer lvl4 //
            ranger:310,
            royal_archer:410,
            //mage lvl4 //
            sorcerer:480,
            archmage:530,
            //barracks lvl4 //
            paladin:410,
            viking:330,
            //wild hunter lvl4 //
            beast_master:410,
            soul_hunter:520,
            //engineer lvl4 //
            workshop:440,
            master_engineer:470,
        }
    },

}

