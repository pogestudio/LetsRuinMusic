var CanvasModel = function() {
    this.observers = [];
    this.width = 16;
    this.height = 16;
    this.x = 0;
    this.y = 0;

    this.diffX = 0; //used to identify how much the thing moved last update
    this.diffY = 0; //used to identify how much the thing moved last update

    this.viewData = [0];
    this.data = {};
    this.changeList = [];
    this.name = "Awesome client";

    this.currentInstrument = null;
    this.connection = null;

    //Params: Values per cell, width(cells), height(cell)
    this.minimapData = new MinimapData(1, 50, 50);

    this.id = -1;
    this.clients = {};
    this.changedClients = [];
    this.removedClients = [];
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

    this.minimapData.update(this);

    for (var i = 0; i < this.observers.length; i++) {
        this.observers[i].update(this);
    }

    this.changeList = [];
    this.changedClients = [];
    this.removedClients = [];
    this.minimapData.clearChangeList();
    this.diffX = 0;
    this.diffY = 0;

};

//Global coordinates
CanvasModel.prototype.getCell = function(x, y) {
    var xlist = this.data[y];
    if (xlist === undefined)
        return 0;

    return xlist[x] || 0;
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

    this.notifyObservers();
};

CanvasModel.prototype.setPositionAndJump = function (x, y) {

    this.diffX = x - this.x;
    this.diffY = y - this.y;

    this.x = x;
    this.y = y;

    if (this.connection !== null) {
        this.connection.sendMoveUpdate(this.x, this.y, this.width, this.height);
    }

    this.notifyObservers();
};

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
};

CanvasModel.prototype.handleClientUpdate = function (client) {
    var updatedClient = this.clients[client.id];

    if (client.dead !== undefined) {
        if (updatedClient !== undefined) {
            this.removedClients.push(updatedClient);
            delete this.clients[client.id];
        }
    }
    else {
        if (updatedClient === undefined) {
            updatedClient = { color:  Math.random() * 0xffffff };
        }

        if (client.view !== undefined) {
            updatedClient.view = client.view;
        }
        if (client.name !== undefined) {
            updatedClient.name = client.name;
        }

        updatedClient.id = client.id;

        this.clients[updatedClient.id] = updatedClient;
        this.changedClients.push(updatedClient);
    }
};