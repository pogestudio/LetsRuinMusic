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

    this.socket.onopen = function (event) {
        var helloData = {};
        helloData.name = connection.model.name;
        helloData.x = connection.model.x;
        helloData.y = connection.model.y;
        helloData.w = connection.model.width;
        helloData.h = connection.model.height;
        helloData.data = [];

        console.log(JSON.stringify(helloData));
        connection.socket.send(JSON.stringify(helloData));
        console.log("Connection opened");
    };

    this.socket.onclose = function (event) {
        connection.isConnected = false;
        connection.socket = null;
        console.log("Connection closed");
    };

    this.socket.onmessage = function (event) {
        console.log(event.data);
        var message = JSON.parse(event.data);
        message.data.forEach(function (cell) {
            connection.model.setCellFromServer(cell.x, cell.y, cell.v);
        });
        connection.model.notifyObservers();
    }
}

//Might be buffered in the future
Connection.prototype.sendUpdate = function (x, y, value) {


    var msg = {
        data: [
            {
                x: x,
                y: y,
                v: value
            }]
    };
    if (this.socket !== null)
        this.socket.send(JSON.stringify(msg));
}


Connection.prototype.trySend = function () {
    var msg = {
        data: this.buffer
    };
    if (this.socket !== null && this.socket.isConnected) {
        this.socket.send(JSON.stringify(msg));
    }
}