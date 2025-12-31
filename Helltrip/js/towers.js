//Tower Template //
class Sprite {
    constructor({position = {x:0 , y:0} , imageSrc , frames = { max : 1 }}){
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
        this.frames = {
            max: frames.max,
            current:0,
            elapsed:0,
            hold:10,
        }
    }
    
    draw() {
        const cropWidth = this.image.width / this.frames.max
        const crop ={
            position : {
                x:cropWidth * this.frames.current,
                y:0,
            },
            width:cropWidth,
            height:this.image.height,
        }
        c.drawImage(
            this.image , 
            crop.position.x ,
            crop.position.y ,
            crop.width,
            crop.height,
            this.position.x ,
            this.position.y,
            crop.width ,
            crop.height,
        )

        this.frames.elapsed++
        if(this.frames.elapsed % this.frames.hold === 0){

        this.frames.current ++
        if(this.frames.current >= this.frames.max - 1 ){
            this.frames.current = 0
        }
    }

    }
}
class Tower {
    constructor({ position = { x: 0, y: 0 }, stats, baseTowerType, imageSrc, frames, offset }) {
        this.position = position;
        this.width = 64 * 2 + 20;
        this.height = 64 + 20;
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        };
        this.projectiles = [];
        this.target = null;
        this.elapsedSpawnCooldown = 0;

        this.name = stats.NAME;
        this.cost = stats.COST;
        this.damage = stats.DAMAGE;
        this.radius = stats.RANGE;
        this.cooldown = stats.COOLDOWN;
        this.upgradeCost = stats.UPGRADE_COST;
        this.sellValue = stats.SELL_VALUE;
        this.level = stats.LEVEL;
        this.upgradeId = stats.UPGRADE_ID;
        this.baseTowerType = baseTowerType;

        if (imageSrc) {
            this.sprite = new Sprite({ position: this.position, imageSrc, frames, offset });
        }
    }

    draw() {
        if (this.sprite) {
            this.sprite.position = this.position;
            this.sprite.draw();
        }
    }

    update() {
        this.draw();
        if (this.sprite) {
            this.sprite.update();
        }

        if (this.damage > 0 && this.elapsedSpawnCooldown % this.cooldown === 0 && this.target) {
            this.projectiles.push(
                new Projectile({
                    position: {
                        x: this.center.x,
                        y: this.center.y + -80,
                    },
                    enemy: this.target,
                    damage: this.damage / this.target.armor
                })
            );
        }
        this.elapsedSpawnCooldown++;
    }
}

//Archer Tower lvl 1//
class ArcherTower extends Tower {
    constructor({ position }) {
        const stats = { ...GAME_STATS.TOWERS.ARCHER.LVL1, LEVEL: 1, UPGRADE_ID: 'ARCHER_LVL2' };
        super({ 
            position,
            stats,
            baseTowerType: 'ARCHER',
            imageSrc: 'media/tower-models/towers/archer-tower-lvl1.png',
            frames: {
                max: 19
            },
            offset: {
                x: -10,
                y:-80,
            }
        });
    }
    
    draw() {
       super.draw();

        if (typeof selectedTower !== 'undefined' && selectedTower === this) {
            c.beginPath();
            c.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
            c.fillStyle = 'rgba(0, 179, 255, 0.37)';
            c.fill();
        }
    }
}
//Archer Tower lvl 2//

class ArcherTowerLvl2 extends Tower {
    constructor({ position }) {
        const stats = { ...GAME_STATS.TOWERS.ARCHER.LVL2, LEVEL: 2, UPGRADE_ID: 'ARCHER_LVL3' };
        super({ position, stats, baseTowerType: 'ARCHER' });
    }

    draw() {
        c.fillStyle = 'darkblue'; // Darker color for upgraded tower
        c.fillRect(this.position.x, this.position.y, this.width, 64);

        if (typeof selectedTower !== 'undefined' && selectedTower === this) {
            c.beginPath();
            c.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
            c.fillStyle = 'rgba(0, 100, 200, 0.4)';
            c.fill();
        }
    }
}

//Archer Tower lvl 3//
class ArcherTowerLvl3 extends Tower {
    constructor({ position }) {
        const stats = { ...GAME_STATS.TOWERS.ARCHER.LVL3, LEVEL: 3, UPGRADE_ID: 'ARCHER_LVL4_CHOICE' };
        super({ position, stats, baseTowerType: 'ARCHER' });
    }

    draw() {
        c.fillStyle = '#0000CD'; // A brighter blue
        c.fillRect(this.position.x, this.position.y, this.width, 64);

        if (typeof selectedTower !== 'undefined' && selectedTower === this) {
            c.beginPath();
            c.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
            c.fillStyle = 'rgba(0, 100, 200, 0.4)';
            c.fill();
        }
    }
}


//Mage Tower lvl 1//
class MageTower extends Tower {
    constructor({ position }) {
        const stats = { ...GAME_STATS.TOWERS.MAGE.LVL1, LEVEL: 1, UPGRADE_ID: 'MAGE_LVL2' };
        super({ position, stats, baseTowerType: 'MAGE' });
    }

    draw() {
        c.fillStyle = 'purple';
        c.fillRect(this.position.x, this.position.y, this.width, 64);

        if (typeof selectedTower !== 'undefined' && selectedTower === this) {
            c.beginPath();
            c.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
            c.fillStyle = 'hsla(273, 53.30%, 47.80%, 0.42)';
            c.fill();
        }
    }
}
//Mage Tower lvl 2//
class MageTowerLvl2 extends Tower {
    constructor({ position }) {
        const stats = { ...GAME_STATS.TOWERS.MAGE.LVL2, LEVEL: 2, UPGRADE_ID: 'MAGE_LVL3' };
        super({ position, stats, baseTowerType: 'MAGE' });
    }

    draw() {
        c.fillStyle = '#6a0dad'; // A deeper purple
        c.fillRect(this.position.x, this.position.y, this.width, 64);

        if (typeof selectedTower !== 'undefined' && selectedTower === this) {
            c.beginPath();
            c.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
            c.fillStyle = 'hsla(273, 70%, 30%, 0.5)';
            c.fill();
        }
    }
}

//Mage Tower lvl 3//
class MageTowerLvl3 extends Tower {
    constructor({ position }) {
        const stats = { ...GAME_STATS.TOWERS.MAGE.LVL3, LEVEL: 3, UPGRADE_ID: 'MAGE_LVL4_CHOICE' };
        super({ position, stats, baseTowerType: 'MAGE' });
    }

    draw() {
        c.fillStyle = '#800080'; // A true purple
        c.fillRect(this.position.x, this.position.y, this.width, 64);

        if (typeof selectedTower !== 'undefined' && selectedTower === this) {
            c.beginPath();
            c.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
            c.fillStyle = 'hsla(300, 100%, 25.1%, 0.5)';
            c.fill();
        }
    }
}

const towerFactory = {
    //Archer Towers//
    
    ARCHER_LVL2: (position) => new ArcherTowerLvl2({ position }),
    ARCHER_LVL3: (position) => new ArcherTowerLvl3({ position }),

    //Mage Towers//

    MAGE_LVL2: (position) => new MageTowerLvl2({ position }),
    MAGE_LVL3: (position) => new MageTowerLvl3({ position }),
};
