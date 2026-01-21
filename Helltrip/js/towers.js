class Sprite {
    constructor({ position = { x: 0, y: 0 }, imageSrc, frames = { max: 1 }, offset = { x: 0, y: 0 } }) {
        this.position = position;
        this.image = new Image();
        if (imageSrc) {
            this.image.src = imageSrc;
        }
        this.frames = {
            max: frames.max,
            current: 0,
            elapsed: 0,
            hold: 0.07,
        };
        this.offset = offset;
    }

    draw() {
        if (!this.image.src) return;
        const cropWidth = this.image.width / this.frames.max;
        const crop = {
            position: { x: cropWidth * this.frames.current, y: 0 },
            width: cropWidth,
            height: this.image.height
        };
        c.drawImage(
            this.image,
            crop.position.x, crop.position.y, crop.width, crop.height,
            this.position.x + this.offset.x, this.position.y + this.offset.y,
            crop.width, crop.height
        );
    }

    update(dt) {
        this.frames.elapsed += dt;
        if (this.frames.elapsed >= this.frames.hold) {
            this.frames.elapsed = 0;
            this.frames.current++;
            if (this.frames.current >= this.frames.max) {
                this.frames.current = 0;
            }
        }
    }
}
class Tower {
    constructor({ position = { x: 0, y: 0 }, stats, baseTowerType, imageSrc, frames, offset }) {
        this.position = position;
        this.width = 64 * 2;
        this.height = 64 + 30;
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        };
        this.projectiles = [];
        this.target = null;
        this.elapsedSpawnCooldown = 0;

        this.name = stats.name;
        this.cost = stats.cost;
        this.damage = stats.damage;
        this.radius = stats.range;
        this.cooldown = stats.cooldown;
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
    update(dt) {
        if (this.target && this.sprite) {
            this.sprite.update(dt); 
        } else if (this.sprite) {
            this.sprite.frames.current = 0;
        }
    }
}

//Archer Tower lvl 1//
class ArcherTower extends Tower {
    constructor({ position }) {
        const towerStats = { ...stats.towers.archer.lvl1 };
        super({ 
            position,
            stats: towerStats,
            baseTowerType: 'Archer',
            imageSrc: 'media/tower-models/towers/archer-tower-smoll.png',
            frames: {
                max: 1
            },
            offset: {
                x: -10,
                y:-80,
            }
        });
    }
    
    draw() {
       super.draw();
    }
    update(dt) {
    if (this.target) {
        this.elapsedSpawnCooldown += dt;
        if (this.damage > 0 && this.elapsedSpawnCooldown >= this.cooldown) {
            this.projectiles.push(
                new ArcherProjectile({
                    position: {
                        x: this.center.x - 30,
                        y: this.center.y - 115,
                    },
                    enemy: this.target,
                    damage: this.damage / this.target.armor
                })
            );
            this.elapsedSpawnCooldown = 0;
        }
    }
    super.update(dt);
    }
    
}

//Mage Tower lvl 1 //
class MageTower extends Tower {
    constructor({ position }) {
        const towerStats = { ...stats.towers.mage.lvl1 };
        super({ 
            position,
            stats: towerStats,
            baseTowerType: 'Mage',
            imageSrc: 'media/tower-models/towers/mage-tower-lvl1.png',
            frames: {
                max: 19
            },
            offset: {
                x: -12,
                y:-110,
            }
        });
    }
    
    draw() {
       super.draw();
    }
    update(dt) {
    if (this.target) {
        this.elapsedSpawnCooldown += dt;
        if (this.damage > 0 && this.elapsedSpawnCooldown >= this.cooldown) {
            this.projectiles.push(
                new MageProjectile({
                    position: {
                        x: this.center.x - 30,
                        y: this.center.y - 135,
                    },
                    enemy: this.target,
                    damage: this.damage / this.target.armor
                })
            );
            this.elapsedSpawnCooldown = 0;
        }
    }
    super.update(dt);
}
}
