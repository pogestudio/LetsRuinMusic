var CanvasView = function(container, model) {

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
    var size = window.innerWidth / 48;
    var squaresX = 48;
    var squaresY = 48;
    var offsetY = (window.innerWidth - window.innerHeight) / 2;



    for (var j = 0; j < squaresY; j++) {
        this.soundSquares[j] = [];
        for (var i = 0; i < squaresX; i++) {
            var soundSquare = drawBox(i, j, size, model);
            container.addChild(soundSquare);
            this.setSoundSquare(i,j,soundSquare);
        }
    }

    container.position.y = -offsetY;
    stage.addChild(container);



    // run the render loop
    requestAnimFrame(animate);

    function animate() {
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

var drawField = function(model) {

}

var drawBox = function(i, j, size, model) {
    var soundSquare = new PIXI.Graphics(); //SoundSquare(i, j, size, false);
    var xCoord = i * size;
    var yCoord = j * size;

    soundSquare.x = xCoord;
    soundSquare.y = yCoord;

    soundSquare.lineStyle(2, 0xFFFFFF, 1);

    // var blurFilter = new PIXI.BlurFilter();

    if (i < 16 || i > 31 || j < 16 || j > 31) {

        // soundSquare.filters = [blurFilter];
        soundSquare.alpha = 0.1;
    }


    if (model.getCellLocal(i, j)) {
        soundSquare.beginFill(0xFFFF0B, 0.5);
    } else {
        soundSquare.beginFill(0x00AA0B, 0.5);
    }

    soundSquare.drawRect(0, 0, size, size);
    soundSquare.hitArea = new PIXI.Rectangle(0, 0, size, size);
    soundSquare.setInteractive(true);

    soundSquare.click = function(data) {
        console.log('got click!! from X: ' + i + " from Y: " + j);
        console.log('value before click: ' + model.getCellLocal(i, j));
        var currentValue = model.getCellLocal(i, j);
        var newValue = 1 - currentValue;
        model.setCellLocal(i, j, newValue);
        model.notifyObservers();
        console.log('value after click: ' + model.getCellLocal(i, j));
    };
    return soundSquare;
}

CanvasView.prototype.setSoundSquare = function(x, y, square) {
    this.soundSquares[y][x] = square;
};

CanvasView.prototype.getSoundSquare = function(x, y) {
    return this.soundSquares[y][x];
};
