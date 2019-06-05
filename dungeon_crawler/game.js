var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 512,
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