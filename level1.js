var background;
var player;
var key;
var power = 99;
var health = 99;
var keyhold;
var shock;
class Goblin extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key) {
      super(scene, x, y, key);
      this.scene = scene;
      this.setScale(0.4);
      this.scene.add.existing(this);
      this.alive = true;
    }

    update () {
        if (!this.alive) {
            return;
        }
        if (((player.y - this.y)**2 + (player.x - this.x)**2) > 10000) {
            if (this.x < 500) {
                this.x += (Math.cos(Math.atan((500-this.y)/(500-this.x))))*10;
                this.y += (Math.sin(Math.atan((500-this.y)/(500-this.x))))*10;
            } else {
                this.x -= (Math.cos(Math.atan((500-this.y)/(500-this.x))))*10;
                this.y -= (Math.sin(Math.atan((500-this.y)/(500-this.x))))*10;
            }
            if (key.shift.isDown && power > 3) {
                this.x -= Math.sin(Math.PI*player.angle/180)*20;
                this.y += Math.cos(Math.PI*player.angle/180)*20;
            }
            this.x -= Math.sin(Math.PI*player.angle/180)*20;
            this.y += Math.cos(Math.PI*player.angle/180)*20;
        }
        if (((player.y - this.y)**2 + (player.x - this.x)**2) <= 10000 && health > 0) {
            health -= 0.5;
        }
        if (this.x < -500 || this.x > 1500 || this.y < -500 || this.y > 1500) {
            this.die();
        }
    }

    die () {
        this.alive = false;
        this.scene.goblins.remove(this);
        this.setTint(0xFF8888);
        let goblindeath = this.scene.add.tween({
            targets: this,
            scaleX: 0,
            scaleY: 0,
            alpha: 0,
            angle: 720,
            duration: 400,
            ease: 'Linear',
            onComplete: () => {this.destroy()}
        })
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
        this.goblins = this.add.group();
    }

    update () {
        this.goblins.getChildren().forEach((goblin) => {
            goblin.update();
        });
        if (this.goblins.getChildren().length < 5) {
            var x;
            var y;
            var choice = Phaser.Math.RND.pick([1,2,3,4,])
            if (choice == 1) {
                x = 900*Math.random()+50;
                y = -100;
            } else if (choice == 2) {
                x = 900*Math.random()+50;
                y = 1100;
            } else if (choice == 3) {
                x = -100;
                y = 900*Math.random()+50;
            } else if (choice == 4) {
                x = 1100;
                y = 900*Math.random()+50;
            }
            this.goblins.add(new Goblin(this, x, y, 'goblin'));
        }
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
                    onComplete: () => {
                        shock.alpha = 0;
                        this.goblins.getChildren().forEach((goblin) => {
                            if (((player.y - goblin.y)**2 + (player.x - goblin.x)**2) <= 22500) {
                                goblin.die();
                            }
                        });
                    }
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
            var powerrect = new Phaser.Geom.Rectangle(200, 850, 600, 50);
            var graphics = this.add.graphics({ fillStyle: {color: "black"}});
            graphics.fillRectShape(powerrect);
            var powerbar = new Phaser.Geom.Rectangle(203, 853, power*594/100, 44);
            if (power > 20) {
                var graphics = this.add.graphics({ fillStyle: {color: 0xFF0000FF}});
            }
            else {
                var graphics = this.add.graphics({ fillStyle: {color: 0xFFFF0000}});
            }
            graphics.fillRectShape(powerbar);
        }
        if (health < 100) {
            if (this.goblins.getChildren().every((goblin) => ((player.y - goblin.y)**2 + (player.x - goblin.x)**2) > 10000)) {
                health += 1;
            }
            var healthrect = new Phaser.Geom.Rectangle(200, 775, 600, 50);
            var graphics = this.add.graphics({ fillStyle: {color: "black"}});
            graphics.fillRectShape(healthrect);
            var healthbar = new Phaser.Geom.Rectangle(203, 778, health*594/100, 44);
            if (health > 20) {
                var graphics = this.add.graphics({ fillStyle: {color: 0xFF00FF00}});
            }
            else {
                var graphics = this.add.graphics({ fillStyle: {color: 0xFFFF0000}});
            }
            graphics.fillRectShape(healthbar);
        }
        if (health == 0) {
            this.scene.pause();
        } 
    }
}