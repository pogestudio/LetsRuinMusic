var MiniMapView = function(model, rendererContainer) {
    this.model = model;
    this.stage = rendererContainer.stage;

    var cellSize = 4;
    var borderSize = 0;

    this.cellFactory = new MiniMapCellFactory(cellSize, borderSize);

    var pixiSpriteBatchContainer = new PIXI.SpriteBatch();
    rendererContainer.stage.addChild(pixiSpriteBatchContainer);

    var isMiniMapView = true;
    this.cellContainer = new CellContainer(this.cellFactory, model, null, pixiSpriteBatchContainer, isMiniMapView);
    model.addObserver(this);

};

MiniMapView.prototype.onFrameRender = function(renderContainer, timeStep) {
    this.cellContainer.updateAnimations(timeStep);
};

//Notification from model
MiniMapView.prototype.update = function(model) {

};
