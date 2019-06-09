var hero;
var up;
var updown;
var left;
var leftdown;
var down;
var downdown;
var right;
var rightdown;

class EnvironmentObject extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, frame) {
        super(scene, x, y, 'tilesheet', frame);
        this.scene = scene;
        this.setOrigin(0);
        this.setScale(2);
        this.scene.add.existing(this);
    }
}

class Wall extends EnvironmentObject {
    constructor(scene, x, y, frame) {
        super(scene, x, y, frame);
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
        this.setOrigin(0);
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
        this.load.spritesheet('hero-run', 'assets/Character_animation/hero/attack.png', {frameWidth: 24, frameHeight: 24});
        this.load.image('sidetorch1', 'assets/items_and_trap_animation/torch/side_torch_1.png');
        this.load.image('sidetorch2', 'assets/items_and_trap_animation/torch/side_torch_2.png');
        this.load.image('sidetorch3', 'assets/items_and_trap_animation/torch/side_torch_3.png');
        this.load.image('sidetorch4', 'assets/items_and_trap_animation/torch/side_torch_4.png');
    }

    create() {
        up = this.input.keyboard.addKey('W');
        left = this.input.keyboard.addKey('A');
        down = this.input.keyboard.addKey('S');
        right = this.input.keyboard.addKey('D');
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
        new EnvironmentObject(this, 15*32, 7*32, 11);
        new EnvironmentObject(this, 15*32, 7*32, 64);
        new EnvironmentObject(this, 16*32, 7*32, 12);
        new EnvironmentObject(this, 17*32, 7*32, 14);
        new EnvironmentObject(this, 15*32, 8*32, 21);
        new EnvironmentObject(this, 15*32, 8*32, 91).play('sidetorch');
        new EnvironmentObject(this, 16*32, 8*32, 22);
        new EnvironmentObject(this, 17*32, 8*32, 24);
        new EnvironmentObject(this, 15*32, 9*32, 31);
        new EnvironmentObject(this, 16*32, 9*32, 32);
        new EnvironmentObject(this, 17*32, 9*32, 34);
        hero = new Hero(this, 16*32, 8*32, 'hero-idle', 8).play('heroidledown');
        new Wall(this, 14*32, 6*32, 0);
        new Wall(this, 15*32, 6*32, 1);
        new Wall(this, 16*32, 6*32, 2);
        new Wall(this, 17*32, 6*32, 3);
        new Wall(this, 18*32, 6*32, 5);
        new Wall(this, 18*32, 7*32, 15);
        new Wall(this, 18*32, 8*32, 25);
        new Wall(this, 18*32, 9*32, 35);
        new Wall(this, 18*32, 10*32, 45);
        new Wall(this, 17*32, 10*32, 44);
        new Wall(this, 16*32, 10*32, 43);
        new Wall(this, 15*32, 10*32, 42);
        new Wall(this, 14*32, 10*32, 40);
        new Wall(this, 14*32, 9*32, 30);
        new Wall(this, 14*32, 8*32, 20);
        new Wall(this, 14*32, 7*32, 10);
    }

    update() {
        hero.body.setVelocity(0, 0);
        if (up.isDown) {
            hero.body.setVelocityY(-64);
            if (!updown) {
                hero.play('heroup');
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
                rightdown = true;
            }
        }
        if (right.isUp) {
            if (rightdown) {
                hero.play('heroidleright');
                rightdown = false;
            }
        }
    }

}
