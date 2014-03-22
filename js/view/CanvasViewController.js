var CanvasViewController = function(view, model, rendererContainer) {

    this.model = model;
    this.view = view;

    var self = this;

    window.addEventListener('keydown', function (e) {
        var currentXpos = self.model.x;
        var currentYpos = self.model.y;

        switch (e.keyCode) {
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

    //for click'n'drag selection of squares
    this.mouseDownInInteractive = false;
    this.previousCellValue = null;

    //Align overview at startup
    this.onDragStop(null, null);

    var self = this;
    $(window).resize(function () {
        self.view.overlayContainer.updateSize();
        //self.view.forceAlign();
        self.onDragStop();
    });
};


/////Mouse listeners/////
CanvasViewController.prototype.onMouseDown = function (data) {

    if (this.view.overlayContainer.isInsideInteractive(data.global.x, data.global.y)) {

        //mouse was pressed in interactive
        this.mouseDownInInteractive = true;
        var globalPos = this.view.cellContainer.getGlobalPosFromScreenPos(data.global.x, data.global.y);
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

CanvasViewController.prototype.onMouseMove = function (data) {

    if (this.view.overlayContainer.isInsideInteractive(data.global.x, data.global.y) && this.mouseDownInInteractive) {
        var globalPos = this.view.cellContainer.getGlobalPosFromScreenPos(data.global.x, data.global.y);
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

CanvasViewController.prototype.onMouseUp = function (data) {
    this.mouseDrag.onMouseUp(data.global);
    this.mouseDownInInteractive = false;
}

/////Dragging stuff/////

CanvasViewController.prototype.onDragStart = function (point) {

}

CanvasViewController.prototype.onDragMove = function (point, move) {
    this.view.addPosition(move.x, move.y);
}

CanvasViewController.prototype.onDragStop = function (point, move) {
    var diff = this.view.getOverlayAlignmentDiff();
    this.view.move(-diff.x, -diff.y);

    var globalPos = this.view.cellContainer.getGlobalPosFromScreenPos(
        this.view.overlayContainer.x + diff.x,
        this.view.overlayContainer.y + diff.y);

    this.model.setPosition(globalPos.x, globalPos.y);
}

