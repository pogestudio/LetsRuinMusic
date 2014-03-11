var CanvasView = function(containerDiv, model, rendererContainer, audioViewController) {
    this.model = model;
    this.stage = rendererContainer.stage;

    //Factory needs parameters
    var cellSize = 32;
    var borderSize = 1;
    this.cellFactory = new CellFactory(cellSize, borderSize);

    //Background
    this.background = new Background();
    this.stage.addChild(this.background.tilingSprite);

    var pixiSpriteBatchContainer = new PIXI.SpriteBatch();
    rendererContainer.stage.addChild(pixiSpriteBatchContainer);
    var isMiniMapView = false;
    this.cellContainer = new CellContainer(this.cellFactory, model, audioViewController, pixiSpriteBatchContainer, isMiniMapView);
    model.addObserver(this);

    //add listener for animation
    rendererContainer.addFrameListener(this);

    //Overlay


    //Mouse listeners
    var self = this;
    rendererContainer.stage.mousedown = rendererContainer.stage.touchstart = function (data) {
        self.onMouseDown(data);
    };
    rendererContainer.stage.mousemove = rendererContainer.stage.touchmove = function (data) {
        self.onMouseMove(data);
    };
    rendererContainer.stage.mouseup = rendererContainer.stage.mouseupoutside =
    rendererContainer.stage.touchend = rendererContainer.stage.touchendoutside = function (data) {
        self.onMouseUp(data);
    };

    this.mouseDrag = new MouseDrag();
    this.mouseDrag.addListener(this);
};

CanvasView.prototype.onFrameRender = function(renderContainer, timeStep) {
    this.cellContainer.updateAnimations(timeStep);
};

//Notification from model
CanvasView.prototype.update = function(model) {

};

CanvasView.prototype.onMouseDown = function(data) {
    var globalPos = this.cellContainer.getGlobalPosFromScreenPos(data.global.x, data.global.y);

    var cellValue = this.model.getCell(globalPos.x, globalPos.y);
    console.log(cellValue);
    if (cellValue != 0) {
        this.model.setCell(globalPos.x, globalPos.y, 0);
    }
    else {
        this.model.setCell(globalPos.x, globalPos.y, 1);
    }

    this.model.notifyObservers();

    console.log(globalPos.x + "    " + data.global.x);
    //if in the middle
    //  get pos from screen
    //  get/set cell

    //else
    //  start drag canvas magic
};

CanvasView.prototype.onMouseMove = function(data) {
    //drag canvas

}

CanvasView.prototype.onMouseUp = function(data) {
    //stop drag canvas magic
}

CanvasView.prototype.onDragStart = function (point) {
    //drag canvas magic
}
CanvasView.prototype.onDragMove = function (point, move) {
    //drag canvas magic
}
CanvasView.prototype.onDragStop = function (point, move) {
    //drag canvas magic
}
