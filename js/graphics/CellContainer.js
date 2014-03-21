var CellContainer = function(cellFactory, model, audioViewController, pixiSpriteBatchContainer, isForMiniMap) {

    this.model = model;

    this.minimapInfo = {
        miniMapSize: 0,
        prevX: -1,
        prevY: -1
    };

    this.animationList = [];
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

    if (this.isForMiniMap && this.userMovedPosition(model)) {
        this.updateMiniMap(model);
    }
};

CellContainer.prototype.setCell = function(globalX, globalY, value) {
    //if value is 0
    //  delete cell at spot
    if (value === 0) {
        this.deleteCell(globalX, globalY);
        return;
    }

    //if it's the minimap container
    //and the globalX and globalY is bigger than 



    //else
    //  get cell
    //  if it doesnt exist
    //      create a new one
    //  set value
    var imgPath;
    var cell = this.getCell(globalX, globalY);

    //set the image for the instrument number
    switch (value) {
        case 1:
            imgPath = "images/pink-square32-round.png";
            break;
        case 2:
            imgPath = "images/blue-square32-round.png";
            break;
        case 3:
            imgPath = "images/red-square32-round.png";
            break;
        case 4:
            imgPath = "images/green-square32-round.png";
            break;
    }

    if (cell.value != value) {
        if (cell.value != 0) {
            this.deleteCell(globalX, globalY);
        }

        cell = this.cellFactory.createCell(globalX, globalY, this.spriteBatchContainer, imgPath);

        var xlist = this.data[globalY];
        if (xlist === undefined) {
            xlist = {};
            this.data[globalY] = xlist;
        }
        xlist[globalX] = cell;
    }
    if(this.isForMiniMap)
    {
        this._updateMiniMapCellVisibleStatus(cell);
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
    //Get cell that started playing
    var cell = this.getCell(x, y);
    //Start animation
    cell.startAnimation();
    //Add the cell to animation list
    this.animationList.push(cell);
};

CellContainer.prototype.updateAnimations = function(timeStep) {
    //Check if animationList is populated
    if (this.animationList[0] !== undefined) {

        //Go through the list and update animation on each item
        for (var i = 0; i < this.animationList.length; i++) {

            var cell = this.animationList[i];
            cell.updateAnimation(timeStep);

            //Remove the cell from animationList when animation is done
            if (cell.isAnimationDone()) {

                cell.endAnimation();
                var indexofAnimateBuffer = this.animationList.indexOf(cell);
                this.animationList.splice(indexofAnimateBuffer, 1);
            }
        }
    }
};

CellContainer.prototype.userMovedPosition = function(model) {
    var didMove = false;

    if (this.minimapInfo.prevX !== model.x || this.minimapInfo.prevY !== model.y) {
        didMove = true;
        //save values for later
        this.minimapInfo.prevX = model.x;
        this.minimapInfo.prevY = model.y;
    }

    return didMove;

};


CellContainer.prototype.updateMiniMap = function(model) {

    this.minimapInfo.centerMappOffset = this.minimapInfo.miniMapSize / 3; // / 4 + 16; //16 MAGIC NUMBER? wtf this is weird
    //if the position has changed

    //offset the spritebatchcontainer
    this.spriteBatchContainer.x = -model.x + this.minimapInfo.centerMappOffset;
    this.spriteBatchContainer.y = -model.y + this.minimapInfo.centerMappOffset;

    //get the way in which it changed position
    var userPosX = model.x;
    var userPosY = model.y;

    for (var yKey in this.data) {
        var xList = this.data[yKey];
        for (var xKey in xList) {

            var cell = xList[xKey];
            this._updateMiniMapCellVisibleStatus(cell);
            //cell.sprite.visible = this._miniMapCellShouldBeVisible(xKey, yKey, userPosX, userPosY);
        }
    }
};
CellContainer.prototype._updateMiniMapCellVisibleStatus = function(cell) {
    cell.sprite.alpha = this._miniMapCellShouldBeVisible(cell.x, cell.y, this.model.x, this.model.y) ? 1 : 0;
};

CellContainer.prototype._miniMapCellShouldBeVisible = function(cellX, cellY, userX, userY) {

    var cellOffset = this.minimapInfo.miniMapSize / 2;
    var startX = userX - cellOffset;
    var endX = userX + cellOffset;

    var startY = userY - cellOffset;
    var endY = userY + cellOffset;

    var xOK = (startX < cellX && cellX < endX);
    var yOK = (startY < cellY && cellY < endY);

    return  xOK && yOK;
};
