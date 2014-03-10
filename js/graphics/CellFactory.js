
var CellFactory = function (container, textures, cellSize, borderSize) {
    //Contain textures and stuff
    this.container = container;
    this.textures = textures;
    this.cellSize = cellSize;
    this.borderSize = borderSize;
}

CellFactory.prototype.createCell = function(globalX, globalY) {
    var cell = new Cell(this.container, this.textures, globalX, globalY, this.cellSize, this.borderSize);
    return cell;
}