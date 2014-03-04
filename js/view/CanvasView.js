var CanvasView = function(container, model) {

    this.changeList = [];
    this.soundSquares = [];

    // create an new instance of a pixi stage
    var stage = new PIXI.Stage(0x000000, true);
    var container = new PIXI.DisplayObjectContainer();
    stage.setInteractive(true);
    var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, null);

    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);
    renderer.view.style.position = "relative";
    renderer.view.style.top = "0px";
    renderer.view.style.left = "0px";

    // numbers for the squares/grid
    var numOfSquares = 48;
    var offsetY = (window.innerWidth - window.innerHeight) / 2;
    var size = window.innerWidth / numOfSquares;

    this.populateCanvas(numOfSquares, size, container, model);
    container.position.y = -offsetY;
    stage.addChild(container);

    // run the render loop
    requestAnimFrame(animate);

    var self = this;

    function animate() {
        self.updateChangedSquares(self.changeList, size);
        self.changeList = [];

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
        this.changeList = model.changeList;
    };
};

CanvasView.prototype.updateChangedSquares = function(changeList, size) {

    for (var i = 0; i < changeList.length; i++) {

        var changeListEntry = changeList[i];
        var x = changeListEntry.x;
        var y = changeListEntry.y;
        var value = changeListEntry.value;
        var square = this.getSoundSquare(x, y);

        square.clear();
        square.lineStyle(2, 0xFFFFFF, 1);

        if (value) {
            square.beginFill(0xFFFF0B, 0.5);
            square.drawRect(0, 0, size, size);
        } else {
            square.beginFill(0x00AA0B, 0.5);
            square.drawRect(0, 0, size, size);
        };
    }
};

CanvasView.prototype.populateCanvas = function(numOfSquares, size, container, model) {

    for (var j = 0; j < numOfSquares; j++) {
        this.soundSquares[j] = [];
        for (var i = 0; i < numOfSquares; i++) {
            var soundSquare = this.createSoundSquare(i, j, size, model);
            container.addChild(soundSquare);
            this.setSoundSquare(i, j, soundSquare);
        }
    }
};

CanvasView.prototype.createSoundSquare = function(i, j, size, model) {
    var soundSquare = new PIXI.Graphics(); //SoundSquare(i, j, size, false);
    var xCoord = i * size;
    var yCoord = j * size;

    soundSquare.x = xCoord;
    soundSquare.y = yCoord;

    soundSquare.lineStyle(2, 0xFFFFFF, 1);

    var isInActive = (16 > i || i > 31 || 16 > j || j > 31);

    if (isInActive) {
        soundSquare.alpha = 0.1;
    } else {
        soundSquare.click = function(data) {
            console.log('got click!! from X: ' + i + " from Y: " + j);
            var currentValue = model.getCellLocal(i, j);
            var newValue = 1 - currentValue;
            model.setCellLocal(i, j, newValue);
            model.notifyObservers();
        };
    };


    if (model.getCellLocal(i, j)) {
        soundSquare.beginFill(0xFFFF0B, 0.5);
    } else {
        soundSquare.beginFill(0x00AA0B, 0.5);
    }

    soundSquare.drawRect(0, 0, size, size);
    soundSquare.hitArea = new PIXI.Rectangle(0, 0, size, size);
    soundSquare.setInteractive(true);


    return soundSquare;
};

CanvasView.prototype.setSoundSquare = function(x, y, square) {
    this.soundSquares[y][x] = square;
};

CanvasView.prototype.getSoundSquare = function(x, y) {
    return this.soundSquares[y][x];
};
