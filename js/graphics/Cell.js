
var Cell = function (container, textures, globalX, globalY, cellSize, borderSize) {

    this.x = globalX;
    this.y = globalY;
    this.value = 0;

    this.containerX = globalX * (cellSize + borderSize) + borderSize;
    this.containerY = globalY * (cellSize + borderSize) + borderSize;
    
    this.sprite = new PIXI.Sprite.fromImage("/images/white-square32.png");
    this.sprite.x = this.containerX;
    this.sprite.y = this.containerY;
    container.addChild(this.sprite);
};

Cell.prototype.startAnimation = function () {

};

Cell.prototype.updateAnimation = function (timeStep) {

};

Cell.prototype.endAnimation = function () {

};

Cell.prototype.isAnimationDone = function () {

};

Cell.prototype.setValue = function (value) {
    this.value = value;
    //TODO: Update sprite with new color or something
};
