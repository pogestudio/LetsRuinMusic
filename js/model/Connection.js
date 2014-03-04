var Connection = function (model) {
    this.isConnected = false;
    this.socket = null;
    this.model = model;
    this.retries = 5;//TODO: change retries into something time based
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
        helloData.state = {};
        helloData.state

        connection.socket.send("{\"hello\":\"World\"}");
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
            connection.model.setCell(cell.x, cell.y, cell.v);
        });
        connection.model.notifyObservers();
    }
}