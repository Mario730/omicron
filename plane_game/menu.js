var rect;
var rect2;

class GameMenu extends Phaser.Scene {
    constructor() {
        super({key: 'GameMenu'});
    }
    create () {
        this.add.text(250, 130, "!! PlAnE tHiNgY !!", {
            fontFamily: 'monospace',
            fontSize: 48,
            color: '#ffffff',
            fontStyle: 'bold'
        })
        rect = new Phaser.Geom.Rectangle(300, 400, 175, 100);
        var graphics = this.add.graphics({ fillStyle: {color: "0x11FFFFFF"}});
        graphics.fillRectShape(rect);
        this.add.text(320, 420, "ez mode", {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#000000'
        })
        rect2 = new Phaser.Geom.Rectangle(525, 400, 175, 100);
        graphics.fillRectShape(rect2);
        this.add.text(545, 420, "hard mode", {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#000000'
        })
    }

    update () {
        
    }

}