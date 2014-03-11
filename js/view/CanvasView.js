var CanvasView = function(containerDiv, model, rendererContainer, audioViewController) {

    this.stage = rendererContainer.stage;

    //Factory needs parameters
    var cellSize = 32;
    var borderSize = 1;
    this.cellFactory = new CellFactory(cellSize, borderSize);

    var pixiSpriteBatchContainer = new PIXI.SpriteBatch();
    rendererContainer.stage.addChild(pixiSpriteBatchContainer);
    this.cellContainer = new CellContainer(this.cellFactory, model, audioViewController, pixiSpriteBatchContainer);

    model.addObserver(this);

    //Overlay


    //Mouse listeners
    rendererContainer.stage.mousedown = rendererContainer.stage.touchstart = this.onMouseDown;
    rendererContainer.stage.mousemove = rendererContainer.stage.touchmove = this.onMouseMove;
    rendererContainer.stage.mouseup = rendererContainer.stage.mouseupoutside =
        rendererContainer.stage.touchend = rendererContainer.stage.touchendoutside = this.onMouseUp;
};

CanvasView.prototype.onFrameRender = function(renderContainer, timeStep) {
    this.cellContainer.updateAnimations(timeStep);
};

//Notification from model
CanvasView.prototype.update = function(model) {

};

CanvasView.prototype.onMouseDown = function(data) {
    //if in the middle
    //  get pos from screen
    //  get/set cell

    //else
    //  start drag canvas magic
};

CanvasView.prototype.onMouseMove = function(data) {
    //drag canvas
};

CanvasView.prototype.onMouseUp = function(data) {
    //stop drag canvas magic
};