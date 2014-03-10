
var CellContainer = function (cellFactory, model, audioViewController) {
    this.cellFactory = cellFactory;
    this.container = new PIXI.SpriteBatch();

    model.addObserver(this);
    audioViewController.addObserver(this);

    //Some nice data structure for cells
}

CellContainer.prototype.update = function (model) {

}

CellContainer.prototype.setCell = function (globalX, globalY, value) {

}

CellContainer.prototype.getCell = function (globalX, globalY) {

}

CellContainer.prototype.getGlobalPosFromScreenPos = function(screenX, screenY) {

}

CellContainer.prototype.onPlaySound = function (x, y) {
    //for each cell at x, y
    //  startAnim
    //  add to anim list
}

CellContainer.prototype.updateAnimations = function (timeStep) {
    //update all cells in anim list
    //  check if cell is done, then remove it
}