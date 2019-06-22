var config = {
    type: Phaser.AUTO,
    width: 12*32,
    height: 6*32,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0},
            debug: false
        }
    },
    scene: [SceneMain]
};
var game = new Phaser.Game(config);