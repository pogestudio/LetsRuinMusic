var MiniMapView = function(model, rendererContainer) {
    this.model = model;
    this.stage = rendererContainer.stage;

    var cellSize = 1;
    var borderSize = 0;

    this.cellFactory = new MiniMapCellFactory(cellSize, borderSize);

    //create texture
    var backGroundTexture =  PIXI.Texture.fromImage("images/black-square1_no_border.png");
    // to work in webGL the texture size must be a power of two
    var miniMapSize = 300;
    var miniMapTileBackground = new PIXI.TilingSprite(backGroundTexture, miniMapSize,miniMapSize);
    rendererContainer.stage.addChild(miniMapTileBackground);
    
    var pixiSpriteBatchContainer = new PIXI.SpriteBatch();
    rendererContainer.stage.addChild(pixiSpriteBatchContainer);

    var isMiniMapView = true;
    this.cellContainer = new CellContainer(this.cellFactory, model, null, pixiSpriteBatchContainer, isMiniMapView);
    model.addObserver(this);

    //update so that that it renders correct initially
    //SHOULD BE CALLED AFTER the model has fetched the data from the view!
    this.cellContainer.updateMiniMap(model);

};

MiniMapView.prototype.onFrameRender = function(renderContainer, timeStep) {
    this.cellContainer.updateAnimations(timeStep);
};

//Notification from model
MiniMapView.prototype.update = function(model) {

};
