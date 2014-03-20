var MiniMapCell = function(container, globalX, globalY, cellSize, borderSize) {

    this.x = globalX;
    this.y = globalY;
    this.value = 0;

    var offSet = 50;
    this.containerX = offSet + globalX * cellSize;
    this.containerY = offSet + globalY * cellSize;

    this.sprite = new PIXI.Sprite.fromImage("images/white-square1_no_border.png");
    this.sprite.x = this.containerX;
    this.sprite.y = this.containerY;
    container.addChild(this.sprite);
};

MiniMapCell.prototype.startAnimation = function() {

};

MiniMapCell.prototype.updateAnimation = function(timeStep) {

};

MiniMapCell.prototype.endAnimation = function() {

};

MiniMapCell.prototype.isAnimationDone = function() {

};

MiniMapCell.prototype.setValue = function(value) {
    this.value = value;
    this.sprite.alpha = value > 0 ? 1 : 0;
};
