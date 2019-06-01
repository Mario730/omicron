var background;
var player;
var key;
var power = 100;
var health = 100;
var healthbar;
var powerbar;
var healthtick = 0;
var keyhold;
var shock;
var playerscore = 0;
var scoretext;

class Goblin extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key) {
      super(scene, x, y, key);
      this.scene = scene;
      this.setScale(0.4);
      this.scene.add.existing(this);
      this.alive = true;
      this.goblinspeed = 15;
    }

    update () {
        if (!this.alive) {
            return;
        }
        if (((player.y - this.y)**2 + (player.x - this.x)**2) > 10000) {
            if (this.x < 500) {
                this.x += (Math.cos(Math.atan((500-this.y)/(500-this.x))))*this.goblinspeed;
                this.y += (Math.sin(Math.atan((500-this.y)/(500-this.x))))*this.goblinspeed;
            } else {
                this.x -= (Math.cos(Math.atan((500-this.y)/(500-this.x))))*this.goblinspeed;
                this.y -= (Math.sin(Math.atan((500-this.y)/(500-this.x))))*this.goblinspeed;
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
            this.scene.goblins.remove(this);
            this.scene.circle.add(this);
            healthtick += 0.5;
        }
        if (this.x < -200 || this.x > 1200 || this.y < -200 || this.y > 1200) {
            this.die();
        }
    }

    die () {
        this.alive = false;
        this.scene.goblins.remove(this);
        this.scene.circle.remove(this);
        this.setTint(0xFF8888);
        this.scene.add.tween({
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
        this.add.rectangle(500, 875, 600, 50, 0xFF000000).setDepth(1);
        this.add.rectangle(500, 800, 600, 50, 0xFF000000).setDepth(1);
        powerbar = this.add.rectangle(500, 875, 596, 46, 0xFF668CFF).setDepth(2);
        healthbar = this.add.rectangle(500, 800, 596, 46, 0xFF71DA71).setDepth(2);
        shock = this.add.image(500, 500, 'shock').setScale(0.9);
        shock.alpha = 0;
        this.goblins = this.add.group();
        this.circle = this.add.group();
        scoretext = this.add.text(850, 20, "Score: " + playerscore, {
            color: '#FFFFFF',
            fontFamily: 'monospace',
            fontSize: 20
        })
        var labels = this.add.text(184, 897, "Power   Health", {
            color: '#FFFFFF',
            fontFamily: 'monospace',
            fontSize: 15
        })
        labels.angle = -90;
        scoretext.setDepth(1);
        labels.setDepth(1);
    }

    update () {
        scoretext.setText("Score: " + playerscore);
        this.goblins.getChildren().forEach((goblin) => {
            goblin.update();
        });
        this.circle.getChildren().forEach((goblin) => {
            goblin.update();
        })
        if (this.goblins.getChildren().length + this.circle.getChildren().length < 10) {
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
        if (key.right.isDown) {
            player.angle += 10;
            Phaser.Actions.RotateAroundDistance(this.circle.getChildren(), {x: 500, y: 500}, Math.PI/18, 80);
            this.circle.getChildren().forEach((goblin) => {
                goblin.angle += 10;
            });
        }
        if (key.left.isDown) {
            player.angle -= 10;
            Phaser.Actions.RotateAroundDistance(this.circle.getChildren(), {x: 500, y: 500}, -Math.PI/18, 80);
            this.circle.getChildren().forEach((goblin) => {
                goblin.angle -= 10;
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
                this.add.tween({
                    targets: shock,
                    alpha: 1,
                    ease: 'Linear',
                    duration: 80,
                    yoyo: true,
                    onComplete: () => {
                        shock.alpha = 0;
                        this.circle.getChildren().forEach((goblin) => {
                            goblin.die();
                            playerscore++;
                        });
                        this.goblins.getChildren().forEach((goblin) => {
                            if (((player.y - goblin.y)**2 + (player.x - goblin.x)**2) <= 40000) {
                                goblin.die();
                                playerscore++;
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
        }
        if (power > 100) {
            power = 100;
        }
        if (health < 100) {
            if (this.circle.getChildren().length == 0) {
                health += 1;
            }
        }
        if (health > 100) {
            health = 100;
        }
        if (health == 0) {
            this.scene.pause();
            this.add.text(250, 130, "Game Over!", {
                fontFamily: 'monospace',
                fontSize: 48,
                color: '#ffffff',
                fontStyle: 'bold'
            })
            scoretext.setText(' ');
            this.add.text(300, 180, "Score: " + playerscore, {
                fontFamily: 'monospace',
                fontSize: 36,
                color: '#ffffff',
                fontStyle: 'bold'
            })
        }
        if (healthtick >= 20) {
            healthtick = 0;
            this.tweens.addCounter({
                from: 255,
                to: 0,
                duration: 80,
                onStart: () => {
                    player.setTint(0xFF8888);
                },
                onComplete: () => {
                    player.clearTint();
                }
            });
        }
        healthbar.width = health*596/100;
        if (health > 20) {
            healthbar.fillColor = 0xFF71DA71;
        }
        else {
            healthbar.fillColor = 0xFFFF0000;
        }
        powerbar.width = power*596/100;
        if (power > 20) {
            powerbar.fillColor = 0xFF668CFF;
        }
        else {
            powerbar.fillColor = 0xFFFF0000;
        }
    }
}