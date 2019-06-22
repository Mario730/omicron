var hero;
var heroDirection;
var up;
var updown;
var left;
var leftdown;
var down;
var downdown;
var right;
var rightdown;
var space;
var spacedown;

class EnvironmentObject extends Phaser.GameObjects.Image {
    constructor(scene, x, y, cellType) {
        let frame = 0;
        if (cellType == "7") {
            frame = 0;
        }
        if (cellType == "8") {
            const topwall = [1,2,3,4];
            frame = topwall[Math.floor(Math.random()*topwall.length)];
        }
        if (cellType == "9") {
            frame = 5;
        }
        if (cellType == "4") {
            const leftwall = [10,20,30];
            frame = leftwall[Math.floor(Math.random()*leftwall.length)];
        }
        if (cellType == "6") {
            const rightwall = [15,25,35];
            frame = rightwall[Math.floor(Math.random()*rightwall.length)];
        }
        if (cellType == "1") {
            frame = 40;
        }
        if (cellType == "2") {
            const bottomwall = [41,42,43,44];
            frame = bottomwall[Math.floor(Math.random()*bottomwall.length)];
        }
        if (cellType == "3") {
            frame = 45;
        }
        if (cellType == "q") {
            frame = 11;
        }
        if (cellType == "w") {
            const w = [12,13]
            frame = w[Math.floor(Math.random()*w.length)];
        }
        if (cellType == "e") {
            frame = 14;
        }
        if (cellType == "a") {
            frame = 21;
        }
        if (cellType == "s") {
            const s = [6,7,8,9,16,17,18,19,26,27,28,29];
            frame = s[Math.floor(Math.random()*s.length)];
        }
        if (cellType == "d") {
            frame = 24;
        }
        if (cellType == "z") {
            frame = 31;
        }
        if (cellType == "x") {
            const x = [32,33];
            frame = x[Math.floor(Math.random()*x.length)];
        }
        if (cellType == "c") {
            frame = 34;
        }
        super(scene, x, y, 'tilesheet', frame);
        this.scene = scene;
        this.x = x*32;
        this.y = y*32;
        this.setOrigin(0);
        this.setScale(2);
        this.scene.add.existing(this);
    }
}

class Wall extends EnvironmentObject {
    constructor(scene, x, y, cellType) {
        super(scene, x, y, cellType);
        this.scene.physics.world.enable(this, Phaser.STATIC_BODY);
        this.body.setImmovable(true);
        this.body.syncBounds = true;
        this.scene.physics.add.collider(this, hero);
    }
}

class Being extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.x = x*32;
        this.y = y*32;
        this.setScale(2);
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.body.syncBounds = true;
    }
}

class Hero extends Being {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.setScale(1.5);
    }
}

class SceneMain extends Phaser.Scene {
    constructor() {
        super({key: 'SceneMain'});
    }
    
    preload() {
        this.load.spritesheet('tilesheet', 'assets/character_and_tileset/Dungeon_Tileset.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('hero-idle', 'assets/Character_animation/hero/idle.png', {frameWidth: 16, frameHeight: 24});
        this.load.spritesheet('hero-run', 'assets/Character_animation/hero/run.png', {frameWidth: 16, frameHeight: 24});
        this.load.spritesheet('hero-attack', 'assets/Character_animation/hero/attack.png', {frameWidth: 24, frameHeight: 24});
    }

    create() {
        var camera = this.cameras.main;
        up = this.input.keyboard.addKey('W');
        left = this.input.keyboard.addKey('A');
        down = this.input.keyboard.addKey('S');
        right = this.input.keyboard.addKey('D');
        space = this.input.keyboard.addKey('space');
        this.anims.create({
            key: 'heroidleup',
            frames: this.anims.generateFrameNumbers('hero-idle', {start: 0, end: 3}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'heroidleleft',
            frames: this.anims.generateFrameNumbers('hero-idle', {start: 4, end: 7}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'heroidledown',
            frames: this.anims.generateFrameNumbers('hero-idle', {start: 8, end: 11}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'heroidleright',
            frames: this.anims.generateFrameNumbers('hero-idle', {start: 12, end: 15}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'heroup',
            frames: this.anims.generateFrameNumbers('hero-run', {start: 0, end: 3}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'heroleft',
            frames: this.anims.generateFrameNumbers('hero-run', {start: 4, end: 7}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'herodown',
            frames: this.anims.generateFrameNumbers('hero-run', {start: 8, end: 11}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'heroright',
            frames: this.anims.generateFrameNumbers('hero-run', {start: 12, end: 15}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'heroattackdown',
            frames: this.anims.generateFrameNumbers('hero-attack', {start: 0, end: 3}),
            frameRate: 8
        })
        this.anims.create({
            key: 'heroattackleft',
            frames: this.anims.generateFrameNumbers('hero-attack', {start: 4, end: 7}),
            frameRate: 8
        })
        this.anims.create({
            key: 'heroattackup',
            frames: this.anims.generateFrameNumbers('hero-attack', {start: 8, end: 11}),
            frameRate: 8
        })
        this.anims.create({
            key: 'heroattackright',
            frames: this.anims.generateFrameNumbers('hero-attack', {start: 12, end: 15}),
            frameRate: 8
        })
        this.anims.create({
            key: 'sidetorch',
            frames: [
                { key: 'sidetorch1'},
                { key: 'sidetorch2'},
                { key: 'sidetorch3'},
                { key: 'sidetorch4'}
            ],
            frameRate: 8,
            repeat: -1
        });
        this.add.tileSprite(16*32, 8*32, 32*32, 16*32, 'tilesheet', 78).setScale(2);
        const mapString = `
          7888889
          4qwwwe6
          4asssd6
          4asssd6
          4zxxxc6
          1222223
        `;
        let mapRows = mapString.split("\n");
        mapRows.shift();
        mapRows.pop();
        mapRows = mapRows.map(row => row.substring(10));
        let mapCells = mapRows.map(row => row.split(""));
        mapCells.forEach((row, rowNum) => {
            row.forEach((cellType, columnNum) => {
                if (cellType == "q" || cellType == "w" || cellType == "e" || cellType == "a" || cellType == "s" || cellType == "d" || cellType == "z" || cellType == "x" || cellType == "c") {
                    new EnvironmentObject(this, columnNum+(12-mapCells[0].length)/2, rowNum+(6-mapRows.length)/2, cellType);
                }
            })
        });
        hero = new Hero(this, 6, 3, 'hero-idle', 8).play('heroidledown');
        mapCells.forEach((row, rowNum) => {
            row.forEach((cellType, columnNum) => {
                if (cellType == "7" || cellType == "8" || cellType == "9" || cellType == "4" || cellType == "6" || cellType == "1" || cellType == "2" || cellType == "3") {
                    new Wall(this, columnNum+(12-mapCells[0].length)/2, rowNum+(6-mapRows.length)/2, cellType);
                }
            })
        });
        camera.startFollow(hero, true, 0.1, 0.1);
        camera.setDeadzone(64, 64);
    }

    update() {
        hero.body.setVelocity(0, 0);
        if (up.isDown) {
            hero.body.setVelocityY(-64);
            if (!updown) {
                hero.play('heroup');
                heroDirection = "up";
                updown = true;
            }
        }
        if (up.isUp) {
            if (updown) {
                hero.play('heroidleup');
                updown = false;
            }
        }
        if (left.isDown) {
            hero.body.setVelocityX(-64);
            if (!leftdown) {
                hero.play('heroleft');
                heroDirection = "left";
                leftdown = true;
            }
        }
        if (left.isUp) {
            if (leftdown) {
                hero.play('heroidleleft');
                leftdown = false;
            }
        }
        if (down.isDown) {
            hero.body.setVelocityY(64);
            if (!downdown) {
                hero.play('herodown');
                heroDirection = "down";
                downdown = true;
            }
        }
        if (down.isUp) {
            if (downdown) {
                hero.play('heroidledown');
                downdown = false;
            }
        }
        if (right.isDown) {
            hero.body.setVelocityX(64);
            if (!rightdown) {
                hero.play('heroright');
                heroDirection = "right";
                rightdown = true;
            }
        }
        if (right.isUp) {
            if (rightdown) {
                hero.play('heroidleright');
                rightdown = false;
            }
        }
        if (heroDirection == "up") {
            if (space.isDown) {
                if (!spacedown) {
                    this.tweens.addCounter({
                        duration: 500,
                        onStart: () => {
                            hero.play('heroattackup');
                            spacedown = true;
                        },
                        onComplete: () => {
                            hero.play('heroidleup');
                            spacedown = false;
                        }
                    });
                }
            }
        }
        if (heroDirection == "left") {
            if (space.isDown) {
                if (!spacedown) {
                    this.tweens.addCounter({
                        duration: 500,
                        onStart: () => {
                            hero.play('heroattackleft');
                            spacedown = true;
                        },
                        onComplete: () => {
                            hero.play('heroidleleft');
                            spacedown = false;
                        }
                    });
                }
            }
        }
        if (heroDirection == "down") {
            if (space.isDown) {
                if (!spacedown) {
                    this.tweens.addCounter({
                        duration: 500,
                        onStart: () => {
                            hero.play('heroattackdown');
                            spacedown = true;
                        },
                        onComplete: () => {
                            hero.play('heroidledown');
                            spacedown = false;
                        }
                    });
                }
            }
        }
        if (heroDirection == "right") {
            if (space.isDown) {
                if (!spacedown) {
                    this.tweens.addCounter({
                        duration: 500,
                        onStart: () => {
                            hero.play('heroattackright');
                            spacedown = true;
                        },
                        onComplete: () => {
                            hero.play('heroidleright');
                            spacedown = false;
                        }
                    });
                }
            }
        }

    }

}
