var MiniMapView = function(container, model) {



    // create an new instance of a pixi stage
    var stage = new PIXI.Stage(0x000000, true);
    stage.setInteractive(true);
    var miniMapSize = 200;
    var renderer = PIXI.autoDetectRenderer(miniMapSize, miniMapSize, null);

    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);
    renderer.view.style.position = "absolute";
    renderer.view.style.top = "0px";
    renderer.view.style.left = "0px";

    // var graphics = new PIXI.Graphics();

    // graphics.setInteractive(true);

    var size = 200;
    var amountOfSquares = 50;
    var squareSize = size / amountOfSquares;
    // var miniMap = createMiniMap(size, model);
    // stage.addChild(miniMap);


    // run the render loop
    requestAnimFrame(animate);

    var miniMap = this._createMiniMap(size, model);
    stage.addChild(miniMap);

    this.miniMapSquares = this._populateSquaresWithReference(amountOfSquares, amountOfSquares, squareSize, stage);


    var getChangeList = function() {
        var changeList = [];
        changeList.push({
            x: Math.floor(Math.random() * amountOfSquares),
            y: Math.floor(Math.random() * amountOfSquares),
            value: Math.random() > 0.5 ? 0 : 1,
        });
        changeList.push({
            x: Math.floor(Math.random() * amountOfSquares),
            y: Math.floor(Math.random() * amountOfSquares),
            value: Math.random() > 0.5 ? 0 : 1,
        });
        return changeList;
    };

    var self = this;

    function animate() {
        var listOfUpdatedIcons = getChangeList();
        self._drawIconsFromChangeList(listOfUpdatedIcons, amountOfSquares, squareSize, stage);
        renderer.render(stage);
        requestAnimFrame(animate);
    }


    /*****************************************  
          Observer implementation    
    *****************************************/

    //Register an observer to the model
    model.addObserver(this);

    //This function gets called when there is a change at the model
    this.update = function(arg) {
        //this.numberOfGuests.html(model.getSomething());
    };
};

MiniMapView.prototype._createMiniMap = function(size, model) {
    var miniMap = new PIXI.Graphics();

    miniMap.x = 0;
    miniMap.y = 0;

    miniMap.lineStyle(2, 0xFFFFFF, 1);

    miniMap.beginFill(0x000000, 0.5);

    miniMap.drawRect(0, 0, size, size);

    //miniMap.hitArea = new PIXI.Rectangle(0, 0, size, size);
    //miniMap.setInteractive(true);
    // miniMap.click = function(data) {
    //     console.log('got click in minimap');
    // };
    return miniMap;
};

MiniMapView.prototype._drawIconsFromChangeList = function(changeList, amountOfSquares, squareSize, stage) {

    for (var i = 0; i < changeList.length; i++) {
        var changeListEntry = changeList[i];
        var miniMapSquare = this._updateSquareAtPosition(changeListEntry.x, changeListEntry.y, changeListEntry.value, squareSize);
    }
};

MiniMapView.prototype._updateSquareAtPosition = function(x, y, value, size) {
    var square = this.miniMapSquares[y][x];

    if (value) {
        square.beginFill(0xFFFFFF, 1);
    } else {
        square.beginFill(0x000000, 1);
    }
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
