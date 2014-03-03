var SoundSquare = function(xPos, yPos, size, isHighlighted) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
    this.isHighlighted = isHighlighted;
};

SoundSquare.prototype = new Pixi.graphics();
SoundSquare.prototype.constructor = SoundSquare;

SoundSquare.prototype.drawToCanvas = function() {
    //set color
    drawRect(0,0,size,size);
};

