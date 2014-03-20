var CanvasView = function(containerDiv, model, rendererContainer, audioViewController) {
    this.model = model;
    this.stage = rendererContainer.stage;
    this.moveX = 0.0;
    this.moveY = 0.0;

    //Factory needs parameters
    this.cellSize = 32;
    var borderSize = 1;
    this.cellFactory = new CellFactory(this.cellSize, borderSize);

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
    this.overlayContainer = new Overlay(this.cellSize);
    this.stage.addChild(this.overlayContainer.overlay);

    //Mouse listeners
    var self = this;
    rendererContainer.stage.mousedown = rendererContainer.stage.touchstart = function(data) {
        self.onMouseDown(data);
    };
    rendererContainer.stage.mousemove = rendererContainer.stage.touchmove = function(data) {
        self.onMouseMove(data);
    };
    rendererContainer.stage.mouseup = rendererContainer.stage.mouseupoutside =
        rendererContainer.stage.touchend = rendererContainer.stage.touchendoutside = function(data) {
            self.onMouseUp(data);
    };

    this.mouseDrag = new MouseDrag();
    this.mouseDrag.addListener(this);

    //Align overview at startup
    this.onDragStop(null, null);
};

CanvasView.prototype.onFrameRender = function(renderContainer, timeStep) {
    this.cellContainer.updateAnimations(timeStep);


    var moveX = this.moveX * timeStep * 10.0;
    var moveY = this.moveY * timeStep * 10.0;

    this.cellContainer.spriteBatchContainer.position.x += moveX;
    this.cellContainer.spriteBatchContainer.position.y += moveY;
 
    this.background.tilingSprite.tilePosition.x += moveX;
    this.background.tilingSprite.tilePosition.y += moveY;

    this.moveX -= moveX;
    this.moveY -= moveY;
};

//Notification from model
CanvasView.prototype.update = function(model) {

};

/////Mouse listeners/////
CanvasView.prototype.onMouseDown = function (data) {
  
    if (this.overlayContainer.isInsideInteractive(data.global.x, data.global.y)) {
        var globalPos = this.cellContainer.getGlobalPosFromScreenPos(data.global.x, data.global.y);
        var cellValue = this.model.getCell(globalPos.x, globalPos.y);
        if (cellValue != 0) {
            this.model.setCell(globalPos.x, globalPos.y, 0);
        }
        else {
            this.model.setCell(globalPos.x, globalPos.y, this.model.getInstrNr());
        }
        this.model.notifyObservers();
    }
    else {
        this.mouseDrag.onMouseDown(data.global);
    }
};

CanvasView.prototype.onMouseMove = function(data) {
    if (data.originalEvent.which != 0)
        this.mouseDrag.onMouseMove(data.global);
    else
        this.mouseDrag.onMouseUp(data.global);
}

CanvasView.prototype.onMouseUp = function(data) {
    this.mouseDrag.onMouseUp(data.global);
}

/////Dragging stuff/////

CanvasView.prototype.onDragStart = function(point) {

}

CanvasView.prototype.onDragMove = function(point, move) {
    this.cellContainer.spriteBatchContainer.position.x += move.x;
    this.cellContainer.spriteBatchContainer.position.y += move.y;

    this.background.tilingSprite.tilePosition.x += move.x;
    this.background.tilingSprite.tilePosition.y += move.y;
}

CanvasView.prototype.onDragStop = function (point, move) {
    //TODO: Snap to overlay
    var diffX = (this.cellContainer.spriteBatchContainer.position.x - this.overlayContainer.x) % this.cellSize;
    var diffY = (this.cellContainer.spriteBatchContainer.position.y - this.overlayContainer.y) % this.cellSize;

    diffX = (diffX + this.cellSize) % this.cellSize;
    diffY = (diffY + this.cellSize) % this.cellSize;

    var otherDiffX = diffX - this.cellSize;
    var otherDiffY = diffY - this.cellSize;
    
    if (diffX > -otherDiffX)
        diffX = otherDiffX;
    if (diffY > -otherDiffY)
        diffY = otherDiffY;

    this.moveX = -diffX;
    this.moveY = -diffY;

    var globalPos = this.cellContainer.getGlobalPosFromScreenPos(
        this.overlayContainer.x + diffX,
        this.overlayContainer.y + diffY);

    this.model.setPosition(globalPos.x, globalPos.y);
 
}
