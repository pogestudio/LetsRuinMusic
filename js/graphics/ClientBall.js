
var ClientBall = function (container) {
    this.container = container;

    this.sprite = new PIXI.Sprite.fromImage("images/big-client-ball.png");
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.alpha = 0.4;
    this.sprite.tint = Math.random() * 0xFFFFFF;
    container.addChild(this.sprite);
};

ClientBall.prototype.moveTo = function (x, y) {
    this.sprite.x = x;
    this.sprite.y = y;
}