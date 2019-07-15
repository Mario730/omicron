var config = {
    type: Phaser.AUTO,
    width: 11*32,
    height: 13*32,
    render: {
        antialias: false
    },
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