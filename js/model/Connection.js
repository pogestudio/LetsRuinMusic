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
        var view = {
            x : connection.model.x,
            y : connection.model.y,
            w : connection.model.width,
            h : connection.model.height,
        };
        helloData.view = view;
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
        if (message.your_id !== undefined) {
            connection.model.id = message.your_id;
        }
        if (message.data !== undefined) {
            message.data.forEach(function (cell) {
                connection.model.setCellFromServer(cell.x, cell.y, cell.v);
            });
        }
        if (message.clients !== undefined) {
            message.clients.forEach(function (client) {
                connection.model.handleClientUpdate(client);
            });
        }
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

Connection.prototype.sendMoveUpdate = function (x, y, w, h) {
    if (this.socket !== null && this.socket.readyState == 1) {
        var msg = {
            view: {
                x: x,
                y: y,
                w: w,
                h: h
            }
        };
        this.socket.send(JSON.stringify(msg));
    }
}

Connection.prototype.sendNameUpdate = function (name) {
    if (this.socket !== null && this.socket.readyState == 1) {
        var msg = {
            name: name
        };
        this.socket.send(JSON.stringify(msg));
    }
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