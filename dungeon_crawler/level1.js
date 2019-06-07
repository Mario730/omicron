var hero;
var left;
var right;

class EnvironmentObject extends Phaser.GameObjects.Image {
    constructor(scene, x, y, frame) {
        super(scene, x, y, 'tilesheet', frame);
        this.scene = scene;
        this.setOrigin(0);
        this.setScale(2);
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this, Phaser.STATIC_BODY);
    }
}

class Wall extends EnvironmentObject {
    constructor(scene, x, y, frame) {
        super(scene, x, y, frame);
    }
}

class Being extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.setOrigin(0);
        this.setScale(2);
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
    }
}

class Hero extends Being {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
    }
}

class SceneMain extends Phaser.Scene {
    constructor() {
        super({key: 'SceneMain'});
    }
    
    preload() {
        this.load.spritesheet('tilesheet', 'assets/character_and_tileset/Dungeon_Tileset.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('1hero1', 'assets/Character_animation/priests_idle/priest2/v1/priest2_v1_1.png');
        this.load.image('1hero2', 'assets/Character_animation/priests_idle/priest2/v1/priest2_v1_2.png');
        this.load.image('1hero3', 'assets/Character_animation/priests_idle/priest2/v1/priest2_v1_3.png');
        this.load.image('1hero4', 'assets/Character_animation/priests_idle/priest2/v1/priest2_v1_4.png');
    }

    create() {
        left = this.input.keyboard.addKey('A');
        right = this.input.keyboard.addKey('D');
        this.anims.create({
            key: '1hero-idle',
            frames: [
                { key: '1hero1'},
                { key: '1hero2'},
                { key: '1hero3'},
                { key: '1hero4'}
            ],
            frameRate: 8,
            repeat: -1
        });
        this.add.tileSprite(16*32, 8*32, 32*32, 16*32, 'tilesheet', 78).setScale(2);
        new EnvironmentObject(this, 15*32, 7*32, 11);
        new EnvironmentObject(this, 16*32, 7*32, 12);
        new EnvironmentObject(this, 17*32, 7*32, 14);
        new EnvironmentObject(this, 15*32, 8*32, 21);
        new EnvironmentObject(this, 16*32, 8*32, 22);
        new EnvironmentObject(this, 17*32, 8*32, 24);
        new EnvironmentObject(this, 15*32, 9*32, 31);
        new EnvironmentObject(this, 16*32, 9*32, 32);
        new EnvironmentObject(this, 17*32, 9*32, 34);
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
        hero = new Hero(this, 16*32, 8*32, '1hero1').setScale(2).play('1hero-idle');
    }

    update() {
        if (left.isDown) {
            hero.setFlipX(true);
            hero.body.setVelocityX(-10);
        };
        if (right.isDown) {
            hero.setFlipX(false);
            hero.body.setVelocityX(10);
        }
    }

}
