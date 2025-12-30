//Tower Template //

class Tower {
    constructor({ position = { x: 0, y: 0 }, stats}) {
        this.position = position;
        this.width = 64 * 2;
        this.height = 64;
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        };
        this.projectiles = [];
        this.target = null;
        this.frames = 0;

        this.name = stats.NAME;
        this.cost = stats.COST;
        this.damage = stats.DAMAGE;
        this.radius = stats.RANGE;
        this.cooldown = stats.COOLDOWN;
        this.upgradeCost = stats.UPGRADE_COST;
        this.sellValue = stats.SELL_VALUE;
        this.level = stats.LEVEL;
        this.upgradeId = stats.UPGRADE_ID;
    }

    draw() {

    }

    update() {
        this.draw();
        if (this.damage > 0 && this.frames % this.cooldown === 0 && this.target) {
            this.projectiles.push(
                new Projectile({
                    position: {
                        x: this.center.x,
                        y: this.center.y
                    },
                    enemy: this.target,
                    damage: this.damage / this.target.armor
                })
            );
        }
        this.frames++;
    }
}

//Archer Tower lvl 1//
class ArcherTower extends Tower {
    constructor({ position }) {
        const stats = { ...GAME_STATS.TOWERS.ARCHER.LVL1, LEVEL: 1, UPGRADE_ID: 'ARCHER_LVL2' };
        super({ position, stats });
    }

    draw() {
        c.fillStyle = 'blue';
        c.fillRect(this.position.x, this.position.y, this.width, 64);

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
        const stats = { ...GAME_STATS.TOWERS.ARCHER.LVL2, LEVEL: 2, UPGRADE_ID: null };
        super({ position, stats });
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

//Mage Tower lvl 1//
class MageTower extends Tower {
    constructor({ position }) {
        const stats = { ...GAME_STATS.TOWERS.MAGE.LVL1, LEVEL: 1, UPGRADE_ID: 'MAGE_LVL2' };
        super({ position, stats });
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
        const stats = { ...GAME_STATS.TOWERS.MAGE.LVL2, LEVEL: 2, UPGRADE_ID: null };
        super({ position, stats });
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

const towerFactory = {
    ARCHER_LVL2: (position) => new ArcherTowerLvl2({ position }),
    MAGE_LVL2: (position) => new MageTowerLvl2({ position }),
};
