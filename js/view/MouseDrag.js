var MouseDrag = function () {
    this.isMoving = false;
    this.startPoint = null;
    this.prevPoint = null;

    this.listeners = [];
}

MouseDrag.prototype.addListener = function(listener) {
    this.listeners.push(listener);
}

MouseDrag.prototype.onMouseDown = function (point) {
    if (!this.isMoving) {
        this.isMoving = true;
        this.startPoint = { x: point.x, y: point.y };
        this.prevPoint = { x: point.x, y: point.y };

        this.listeners.forEach(function(listener){
            listener.onDragStart({ x:point.x, y:point.y });
        });
    }
}

MouseDrag.prototype.onMouseMove = function (point) {
    if (this.isMoving) {
        var moveSinceLast = {
            x: point.x - this.prevPoint.x,
            y: point.y - this.prevPoint.y,
        };
        
        this.listeners.forEach(function(listener){
            listener.onDragMove(point, moveSinceLast);
        });

        this.prevPoint = { x:point.x, y:point.y };
    }
}

MouseDrag.prototype.onMouseUp = function (point) {
    if (this.isMoving) {
        this.isMoving = false;
        var moveSinceLast = {
            x: point.x - this.prevPoint.x,
            y: point.y - this.prevPoint.y,
        };
        
        this.listeners.forEach(function(listener){
            listener.onDragStop(point, moveSinceLast);
        });

    }
}