var MiniMapView = function(model, rendererContainer) {
    this.model = model;
    this.stage = rendererContainer.stage;

    this.cellSize = 1;
    var borderSize = 0;

    this.cellFactory = new MiniMapCellFactory(this.cellSize, borderSize);

    this.miniMapSize = 300;

    var miniMapTileBackground = new MiniMapBackground(model, this.miniMapSize);
    rendererContainer.stage.addChild(miniMapTileBackground.graphics);
    rendererContainer.addFrameListener(this);

    var pixiSpriteBatchContainer = new PIXI.SpriteBatch();
    rendererContainer.stage.addChild(pixiSpriteBatchContainer);

    var isMiniMapView = true;
    this.cellContainer = new CellContainer(this.cellFactory, model, null, pixiSpriteBatchContainer, isMiniMapView);
    this.cellContainer.minimapInfo.miniMapSize = this.miniMapSize;

    model.addObserver(this);

    //miniMapTileBackground.miniMapOffset = this.cellContainer.minimapInfo.miniMapOffset;


    this.otherPlayerContainer = new PIXI.DisplayObjectContainer();
    this.stage.addChild(this.otherPlayerContainer);
    this.otherPlayers = {};



    //update so that that it renders correct initially
    //SHOULD BE CALLED AFTER the model has fetched the data from the view!
    this.cellContainer.updateMiniMap(model);

};

MiniMapView.prototype.onFrameRender = function(renderContainer, timeStep) {
    this.cellContainer.updateAnimations(timeStep);

    for (var i in this.otherPlayers) {
        var aPlayer = this.otherPlayers[i];
        //aPlayer.sprite.visible = this.otherPlayerShouldShowInMiniMap(aPlayer,this.model);
        aPlayer.onFrameUpdate(timeStep);
    }
};

//Notification from model
MiniMapView.prototype.update = function(model) {

    var self = this;

    model.changedClients.forEach(function(client) {
        if (client.id == model.id)
            return;

        var otherPlayer = self.otherPlayers[client.id];

        if (otherPlayer === undefined) {
            otherPlayer = new ClientBallMiniMap(self.otherPlayerContainer, client.color, this.cellSize);
            self.otherPlayers[client.id] = otherPlayer;
            otherPlayer.setPos(client.view.x, client.view.y, model.x, model.y, self.miniMapSize);
        }

            otherPlayer.moveTo(client.view.x, client.view.y, model.x, model.y, self.miniMapSize);
            otherPlayer.sprite.visible = self.otherPlayerShouldShowInMiniMap(client, model);
    });

    model.removedClients.forEach(function(client) {
        var otherPlayer = self.otherPlayers[client.id];
        if (otherPlayer !== null) {
            otherPlayer.destroy(self.otherPlayerContainer);
            delete self.otherPlayers[client.id];
        }
    });
};

MiniMapView.prototype.otherPlayerShouldShowInMiniMap = function(client, model) {
    var acceptableRangeFromUser = this.miniMapSize / 2;
    var distanceFromUser = {
        x: client.view.x - model.x,
        y: client.view.y - model.y,
    };
    var shouldShow = Math.abs(distanceFromUser.x) < acceptableRangeFromUser && Math.abs(distanceFromUser.y) < acceptableRangeFromUser;

    return shouldShow;

};
