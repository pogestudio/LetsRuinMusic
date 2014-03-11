
var MiniMapCell = function (container, globalX, globalY, cellSize, borderSize) {

    this.x = globalX;
    this.y = globalY;
    this.value = 0;

    this.containerX = globalX * cellSize;
    this.containerY = globalY * cellSize;
    
    this.sprite = new PIXI.Sprite.fromImage("images/white-square4_no_border.png");
    this.sprite.x = this.containerX;
    this.sprite.y = this.containerY;
    container.addChild(this.sprite);
};

MiniMapCell.prototype.startAnimation = function () {

};

MiniMapCell.prototype.updateAnimation = function (timeStep) {

};

MiniMapCell.prototype.endAnimation = function () {

};

MiniMapCell.prototype.isAnimationDone = function () {

};

MiniMapCell.prototype.setValue = function (value) {
    this.value = value;
    this.sprite.alpha = value / 4;
};