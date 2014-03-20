var CanvasModel = function() {
    this.observers = [];
    this.x = 0;
    this.y = 0;
    this.width = 16;
    this.height = 16;

    this.viewData = [0];
    this.data = {};
    this.changeList = [];
    this.name = "Awesome client";

    this.currentInstrument = null;
    this.connection = null;

    //Params: Values per cell, width(cells), height(cell)
    this.minimapData = new MinimapData(2, 50, 50);
};

CanvasModel.prototype.setInstrNr = function(number) {
    this.currentInstrument = number;
}

CanvasModel.prototype.getInstrNr = function() {
    return this.currentInstrument;
}

CanvasModel.prototype.addObserver = function(observer) {
    this.observers.push(observer);
};

CanvasModel.prototype.notifyObservers = function() {
    this._updateViewData();

    this.minimapData.update(this);

    for (var i = 0; i < this.observers.length; i++) {
        this.observers[i].update(this);
    }
    this.changeList = [];
    this.minimapData.clearChangeList();

};

//Internal: updates viewData matrix
CanvasModel.prototype._updateViewData = function() {
    this.viewData = [];

    for (var i = 0; i < this.height; ++i) {
        for (var j = 0; j < this.width; ++j) {
            var value = 0;

            var x = j + this.x;
            var y = i + this.y;

            this.viewData.push(this.getCell(x, y));
        }
    }
};

//Local coordinates: (0-width, 0-height)
CanvasModel.prototype.getCellLocal = function(x, y) {
    return this.viewData[this.width * y + x];
};

//Global coordinates
CanvasModel.prototype.getCell = function(x, y) {
    var xlist = this.data[y];
    if (xlist === undefined)
        return 0;

    return xlist[x] || 0;
};

//Local coordinates: (0-width, 0-height)
CanvasModel.prototype.setCellLocal = function(x, y, value) {
    this.setCell(this.x + x, this.y + y, value);
};

//Global coordinates 
CanvasModel.prototype.setCell = function(x, y, value) {

    var xlist = this.data[y];
    if (xlist === undefined) {
        xlist = {};
        this.data[y] = xlist;
    }

    this.changeList.push({
        x: x,
        y: y,
        value: value,
        prev: xlist[x] || 0
    });

    xlist[x] = value;

    if (this.connection !== null) {
        this.connection.sendUpdate(x, y, value);
    }
};

//Global coordinates, without syncing it to the server (used by the connection to set data)
CanvasModel.prototype.setCellFromServer = function (x, y, value) {

    var xlist = this.data[y];
    if (xlist === undefined) {
        xlist = {};
        this.data[y] = xlist;
    }

    this.changeList.push({
        x: x,
        y: y,
        value: value,
        prev: xlist[x] || 0
    });

    xlist[x] = value;
};

//Global coordinates 
CanvasModel.prototype.setTopLeft = function(x, y) {
    //whenever we set the cell, we have to redraw _all_ squares in local space

    this.x = x;
    this.y = y;

    this._addAllLocalCellsToChangeList();
};

CanvasModel.prototype.setTopLeftOffset = function(xOff, yOff) {
    this.setTopLeft(this.x + xOff, this.y + yOff);
};


CanvasModel.prototype._addAllLocalCellsToChangeList = function() {

    var globX = 0;
    var globY = 0;
    var cellValue = 0;
    for (var i = 0; i < this.width; i++) {
        globX = this.x + i;
        for (var j = 0; j < this.height; j++) {
            globY = this.y + j;
            cellValue = this.getCell(globX, globY);
            this.changeList.push({
                x: globX,
                y: globY,
                value: cellValue,
                prev: 0
            });
        }
    }
};

CanvasModel.prototype.setPosition = function (x, y) {
    this.x = x;
    this.y = y;

    if (this.connection !== null) {
        this.connection.sendMoveUpdate(this.x, this.y, this.width, this.height);
    }
}

CanvasModel.prototype.setSize = function(width, height) {
    this.width = width;
    this.height = height;

    if (this.connection !== null) {
        this.connection.sendMoveUpdate(this.x, this.y, this.width, this.height);
    }
};

CanvasModel.prototype.setName = function (name) {
    this.name = name;
    
    if (this.connection !== null) {
        this.connection.sendNameUpdate(this.name);
    }
}