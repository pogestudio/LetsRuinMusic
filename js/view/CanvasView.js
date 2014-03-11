var CanvasView = function (containerDiv, model, rendererContainer, audioViewController) {

    this.stage = rendererContainer.stage;

    //Factory needs parameters
    this.cellFactory = new CellFactory();
    this.cellContainer = new CellContainer(this.cellFactory, model, audioViewController);

    model.addObserver(this);
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
}

CanvasView.prototype.onFrameRender = function (renderContainer, timeStep) {
    this.cellContainer.updateAnimations(timeStep);
}

//Notification from model
CanvasView.prototype.update = function (model) {

}

CanvasView.prototype.onMouseDown = function (data) {
    var globalPos = this.cellContainer.getGlobalPosFromScreenPos(data.global.x, data.global.y);

    console.log(globalPos.x + "    " + data.global.x);
    //if in the middle
    //  get pos from screen
    //  get/set cell

    //else
    //  start drag canvas magic
}

CanvasView.prototype.onMouseMove = function (data) {
    //drag canvas
    console.log(data.global.x + "  " + data.local.x);

}

CanvasView.prototype.onMouseUp = function (data) {
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
