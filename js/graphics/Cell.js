
var Cell = function (container, globalX, globalY, cellSize, borderSize, imgPath) {

    this.x = globalX;
    this.y = globalY;
    this.value = 0;
    

    this.containerX = globalX * cellSize + cellSize / 2;
    this.containerY = globalY * cellSize + cellSize / 2;

    this.sprite = new PIXI.Sprite.fromImage(imgPath);

    this.plotHelper;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.scale = new PIXI.Point(1, 1);

    this.sprite.x = this.containerX;
    this.sprite.y = this.containerY;
    container.addChild(this.sprite);
};

Cell.prototype.startAnimation = function() {

    this.plotHelper = 0;

};

Cell.prototype.updateAnimation = function(timeStep) {

    this.plotHelper += 2*timeStep;

    this.sprite.scale.x = -0.2*this.plotHelper*this.plotHelper+1.2;
    this.sprite.scale.y = -0.2*this.plotHelper*this.plotHelper+1.2;
    this.sprite.alpha = -this.plotHelper*this.plotHelper+2;
};

Cell.prototype.endAnimation = function() {

    this.sprite.scale.x = 1;
    this.sprite.scale.y = 1;
    this.sprite.alpha = 1;
};

Cell.prototype.isAnimationDone = function() {

    return this.plotHelper > 1;

};

Cell.prototype.setValue = function(value) {
    this.value = value;
    //TODO: Update sprite with new color or something
};
