var CanvasView = function(container, model) {

    // create an new instance of a pixi stage
    var stage = new PIXI.Stage(0x000000, true);
    stage.setInteractive(true);
    var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, null);

    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);
    renderer.view.style.position = "relative";
    renderer.view.style.top = "0px";
    renderer.view.style.left = "0px";

    // var graphics = new PIXI.Graphics();

    // graphics.setInteractive(true);

    var size = 30;

    var squaresX = 48; //window.innerWidth / size;
    var squaresY = 48; //window.innerHeight / size;


    // for (var i = squaresX - 1; i >= 0; i--) {
    //     for (var j = squaresY - 1; j >= 0; j--) {
    var i = 1;
    var j = 1;
    // var soundSquare = new SoundSquare(i, j, size, false);
    // var xCoord = i * size;
    // var yCoord = j * size;

    // soundSquare.x = xCoord;
    // soundSquare.y = yCoord;
    // soundSquare.drawToCanvas();
    // stage.addChild(soundSquare);

    for (var i = 0; i < squaresX; i++) {
        for (var j = 0; j < squaresY; j++) {
            var soundSquare = drawBox(i, j, size);
            stage.addChild(soundSquare);

        };
    };





    //            graphics.drawRect(xPos, yPos, size, size);
    //     }
    // };

    // graphics.mousedown = function(crapData) {
    //     console.log('pressed graphics, + ' + JSON.stringify(crapData,null,4));
    // };


    // stage.addChild(graphics);

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

var drawBox = function(i, j, size) {
    var soundSquare = new PIXI.Graphics();//SoundSquare(i, j, size, false);
    var xCoord = i * size;
    var yCoord = j * size;

    soundSquare.x = xCoord;
    soundSquare.y = yCoord;

    soundSquare.lineStyle(2, 0xFFFFFF, 1);
    soundSquare.beginFill(0xFFFF0B, 0.5);
    soundSquare.drawRect(0, 0, size, size);
    soundSquare.hitArea = new PIXI.Rectangle(0,0,size,size);
    soundSquare.setInteractive(true);

    soundSquare.click = function(data) {
        console.log('got click!! from X: ' + i + " from Y: " + j);
    }
    return soundSquare;
}
