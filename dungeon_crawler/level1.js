class object extends Phaser.GameObject.Image {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.scene.add.existing(this);
    }

    update() {

    }
}

class SceneMain extends Phaser.Scene {
    constructor() {
        super({key: 'SceneMain'});
    }
    
    preload() {
        this.load.spritesheet('tilesheet', 'assets/character and tileset/Dungeon_Tileset', {frameWidth: 16, frameHeight: 16});
        this.load.image('1hero1', 'assets/Character_animation/priests_idle/priest2/v1/priest2_v1_1.png');
        this.load.image('1hero2', 'assets/Character_animation/priests_idle/priest2/v1/priest2_v1_2.png');
        this.load.image('1hero3', 'assets/Character_animation/priests_idle/priest2/v1/priest2_v1_3.png');
        this.load.image('1hero4', 'assets/Character_animation/priests_idle/priest2/v1/priest2_v1_4.png');
    }

    create() {
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
        new object(this, 500, 500, 'tilesheet', 23);
        this.add.sprite(1000, 500, '1hero1').play('1hero-idle');
    }

    update() {

    }

}