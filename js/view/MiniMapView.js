var MiniMapView = function(model, rendererContainer) {
    this.model = model;
    this.stage = rendererContainer.stage;

    this.cellSize = 1;
    var borderSize = 0;

    this.miniMapSize = 300;

    var miniMapTileBackground = new MiniMapBackground(model, this.miniMapSize + 1);
    rendererContainer.stage.addChild(miniMapTileBackground.graphics);
    rendererContainer.addFrameListener(this);

    var miniMapSpriteContainer = new PIXI.SpriteBatch();
    this.stage.addChild(miniMapSpriteContainer);

    this.cellFactory = new MiniMapCellFactory(this.cellSize);

    var isMiniMapView = true;
    this.cellContainer = new CellContainer(this.cellFactory, model, null, miniMapSpriteContainer, isMiniMapView);
    this.cellContainer.minimapInfo.miniMapSize = this.miniMapSize;
    this.cellContainer.cellMask = miniMapTileBackground.graphics;

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

    if (model.playerDidMove) {
        for (var i in this.otherPlayers) {
            var aPlayer = this.otherPlayers[i];
            aPlayer.moveTo(aPlayer.x, aPlayer.y, model.x, model.y, self.miniMapSize);
            aPlayer.sprite.visible = self.otherPlayerShouldShowInMiniMap(aPlayer.x,aPlayer.y, model);
        }
    };

    model.changedClients.forEach(function(client) {
        if (client.id == model.id)
            return;

        var otherPlayer = self.otherPlayers[client.id];

        if (otherPlayer === undefined) {
            otherPlayer = new ClientBallMiniMap(self.otherPlayerContainer, client.color, self.cellSize);
            self.otherPlayers[client.id] = otherPlayer;
            otherPlayer.setPos(client.view.x, client.view.y, model.x, model.y, self.miniMapSize);
            otherPlayer.x = client.view.x;
            otherPlayer.y = client.view.y; //save so we can use it in the loop above, so they stay in the same place when we move around ourselves
        }

        otherPlayer.moveTo(client.view.x, client.view.y, model.x, model.y, self.miniMapSize);
        otherPlayer.sprite.visible = self.otherPlayerShouldShowInMiniMap(client.view.x,client.view.y, model);
    });

    model.removedClients.forEach(function(client) {
        var otherPlayer = self.otherPlayers[client.id];
        if (otherPlayer !== null) {
            otherPlayer.destroy(self.otherPlayerContainer);
            delete self.otherPlayers[client.id];
        }
    });
};

MiniMapView.prototype.otherPlayerShouldShowInMiniMap = function(clientX,clientY, model) {
    var acceptableRangeFromUser = this.miniMapSize / 2;
    var distanceFromUser = {
        x: clientX - model.x,
        y: clientY - model.y,
    };
    var shouldShow = Math.abs(distanceFromUser.x) < acceptableRangeFromUser && Math.abs(distanceFromUser.y) < acceptableRangeFromUser;

    return shouldShow;

};
