var CellContainer = function(cellFactory, model, audioViewController, pixiSpriteBatchContainer, isForMiniMap) {
    this.cellFactory = cellFactory;
    this.spriteBatchContainer = pixiSpriteBatchContainer;
    this.isForMiniMap = isForMiniMap;

    model.addObserver(this);
    if (!isForMiniMap) {
        audioViewController.addObserver(this);
    }


    //Some nice data structure for cells
    this.data = {};
};

CellContainer.prototype.update = function(model) {
    //get changelist
    //loop through it and set all cells

    var changeList = null;

    if (this.isForMiniMap) {
        changeList = model.minimapData.changeList;
    } else {
        changeList = model.changeList;
    }

    var self = this;
    changeList.forEach(function(entry) {
        self.setCell(entry.x, entry.y, entry.value);
    });
};

CellContainer.prototype.setCell = function(globalX, globalY, value) {
    //if value is 0
    //  delete cell at spot
    if (value === 0) {
        this.deleteCell(globalX, globalY);
        return;
    }
    //else
    //  get cell
    //  if it doesnt exist
    //      create a new one
    //  set value
    var cell = this.getCell(globalX, globalY);
    if (!cell) {
        cell = this.cellFactory.createCell(globalX, globalY, this.spriteBatchContainer);

        var xlist = this.data[globalY];
        if (xlist === undefined) {
            xlist = {};
            this.data[globalY] = xlist;
        }
        xlist[globalX] = cell;
    }
    cell.setValue(value);
};

CellContainer.prototype.getCell = function(globalX, globalY) {
    //Global coordinates
    var xlist = this.data[globalY];
    if (xlist === undefined)
        return 0;

    return xlist[globalX] || 0;

};

CellContainer.prototype.deleteCell = function(globalX, globalY) {
    var cell = this.getCell(globalX, globalY);
    if (!cell) {
        return;
    }
    //remove it from the canvas
    this.spriteBatchContainer.removeChild(cell.sprite);
    var xlist = this.data[globalY];
    //remove it from the data
    delete xlist[globalX];
};

CellContainer.prototype.getGlobalPosFromScreenPos = function(screenX, screenY) {
    var cellSize = this.cellFactory.cellSize;

    var result = {
        x: Math.floor((screenX - this.spriteBatchContainer.position.x) / cellSize),
        y: Math.floor((screenY - this.spriteBatchContainer.position.y) / cellSize)
    };

    return result;
};

CellContainer.prototype.onPlaySound = function(x, y) {
    //for each cell at x, y
    //  startAnim
    //  add to anim list
};

CellContainer.prototype.updateAnimations = function(timeStep) {
    //update all cells in anim list
    //  check if cell is done, then remove it
};
