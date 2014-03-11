var CellFactory = function(cellSize, borderSize) {
    //Contain textures and stuff
    this.cellSize = cellSize;
    this.borderSize = borderSize;
};

CellFactory.prototype.createCell = function(globalX, globalY, container) {
    var cell = new Cell(container, globalX, globalY, this.cellSize, this.borderSize);
    return cell;
};
