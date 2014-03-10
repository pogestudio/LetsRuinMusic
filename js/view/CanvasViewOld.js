var CanvasView = function(containerDiv, model, rendererContainer) {

    this.changeList = [];
    this.soundSquares = [];
    this.model = model;
    this.animateBuffer = [];

    // create an new instance of a pixi stage
    var stage = rendererContainer.stage;
    var container = new PIXI.DisplayObjectContainer();
    this.container = container;



    stage.setInteractive(true);


    // numbers for the squares/grid
    var numOfSquares = 48;
    var offsetY = (window.innerWidth - window.innerHeight) / 2;
    container.position.y -= offsetY;
    var size = window.innerWidth / numOfSquares;
    this.size = size;
    this.squareSize = size;

    this.populateCanvas(numOfSquares, size, container, model);

    stage.addChild(container);

    // overlay
    var overlay = this.buildOverlay(size);
    stage.addChild(overlay);

    // run the render loop
    //requestAnimFrame(animate);

    stage.setInteractive(true);
    stage.hitArea = this._hitPolygonForContainer(size);
    this.addDragNDropMouseListenersToElement(stage);

    var self = this;

   /* function animate() {
        rendererContainer.stats.begin();
        self.updateChangedSquares(self.changeList, size);
        self.changeList = [];

        //animate the squares in animateBuffer
        if (self.animateBuffer[0] !== undefined) {
            for (var i = 0; i < self.animateBuffer.length; i++) {
                self.animateActiveSoundSquare(self.animateBuffer[i]);
            }
        }

        rendererContainer.renderer.render(stage);
        requestAnimFrame(animate);
        rendererContainer.stats.end();
    }*/
    rendererContainer.addFrameListener(this);

    /*****************************************  
          Observer implementation    
    *****************************************/

    //Register an observer to the model
    model.addObserver(this);

    //This function gets called when there is a change at the model
    /*this.update = function(arg) {
        this.changeList = model.changeList;
        console.log('this is called on move, but it doesnt initiate redraw at all. FIX!');
    };*/

    //This function gets called when sound is played
    this.onPlaySound = function(x, y) {

        var square = this.getSoundSquare(x, y);
        square.alpha = 0;

        //add played square to animationBuffer
        this.animateBuffer.push(square);
    };
};


//Model change notification
CanvasView.prototype.update = function (model) {
    model.changeList.forEach(function (cell) {
        //Check if cell exists
        //If not create
        //Else update
    });
}


CanvasView.prototype.onFrameRender = function (renderer) {
    this.updateChangedSquares(this.changeList, this.size);
    this.changeList = [];

    //animate the squares in animateBuffer
    if (this.animateBuffer[0] !== undefined) {
        for (var i = 0; i < this.animateBuffer.length; i++) {
            this.animateActiveSoundSquare(this.animateBuffer[i]);
         //   cell.updateAnim(dt)
        //    if(cell.isDone())
         //       remove formanimstack
        }
    }
}

CanvasView.prototype.animateActiveSoundSquare = function(square) {
    if (square.alpha < 1) {
        square.alpha += 0.05;
    } else {
        //remove the square from animateBuffer
        square.alpha = 1;
        var indexofAnimateBuffer = this.animateBuffer.indexOf(square);
        this.animateBuffer.splice(indexofAnimateBuffer, 1);
    }
};

CanvasView.prototype.buildOverlay = function(size) {

    var overlay = new PIXI.Graphics();
    var fullSize = size * 16;
    var heightHelper = (window.innerHeight - size * 16) / 2;

    overlay.beginFill(0x000000, 0.5);
    overlay.drawRect(0, 0, window.innerWidth, heightHelper);
    overlay.drawRect(0, window.innerHeight - heightHelper, window.innerWidth, heightHelper);
    overlay.drawRect(0, heightHelper, fullSize, fullSize);
    overlay.drawRect(fullSize * 2, heightHelper, fullSize, fullSize);
    overlay.endFill();

    return overlay;
};

CanvasView.prototype.updateChangedSquares = function(changeList, size) {

    for (var i = 0; i < changeList.length; i++) {

        var changeListEntry = changeList[i];
        var x = changeListEntry.x;
        var y = changeListEntry.y;
        var value = changeListEntry.value;
        var square = this.getSoundSquare(x, y);

        square.clear();
        square.lineStyle(2, 0x000000, 1);

        if (value) {
            square.beginFill(0xDADADA, 1);
            square.drawRect(0, 0, size, size);
        } else {
            square.beginFill(0x2A2A2A, 1);
            this.animateActiveSoundSquare(square);
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

    soundSquare.lineStyle(2, 0x000000, 1);

    var isInActive = (16 > i || i > 31 || 16 > j || j > 31);

    if (isInActive) {

    } else {
        soundSquare.click = function(data) {
            console.log('got click!! from X: ' + i + " from Y: " + j);
            var currentValue = model.getCellLocal(i, j);
            var newValue;
            var instrumentNumber = model.getInstrNr();

            if(currentValue === instrumentNumber)
            {
                newValue = 0;
            }
            else {
                newValue = instrumentNumber;
            }
            
            model.setCellLocal(i, j, newValue);
            model.notifyObservers();
        };
    }

    if (model.getCellLocal(i, j)) {
        soundSquare.beginFill(0xDADADA, 1);
    } else {
        soundSquare.beginFill(0x2A2A2A, 1);
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

CanvasView.prototype.addDragNDropMouseListenersToElement = function(element) {
    // use the mousedown and touchstart
    var firstMouseDown = {};
    var lastMouseDown = {};
    var squareSize = this.squareSize;
    var model = this.model;

    var container = this.container;
    var containerOrigPos = {
        x: container.position.x,
        y: container.position.y,
    };

    element.mousedown = element.touchstart = function(data) {

        // stop the default event...
        data.originalEvent.preventDefault();

        // store a reference to the data
        // The reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = data;
        this.alpha = 0.9;
        this.dragging = true;
        // console.log("mouse down");
        lastMouseDown = {
            x: data.global.x,
            y: data.global.y,
        };
        firstMouseDown = {
            x: data.global.x,
            y: data.global.y,
        };
    };

    // set the events for when the mouse is released or a touch is released
    element.mouseup = element.mouseupoutside = element.touchend = element.touchendoutside = function(data) {
        this.alpha = 1;
        if (this.dragging === true) {
            console.log('SET NEW POSITION AND REDRAW EVERYTHING!!!!');

            //calculate how far we went
            var xDistance = lastMouseDown.x - firstMouseDown.x;
            var yDistance = lastMouseDown.y - firstMouseDown.y;
            var amountOfSquaresX = ~~ ((xDistance + squareSize * 0.5) / squareSize);
            var amountOfSquaresY = ~~ ((yDistance + squareSize * 0.5) / squareSize);

            var offSetX = -amountOfSquaresX; //negate, since if we move canvas up we want to go down and vice versa.
            var offSetY = -amountOfSquaresY;

            //set the new position
            model.setTopLeftOffset(offSetX, offSetY);
            model.notifyObservers();
            //call redraw
            container.x = containerOrigPos.x;
            container.y = containerOrigPos.y;


        }
        this.dragging = false;
        // set the interaction data to null
        this.data = null;
        // console.log("mouse up");

    };

    // set the callbacks for when the mouse or a touch moves
    element.mousemove = element.touchmove = function(data) {
        if (this.dragging) {
            // console.log('oldPOS: ' + JSON.stringify(lastMouseDown, null, 4));
            // console.log('newPOS: ' + JSON.stringify(data.global, null, 4));
            var newPosition = data.global;
            var yOffset = newPosition.y - lastMouseDown.y;
            var xOffset = newPosition.x - lastMouseDown.x;

            container.position.x += xOffset;
            container.position.y += yOffset;

            //console.log("XOFF: " + xOffset + " YOFF: " + yOffset);
            lastMouseDown = {
                x: newPosition.x,
                y: newPosition.y,
            };
        }
    };
};

CanvasView.prototype._hitPolygonForContainer = function(squareSize) {
    var high = 31;
    var low = 16;
    var docWidth = window.innerWidth;
    var docHeight = window.innerHeight;

    var lowX = (docWidth - 16 * squareSize) / 2;
    var highX = lowX + 16 * squareSize;

    var lowY = (docHeight - 16 * squareSize) / 2;
    var highY = lowY + 16 * squareSize;



    var polygon = new PIXI.Polygon([
        new PIXI.Point(0, 0),
        new PIXI.Point(docWidth, 0),
        new PIXI.Point(docWidth, docHeight),
        new PIXI.Point(0, docHeight),
        new PIXI.Point(0, 0),
        new PIXI.Point(lowX, lowY),
        new PIXI.Point(lowX, highY),
        new PIXI.Point(highX, highY),
        new PIXI.Point(highX, lowY),
        new PIXI.Point(lowX, lowY),
        new PIXI.Point(0, 0),
    ]);

    return polygon;
};
