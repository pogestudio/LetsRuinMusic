var CanvasView = function(containerDiv, model, rendererContainer, audioViewController) {
    this.model = model;
    this.stage = rendererContainer.stage;
    this.moveX = 0.0;
    this.moveY = 0.0;

    //Factory needs parameters
    this.cellSize = 32;
    var borderSize = 1;
    this.cellFactory = new CellFactory(this.cellSize, borderSize);

    //keyevents
    var self = this;

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
    
    this.clientBallContainer = new PIXI.DisplayObjectContainer();
    this.stage.addChild(this.clientBallContainer);
    this.clientBalls = {};

    //prepare sprite batch and background pos from URL
    this._offsetSpriteBatchAndBackground();

};

CanvasView.prototype.addPosition = function (x, y) {
    this.cellContainer.spriteBatchContainer.position.x += x;
    this.cellContainer.spriteBatchContainer.position.y += y;

    this.background.tilingSprite.tilePosition.x += x;
    this.background.tilingSprite.tilePosition.y += y;

    this.clientBallContainer.position.x += x;
    this.clientBallContainer.position.y += y;
};


CanvasView.prototype.setPosition = function (x, y) {
    this.cellContainer.spriteBatchContainer.position.x = x;
    this.cellContainer.spriteBatchContainer.position.y = y;

    this.background.tilingSprite.tilePosition.x = x;
    this.background.tilingSprite.tilePosition.y = y;

    this.clientBallContainer.position.x = x;
    this.clientBallContainer.position.y = y;
};

CanvasView.prototype.move = function (x, y) {
    this.moveX += x;
    this.moveY += y;
}

CanvasView.prototype.onFrameRender = function(renderContainer, timeStep) {
    this.cellContainer.updateAnimations(timeStep);

    var moveX = this.moveX * timeStep * 10.0;
    var moveY = this.moveY * timeStep * 10.0;

    this.addPosition(moveX, moveY);

    this.moveX -= moveX;
    this.moveY -= moveY;

    for (var i in this.clientBalls) {
        var ball = this.clientBalls[i];
        ball.onFrameUpdate(timeStep);
    }
};

//Notification from model
CanvasView.prototype.update = function(model) {
    var self = this;

    //deal with quick moves!
    if (model.diffX !== 0 || model.diffY !== 0) {
        var dX = model.diffX * this.cellSize;
        var dY = model.diffY * this.cellSize;

        this.moveX -= dX;
        this.moveY -= dY;
    }

    model.changedClients.forEach(function(client) {
        if (client.id == model.id)
            return;

        var ball = self.clientBalls[client.id];

        if (ball === undefined) {
            ball = new ClientBall(self.clientBallContainer, client.color, self.cellSize);
            self.clientBalls[client.id] = ball;
            ball.setPos(client.view.x, client.view.y, client.view.w, client.view.h);
        } 

        ball.moveTo(client.view.x, client.view.y, client.view.w, client.view.h);
        
    });

    model.removedClients.forEach(function(client) {
        var ball = self.clientBalls[client.id];
        if (ball != null) {
            ball.destroy(self.clientBallContainer);
            delete self.clientBalls[client.id];
        }
    });
};

CanvasView.prototype._offsetSpriteBatchAndBackground = function() {

    function gup(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^/&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (!results)
            return 0;
        else
            return results[1];
    }

    var moveX = gup('xpos') * this.cellSize - this.overlayContainer.x;
    var moveY = gup('ypos') * this.cellSize - this.overlayContainer.y;

    this.addPosition(-moveX, -moveY);
    
};
