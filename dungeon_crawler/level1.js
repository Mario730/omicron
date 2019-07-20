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
var e;
var edown;
const skeletonSpeed = 10;
const maxRoomWidth = 11;
const maxRoomHeight = 9;

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
            const s = [6,7,8,9,16,17,18,19,26,27,28];
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
        if (cellType == "doorright") {
            frame = 47;
        }
        if (cellType == "doortop") {
            frame = 37;
        }
        if (cellType == "doorbottom") {
            frame = 36;
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
        // this.scene.skeletons.getChildren().forEach((skel) => {
        //     this.scene.physics.add.collider(this, skel);
        // });
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
        this.doorType = cellType;
        
    }

    update() {
        if ((hero.x - this.x) * (hero.x - this.x) + (hero.y - this.y) * (hero.y - this.y) <= 64*64) {
            if (heroDirection == "left") {
                if (this.doorType == "doorleft") {
                    this.scene.tweens.addCounter({
                        from: 0,
                        to: 700,
                        duration: 700,
                        onStart: () => {
                            this.setFrame(37);
                            this.scene.camera.fade(1000, 0x000000);
                        },
                        onComplete: () => {
                            this.scene.camera.scrollX -= 11*32;
                            this.setFrame(48);
                            hero.warpToRoom();
                            this.scene.camera.fadeIn(1000, 0x000000);
                        }
                    });
                }
            }
            if (heroDirection == "up") {
                if (this.doorType == "doortop") {
                    this.scene.tweens.addCounter({
                        from: 0,
                        to: 700,
                        duration: 700,
                        onStart: () => {
                            this.setFrame(58);
                            this.scene.camera.fade(1000, 0x000000);
                        },
                        onComplete: () => {
                            this.scene.camera.scrollY -= 9*32;
                            this.setFrame(37);
                            hero.warpToRoom();
                            this.scene.camera.fadeIn(1000, 0x000000);
                        }
                    });
                }
            }
            if (heroDirection == "right") {
                if (this.doorType == "doorright") {
                    this.scene.tweens.addCounter({
                        from: 0,
                        to: 700,
                        duration: 700,
                        onStart: () => {
                            this.setFrame(36);
                            this.scene.camera.fade(1000, 0x000000);
                        },
                        onComplete: () => {
                            this.scene.camera.scrollX += 11*32;
                            this.setFrame(47);
                            hero.warpToRoom();
                            this.scene.camera.fadeIn(1000, 0x000000);
                        }
                    });
                }
            }
            if (heroDirection == "down") {
                if (this.doorType == "doorbottom") {
                    this.scene.tweens.addCounter({
                        from: 0,
                        to: 700,
                        duration: 700,
                        onStart: () => {
                            this.setFrame(47);
                            this.scene.camera.fade(1000, 0x000000);
                        },
                        onComplete: () => {
                            this.scene.camera.scrollY += 9*32;
                            this.setFrame(36);
                            hero.warpToRoom();
                            this.scene.camera.fadeIn(1000, 0x000000);
                        }
                    });
                }
            }
        }
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
        this.setScale(1.4);
    }

    warpToRoom() {
        let [heroRoomX, heroRoomY] = this.scene.heroRoom;
        if (heroDirection == "left") {
            heroRoomX -= 1;
            let roomType = this.scene.rooms[this.scene.worldGrid[heroRoomY][heroRoomX]];
            hero.x = ((maxRoomWidth+roomType[0].length)/2 + heroRoomX*maxRoomWidth - 0.5)*32;
        }
        if (heroDirection == "right") {
            heroRoomX += 1;
            let roomType = this.scene.rooms[this.scene.worldGrid[heroRoomY][heroRoomX]];
            hero.x = ((maxRoomWidth-roomType[0].length)/2 + heroRoomX*maxRoomWidth + 0.5)*32;
        }
        if (heroDirection == "up") {
            heroRoomY -= 1;
            let roomType = this.scene.rooms[this.scene.worldGrid[heroRoomY][heroRoomX]];
            hero.y = ((maxRoomHeight+roomType.length)/2 + heroRoomY*maxRoomHeight - 0.5)*32;
        }
        if (heroDirection == "down") {
            heroRoomY += 1;
            let roomType = this.scene.rooms[this.scene.worldGrid[heroRoomY][heroRoomX]];
            hero.y = ((maxRoomHeight-roomType.length)/2 + heroRoomY*maxRoomHeight + 0.5)*32;
        }
        this.scene.heroRoom = [heroRoomX, heroRoomY];
        this.scene.skeletonSpawn();
        this.scene.skeletons.getChildren().forEach((skeleton) => {
            if (skeleton.x < heroRoomX*32*11 || skeleton.x > (heroRoomX+1)*32*11 || skeleton.y < heroRoomY*32*9 || skeleton.y > (heroRoomY+1)*32*9) {
                skeleton.despawn();
            }
        });
    }
}

class Monster extends Being {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.alive = true;
    }
}

class Skeleton extends Monster {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.health = 50;
        this.play('skel1idle');
        this.spawnX = x;
        this.spawnY = y;
        this.skelright;
    }

    update () {
        if (!this.alive) {
            return;
        }
        if (this.x <= hero.x) {
            if (!this.skelright) {
                this.setFlipX(false);
                this.skelright = true;
            }
            this.body.setVelocityX(Math.cos(Math.atan((hero.y-this.y)/(hero.x-this.x)))*skeletonSpeed);
            this.body.setVelocityY(Math.sin(Math.atan((hero.y-this.y)/(hero.x-this.x)))*skeletonSpeed);

        }
        if (this.x > hero.x) {
            if (this.skelright) {
                this.setFlipX(true);
                this.skelright = false;
            }
            this.body.setVelocityX(-Math.cos(Math.atan((hero.y-this.y)/(hero.x-this.x)))*skeletonSpeed);
            this.body.setVelocityY(-Math.sin(Math.atan((hero.y-this.y)/(hero.x-this.x)))*skeletonSpeed);
        }
    }

    die() {
        this.alive = false;
        this.scene.skeletons.remove(this);
        this.destroy();
    }

    despawn() {
        this.alive = false;
        this.body.setVelocity(0, 0);
    }

    respawn() {
        this.alive = true;
        this.x = this.spawnX*32;
        this.y = this.spawnY*32;
        debugger;
    }
}

class SceneMain extends Phaser.Scene {
    constructor() {
        super({key: 'SceneMain'});
    }

    skeletonSpawn() {
        let [heroRoomX, heroRoomY] = this.heroRoom;
        if (!this.spawnRooms[heroRoomX]) {
            this.spawnRooms[heroRoomX] = [];
        }
        if (!this.spawnRooms[heroRoomX][heroRoomY]) {
            this.spawnRooms[heroRoomX][heroRoomY] = [];
            let room = this.rooms[this.worldGrid[heroRoomY][heroRoomX]];
            room.forEach((row, rowNum) => {
                row.forEach((cell, columnNum) => {
                    const xOffset = heroRoomX*maxRoomWidth+(maxRoomWidth-row.length)/2;
                    const yOffset = heroRoomY*maxRoomHeight+(maxRoomHeight-room.length)/2;
                    if (cell == "x") {
                        let skeleton = new Skeleton(this, columnNum+xOffset, rowNum+yOffset, 'skel1-1');
                        this.skeletons.add(skeleton);
                        this.spawnRooms[heroRoomX][heroRoomY].push(skeleton);
                    }
                });
            });
        }
        else {
            this.spawnRooms[heroRoomX][heroRoomY].forEach((skeleton) => {
                skeleton.respawn();
            });
        }
    }
    
    preload() {
        this.load.spritesheet('tilesheet', 'assets/character_and_tileset/Dungeon_Tileset.png', {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('hero-idle', 'assets/Character_animation/hero/idle.png', {frameWidth: 16, frameHeight: 24});
        this.load.spritesheet('hero-run', 'assets/Character_animation/hero/run.png', {frameWidth: 16, frameHeight: 24});
        this.load.spritesheet('hero-attack', 'assets/Character_animation/hero/attack.png', {frameWidth: 24, frameHeight: 24});
        this.load.image('skel1-1', 'assets/Character_animation/monsters_idle/skeleton1/v2/skeleton_v2_1.png');
        this.load.image('skel1-2', 'assets/Character_animation/monsters_idle/skeleton1/v2/skeleton_v2_2.png');
        this.load.image('skel1-3', 'assets/Character_animation/monsters_idle/skeleton1/v2/skeleton_v2_3.png');
        this.load.image('skel1-4', 'assets/Character_animation/monsters_idle/skeleton1/v2/skeleton_v2_4.png');

    }

    create() {
        up = this.input.keyboard.addKey('W');
        left = this.input.keyboard.addKey('A');
        down = this.input.keyboard.addKey('S');
        right = this.input.keyboard.addKey('D');
        space = this.input.keyboard.addKey('space');
        e = this.input.keyboard.addKey('E');
        this.doors = this.add.group();
        this.skeletons = this.add.group();
        this.spawnRooms = [];
        this.anims.create({
            key: 'skel1idle',
            frames: [
                { key: 'skel1-1'},
                { key: 'skel1-2'},
                { key: 'skel1-3'},
                { key: 'skel1-4'}
            ],
            frameRate: 8,
            repeat: -1
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
        this.worldGrid = [["tunnel","","","",""],["","","5x5empty","",""],["5x5vampires","tunnel","9x7empty","tunnel","tunnel"],["","","","",""],["","","","",""]];
        this.rooms = {
            "5x5empty": [["","","","",""],["","","","",""],["","","","",""],["","","","",""],["","","","",""]],
            "tunnel": [["","","","",""],["","","","",""],["","","","",""]],
            "5x5vampires": [["","","","",""],["","x","","x",""],["","","","",""],["","x","","x",""],["","","","",""]],
            "9x7empty": [["","","","","","","","",""],["","","","","","","","",""],["","","","","","","","",""],["","","","","","","","",""],["","","","","","","","",""],["","","","","","","","",""],["","","","","","","","",""]],
            "": []
            //9x7 IS THE BIGGEST A ROOM CAN BE
        }
        this.worldGrid.forEach((roomRow, roomRowNum) => {
            roomRow.forEach((roomName, roomColNum) => {
                if (roomName != "") {
                    const xRoomOffset = roomColNum*maxRoomWidth;
                    const yRoomOffset = roomRowNum*maxRoomHeight;
                    const mapCells = this.rooms[roomName];
                    mapCells.forEach((row, rowNum) => {
                        row.forEach((cell, columnNum) => {
                            const xCenterOffset = (maxRoomWidth-row.length)/2;
                            const xOffset = xRoomOffset+xCenterOffset;
                            const yCenterOffset = (maxRoomHeight-mapCells.length)/2;
                            const yOffset = yRoomOffset+yCenterOffset;
                            if (rowNum == 0 && columnNum == 0) {
                                new EnvironmentObject(this, columnNum+xOffset, rowNum+yOffset, "q");
                            }
                            if (rowNum == 0 && columnNum != 0 && columnNum != row.length-1) {
                                new EnvironmentObject(this, columnNum+xOffset, rowNum+yOffset, "w");
                            }
                            if (rowNum == 0 && columnNum == row.length-1) {
                                new EnvironmentObject(this, columnNum+xOffset, rowNum+yOffset, "e");
                            }
                            if (rowNum != 0 && rowNum != mapCells.length-1 && columnNum == 0) {
                                new EnvironmentObject(this, columnNum+xOffset, rowNum+yOffset, "a");
                            }
                            if (rowNum != 0 && rowNum != mapCells.length-1 && columnNum != 0 && columnNum != row.length-1) {
                                new EnvironmentObject(this, columnNum+xOffset, rowNum+yOffset, "s");
                            }
                            if (rowNum != 0 && rowNum != mapCells.length-1 && columnNum == row.length-1) {
                                new EnvironmentObject(this, columnNum+xOffset, rowNum+yOffset, "d");
                            }
                            if (rowNum == mapCells.length-1 && columnNum == 0) {
                                new EnvironmentObject(this, columnNum+xOffset, rowNum+yOffset, "z");
                            }
                            if (rowNum == mapCells.length-1 && columnNum != 0 && columnNum != row.length-1) {
                                new EnvironmentObject(this, columnNum+xOffset, rowNum+yOffset, "x");
                            }
                            if (rowNum == mapCells.length-1 && columnNum == row.length-1) {
                                new EnvironmentObject(this, columnNum+xOffset, rowNum+yOffset, "c");
                            }
                        })
                    });
                }
            })
        })
        hero = new Hero(this, 5.5+22, 4.5+18, 'hero-idle', 8).play('heroidledown');
        this.worldGrid.forEach((roomRow, roomRowNum) => {
            roomRow.forEach((roomName, roomColNum) => {
                if (roomName != "") {
                    const xRoomOffset = roomColNum*maxRoomWidth;
                    const yRoomOffset = roomRowNum*maxRoomHeight;
                    const mapCells = this.rooms[roomName];
                    if (roomColNum > 0) {
                        if (this.worldGrid[roomRowNum][roomColNum-1] != "") {
                            this.doors.add(new Door(this, xRoomOffset+(maxRoomWidth-mapCells[0].length)/2 - 1, 4 + roomRowNum*maxRoomHeight, "doorleft"));
                        } else {
                            new Wall(this, xRoomOffset+(maxRoomWidth-mapCells[0].length)/2 - 1, 4 + roomRowNum*maxRoomHeight, "4");
                        }
                    } else {
                        new Wall(this, (maxRoomWidth-mapCells[0].length)/2 - 1, 4 + roomRowNum*maxRoomHeight, "4");
                    }
                    if (roomColNum < 4) {
                        if (this.worldGrid[roomRowNum][roomColNum+1] != "") {
                            this.doors.add(new Door(this, (maxRoomWidth+mapCells[0].length)/2 + roomColNum*maxRoomWidth, 4 + roomRowNum*maxRoomHeight, "doorright"));
                        } else {
                            new Wall(this, (maxRoomWidth+mapCells[0].length)/2 + roomColNum*maxRoomWidth, 4 + roomRowNum*maxRoomHeight, "6");
                        }
                    } else {
                        new Wall(this, (maxRoomWidth+mapCells[0].length)/2 + 4*maxRoomWidth, 4 + roomRowNum*maxRoomHeight, "6");
                    }
                    if (roomRowNum > 0) {
                        if (this.worldGrid[roomRowNum-1][roomColNum] != "") {
                            this.doors.add(new Door(this, 5 + roomColNum*maxRoomWidth, (maxRoomHeight-mapCells.length)/2 + roomRowNum*maxRoomHeight - 1, "doortop"));
                        } else {
                            new Wall(this, 5 + roomColNum*maxRoomWidth, (maxRoomHeight-mapCells.length)/2 + roomRowNum*maxRoomHeight - 1, "8");
                        }
                    } else {
                        new Wall(this, 5 + roomColNum*maxRoomWidth, (maxRoomHeight-mapCells.length)/2 - 1, "8");
                    }
                    if (roomRowNum < 4) {
                        if (this.worldGrid[roomRowNum+1][roomColNum] != "") {
                            this.doors.add(new Door(this, 5 + roomColNum*maxRoomWidth, (maxRoomHeight+mapCells.length)/2 + roomRowNum*maxRoomHeight, "doorbottom"));
                        } else {
                            new Wall(this, 5 + roomColNum*maxRoomWidth, (maxRoomHeight+mapCells.length)/2 + roomRowNum*maxRoomHeight, "2");
                        }
                    } else {
                        new Wall(this, 5 + roomColNum*maxRoomWidth, (maxRoomHeight+mapCells.length)/2 + 4*maxRoomHeight, "2");
                    }
                    mapCells.forEach((row, rowNum) => {
                        row.forEach((cell, columnNum) => {
                            const xCenterOffset = (maxRoomWidth-row.length)/2;
                            const xOffset = xRoomOffset+xCenterOffset;
                            const yCenterOffset = (maxRoomHeight-mapCells.length)/2;
                            const yOffset = yRoomOffset+yCenterOffset;
                            if (rowNum == 0 && columnNum == 0) {
                                new Wall(this, columnNum+xOffset - 1, rowNum+yOffset - 1, "7");
                                new Wall(this, columnNum+xOffset, rowNum+yOffset - 1, "8");
                                new Wall(this, columnNum+xOffset - 1, rowNum+yOffset, "4");
                            }
                            if (rowNum == 0 && columnNum != 0 && columnNum != row.length-1 && columnNum != (row.length-1)/2) {
                                new Wall(this, columnNum+xOffset, rowNum+yOffset - 1, "8");
                            }
                            if (rowNum == 0 && columnNum == row.length-1) {
                                new Wall(this, columnNum+xOffset, rowNum+yOffset - 1, "8");
                                new Wall(this, columnNum+xOffset + 1, rowNum+yOffset - 1, "9");
                                new Wall(this, columnNum+xOffset + 1, rowNum+yOffset, "6");
                            }
                            if (rowNum != 0 && rowNum != mapCells.length-1 && rowNum != (mapCells.length-1)/2 && columnNum == 0) {
                                new Wall(this, columnNum+xOffset - 1, rowNum+yOffset, "4");
                            }
                            if (rowNum != 0 && rowNum != mapCells.length-1 && rowNum != (mapCells.length-1)/2 && columnNum == row.length-1) {
                                new Wall(this, columnNum+xOffset + 1, rowNum+yOffset, "6");
                            }
                            if (rowNum == mapCells.length-1 && columnNum == 0) {
                                new Wall(this, columnNum+xOffset - 1, rowNum+yOffset, "4");
                                new Wall(this, columnNum+xOffset - 1, rowNum+yOffset + 1, "1");
                                new Wall(this, columnNum+xOffset, rowNum+yOffset + 1, "2");
                            }
                            if (rowNum == mapCells.length-1 && columnNum != 0 && columnNum != row.length-1 && columnNum != (row.length-1)/2) {
                                new Wall(this, columnNum+xOffset, rowNum+yOffset + 1, "2");
                            }
                            if (rowNum == mapCells.length-1 && columnNum == row.length-1) {
                                new Wall(this, columnNum+xOffset + 1, rowNum+yOffset, "6");
                                new Wall(this, columnNum+xOffset + 1, rowNum+yOffset + 1, "3");
                                new Wall(this, columnNum+xOffset, rowNum+yOffset + 1, "2");
                            }
                            if (cell == "x") {

                            }
                        })
                    });
                }   
            })
        })
        this.camera = this.cameras.main;
        this.camera.setViewport(0, 4*32, maxRoomWidth*32, maxRoomHeight*32);
        this.camera.setBackgroundColor(0x25131A);
        this.camera.setScroll(22*32, 18*32);
        // camera.startFollow(hero);
        var minimap = this.cameras.add(4*32, 0.5*32, 3*32, 3*32);
        minimap.setBackgroundColor(0x000000);
        minimap.setScroll(30*32, 25*32);
        minimap.setZoom(0.05);
    }

    update() {
        this.heroRoom = [Math.floor(hero.x/32/11), Math.floor(hero.y/32/9)];
        hero.body.setVelocity(0, 0);
        this.skeletons.getChildren().forEach((skel) => {
            skel.update();
        });
        if (e.isDown) {
            if (!edown) {
                this.doors.getChildren().forEach((door) => {
                    door.update();
                });
                edown = true;
            }
        }
        if (e.isUp) {
            edown = false;
        }
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
