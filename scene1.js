// this.scene.add('GameScene');
   
var background;
var player;
var key;
var power = 99;
var keyhold;
var shock;
class Goblin extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y, key) {
        super(scene, x, y, key);
    }
    update () {
        if (key.shift.isDown && power > 3) {
            this.x += Math.sin(Math.PI*player.angle/180)*20;
            this.y-= Math.cos(Math.PI*player.angle/180)*20;
        }
        this.x += Math.sin(Math.PI*player.angle/180)*20;
        this.y -= Math.cos(Math.PI*player.angle/180)*20;
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'});
    }

    preload () {
        this.load.image('space', 'assets/space.jpg');
        this.load.image('plane', 'assets/plane.png');
        this.load.image('boost', 'assets/plane-boost.png');
        this.load.image('shock', 'assets/electricity.png');
        this.load.image('goblin', 'assets/goblin.png');
    }      
        
    create () {
        background = this.add.tileSprite(500, 500, 1000, 1000, 'space');
        player = this.physics.add.sprite(500, 500, 'plane')
        key = this.input.keyboard.createCursorKeys();
        shock = this.add.image(500, 500, 'shock').setScale(0.7);
        shock.alpha = 0;
        // new Goblin(GameScene, 500, 0, 'goblin');
    }

    update () {
        if (key.up.isDown) {
            let turning = this.add.tween({
                targets: player,
                angle: 0,
                ease: 'Linear',
                duration: 400
            });
        }
        if (key.down.isDown) {
            let turning = this.add.tween({
                targets: player,
                angle: 180,
                ease: 'Linear',
                duration: 400
            });
        }
        if (key.right.isDown) {
            let turning = this.add.tween({
                targets: player,
                angle: 90,
                ease: 'Linear',
                duration: 400
            });
        }
        if (key.left.isDown) {
            let turning = this.add.tween({
                targets: player,
                angle: 270,
                ease: 'Linear',
                duration: 400
            });
        }
        if (key.shift.isDown && power > 3) {
            background.tilePositionX += Math.sin(Math.PI*player.angle/180)*20;
            background.tilePositionY -= Math.cos(Math.PI*player.angle/180)*20;
            power -= 3;
            player.setTexture('boost');
        }
        else {
            player.setTexture('plane');
        }
        background.tilePositionX += Math.sin(Math.PI*player.angle/180)*20;
        background.tilePositionY -= Math.cos(Math.PI*player.angle/180)*20;
        if (key.space.isDown && power > 10) {
            if (!keyhold) {
                shock.angle = 360*Math.random();
                let shockopacity = this.add.tween({
                    targets: shock,
                    alpha: 1,
                    ease: 'Linear',
                    duration: 50,
                    yoyo: true,
                    onComplete: () => {shock.alpha = 0}
                })
                power -= 10;
                keyhold = true;
            }
        }
        if (key.space.isUp) {
            keyhold = false;
        }
        if (power < 100) {
            power += 1;
            var rect = new Phaser.Geom.Rectangle(200, 850, 600, 50);
            var graphics = this.add.graphics({ fillStyle: {color: "black"}});
            graphics.fillRectShape(rect);
            var bar = new Phaser.Geom.Rectangle(203, 853, power*594/100, 44);
            if (power > 20) {
                var graphics = this.add.graphics({ fillStyle: {color: 0xFF0000FF}});
            }
            else {
                var graphics = this.add.graphics({ fillStyle: {color: 0xFFFF0000}});
            }
            graphics.fillRectShape(bar);
        }
        // new Goblin().update();
    }
}