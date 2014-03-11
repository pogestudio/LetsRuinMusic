var Connection = function (model) {
    this.isConnected = false;
    this.socket = null;
    this.model = model;
    this.retries = 5;//TODO: change retries into something time based
    this.model.connection = this;
    this.buffer = [];
}

Connection.prototype.connect = function (host) {
    if (this.isConnected)
        return;

    console.log("Connecting to: " + host);

    this.socket = new WebSocket(host);
    var connection = this;
    this.isConnected = true;

    var self = this;

    this.socket.onopen = function (event) {
        var helloData = {};
        helloData.name = connection.model.name;
        helloData.x = connection.model.x;
        helloData.y = connection.model.y;
        helloData.w = connection.model.width;
        helloData.h = connection.model.height;
        helloData.data = [];

        //console.log(JSON.stringify(helloData));
        connection.socket.send(JSON.stringify(helloData));
        console.log("Connection opened");
        self.trySendBuffer();
    };

    this.socket.onclose = function (event) {
        connection.isConnected = false;
        connection.socket = null;
        console.log("Connection closed");
    };

    this.socket.onmessage = function (event) {
        //console.log(event.data);
        var message = JSON.parse(event.data);
        message.data.forEach(function (cell) {
            connection.model.setCellFromServer(cell.x, cell.y, cell.v);
        });
        connection.model.notifyObservers();
    }
}

//Might be buffered in the future
Connection.prototype.sendUpdate = function (x, y, value) {
    this.buffer.push({
        x: x,
        y: y,
        v: value
    });

    this.trySendBuffer();
}


Connection.prototype.trySendBuffer = function () {
    if (this.socket !== null && this.socket.readyState == 1) {
        var msg = {
            data: this.buffer
        };
        this.socket.send(JSON.stringify(msg));
        this.buffer = [];
    }
}