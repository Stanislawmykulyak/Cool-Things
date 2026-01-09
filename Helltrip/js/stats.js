let coins = 350;
let hearts = 20;

const stats = {
    towers: {
        archer: {
            lvl1: {
                name: 'Archer',
                damage: 15,
                range: 300,
                cooldown: 0.64,
                cost: 90,
            },
        },
        mage: {
            lvl1: {
                name: 'Mage',      
                damage: 35,
                range: 220,
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
        },
        gobChamp:{
            health:750,
            armor:2.9,
            speed:35,
            reward:250,
            healthCost:15,
            isMiniBoss:true,
        },
        gobGiant:{
            health:350,
            armor:2.3,
            speed:30,
            reward:35,
            healthCost:10,
        },
        goblinChief:{
            health:2500,
            armor:3.6,
            speed:25,
            reward:500,
            healthCost:25,
            isBoss:true,
        }

    },

    waves:{
        '1': [
            { type: 'goblin ', count: 1,track: 1 , offset:180, hold: 0 },
        ],
        
        '2': [
            { type: 'goblin', count: 13, track: 1, offset:160, hold: 0 },
        ],
        '3':[
            { type: 'goblin', count: 17, track: 1,offset:120, hold: 0 },
        ],
        '4': [
            { type: 'orc', count: 5, track: 1 ,offset:150 , hold: 0},
        ],
        '5': [
            { type: 'orc', count: 5, track: 2 ,offset:120 , hold:0},
            { type: 'goblin', count: 15, track: 1 , offset:120, hold:0 },
        ],
        '6':[
            {type: 'orc', count: 5, track: 2 ,offset:120},
            {type: 'orc', count: 7, track: 1 ,offset:120},
        ],
        '7':[
            {type: 'goblin', count: 7, track: 2 , offset:80},
            {type: 'orc', count: 7, track: 1 ,offset:100},
            {type: 'goblin', count: 7, track: 2 , offset:80 },
            {type: 'orc', count: 4, track: 1 ,offset:100},
        ],
        '8':[
            {type:'bat', count:10 , track: 1, offset:180, },
        ],
        '9':[
            {type:'goblin', count:20, track:2, offset:120},
            {type:'orc', count:10, track:2, offset:150},
            {type:'bat', count:10 , track: 1, offset:150, },
        ],
        '10':[
            {type:'goblin', count:25, track:2, offset:100},
            {type:'orc', count:12, track:2, offset:120},
            {type:'giantBat', count:7 , track: 1, offset:120, },
        ],
        '11': [
            {type: 'gobChamp', count: 1, track: 1 ,offset:100, hold: 0 },
            {type:'goblin', count: 8, track: 1 , offset:100, hold: 3},      
            {type:'orc', count:5, track:2, offset:100,hold:2},
            {type:'goblin', count:15, track:1, offset:90, },   
        ],
        '12':[
            {type:'bat', count:20, track: 1, offset:80, },
            {type:'giantBat', count:10 , track: 1, offset:120, },
        ],
        '13':[
            {type:'goblin', count: 8, track: 2 , offset:80,},      
            {type:'orc', count:10, track:1, offset:100,},
            {type:'goblin', count:25, track:2, offset:90, },
        ],
        '14':[
            {type: 'gobGiant', count: 2, track: 1 ,offset:200, hold: 0},
        ],
        '15':[
            {type: 'gobGiant', count: 1, track: 1 ,offset:200,},
            {type:'goblin', count: 8, track: 1 , offset:80,},
            {type: 'gobGiant', count: 1, track: 2 ,offset:200, hold: 2},     
            {type:'orc', count:10, track:2, offset:100,},
            {type:'goblin', count:25, track:1, offset:90, },
        ],
        '16':[
            {type: 'gobGiant', count: 1, track: 1 ,offset:200,},
            {type:'goblin', count: 8, track: 1 , offset:80,}, 
            {type:'orc', count:10, track:2, offset:100,},
            {type:'goblin', count:25, track:1, offset:90, },
            {type:'bat', count:20, track: 2, offset:80, },
        ],
        '17':[
            {type: 'gobGiant', count: 3, track: 1 ,offset:200,}, 
            {type:'orc', count:7, track:2, offset:100,},
            {type: 'gobGiant', count: 2, track: 1 ,offset:200,}, 
            {type:'orc', count:13, track:2, offset:100,},
        ],
        '18':[
            {type: 'gobGiant', count: 1, track: 1 ,offset:200,},
            {type:'bat', count:25, track: 1, offset:80, },
            {type:'giantBat', count:15 , track: 2, offset:120, },
            {type: 'gobGiant', count: 1, track: 2 ,offset:200,},
            {type:'bat', count:15, track: 1, offset:70, },
        ],
        '19':[
            {type:'bat', count:20, track: 2, offset:80, },
            {type: 'gobGiant', count: 5, track: 1 ,offset:130,},
            {type:'goblin', count: 8, track: 1 , offset:80,}, 
            {type:'giantBat', count:15 , track: 2, offset:120, },
            {type:'orc', count:10, track:2, offset:100,},
            {type:'goblin', count:25, track:1, offset:90, },
            {type:'bat', count:20, track: 2, offset:90, }
        ],
        '20':[
            {type:'goblinChief',count: 1, track: 1 ,offset:130,},
            {type:'gobGiant', count: 1, track: 1 ,offset:130, hold:10},
            {type:'gobChamp', count: 1, track: 2 ,offset:130,hold:8},
            {type:'gobGiant', count: 2, track: 2 ,offset:130,hold:7},
            {type:'gobChamp', count: 1, track: 1 ,offset:130,hold:5},
        ],

    }
    
}
