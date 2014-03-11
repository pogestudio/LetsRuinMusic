var MiniMapCellFactory = function(cellSize, borderSize) {
    //Contain textures and stuff
    this.cellSize = cellSize;
    this.borderSize = borderSize;
};

MiniMapCellFactory.prototype.createCell = function(globalX, globalY, container) {
    var cell = new MiniMapCell(container, globalX, globalY, this.cellSize, this.borderSize);
    return cell;
};
