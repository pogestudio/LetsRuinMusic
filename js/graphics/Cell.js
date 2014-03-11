
var Cell = function (container, textures, globalX, globalY, cellSize, borderSize) {
    this.x = globalX;
    this.y = globalY;
    this.value = 0;

    this.containerX = globalX * cellSize;
    this.containerY = globalY * cellSize;
    
    this.sprite = null; //TODO: PIXI sprite
}

Cell.prototype.startAnimation = function () {

}

Cell.prototype.updateAnimation = function (timeStep) {

}

Cell.prototype.endAnimation = function () {

}

Cell.prototype.isAnimationDone = function () {

}

Cell.prototype.setValue = function (value) {
    this.value = value;
    //TODO: Update sprite with new color or something
}
