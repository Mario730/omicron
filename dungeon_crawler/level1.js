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
var attack;
var door;
var e;

class EnvironmentObject extends Phaser.GameObjects.Sprite {
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
        if (cellType == "doorleft") {
            frame = 48;
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
        this.setOrigin(0.5,0.5);
        this.x = x*32+16;
        this.y = y*32+16;
        this.body.setSize(16, 16);
        this.scene.physics.add.collider(this, hero);
    }
}

class Door extends EnvironmentObject {
    constructor(scene, x, y, cellType) {
        super(scene, x, y, cellType);
        this.scene.physics.world.enable(this, Phaser.STATIC_BODY);
        this.body.setImmovable(true);
        this.setOrigin(0.5,0.5);
        this.x = x*32+16;
        this.y = y*32+16;
        this.body.setSize(16, 16);
        this.scene.physics.add.collider(this, hero);
        this.body.syncBounds = true;
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
    }
}

class Hero extends Being {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.setScale(1.4);
        this.body.syncBounds = true;
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
        e = this.input.keyboard.addKey('E');
        this.anims.create({
            key: 'open',
            frames: this.anims.generateFrameNumbers('tilesheet', {start: 37, end: 37}),
            frameRate: 8
        });
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
        const worldGrid = [["tunnel","","","",""],["","","","",""],["5x5vampires","tunnel","5x5empty","",""],["","","","",""],["","","","",""]];
        const rooms = {
            "5x5empty": [["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""]],
            "tunnel": [["","","","",""],["","","","",""],["","","","",""]],
            "5x5vampires": [["","","","",""],["","x","","x",""],["","","","",""],["","x","","x",""],["","","","",""]],
            "": []
        }
        worldGrid.forEach((roomRow, roomRowNum) => {
            roomRow.forEach((roomName, roomColNum) => {
                const mapCells = rooms[roomName];
                mapCells.forEach((row, rowNum) => {
                    row.forEach((cell, columnNum) => {
                        if (rowNum == 0 && columnNum == 0) {
                            new EnvironmentObject(this, columnNum+(12-mapCells.length)/2 + roomColNum*12, rowNum+(10-row.length)/2 + roomRowNum*10, "q");
                        }
                        if (rowNum == 0 && columnNum != 0 && columnNum != row.length-1) {
                            new EnvironmentObject(this, columnNum+(12-mapCells.length)/2 + roomColNum*12, rowNum+(10-row.length)/2 + roomRowNum*10, "w");
                        }
                        if (rowNum == 0 && columnNum == row.length-1) {
                            new EnvironmentObject(this, columnNum+(12-mapCells.length)/2 + roomColNum*12, rowNum+(10-row.length)/2 + roomRowNum*10, "e");
                        }
                        if (rowNum != 0 && rowNum != mapCells.length-1 && columnNum == 0) {
                            new EnvironmentObject(this, columnNum+(12-mapCells.length)/2 + roomColNum*12, rowNum+(10-row.length)/2 + roomRowNum*10, "a");
                        }
                        if (rowNum != 0 && rowNum != mapCells.length-1 && columnNum != 0 && columnNum != row.length-1) {
                            new EnvironmentObject(this, columnNum+(12-mapCells.length)/2 + roomColNum*12, rowNum+(10-row.length)/2 + roomRowNum*10, "s");
                        }
                        if (rowNum != 0 && rowNum != mapCells.length-1 && columnNum == row.length-1) {
                            new EnvironmentObject(this, columnNum+(12-mapCells.length)/2 + roomColNum*12, rowNum+(10-row.length)/2 + roomRowNum*10, "d");
                        }
                        if (rowNum == mapCells.length-1 && columnNum == 0) {
                            new EnvironmentObject(this, columnNum+(12-mapCells.length)/2 + roomColNum*12, rowNum+(10-row.length)/2 + roomRowNum*10, "z");
                        }
                        if (rowNum == mapCells.length-1 && columnNum != 0 && columnNum != row.length-1) {
                            new EnvironmentObject(this, columnNum+(12-mapCells.length)/2 + roomColNum*12, rowNum+(10-row.length)/2 + roomRowNum*10, "x");
                        }
                        if (rowNum == mapCells.length-1 && columnNum == row.length-1) {
                            new EnvironmentObject(this, columnNum+(12-mapCells.length)/2 + roomColNum*12, rowNum+(10-row.length)/2 + roomRowNum*10, "c");
                        }
                    })
                });
            })
        })
        hero = new Hero(this, 6+24, 5+20, 'hero-idle', 8).play('heroidledown');
        worldGrid.forEach((roomRow, roomRowNum) => {
            roomRow.forEach((roomName, roomColNum) => {
                const baseX = roomColNum*8;
                const baseY = roomRowNum*6;
                const mapCells = rooms[roomName];
                mapCells.forEach((row, rowNum) => {
                    row.forEach((cell, columnNum) => {
                        if (rowNum == 0 && columnNum == 0) {
                            new Wall(this, columnNum+(12-mapCells.length)/2 + roomColNum*12 - 1, rowNum+(10-row.length)/2 + roomRowNum*10 - 1, "7");
                            new Wall(this, columnNum+(12-mapCells.length)/2 + roomColNum*12, rowNum+(10-row.length)/2 + roomRowNum*10 - 1, "8");
                            new Wall(this, columnNum+(12-mapCells.length)/2 + roomColNum*12 - 1, rowNum+(10-row.length)/2 + roomRowNum*10, "4");
                        }
                        if (rowNum == 0 && columnNum != 0 && columnNum != row.length-1) {
                            new Wall(this, columnNum+(12-mapCells.length)/2 + roomColNum*12, rowNum+(10-row.length)/2 + roomRowNum*10 - 1, "8");
                        }
                        if (rowNum == 0 && columnNum == row.length-1) {
                            new Wall(this, columnNum+(12-mapCells.length)/2 + roomColNum*12, rowNum+(10-row.length)/2 + roomRowNum*10 - 1, "8");
                            new Wall(this, columnNum+(12-mapCells.length)/2 + roomColNum*12 + 1, rowNum+(10-row.length)/2 + roomRowNum*10 - 1, "9");
                            new Wall(this, columnNum+(12-mapCells.length)/2 + roomColNum*12 + 1, rowNum+(10-row.length)/2 + roomRowNum*10, "6");
                        }
                        if (rowNum != 0 && rowNum != mapCells.length-1 && rowNum != (mapCells.length-1)/2 && columnNum == 0) {
                            new Wall(this, columnNum+(12-mapCells.length)/2 + roomColNum*12 - 1, rowNum+(10-row.length)/2 + roomRowNum*10, "4");
                        }
                        if (rowNum == (mapCells.length-1)/2 && columnNum == 0) {
                            new Door(this, columnNum+(12-mapCells.length)/2 + roomColNum*12 - 1, rowNum+(10-row.length)/2 + roomRowNum*10, "doorleft");
                        }
                        if (rowNum != 0 && rowNum != mapCells.length-1 && columnNum == row.length-1) {
                            new Wall(this, columnNum+(12-mapCells.length)/2 + roomColNum*12 + 1, rowNum+(10-row.length)/2 + roomRowNum*10, "6");
                        }
                        if (rowNum == mapCells.length-1 && columnNum == 0) {
                            new Wall(this, columnNum+(12-mapCells.length)/2 + roomColNum*12 - 1, rowNum+(10-row.length)/2 + roomRowNum*10, "4");
                            new Wall(this, columnNum+(12-mapCells.length)/2 + roomColNum*12 - 1, rowNum+(10-row.length)/2 + roomRowNum*10 + 1, "1");
                            new Wall(this, columnNum+(12-mapCells.length)/2 + roomColNum*12, rowNum+(10-row.length)/2 + roomRowNum*10 + 1, "2");
                        }
                        if (rowNum == mapCells.length-1 && columnNum != 0 && columnNum != row.length-1) {
                            new Wall(this, columnNum+(12-mapCells.length)/2 + roomColNum*12, rowNum+(10-row.length)/2 + roomRowNum*10 + 1, "2");
                        }
                        if (rowNum == mapCells.length-1 && columnNum == row.length-1) {
                            new Wall(this, columnNum+(12-mapCells.length)/2 + roomColNum*12 + 1, rowNum+(10-row.length)/2 + roomRowNum*10, "6");
                            new Wall(this, columnNum+(12-mapCells.length)/2 + roomColNum*12 + 1, rowNum+(10-row.length)/2 + roomRowNum*10 + 1, "3");
                            new Wall(this, columnNum+(12-mapCells.length)/2 + roomColNum*12, rowNum+(10-row.length)/2 + roomRowNum*10 + 1, "2");
                        }
                    })
                });
            })
        })
        var camera = this.cameras.main;
        camera.setViewport(0, 4*32, 12*32, 10*32);
        camera.setBackgroundColor(0x25131A);
        camera.startFollow(hero);
        var minimap = this.cameras.add(4.5*32, 0.5*32, 3*32, 3*32);
        minimap.setBackgroundColor(0xFF0000);
    }

    update() {
        hero.body.setVelocity(0, 0);
        // if (e.isDown) {
        //     if ((hero.x - door.x) * (hero.x - door.x) + (hero.y - door.y) * (hero.y - door.y) <= 64*64) {
        //         door.play('open');
        //         if (heroDirection == "left") {
        //         }
        //     }
        // }
        if (up.isDown) {
            hero.body.setVelocityY(-64);
            if (!updown) {
                if (!attack) {
                    hero.play('heroup');
                }
                heroDirection = "up";
                updown = true;
            }
        }
        if (up.isUp) {
            if (updown) {
                if (!attack) {
                    hero.play('heroidleup');
                }
                updown = false;
            }
        }
        if (left.isDown) {
            hero.body.setVelocityX(-64);
            if (!leftdown) {
                if (!attack) {
                    hero.play('heroleft');
                }
                heroDirection = "left";
                leftdown = true;
            }
        }
        if (left.isUp) {
            if (leftdown) {
                if (!attack) {
                    hero.play('heroidleleft');
                }
                leftdown = false;
            }
        }
        if (down.isDown) {
            hero.body.setVelocityY(64);
            if (!downdown) {
                if (!attack) {
                    hero.play('herodown');
                }
                heroDirection = "down";
                downdown = true;
            }
        }
        if (down.isUp) {
            if (downdown) {
                if (!attack) {
                    hero.play('heroidledown');
                }
                downdown = false;
            }
        }
        if (right.isDown) {
            hero.body.setVelocityX(64);
            if (!rightdown) {
                if (!attack) {
                    hero.play('heroright');
                }
                heroDirection = "right";
                rightdown = true;
            }
        }
        if (right.isUp) {
            if (rightdown) {
                if (!attack) {
                    hero.play('heroidleright');
                }
                rightdown = false;
            }
        }
        if (heroDirection == "up") {
            if (space.isDown) {
                if (!attack) {
                    this.tweens.addCounter({
                        duration: 500,
                        onStart: () => {
                            hero.play('heroattackup');
                            attack = true;
                        },
                        onComplete: () => {
                            hero.play('heroidleup');
                            attack = false;
                        }
                    });
                }
            }
        }
        if (heroDirection == "left") {
            if (space.isDown) {
                if (!attack) {
                    this.tweens.addCounter({
                        duration: 500,
                        onStart: () => {
                            hero.play('heroattackleft');
                            attack = true;
                        },
                        onComplete: () => {
                            hero.play('heroidleleft');
                            attack = false;
                        }
                    });
                }
            }
        }
        if (heroDirection == "down") {
            if (space.isDown) {
                if (!attack) {
                    this.tweens.addCounter({
                        duration: 500,
                        onStart: () => {
                            hero.play('heroattackdown');
                            attack = true;
                        },
                        onComplete: () => {
                            hero.play('heroidledown');
                            attack = false;
                        }
                    });
                }
            }
        }
        if (heroDirection == "right") {
            if (space.isDown) {
                if (!attack) {
                    this.tweens.addCounter({
                        duration: 500,
                        onStart: () => {
                            hero.play('heroattackright');
                            attack = true;
                        },
                        onComplete: () => {
                            hero.play('heroidleright');
                            attack = false;
                        }
                    });
                }
            }
        }
    }

}
