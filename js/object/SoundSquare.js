var SoundSquare = function(xPos, yPos, size, isHighlighted) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
    this.isHighlighted = isHighlighted;
    this.setInteractive(true);
};

SoundSquare.prototype = new PIXI.Graphics();
SoundSquare.prototype.constructor = SoundSquare;

SoundSquare.prototype.drawToCanvas = function() {
    this.lineStyle(2, 0xFFFFFF, 1);
    this.beginFill(0xFFFF0B, 0.5);
    //set color
    this.drawRect(0, 0, this.size, this.size);
};
