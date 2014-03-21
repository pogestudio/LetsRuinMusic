
var ClientBall = function (container, color, cellSize) {
    this.container = container;
    this.cellSize = cellSize;

    this.sprite = new PIXI.Sprite.fromImage("images/big-client-ball.png");
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.alpha = 0.5;
    this.sprite.tint = color;

    container.addChild(this.sprite);

    this.cornerTL = new PIXI.Sprite.fromImage("images/corner.png");
    this.cornerTL.rotation = 0;
    this.cornerTL.alpha = 0.2;
    this.cornerTL.tint = color;

    this.cornerTR = new PIXI.Sprite.fromImage("images/corner.png");
    this.cornerTR.rotation = Math.PI * 0.5;
    this.cornerTR.alpha = 0.2;
    this.cornerTR.tint = color;

    this.cornerBL = new PIXI.Sprite.fromImage("images/corner.png");
    this.cornerBL.rotation = Math.PI * 1.5;
    this.cornerBL.alpha = 0.2;
    this.cornerBL.tint = color;

    this.cornerBR = new PIXI.Sprite.fromImage("images/corner.png");
    this.cornerBR.rotation = Math.PI;
    this.cornerBR.alpha = 0.15;
    this.cornerBR.tint = color;

    container.addChild(this.cornerTL);
    container.addChild(this.cornerTR);
    container.addChild(this.cornerBL);
    container.addChild(this.cornerBR);
};

ClientBall.prototype.destroy = function (container) {
    container.removeChild(this.sprite);
    container.removeChild(this.cornerTL);
    container.removeChild(this.cornerTR);
    container.removeChild(this.cornerBL);
    container.removeChild(this.cornerBR);
};

ClientBall.prototype.onFrameUpdate = function (timeStep) {
    this.sprite.x += (this.sprite.tx - this.sprite.x) * timeStep * 6;
    this.sprite.y += (this.sprite.ty - this.sprite.y) * timeStep * 6;

    this.cornerTL.x += (this.cornerTL.tx - this.cornerTL.x) * timeStep * 6;
    this.cornerTL.y += (this.cornerTL.ty - this.cornerTL.y) * timeStep * 6;
    this.cornerTR.x += (this.cornerTR.tx - this.cornerTR.x) * timeStep * 6;
    this.cornerTR.y += (this.cornerTR.ty - this.cornerTR.y) * timeStep * 6;
    this.cornerBL.x += (this.cornerBL.tx - this.cornerBL.x) * timeStep * 6;
    this.cornerBL.y += (this.cornerBL.ty - this.cornerBL.y) * timeStep * 6;
    this.cornerBR.x += (this.cornerBR.tx - this.cornerBR.x) * timeStep * 6;
    this.cornerBR.y += (this.cornerBR.ty - this.cornerBR.y) * timeStep * 6;
};

ClientBall.prototype.setPos = function (x, y, w, h) {
    this.sprite.x = this.cellSize * (x + w * 0.5);
    this.sprite.y = this.cellSize * (y + h * 0.5);

    this.cornerTL.x = this.cellSize * (x);
    this.cornerTL.y = this.cellSize * (y);
    this.cornerTR.x = this.cellSize * (x + w);
    this.cornerTR.y = this.cellSize * (y);
    this.cornerBL.x = this.cellSize * (x);
    this.cornerBL.y = this.cellSize * (y + h);
    this.cornerBR.x = this.cellSize * (x + w);
    this.cornerBR.y = this.cellSize * (y + h);
};

ClientBall.prototype.moveTo = function (x, y, w, h) {
    this.sprite.tx = this.cellSize * (x + w * 0.5);
    this.sprite.ty = this.cellSize * (y + h * 0.5);

    this.cornerTL.tx = this.cellSize * (x);
    this.cornerTL.ty = this.cellSize * (y);
    this.cornerTR.tx = this.cellSize * (x + w);
    this.cornerTR.ty = this.cellSize * (y);
    this.cornerBL.tx = this.cellSize * (x);
    this.cornerBL.ty = this.cellSize * (y + h);
    this.cornerBR.tx = this.cellSize * (x + w);
    this.cornerBR.ty = this.cellSize * (y + h);
};