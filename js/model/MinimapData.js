var MinimapData = function (valuesPerCell, width, height) {
    this.data = {};
    this.changeList = [];
    this.viewData = [];
    this.valuesPerCell = valuesPerCell;
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
};

//Observer impl
MinimapData.prototype.update = function (model) {
    var minimap = this;

    model.changeList.forEach(function (v) {
        minimap._put(v.x, v.y, v.value, v.prev);
    });

    //Calculate topleft position in minimap cell coordinates
    this.x = ~~(((model.x + model.width / 2) - this.width * this.valuesPerCell / 2) / this.valuesPerCell);
    this.y = ~~(((model.y + model.height / 2) - this.height * this.valuesPerCell / 2) / this.valuesPerCell);

    this._cleanChangeList();
    if (this.changeList.length > 0)
        this._buildViewData();
};

MinimapData.prototype._put = function (gx, gy, value, prev) {
    var cx =  Math.floor(gx / this.valuesPerCell);
    var cy = Math.floor(gy / this.valuesPerCell);

    var xlist = this.data[cy];
    if (xlist === undefined) {
        xlist = {};
        this.data[cy] = xlist;
    }

    var yval = xlist[cx] || 0;
    if (value !== 0) {
        if (prev === 0) {
            xlist[cx] = yval + 1;//+1
            this.changeList.push({
                x: cx,
                y: cy,
                value: yval + 1
            });
        }
    }
    else {
        if (prev !== 0) {
            xlist[cx] = yval - 1;//-1
            this.changeList.push({
                x: cx,
                y: cy,
                value: yval - 1
            });
        }
    }
};

//Global coordinates
MinimapData.prototype.getCell = function (x, y) {
    var xlist = this.data[y];
    if (xlist === undefined)
        return 0;

    return xlist[x] || 0;
};

MinimapData.prototype._cleanChangeList = function () {
    var set = {};
    var resIndex = [];

    for (var i = this.changeList.length - 1; i >= 0; --i) {
        var index = this.changeList[i].x + "-" + this.changeList[i].y;
        var v = set[index];
        if (v === undefined) {
            set[index] = true;
            resIndex.push(i);
        }
    }

    var res = [];
    for (var j = resIndex.length - 1; j >= 0; --j) {
        res.push(this.changeList[resIndex[j]]);
    }

    this.changeList = res;
};

MinimapData.prototype._buildViewData = function () {
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

MinimapData.prototype.getCellLocal = function (x, y) {
    return this.viewData[this.width * y + x];
};

