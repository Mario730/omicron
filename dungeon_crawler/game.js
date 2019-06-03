var config = {
    type: Phaser.AUTO,
    width: 2000,
    height: 1000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [SceneMain]
};
var game = new Phaser.Game(config);