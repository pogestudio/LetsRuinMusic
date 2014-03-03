var CanvasModel = function Model() {
    this.observers = [];
    this.x = 0;
    this.y = 0;
    this.width = 1;
    this.height = 1;

    this.viewData = [0];
    this.data = {};
    this.changeList = [];
};

CanvasModel.prototype.addObserver = function (observer) {
    this.observers.push(observer);
}

CanvasModel.prototype.notifyObservers = function () {
    this._updateViewData();

    for (var i = 0; i < observers.length; i++) {
        this.observers[i].update(this);
    }
    this.changeList = [];
}

//Internal: updates viewData matrix
CanvasModel.prototype._updateViewData = function () {
    this.viewData = [];

    for (var i = 0 ; i < this.height; ++i) {
        for (var j = 0 ; j < this.width; ++j) {
            var value = 0;

            var x = j + this.x;
            var y = i + this.y;

            this.viewData.push(this.getCell(x, y));
        }
    }
}

//Local coordinates: (0-width, 0-height)
CanvasModel.prototype.getCellLocal = function (x, y) {
    return this.viewData[this.width * y + x];
}

//Global coordinates
CanvasModel.prototype.getCell = function (x, y) {
    var xlist = this.data[y];
    if (xlist == null)
        return 0;

    return xlist[x] | 0;
}

//Local coordinates: (0-width, 0-height)
CanvasModel.prototype.setCellLocal = function (x, y, value) {
    this.setCell(this.x + x, this.y + y, value);
}

//Global coordinates 
CanvasModel.prototype.setCell = function (x, y, value) {
    this.changeList.push({ x: x, y: y, value: value });

    var xlist = this.data[y];
    if (xlist == null) {
        xlist = {};
        this.data[y] = xlist;
    }

    xlist[x] = value;
}

//Global coordinates 
CanvasModel.prototype.setTopLeft = function (x, y) {
    this.x = x;
    this.y = y;
}

CanvasModel.prototype.setSize = function (width, height) {
    this.width = width;
    this.height = height;
}