
var Cell = function (container, textures, globalX, globalY, cellSize, borderSize) {

    this.x = globalX;
    this.y = globalY;
    this.value = 0;

    this.containerX = globalX * cellSize;
    this.containerY = globalY * cellSize;
    
    this.sprite = new PIXI.Sprite.fromImage("images/white-square32.png");
    this.sprite.x = this.containerX;
    this.sprite.y = this.containerY;
    container.addChild(this.sprite);
};

Cell.prototype.startAnimation = function () {

    this.sprite.alpha = 0;

};

Cell.prototype.updateAnimation = function (timeStep) {

    this.sprite.alpha += 0.01;

};

Cell.prototype.endAnimation = function () {
    this.sprite.alpha = 1;
};

Cell.prototype.isAnimationDone = function () {

    return this.sprite.alpha > 1;

};

Cell.prototype.setValue = function (value) {
    this.value = value;
    //TODO: Update sprite with new color or something
};
