var MiniMapView = function(container, model,rendererContainer) {

    this.changeList = [];



    // create an new instance of a pixi stage
    var stage = rendererContainer.stage;
    stage.setInteractive(true);
    var miniMapSize = 200;
    var renderer = PIXI.autoDetectRenderer(miniMapSize, miniMapSize, null);

    // var graphics = new PIXI.Graphics();

    // graphics.setInteractive(true);

    var size = 200;
    var amountOfSquares = 50;
    var squareSize = size / amountOfSquares;
    // var miniMap = createMiniMap(size, model);
    // stage.addChild(miniMap);
    this.amountOfSquares = amountOfSquares;
    this.squareSize = squareSize;


    var miniMap = this._createMiniMap(size, model);
    stage.addChild(miniMap);

    this.miniMapSquares = this._populateSquaresWithReference(amountOfSquares, amountOfSquares, squareSize, stage);

    /*****************************************  
          Observer implementation    
    *****************************************/

    rendererContainer.addFrameListener(this);

    //Register an observer to the OLD MODEL
    model.addObserver(this);

    //This function gets called when there is a change at the model
    this.update = function(arg) {
        this.changeList = model.minimapData.changeList;
        //this.numberOfGuests.html(model.getSomething());
    };
};

MiniMapView.prototype.onFrameRender = function (rendererContainer) {
    this._drawIconsFromChangeList(this.changeList, this.amountOfSquares, this.squareSize, rendererContainer.stage);
    this.changeList = [];
}


MiniMapView.prototype._createMiniMap = function (size, model) {
    var miniMap = new PIXI.Graphics();

    miniMap.x = 0;
    miniMap.y = 0;

    //miniMap.lineStyle(2, 0xFFFFFF, 1);

    miniMap.beginFill(0x000000, 0.5);

    //miniMap.drawRect(0, 0, size, size);

    //miniMap.hitArea = new PIXI.Rectangle(0, 0, size, size);
    //miniMap.setInteractive(true);
    // miniMap.click = function(data) {
    //     console.log('got click in minimap');
    // };
    return miniMap;
};

MiniMapView.prototype._drawIconsFromChangeList = function(changeList, squareSize) {

    for (var i = 0; i < changeList.length; i++) {
        var changeListEntry = changeList[i];
        var miniMapSquare = this._updateSquareAtPosition(changeListEntry.x, changeListEntry.y, changeListEntry.value, squareSize);
    }
};

MiniMapView.prototype._updateSquareAtPosition = function(x, y, value, size) {
    var square = this.miniMapSquares[y][x];

    var color = null;
    switch (value) {
        case 0:
            {
                color = 0x000000;
                break;
            }
        case 1:
            {
                color = 0x7D7D7D;
                break;
            }
        case 2:
            {
                color = 0xACACAC;
                break;
            }
        case 3:
            {
                color = 0xD7D7D7;
                break;
            }
        case 4:
            {
                color = 0xFFFFFF;
                break;
            }
        default:
            {
                console.error('error error unhandled values in minimap ::::::OOO');
                break;
            }
    }

    square.beginFill(color, 1);
    square.drawRect(0, 0, size, size);
};

MiniMapView.prototype._populateSquaresWithReference = function(maxX, maxY, squareSize, stage) {
    var references = [];
    for (var y = 0; y < maxY; y++) {
        references[y] = [];
        for (var x = 0; x < maxX; x++) {
            var miniMapSquare = this._createMiniMapSquare(x, y, squareSize);
            references[y][x] = miniMapSquare;
            stage.addChild(miniMapSquare);
        }
    }
    return references;
};

MiniMapView.prototype._createMiniMapSquare = function(x, y, size) {

    var miniMapSquare = new PIXI.Graphics();

    var xCoord = x * size;
    var yCoord = y * size;

    miniMapSquare.x = xCoord;
    miniMapSquare.y = yCoord;
    miniMapSquare.beginFill(0x000000, 1);
    miniMapSquare.drawRect(0, 0, size, size);
    //miniMapSquare.hitArea = new PIXI.Rectangle(0, 0, size, size);
    //miniMapSquare.setInteractive(true);
    // miniMapSquare.click = function(data) {
    //     console.log('got click!! from X: ' + i + " from Y: " + j);
    // };
    return miniMapSquare;
};
