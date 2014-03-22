var Overlay = function(cellSize) {

    this.interactiveMiddleSize = cellSize * 16;
    /*var sideQuarterHeight = (window.innerHeight - this.interactiveMiddleSize) / 2;

    //top left corner
    this.x = (window.innerWidth - this.interactiveMiddleSize) / 2;
    this.y = (window.innerHeight - this.interactiveMiddleSize) / 2;

    this.overlay = new PIXI.Graphics();
    this.overlay.beginFill(0x000000, 0.5);

    //Top square overlay part
    this.overlay.drawRect(0, 0, window.innerWidth, this.y);
    //Bottom square overlay part
    this.overlay.drawRect(0, (window.innerHeight + this.interactiveMiddleSize) / 2, window.innerWidth, this.y);
    //Left square ovelay part
    this.overlay.drawRect(0, sideQuarterHeight, this.x, this.interactiveMiddleSize);
    //Right square ovelay part
    this.overlay.drawRect((window.innerWidth + this.interactiveMiddleSize) / 2, sideQuarterHeight, this.x, this.interactiveMiddleSize);
    this.overlay.endFill();
    */
    this.overlay = new PIXI.Graphics();

    this.updateSize();
}

Overlay.prototype.updateSize = function () {
    var sideQuarterHeight = (window.innerHeight - this.interactiveMiddleSize) / 2;
    this.x = (window.innerWidth - this.interactiveMiddleSize) / 2;
    this.y = (window.innerHeight - this.interactiveMiddleSize) / 2;

    this.overlay.clear();
    this.overlay.beginFill(0x000000, 0.5);

    //Top square overlay part
    this.overlay.drawRect(0, 0, window.innerWidth, this.y);
    //Bottom square overlay part
    this.overlay.drawRect(0, (window.innerHeight + this.interactiveMiddleSize) / 2, window.innerWidth, this.y);
    //Left square ovelay part
    this.overlay.drawRect(0, sideQuarterHeight, this.x, this.interactiveMiddleSize);
    //Right square ovelay part
    this.overlay.drawRect((window.innerWidth + this.interactiveMiddleSize) / 2, sideQuarterHeight, this.x, this.interactiveMiddleSize);
    this.overlay.endFill();
}

Overlay.prototype.isInsideInteractive = function(x, y) {

    var xConditions = x > this.x && x < (this.x + this.interactiveMiddleSize);
    var yConditions = y > this.y && y < (this.y + this.interactiveMiddleSize);

    return xConditions && yConditions;
}