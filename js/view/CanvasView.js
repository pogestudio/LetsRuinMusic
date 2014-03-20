var CanvasView = function(containerDiv, model, rendererContainer, audioViewController) {
    this.model = model;
    this.stage = rendererContainer.stage;
    this.moveX = 0.0;
    this.moveY = 0.0;


    //for click'n'drag selection of squares
    this.mouseDownInInteractive = false;
    this.previousCellValue = null;

    //Factory needs parameters
    this.cellSize = 32;
    var borderSize = 1;
    this.cellFactory = new CellFactory(this.cellSize, borderSize);

    //keyevents
    var self = this;

    window.addEventListener('keyup', function (e) {
        var currentXpos = self.model.x;
        var currentYpos = self.model.y;

        switch(e.keyCode){
            case 87:
                self.moveY += self.cellSize;
                self.model.setPosition(currentXpos, currentYpos - 1);
                break;
            case 65:
                self.moveX += self.cellSize;
                self.model.setPosition(currentXpos - 1, currentYpos);
                break;
            case 83:
                self.moveY -= self.cellSize;
                self.model.setPosition(currentXpos, currentYpos + 1);
                break;
            case 68:
                self.moveX -= self.cellSize;
                self.model.setPosition(currentXpos + 1, currentYpos);
                break;
        }
    }, false);

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

    this.clientBallContainer = new PIXI.DisplayObjectContainer();
    this.stage.addChild(this.clientBallContainer);
    this.clientBalls = {};

    //prepare sprite batch and background pos from URL
    this._offsetSpriteBatchAndBackground();
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

    this.clientBallContainer.position.x += moveX;
    this.clientBallContainer.position.y += moveY;

    this.moveX -= moveX;
    this.moveY -= moveY;
};

//Notification from model
CanvasView.prototype.update = function(model) {
    var self = this;

    if (model.diffX !== 0 || model.diffY !== 0) {
        var dX = model.diffX * this.cellSize;
        var dY = model.diffY * this.cellSize;

        this.moveX -= dX;
        this.moveY -= dY;
    }

    model.changedClients.forEach(function(client) {
        var ball = self.clientBalls[client.id];

        if (ball === undefined) {
            var ball = new ClientBall(self.clientBallContainer);
            self.clientBalls[client.id] = ball;
        }

        ball.sprite.x = (client.view.x + client.view.w * 0.5) * self.cellSize;
        ball.sprite.y = (client.view.y + client.view.h * 0.5) * self.cellSize;
    });
};

/////Mouse listeners/////
CanvasView.prototype.onMouseDown = function(data) {

    if (this.overlayContainer.isInsideInteractive(data.global.x, data.global.y)) {

        //mouse was pressed in interactive
        this.mouseDownInInteractive = true;

        var globalPos = this.cellContainer.getGlobalPosFromScreenPos(data.global.x, data.global.y);
        var cellValue = this.model.getCell(globalPos.x, globalPos.y);
        this.previousCellValue = cellValue;
        if (cellValue != 0) {
            this.model.setCell(globalPos.x, globalPos.y, 0);
        } else {
            this.model.setCell(globalPos.x, globalPos.y, this.model.getInstrNr());
        }
        this.model.notifyObservers();
    } else {
        this.mouseDrag.onMouseDown(data.global);
    }
};

CanvasView.prototype.onMouseMove = function(data) {
    
    if(this.overlayContainer.isInsideInteractive(data.global.x, data.global.y) && this.mouseDownInInteractive){
        var globalPos = this.cellContainer.getGlobalPosFromScreenPos(data.global.x, data.global.y);
        var cellValue = this.model.getCell(globalPos.x, globalPos.y);
        //drag and delete the cells that are the same as inicially clicked color
        if (this.previousCellValue == this.model.getInstrNr() && cellValue == this.model.getInstrNr()) {
            this.model.setCell(globalPos.x, globalPos.y, 0);
        }
        //drag and set the cells to inically clicked color/instrument
        if (this.previousCellValue != this.model.getInstrNr() && cellValue != this.model.getInstrNr()) {
            this.model.setCell(globalPos.x, globalPos.y, this.model.getInstrNr());
        }
        this.model.notifyObservers();
    }

    if (data.originalEvent.which != 0)
        this.mouseDrag.onMouseMove(data.global);
    else
        this.mouseDrag.onMouseUp(data.global);
}

CanvasView.prototype.onMouseUp = function(data) {
    this.mouseDrag.onMouseUp(data.global);
    this.mouseDownInInteractive = false;
}

/////Dragging stuff/////

CanvasView.prototype.onDragStart = function(point) {

}

CanvasView.prototype.onDragMove = function(point, move) {
    this.cellContainer.spriteBatchContainer.position.x += move.x;
    this.cellContainer.spriteBatchContainer.position.y += move.y;

    this.clientBallContainer.position.x += move.x;
    this.clientBallContainer.position.y += move.y;

    this.background.tilingSprite.tilePosition.x += move.x;
    this.background.tilingSprite.tilePosition.y += move.y;
}

CanvasView.prototype.onDragStop = function(point, move) {
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

CanvasView.prototype._offsetSpriteBatchAndBackground = function() {

    function gup(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^/&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null)
            return "";
        else
            return results[1];
    }

    var moveX = gup('xpos') * this.cellSize - this.overlayContainer.x;
    var moveY = gup('ypos') * this.cellSize - this.overlayContainer.y;

    this.cellContainer.spriteBatchContainer.position.x -= moveX;
    this.cellContainer.spriteBatchContainer.position.y -= moveY;

    this.background.tilingSprite.tilePosition.x -= moveX;
    this.background.tilingSprite.tilePosition.y -= moveY;

    this.clientBallContainer.position.x -= moveX;
    this.clientBallContainer.position.y -= moveY;

};

//WARNING! this should not be here, should be refactored somewhere else FOR SURE
